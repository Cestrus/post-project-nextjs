import PostHeader from '../PostHeader/PostHeader';
import { IPostContentProps } from './PostContent.props';
import ReactMarkdown, { Components } from 'react-markdown';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';

import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import styles from './PostContent.module.css';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

const PostContent = ({ post }: IPostContentProps): JSX.Element => {
  const { title, image, content, id } = post;
  const imagePath = `/images/posts/${id}/${image}`;

  const customComponent: Components = {
    // first variant for render image with many warning in devtools
    // img: (img) => {
    //   return (
    //     <div className={styles.image}>
    //       {img.src && (
    //         <Image src={img.src} alt={img.alt} height={300} width={600} />
    //       )}
    //     </div>
    //   );
    // },

    //second variant for render image without many warning in devtools
    p: (paragraph) => {
      const { node } = paragraph;
      if (node.children[0].type === 'element' && node.children[0].properties) {
        const img = node.children[0].properties;

        return (
          <div className={styles.image}>
            {typeof img.src === 'string' && typeof img.alt === 'string' && (
              <Image src={img.src} alt={img.alt} height={300} width={600} />
            )}
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },

    code: (code) => {
      const children = code.children as string | string[];
      return (
        <SyntaxHighlighter
          style={atomDark}
          children={children}
          language="javascript"
        />
      );
    },
  };

  return (
    <article className={styles.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown components={customComponent}>{content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
