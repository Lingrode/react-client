import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const GoBackBtn = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button onClick={handleGoBack} className="w-28 mb-10">
      <ArrowLeft />
      Go Back
    </Button>
  );
};
