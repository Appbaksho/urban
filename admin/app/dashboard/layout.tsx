"use client"
import { AppSidebar } from '@/components/app-sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { auth } from '@/firebase/firebase'
import { Item } from '@radix-ui/react-dropdown-menu'
import { onAuthStateChanged } from 'firebase/auth'
import { usePathname, useRouter } from 'next/navigation'
import path from 'path'
import React, { PropsWithChildren, useEffect, useMemo } from 'react'

const DashboardLayout = ({children}:PropsWithChildren) => {
    const pathname = usePathname()

    const navigate = useRouter()
 // Calculate breadcrumb segments
  const breadcrumbSegments = useMemo(() => {
    if (!pathname) return [];
    
    const segments = pathname.split('/').filter(segment => segment !== '');
    return segments.map((segment, index) => ({
      name: segment,
      path: '/' + segments.slice(0, index + 1).join('/')
    }));
  }, [pathname]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate.push('/login')
      }
    })
  }, []) 
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
          {breadcrumbSegments.map((segment, index) => (
            <>
            <BreadcrumbItem className="hidden md:block" key={index}>
              <BreadcrumbLink href={segment.path}>
                    {segment.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbSegments.length !== (index + 1) && <BreadcrumbSeparator className="hidden md:block" />}
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