import React from "react";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { defaultBackgroundColor } from "@/constant";
import BuilderCanvas from "../../dashboard/_components/builderCanvas";
import BuilderBlockProperties from "./buildBlockProperties";
import BuilderSidebar from "./builderSidebar";



const Builder = (props: { isSidebarOpen: boolean }) => {
  return (
    <>
      <BuilderSidebar/>
      <SidebarInset className="!p-0 flex-1">
        <div
          className="w-full h-full"
          style={{
            backgroundColor: defaultBackgroundColor,
          }}
        >
          <SidebarTrigger className=" absolute top-0 z-50" />
          <BuilderCanvas />
        </div>
      </SidebarInset>
      <BuilderBlockProperties />
    </>
  );
};

export default Builder;
