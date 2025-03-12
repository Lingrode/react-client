import { JSX } from "react";

import { useCurrentQuery } from "@/redux/apis/userApi";
import { LoadingSpinner } from "../Loader";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading)
    return (
      <LoadingSpinner
        size={40}
        className="absolute top-[50%] left-[50%] translate-[-50%]"
      />
    );

  return children;
};
