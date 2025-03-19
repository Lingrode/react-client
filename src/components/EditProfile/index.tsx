import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { User } from "@/types";
import { useUpdateUserMutation } from "@/redux/apis/userApi";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/ErrorMessage";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constants";

type Props = {
  // isOpen: boolean;
  // onClose: () => void;
  user?: User;
};

const profileSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Имя должно содержать хотя бы 2 символа" }),
  email: z.string().email({ message: "Некорректный email" }),
  dateOfBirth: z.string().optional(),
  bio: z
    .string()
    .max(300, { message: "Максимальная длина 300 символов" })
    .optional(),
  location: z.string().optional(),
});

export const EditProfile = ({ isOpen, onClose, user }: Props) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    reValidateMode: "onBlur",
    mode: "onChange",
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      dateOfBirth: user?.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split("T")[0]
        : "",
      bio: user?.bio || "",
      location: user?.location || "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        {/* <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={`${BASE_URL}${user.avatarUrl}`} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <FormLabel className="mt-2">Изменить фото</FormLabel>
          <Input type="file" onChange={handleFileChange} />
        </div> */}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
            </FormItem>
          )}
        />

        {error && <ErrorMessage error={error}></ErrorMessage>}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
