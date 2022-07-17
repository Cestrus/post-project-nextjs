import PostsGrid from '../PostsGrid/PostsGrig';
import { IAllPostsProps } from './AllPosts.props';

import styles from './AllPosts.module.css';

const AllPosts = ({ posts }: IAllPostsProps): JSX.Element => {
  return (
    <section className={styles.posts}>
      <h1>All Posts</h1>
      <PostsGrid postsList={posts} />
    </section>
  );
};

export default AllPosts;
