import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";

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

import { useLazyGetPostByIdQuery } from "@/redux/apis/postApi";
import { useCreateCommentMutation } from "@/redux/apis/commentApi";
import { Pencil } from "lucide-react";

const commentSchema = z.object({
  comment: z
    .string()
    .min(2, { message: "Comment must be at least 2 characters." })
    .max(2000, { message: "Comment is too long." }),
});

export const CreateComment = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const [getPostById] = useLazyGetPostByIdQuery();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    setError("");

    try {
      if (id) {
        await createComment({ content: values.comment, postId: id }).unwrap();
        await getPostById(id).unwrap();
        form.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your comment..."
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
          {isLoading ? "Creating..." : "Comment"}
          <Pencil />
        </Button>
      </form>
    </Form>
  );
};
