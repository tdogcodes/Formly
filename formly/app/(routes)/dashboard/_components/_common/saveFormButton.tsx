import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import React from "react";

const SaveFormButton = () => {
  return (
      <Button
        size="sm"
        variant="outline"
        className="!text-primary !hover:bg-primary/10 !border-primary"
      >
        <Save />
        Save
      </Button>
  );
};

export default SaveFormButton;
