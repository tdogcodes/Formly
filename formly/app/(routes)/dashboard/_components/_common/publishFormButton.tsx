"use client";

import React, { useState } from "react";
import { Loader, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuilder } from "@/context/builderProvider";
import { cn } from "@/lib/utils";
import { updatePublish } from "@/actions/form.actions";
import { toast } from "@/hooks/use-toast";

const PublishFormBtn = () => {
  const { formData, setFormData, handleSelectedLayout } = useBuilder();
  const formId = formData?.formId;

  const [isLoading, setIsLoading] = useState(false);

  const togglePublishState = async () => {
    try {
      if (!formId) return;
      setIsLoading(true);

      // Toggle published state
      const newPublishedState = !formData?.published;
      const response = await updatePublish(formId, newPublishedState);
      if (response?.success) {
        toast({
          title: "Success",
          description: response.message,
        });

        handleSelectedLayout(null);
        setFormData({
          ...formData,
          published: response.published || false,
        });
      } else {
        toast({
          title: "Error",
          description: response?.message || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isPublished = formData?.published;

  return (
    <Button
      disabled={isLoading}
      size="sm"
      variant={isPublished ? "destructive" : "default"}
      className={cn(
        isPublished ? "bg-red-500 hover:bg-red-600" : "!bg-primary",
        "text-white"
      )}
      onClick={togglePublishState}
    >
      {isLoading ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : isPublished ? (
        "Unpublish"
      ) : (
        <>
          <Send />
          Publish
        </>
      )}
    </Button>
  );
};

export default PublishFormBtn;