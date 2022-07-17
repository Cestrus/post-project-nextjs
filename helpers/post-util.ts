import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { IPost } from '../components/posts/PostItem/PostItem.props';

type PostDataType = Pick<
  IPost,
  'title' | 'date' | 'excerpt' | 'image' | 'isFeatured'
>;

const postDirPath = path.join(process.cwd(), 'content/posts');

const dataToMetaData = (data: PostDataType): PostDataType => {
  return {
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    image: data.image,
    isFeatured: data.isFeatured,
  };
};

export const getPostsFies = (): string[] => {
  return fs.readdirSync(postDirPath);
};

export const getPostData = (postIdentifier: string): IPost => {
  const postId = postIdentifier.replace(/\.md$/, '');

  const filePath = path.join(postDirPath, `${postId}.md`);
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileData);

  const postData = dataToMetaData(data as PostDataType);
  return {
    id: postId,
    ...postData,
    content,
  };
};

export const getAllPosts = (): IPost[] => {
  const postFiles = getPostsFies();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
};

export const getFuturedPosts = (): IPost[] => {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.isFeatured);
};
