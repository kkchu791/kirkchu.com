import Link from "next/link";
import { Post } from "@/interfaces/post";

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <div>
      <h1>
        Programming Topics
      </h1>
      {posts.map((post) => (
        <div key={post.slug}>
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
