"use client"
import { AppSidebar } from '@/components/app-sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Item } from '@radix-ui/react-dropdown-menu'
import { usePathname } from 'next/navigation'
import path from 'path'
import React, { PropsWithChildren } from 'react'

const DashboardLayout = ({children}:PropsWithChildren) => {
    const pathname = usePathname()
    console.log(pathname)
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {pathname&&<Breadcrumb>
            
          <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={`/dashboard`}>
                    Home
              </BreadcrumbLink>
            </BreadcrumbItem>
          {pathname.split('/').map((item, index) => (
            <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={`/${path.join(...pathname.split('/').slice(0, index + 1))}`}>
                    {item}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathname.split('/').length!=(index+1)&&<BreadcrumbSeparator className="hidden md:block" />}
            </>
          ))}
            
          </BreadcrumbList>
        </Breadcrumb>}
      </header>{children}
    </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout