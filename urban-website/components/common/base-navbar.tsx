"use client"
import { Heart, Menu, SearchIcon, ShoppingBag, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import {  useLazyGetCartQuery } from '@/components/api/cart/cart.api'
import { auth } from '@/firebase/firebase'
import { useGetMetadataQuery } from '../api/metadata/metadata.api'
import { useGetCategoriesQuery } from '../api/category/category.api'

// const components: { title: string; href: string; description: string }[] = [
//     {
//       "title": "Winter Collection",
//       "href": "/category/winter-collection",
//       "description": "Cozy up with our latest winter styles.",
//     },
//     {
//       "title": "New Arrivals",
//       "href": "/category/new-arrivals",
//       "description": "Fresh fashion pieces for the season."
//     },
//     {
//       "title": "Winter Accessories",
//       "href": "/category/winter-accessories",
//       "description": "Scarves, gloves, and more to keep you warm."
//     },
//     {
//       "title": "Outerwear",
//       "href": "/category/outerwear",
//       "description": "Jackets, coats, and layers for chilly days."
//     },
//     {
//       "title": "Knitwear",
//       "href": "/category/knitwear",
//       "description": "Comfortable and stylish sweaters for winter."
//     }
//   ]
  


interface BaseNavbarProps {
    open:boolean
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
    sheet:boolean
    setSheet:React.Dispatch<React.SetStateAction<boolean>>
    isLoggedIn:boolean
}

const BaseNavbar = (props:BaseNavbarProps) => {
  const {data:metadata,
    error:metadataError,
    isError:isMetadataError
  } = useGetMetadataQuery()

  const {data:categories,
    error:categoriesError,
    isError:isCategoriesError
  } = useGetCategoriesQuery()




  useEffect(() => {
    if(isMetadataError){
      console.log(metadataError)
    }
  }, [isMetadataError])

  useEffect(() => {
    if(isCategoriesError){
      console.log(categoriesError)
    }
  }, [isCategoriesError])
  
  


  return (
    <div className='w-full bg-white px-5 md:px-20 py-3 flex justify-between items-center'>
      <Link href='/'>
        <Image src='/logo.png' width={30} height={30} alt='logo' className='w-[30px]'/>
      </Link>
        
    <NavigationMenu className='hidden md:flex md:col-span-4'>
      <NavigationMenuList>
        {
          metadata?.parentCategory.map((category,i)=>(
            <NavigationMenuItem key={i}>
              <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
              <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {i==0&&categories&&<li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <div className="h-full w-full relative bg-cover rounded-md"
                    style={{
                      backgroundImage: `url(${categories[0].imageUrl})`,
                    }}
                    >
                      <Link
                        className="flex h-full absolute top-0 left-0 right-0 bottom-0 w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-transparent to-black p-6 no-underline outline-none focus:shadow-md"
                        href={`/category/${categories[0].id}`}
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                          {categories[0].name}
                        </div>
                        <p className="text-sm leading-tight text-gray-200">
                          {categories[0].description}
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuLink>
                </li>}
                {
                  categories?.filter((cat,j)=>i==0?j!=0&&cat.parentCategoryId==category.name:cat.parentCategoryId==category.name).map((cat,i)=>(
                    <ListItem
                      key={i}
                      title={cat.name}
                      href={`/category/${cat.id}`}
                    >
                      {cat.description}
                    </ListItem>
                  ))
                }
              </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))
        }
      </NavigationMenuList>
    </NavigationMenu>   
        {/* <ul className='hidden md:flex items-center justify-center gap-5 text-sm font-semibold hover:[&>li>a]:border-b-2 [&>li>a]:border-b-0 [&>li>a]:border-b-black md:col-span-3 '>
            
        </ul> */}
        <div className="flex items-center justify-end gap-3">
            <div className="hidden md:flex rounded-full bg-secondary hover:bg-gray-200" onClick={()=> props.setOpen(true)}>
                <div className="rounded-full p-1.5">
                    <SearchIcon size={18}/>
                </div>
                <input type="text" className='focus:outline-0 bg-transparent pr-2 placeholder:font-medium placeholder:text-sm w-[100px]' placeholder='Search' />
            </div>
            <div className="flex items-center gap-2">
                    {props.isLoggedIn?<Link href="/wishlist" className="rounded-full p-1.5 hover:bg-gray-200">
                        <Heart size={20} strokeWidth={1}/>
                    </Link>:<Link href="/login" className="rounded-full p-1.5 hover:bg-gray-200">
                        <Heart size={20} strokeWidth={1}/>
                    </Link>}
                    {props.isLoggedIn?<Link href="/user" className="rounded-full p-1.5 hover:bg-gray-200">
                        <User size={20} strokeWidth={1}/>
                    </Link>:<Link href="/auth/login" className="rounded-full p-1.5 hover:bg-gray-200">
                        <User size={20} strokeWidth={1}/>
                    </Link>}
                    <button onClick={()=>props.setSheet(true)} className="rounded-full p-1.5 hover:bg-gray-200">
                        <ShoppingBag size={20} strokeWidth={1}/>
                    </button>
                    <Sheet>
  <SheetTrigger className="block md:hidden rounded-full p-1.5 hover:bg-gray-200">
    <Menu size={20} strokeWidth={1}/>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle className='flex items-center'>
        <Link href='/'>
          <Image src='/logo.png' width={60} height={30} alt='logo'/>
        </Link>
      </SheetTitle>
      <SheetDescription>
        <ul>
            <Accordion type="single" collapsible>
              {
                metadata?.parentCategory.map((category,i)=>(
                  <AccordionItem value={`item-${i}`}>
                    <AccordionTrigger>
                        <Link href={`/category/${category.id}`} className='text-black font-semibold'>{category.name}</Link>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul>
                            {
                              categories?.filter((cat,j)=>cat.parentCategoryId==category.name).map((cat,i)=>(
                                <li className='py-2 text-right' key={i}>
                                    <Link href={`/category/${cat.id}`} className='text-black font-semibold'>{cat.name}</Link>
                                </li>
                              ))
                            }
                        </ul>      
                    </AccordionContent>
                  </AccordionItem>
                ))
              }
              {/* <AccordionItem value="item-1">
                <AccordionTrigger>
                    <Link href='/winter-collection' className='text-black font-semibold'>Winter Collection</Link>
                </AccordionTrigger>
                <AccordionContent>
                    <ul>
                        <li className='py-2 text-right'>
                            <Link href='/category/new-arrivals' className='text-black font-semibold'>New Arrivals</Link>
                        </li>
                        <li className='py-2 text-right'>
                            <Link href='/category/winter-accessories' className='text-black font-semibold'>Winter Accessories</Link>
                        </li>
                        <li className='py-2 text-right'>
                            <Link href='/category/outerwear' className='text-black font-semibold'>Outerwear</Link>
                        </li>
                        <li className='py-2 text-right'>
                            <Link href='/category/knitwear' className='text-black font-semibold'>Knitwear</Link>
                        </li>
                    </ul>      
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                    <Link href='/men' className='text-black font-semibold'>Men</Link>
                </AccordionTrigger>
                <AccordionContent>
                    <ul>
                        {components.map((component,i) => (
                            <li className='py-2 text-right' key={i}>
                                <Link href={component.href} className='text-black font-semibold'>{component.title}</Link>
                            </li>
                        ))}
                    </ul>      
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                    <Link href='/women' className='text-black font-semibold'>Women</Link>
                </AccordionTrigger>
                <AccordionContent>
                    <ul>
                        {components.map((component,i) => (
                            <li className='py-2 text-right' key={i}>
                                <Link href={component.href} className='text-black font-semibold'>{component.title}</Link>
                            </li>
                        ))}
                    </ul>      
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                    <Link href='/kids' className='text-black font-semibold'>Kids</Link>
                </AccordionTrigger>
                <AccordionContent>
                    <ul>
                        {components.map((component,i) => (
                            <li className='py-2 text-right' key={i}>
                                <Link href={component.href} className='text-black font-semibold'>{component.title}</Link>
                            </li>
                        ))}
                    </ul>      
                </AccordionContent>
              </AccordionItem> */}

            </Accordion>
            
        </ul>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>


            </div>
        </div>
        {/* <SearchContainer/> */}
        
    </div>
  )
}

export default BaseNavbar



const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"