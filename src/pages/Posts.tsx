import { CreatePost } from "@/components/CreatePost";
import { useGetAllPostsQuery } from "@/redux/apis/postApi";
import React from "react";

export const Posts = () => {
  const { data } = useGetAllPostsQuery();

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
    </>
  );
};
