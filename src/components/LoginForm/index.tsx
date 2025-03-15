import { useState } from "react";
import { useNavigate } from "react-router";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/Loader";
import { hasErrorField } from "@/utils/hasErrorField";

import { useLazyCurrentQuery, useLoginMutation } from "@/redux/apis/userApi";

type Props = {
  setSelected: (value: string) => void;
};

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters." }),
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
    setError("");

    try {
      await login(values).unwrap();
      await triggerCurrentQuery().unwrap();
      navigate("/");
      form.reset();
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
        form.setValue("password", "");
      }
    }
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
                <Input
                  placeholder="shadcn@example.com"
                  {...field}
                  onChange={(e) => {
                    setError("");
                    field.onChange(e);
                  }}
                />
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
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoadingSpinner />
              Loading...
            </>
          ) : (
            "Login"
          )}
        </Button>

        <ErrorMessage error={error} />

        <p className="text-center mt-10">
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
