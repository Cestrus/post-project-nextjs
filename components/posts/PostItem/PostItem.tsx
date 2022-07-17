import { IPostItemProps } from './PostItem.props';
import Link from 'next/link';
import Image from 'next/image';

import styles from './PostItem.module.css';

const PostItem = ({ post }: IPostItemProps): JSX.Element => {
  const { title, date, excerpt, image, id } = post;
  const formattedDate = new Date(date).toLocaleDateString('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const imagePath = `/images/posts/${id}/${image}`;
  const linkPath = `/posts/${id}`;

  return (
    <li className={styles.post}>
      <Link href={linkPath}>
        <a>
          <div className={styles.image}>
            <Image
              src={imagePath}
              alt="feature poster"
              width={300}
              height={200}
              layout="responsive"
            />
          </div>
          <div className={styles.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PostItem;
