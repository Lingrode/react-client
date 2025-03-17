import { Link } from "react-router";

import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/components/User";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrent } from "@/redux/user/selectors";

export const Followers = () => {
  const currentUser = useAppSelector(selectCurrent);

  if (!currentUser) return null;

  return currentUser.followers.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.followers.map((user) => (
        <Link to={`/users/${user.follower.id}`} key={user.follower.id}>
          <Card>
            <CardContent>
              <User
                name={user.follower.name ?? ""}
                avatarUrl={user.follower.avatarUrl ?? ""}
                description={user.follower.email ?? ""}
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h1>You have no followers</h1>
  );
};
