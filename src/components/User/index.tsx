import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CardDescription, CardTitle } from "../ui/card";
import { BASE_URL } from "@/constants";

type Props = {
  name: string;
  avatarUrl: string;
  description?: string | Date;
};

export const User = ({ name, avatarUrl, description }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={`${BASE_URL}${avatarUrl}`} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {description}
        </CardDescription>
      </div>
    </div>
  );
};
