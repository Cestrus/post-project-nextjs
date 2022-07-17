export interface IPost {
  id: string;
  title: string;
  date: Date;
  excerpt: string;
  image: string;
  isFeatured?: boolean;
  content: string;
}

export interface IPostItemProps {
  post: IPost;
}
