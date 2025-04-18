"use client";
import { FormWithSettings } from "@/@types/form.type";
import { FormBlockInstance } from "@/@types/formBlock.type";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";
import { createContext, useState, useEffect, useContext } from "react";

type BuilderContextType = {
  loading: boolean;
  formData: FormWithSettings | null;
  setFormData: React.Dispatch<React.SetStateAction<FormWithSettings | null>>;
  blocks: FormBlockInstance[];
  setBlocks: React.Dispatch<React.SetStateAction<FormBlockInstance[]>>;
};

export const BuilderContext = createContext<BuilderContextType | null>(null);

export default function BuilderContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const formId = params.formId as string;

  const [formData, setFormData] = useState<FormWithSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [blocks, setBlocks] = useState<FormBlockInstance[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        
      try {
        setLoading(true);
        if (!formId) return;

        const response = await fetch(`/api/fetchFormById?formId=${formId}`, {
          method: "GET",
        });

        if (!response.ok) throw new Error("Failed to fetch form data");

        const { data } = await response.json();
        const { form } = data;

        if (form) {
          console.log(form, "form useEffect");
        };

        setFormData(form);

        if (form.jsonBlocks) {
          const parsedBlocks = JSON.parse(form.jsonBlocks);
          setBlocks(parsedBlocks);
        }
      } catch (error: any) {
        console.error("Error fetching form:", error);
        return NextResponse.json(
          { error: error?.message || "Internal server error" },
          { status: 500 }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formId]);

  return (
    <BuilderContext.Provider
      value={{
        loading,
        formData,
        setFormData,
        blocks,
        setBlocks,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
    const context = useContext(BuilderContext);
    if (!context) {
      throw new Error("Use Context inside the provider");
    }
    return context;
  }
