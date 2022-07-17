import Image from 'next/image';
import { IPostHeaderProps } from './PostHeader.props';

import styles from './PostHeader.module.css';

const PostHeader = ({ title, image }: IPostHeaderProps): JSX.Element => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <Image src={image} alt="poster" width={200} height={150} />
    </header>
  );
};

export default PostHeader;
