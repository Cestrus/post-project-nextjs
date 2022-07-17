import { IPost } from '../../components/posts/PostItem/PostItem.props';
import PostContent from '../../components/posts/PostDetail/PostContent/PostContent';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { getPostData, getPostsFies } from '../../helpers/post-util';
import { ParsedUrlQuery } from 'node:querystring';
import Head from 'next/head';

interface IPostDetailPage {
  post: IPost;
}

const PostDetailPage = ({ post }: IPostDetailPage): JSX.Element => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />;
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsFilenames = await getPostsFies();
  const paths = postsFilenames.map((fileName) => {
    return fileName.replace(/\.md$/, '');
  });

  return {
    paths: paths.map((path) => ({ params: { id: path } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IPostDetailPage> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params || !params.id || typeof params.id !== 'string') {
    return {
      notFound: true,
    };
  }
  const id = params.id;
  const postData = await getPostData(id);
  return {
    props: {
      post: postData,
    },
  };
};

export default PostDetailPage;
