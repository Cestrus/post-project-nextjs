import PostsGrid from '../../posts/PostsGrid/PostsGrig';
import { IFeaturedPostsProps } from './FeaturedPosts.props';

import styles from './FeaturedPosts.module.css';

const FeaturedPosts = ({ posts }: IFeaturedPostsProps): JSX.Element => {
  return (
    <section className={styles.latest}>
      <h2>Featured Post</h2>
      <PostsGrid postsList={posts} />
    </section>
  );
};

export default FeaturedPosts;
