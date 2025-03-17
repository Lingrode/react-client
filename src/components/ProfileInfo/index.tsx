import React from "react";

type Props = {
  title: string;
  info?: string;
};

export const ProfileInfo = ({ title, info }: Props) => {
  if (!info) return null;

  return (
    <p className="font-semibold">
      <span className="mr-2">{title}</span>
      {info}
    </p>
  );
};
