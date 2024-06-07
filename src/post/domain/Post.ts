export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface CreatePost {
  title: string;
  body: string;
  userId: number;
}

export interface PostErrors {
  title?: string;
  body?: string;
  general?: string;
}

export interface CreatePostProps {
  newPost: CreatePost;
  setNewPost: (newPost: CreatePost) => void;
  handleCreatePost: () => void;
  errors: PostErrors;
}

export interface PostItemProps {
  post: Omit<Post, 'userId'>;
  handleDeleteClick: (postId: number) => void;
}
