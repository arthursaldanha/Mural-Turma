interface Tag {
  id: number;
}

interface ICreatePostsPayload {
  title: string;
  content: string;
  deadline: Date;
  tag: Tag;
}

export { type ICreatePostsPayload };
