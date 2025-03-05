import { Like } from "@/types";
import { api } from "./api";

export const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<Like, { postId: string }>({
      query: (likeData) => ({
        url: "/likes",
        method: "POST",
        body: likeData,
      }),
    }),
    unlikePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/likes/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useLikePostMutation, useUnlikePostMutation } = likeApi;

export const {
  endpoints: { likePost, unlikePost },
} = likeApi;
