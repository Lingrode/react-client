import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { User } from "../User";
import { LoadingSpinner } from "../Loader";
import { MetaInfo } from "../MetaInfo";
import { ErrorMessage } from "../ErrorMessage";
import { formatToClientDate } from "@/utils/formatToClientDate";

import { useDeleteCommentMutation } from "@/redux/apis/commentApi";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "@/redux/apis/likeApi";
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "@/redux/apis/postApi";
import { selectCurrent } from "@/redux/user/selectors";
import { hasErrorField } from "@/utils/hasErrorField";

type Props = {
  avatarUrl: string;
  name: string;
  authorId: string;
  content: string;
  commentId?: string;
  likesCount?: number;
  commentsCount: number;
  createdAt?: Date;
  id?: string;
  cardFor: "comment" | "post" | "current-post";
  likedByUser: boolean;
};

export const PostCard = ({
  avatarUrl = "",
  name = "",
  authorId = "",
  content = "",
  commentId = "",
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id = "",
  cardFor = "post",
  likedByUser = false,
}: Props) => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrent);

  const refetchPosts = async () => {
    switch (cardFor) {
      case "post":
        await triggerGetAllPosts().unwrap();
        break;
      case "current-post":
        await triggerGetAllPosts().unwrap();
        break;
      case "comment":
        await triggerGetPostById(id).unwrap();
        break;
      default:
        throw new Error("Wrong argument cardFor");
    }
  };

  const handleDeletePost = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap();
          await refetchPosts();
          break;
        case "current-post":
          await deletePost(id).unwrap();
          navigate("/");
          break;
        case "comment":
          await deleteComment(id).unwrap();
          await refetchPosts();
          break;
        default:
          throw new Error("Wrong argument cardFor");
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      } else {
        setError(error as string);
      }
    }
  };

  return (
    <Card className="mb-4 shadow-md">
      <CardHeader className="flex-row justify-between">
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={handleDeletePost}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <LoadingSpinner />
            ) : (
              <Trash2 />
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="mt-2">{content}</p>
      </CardContent>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div>
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? <ThumbsDown /> : <ThumbsUp />}
              />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={<MessageSquare />} />
            </Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </Card>
  );
};
