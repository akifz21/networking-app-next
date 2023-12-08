import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const Follow = dynamic(() => import("./follow"), {
  ssr: false,
  loading: () => <Loader2 strokeWidth={3} className="animate-spin" />,
});

type Props = {
  userName: string;
  userId: string;
};

export function UserCard({ userId, userName }: Props) {
  return (
    <Card>
      <CardHeader>
        <Link href={`/profile/${userId}`}>
          <CardTitle className="flex flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="flex flex-col">{userName}</span>
            <Follow id={userId} />
          </CardTitle>
        </Link>
      </CardHeader>
    </Card>
  );
}
