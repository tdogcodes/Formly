import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import React from "react";

const PublishFormButton = () => {
  return (
    <Button size="sm" className="!text-white">
      <Send />
      Publish
    </Button>
  );
};

export default PublishFormButton;
