import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "@/components/ErrorMessage";

import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "@/redux/apis/postApi";

const postSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Post must be at least 10 characters." })
    .max(1000, { message: "Post is too long." }),
});

export const CreatePost = () => {
  const [error, setError] = useState("");
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [triggerAllPosts] = useLazyGetAllPostsQuery();

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof postSchema>) => {
    setError("");

    try {
      await createPost(values).unwrap();
      await triggerAllPosts().unwrap();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your post..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <ErrorMessage error={error} />}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Post"}
        </Button>
      </form>
    </Form>
  );
};
