import { Link } from "react-router";

import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/components/User";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrent } from "@/redux/user/selectors";

export const Following = () => {
  const currentUser = useAppSelector(selectCurrent);

  if (!currentUser) return null;

  return currentUser.following.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.following.map((user) => (
        <Link to={`/users/${user.following.id}`} key={user.following.id}>
          <Card>
            <CardContent>
              <User
                name={user.following.name ?? ""}
                avatarUrl={user.following.avatarUrl ?? ""}
                description={user.following.email ?? ""}
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h1>No one is following you</h1>
  );
};
