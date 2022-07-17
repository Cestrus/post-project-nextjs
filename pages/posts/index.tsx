import AllPosts from '../../components/posts/AllPosts/AllPosts';
import { IPost } from '../../components/posts/PostItem/PostItem.props';
import { GetStaticProps } from 'next/types';
import { getAllPosts } from '../../helpers/post-util';
import Head from 'next/head';

interface IAllPostsPage {
  posts: IPost[];
}

const AllPostsPage = ({ posts }: IAllPostsPage): JSX.Element => {
  return (
    <>
      <Head>
        <title>All Post</title>
        <meta name="description" content="All post about web development" />
      </Head>
      <AllPosts posts={posts} />;
    </>
  );
};

export default AllPostsPage;

export const getStaticProps: GetStaticProps<IAllPostsPage> = async () => {
  const allPosts = await getAllPosts();
  return {
    props: {
      posts: allPosts,
    },
  };
};
