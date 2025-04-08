import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarHeader} from '@/components/ui/sidebar'
import { Home, Sidebar, FileTextIcon } from 'lucide-react'
import React from 'react'

const BuilderSidebar = ({ rest } : { rest?: React.ComponentProps<typeof Sidebar>}) => {

  return (
    <Sidebar className="border-r left-12 pt-16" {...rest}>
      <SidebarHeader className="bg-white px-0">
        <header
          className="border-b border-gray-200
              w-full pt-1 pb-2 flex shrink-0 items-center gap-2
              "
        >
          <div className="flex items-center gap-2 px-4">
            <Home className="-ml-1 w-4 h-4" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="flex items-center gap-1">
                    <FileTextIcon className="w-4 h-4 mb-[3px]" />
                    <h5 className="truncate flex w-[110px] text-sm">
                      
                    </h5>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      </SidebarHeader>
    </Sidebar>
  )
}

export default BuilderSidebar