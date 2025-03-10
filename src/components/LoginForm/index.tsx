import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLazyCurrentQuery, useLoginMutation } from "@/redux/apis/userApi";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type Props = {
  setSelected: (value: string) => void;
};

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters." })
    // .regex(/[A-Z]/, {
    //   message: "Password must contain at least one uppercase letter",
    // })
    // .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

export const LoginForm = ({ setSelected }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await login(values).unwrap();
      form.reset();
    } catch (error) {
      console.error(error);
    }
    // console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="shadcn@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-7">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <Button className="w-full mb-10" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Loading...
            </>
          ) : (
            "Submit"
          )}
        </Button>

        <p className="text-center">
          Don't have an account?{" "}
          <a
            href="#"
            className="underline underline-offset-4 cursor-pointer"
            onClick={() => setSelected("sign-up")}
          >
            Sign up
          </a>
        </p>
      </form>
    </Form>
  );
};
