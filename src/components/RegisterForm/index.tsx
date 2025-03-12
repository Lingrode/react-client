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
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ErrorMessage } from "../ErrorMessage";
import { LoadingSpinner } from "../Loader";
import { hasErrorField } from "@/utils/hasErrorField";

import { useRegisterMutation } from "@/redux/apis/userApi";

type Props = {
  setSelected: (value: string) => void;
};

const formSchema = z.object({
  name: z.string().min(4, { message: "Name must be at leat 4 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters." }),
  // .regex(/[A-Z]/, {
  //   message: "Password must contain at least one uppercase letter",
  // })
  // .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

export const RegisterForm = ({ setSelected }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState("");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError("");

    try {
      await register(values).unwrap();
      setSelected("login");
      form.reset();
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
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
            "Submit"
          )}
        </Button>

        <ErrorMessage error={error} />

        <p className="text-center mt-10">
          Already have an account?{" "}
          <a
            href="#"
            className="underline underline-offset-4 cursor-pointer"
            onClick={() => setSelected("login")}
          >
            Sign up
          </a>
        </p>
      </form>
    </Form>
  );
};
