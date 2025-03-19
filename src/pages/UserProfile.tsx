import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Pencil, UserMinus, UserPlus } from "lucide-react";

import { BASE_URL } from "@/constants";

import { GoBackBtn } from "@/components/GoBackBtn";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProfileInfo } from "@/components/ProfileInfo";
import { CountInfo } from "@/components/CountInfo";
import { EditProfile } from "@/components/EditProfile";

import { formatToClientDate } from "@/utils/formatToClientDate";
import { hasErrorField } from "@/utils/hasErrorField";

import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/redux/apis/followApi";
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "@/redux/apis/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrent } from "@/redux/user/selectors";
import { resetUser } from "@/redux/user/slice";

export const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const currentUser = useAppSelector(selectCurrent);
  const { data } = useGetUserByIdQuery(id ?? "");
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery();
  const [triggerCurrentQuery] = useLazyCurrentQuery();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(resetUser());
  }, [dispatch]);

  const handleFollow = async () => {
    try {
      if (id) {
        if (data?.isFollowing) {
          await unfollowUser(id).unwrap();
        } else {
          await followUser({ followingId: id }).unwrap();
        }

        await triggerGetUserByIdQuery(id);
        await triggerCurrentQuery();
      }
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error);
      }
    }
  };

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserByIdQuery(id);
        await triggerCurrentQuery();
        setIsEditOpen(false);
      }
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error);
      }
      console.log(error);
    }
  };

  if (!data) return null;

  return (
    <>
      <GoBackBtn />
      <div className="flex gap-4 items-stretch">
        <Card className="p-6 flex flex-col items-center text-center shadow-lg w-full md:w-1/2">
          <Avatar className="size-70">
            <AvatarImage
              src={`${BASE_URL}${data.avatarUrl}`}
              alt={data.name}
              className="object-cover"
            />
            <AvatarFallback>{data.name}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold mt-4">{data.name}</h2>
          {currentUser?.id !== id ? (
            <Button
              variant={data?.isFollowing ? "outline" : "default"}
              className="mt-4"
              onClick={handleFollow}
            >
              {data.isFollowing ? (
                <UserMinus className="mr-2" />
              ) : (
                <UserPlus className="mr-2" />
              )}
              {data.isFollowing ? "Unfollow" : "Follow"}
            </Button>
          ) : (
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="mt-4"
                  onClick={() => setIsEditOpen(true)}
                >
                  <Pencil className="mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent aria-describedby="edit-profile">
                <DialogTitle>Edit Profile</DialogTitle>
                <EditProfile user={data} onClose={handleClose} />
              </DialogContent>
            </Dialog>
          )}
        </Card>
        <Card className="col-span-2 p-6 shadow-lg w-full">
          <CardHeader>
            <h3 className="text-xl font-semibold">Info</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProfileInfo title="📧 E-mail:" info={data.email} />
            <ProfileInfo
              title="📍 Location:"
              info={data.location || "Unknown"}
            />
            <ProfileInfo
              title="🎂 Date of birth:"
              info={formatToClientDate(data.dateOfBirth)}
            />
            <ProfileInfo
              title="ℹ️ About me:"
              info={data.bio || "No information"}
            />

            <div className="flex gap-4">
              <Link to="/followers">
                <CountInfo count={data.followers.length} title="Followers" />
              </Link>
              <Link to="/following">
                <CountInfo count={data.following.length} title="Followings" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
