"use client"
import { AppSidebar } from '@/components/app-sidebar'
import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import { Breadcrumb, BreadcrumbList } from '@/components/ui/breadcrumb'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user){
        router.push('/auth/login')
      }
    })
  }, [])
  
  return (
        <main>
            <Navbar/>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <ScrollArea className="h-[80vh] w-full p-3">
            {children}
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
    <Footer/>
           
        </main>
  );
}
