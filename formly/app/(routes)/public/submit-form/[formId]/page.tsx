import { fetchPublishFormById, incrementFormView} from "@/actions/form.actions";
import React from "react";
import NotAvaliable from "./_components/notAvailable";
import { FormBlockInstance } from "@/@types/formBlock.type";
import FormSubmitComponent from "./_components/formSubmitComponent";

const Page = async ({ params }: { params: { formId: string } }) => {
  const { formId } = params;

   await incrementFormView(formId);

  const { form } = await fetchPublishFormById(formId);

  if (!form) {
    return <NotAvaliable />;
  }

  const blocks = JSON.parse(form.jsonBlocks) as FormBlockInstance[];
  return <div className="!bg-purple-50"><FormSubmitComponent formId={formId} blocks={blocks} /></div>;
};

export default Page;