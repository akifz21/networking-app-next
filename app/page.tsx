import PostCard from "./components/PostCard";
import PostDialog from "./components/PostDialog";

export default function Home() {
  return (
    <div className="grid grid-cols-4 pt-24">
      <div className="h-screen col-span-1"></div>
      <div className="border-x h-full flex flex-col col-span-2 px-10 justify-start  gap-4">
        <PostDialog />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      <div className="  h-screen col-span-1"></div>
    </div>
  );
}
