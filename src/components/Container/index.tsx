import React, { ReactElement } from "react";

type Props = {
  children: React.ReactElement[] | ReactElement;
};

export const Container = ({ children }: Props) => {
  return <div className="flex flex-1">{children}</div>;
};
