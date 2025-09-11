import { getAllPosts } from "@/lib/api";
import PostList from "@/app/_components/PostList";

export default function Index() {
  const posts = getAllPosts();

  return (
    <PostList
      posts={posts}
    />
  );
}