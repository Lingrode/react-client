import { useEffect } from "react";
import { useParams } from "react-router";
import { Pencil, UserMinus, UserPlus } from "lucide-react";

import { GoBackBtn } from "@/components/GoBackBtn";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BASE_URL } from "@/constants";
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
    } catch (error) {}
  };

  if (!data) return null;

  return (
    <>
      <GoBackBtn />
      <div className="flex gap-4 items-stretch">
        <Card className="p-6 flex flex-col items-center text-center shadow-lg w-full md:w-1/3">
          <Avatar>
            <AvatarImage src={`${BASE_URL}${data.avatarUrl}`} alt={data.name} />
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
              {data.isFollowing ? "Отписаться" : "Подписаться"}
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="mt-4">
                  <Pencil className="mr-2" /> Редактировать
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Edit Profile</DialogTitle>
                <EditProfile user={data} />
              </DialogContent>
            </Dialog>
          )}
        </Card>
        <Card className="col-span-2 p-6 shadow-lg">
          <CardHeader>
            <h3 className="text-xl font-semibold">Информация</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProfileInfo title="📧 Почта:" info={data.email} />
            <ProfileInfo
              title="📍 Местоположение:"
              info={data.location || "Не указано"}
            />
            <ProfileInfo
              title="🎂 Дата рождения:"
              info={formatToClientDate(data.dateOfBirth)}
            />
            <ProfileInfo
              title="ℹ️ Обо мне:"
              info={data.bio || "Нет информации"}
            />

            <div className="flex gap-4">
              <CountInfo count={data.followers.length} title="Подписчики" />
              <CountInfo count={data.following.length} title="Подписки" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
