"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusIcon, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CreateForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters long",
    }),
    description: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="!font-medium !bg-primary text-white hover:text-white/50 gap-1"
          >
            <PlusIcon />
            Create a form
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <div className="w-full max-w-5xl mx-auto">
            <SheetHeader>
              <SheetTitle className="text-2xl tracking-tight font-semibold">
                Create new form
              </SheetTitle>
              <SheetDescription>
                Be as descriptive as possible to help us generate the best starting point for your form.
              </SheetDescription>
            </SheetHeader>
            <div className="w-full dialog-content pt-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="on"
                            placeholder="Form name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            autoComplete="on"
                            placeholder="Form description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitted}
                    className="px-5 flex place-self-end !bg-primary text-white hover:text-white/50"
                  >
                    {form.formState.isSubmitting ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      "Create form"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateForm;
