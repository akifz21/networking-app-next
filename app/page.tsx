import PostCard from "./components/PostCard";

export default function Home() {
  return (
    <div className="grid grid-cols-4 pt-24">
      <div className="border-x  h-screen col-span-1"></div>
      <div className="border-x h-screen flex flex-col col-span-2 px-10 justify-start  gap-4">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      <div className="border-x  h-screen col-span-1"></div>
    </div>
  );
}
