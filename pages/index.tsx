import Hero from '../components/home-page/Hero/Hero';
import FeaturedPosts from '../components/home-page/FeaturedPosts/FeaturedPosts';
import { IPost } from '../components/posts/PostItem/PostItem.props';
import { getFuturedPosts } from '../helpers/post-util';
import { GetStaticProps } from 'next/types';
import Head from 'next/head';

interface IHomePage {
  posts: IPost[];
}

const HomePage = ({ posts }: IHomePage): JSX.Element => {
  return (
    <>
      <Head>
        <title>Aleksey's blog</title>
        <meta name="description" content="Post about web development" />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps<IHomePage> = async () => {
  const featuredPosts = await getFuturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
};

export default HomePage;
