import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { User } from "@/app/types";

const Follow = dynamic(() => import("./follow"), {
  ssr: false,
  loading: () => <Loader2 strokeWidth={3} className="animate-spin" />,
});

type Props = {
  user: User;
};

export function UserCard({ user }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row gap-4 items-center">
          <Avatar>
            <AvatarImage src="" alt="user profile" />
            <AvatarFallback>{user.firstName.charAt(0) + user.lastName.charAt(0)}</AvatarFallback>
          </Avatar>
          <Link href={`/profile/${user.id}`}>
            <span className="flex flex-col">
              {user.firstName} {user.lastName}
            </span>
          </Link>
          <Follow id={user.id} />
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
