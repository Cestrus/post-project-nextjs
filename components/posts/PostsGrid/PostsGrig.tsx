import { IPostsGridProps } from './PostsGrid.props';
import PostItem from '../PostItem/PostItem';

import styles from './PostsGrid.module.css';

const PostsGrid = ({ postsList }: IPostsGridProps): JSX.Element => {
  return (
    <ul className={styles.grid}>
      {postsList.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </ul>
  );
};

export default PostsGrid;
