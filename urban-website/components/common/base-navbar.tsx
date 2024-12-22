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
  
import React from 'react'
import { cn } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

const components: { title: string; href: string; description: string }[] = [
    {
      "title": "Winter Collection",
      "href": "/winter-collection",
      "description": "Cozy up with our latest winter styles.",
    },
    {
      "title": "New Arrivals",
      "href": "/categories/new-arrivals",
      "description": "Fresh fashion pieces for the season."
    },
    {
      "title": "Winter Accessories",
      "href": "/categories/winter-accessories",
      "description": "Scarves, gloves, and more to keep you warm."
    },
    {
      "title": "Outerwear",
      "href": "/categories/outerwear",
      "description": "Jackets, coats, and layers for chilly days."
    },
    {
      "title": "Knitwear",
      "href": "/categories/knitwear",
      "description": "Comfortable and stylish sweaters for winter."
    }
  ]
  


interface BaseNavbarProps {
    open:boolean
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
    sheet:boolean
    setSheet:React.Dispatch<React.SetStateAction<boolean>>
}

const BaseNavbar = (props:BaseNavbarProps) => {
  return (
    <div className='w-full bg-white px-5 md:px-20 py-3 flex justify-between items-center'>
        <Image src='/logo.PNG' width={60} height={30} alt='logo'/>
        
    <NavigationMenu className='hidden md:flex md:col-span-4'>
      <NavigationMenuList>
      <NavigationMenuItem>
  <NavigationMenuTrigger>Shop Fashion</NavigationMenuTrigger>
  <NavigationMenuContent>
    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
      <li className="row-span-3">
        <NavigationMenuLink asChild>
          <div className="h-full w-full relative bg-[url('/products/hoodie-3.png')] bg-cover rounded-md">
            <Link
              className="flex h-full absolute top-0 left-0 right-0 bottom-0 w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-transparent to-black p-6 no-underline outline-none focus:shadow-md"
              href="/winter-collection"
            >
              <div className="mb-2 mt-4 text-lg font-medium text-white">
                Winter Collection
              </div>
              <p className="text-sm leading-tight text-gray-200">
                Cozy up with our latest winter styles.
              </p>
            </Link>
          </div>
        </NavigationMenuLink>
      </li>
      <ListItem href="/categories/new-arrivals" title="New Arrivals">
        Fresh fashion pieces for the season.
      </ListItem>
      <ListItem href="/categories/winter-accessories" title="Winter Accessories">
        Scarves, gloves, and more to keep you warm.
      </ListItem>
      <ListItem href="/categories/outerwear" title="Outerwear">
        Jackets, coats, and layers for chilly days.
      </ListItem>
    </ul>
  </NavigationMenuContent>
</NavigationMenuItem>


        <NavigationMenuItem>
          <NavigationMenuTrigger>Men</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Women</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Kids</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
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
                    <Link href="/wishlist" className="rounded-full p-1.5 hover:bg-gray-200">
                        <Heart size={20} strokeWidth={1}/>
                    </Link>
                    <button className="block md:hidden rounded-full p-1.5 hover:bg-gray-200">
                        <User size={20} strokeWidth={1}/>
                    </button>
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
        <Image src='/logo.PNG' width={60} height={30} alt='logo'/>
      </SheetTitle>
      <SheetDescription>
        <ul>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                    <Link href='/winter-collection' className='text-black font-semibold'>Winter Collection</Link>
                </AccordionTrigger>
                <AccordionContent>
                    <ul>
                        <li className='py-2 text-right'>
                            <Link href='/categories/new-arrivals' className='text-black font-semibold'>New Arrivals</Link>
                        </li>
                        <li className='py-2 text-right'>
                            <Link href='/categories/winter-accessories' className='text-black font-semibold'>Winter Accessories</Link>
                        </li>
                        <li className='py-2 text-right'>
                            <Link href='/categories/outerwear' className='text-black font-semibold'>Outerwear</Link>
                        </li>
                        <li className='py-2 text-right'>
                            <Link href='/categories/knitwear' className='text-black font-semibold'>Knitwear</Link>
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
              </AccordionItem>

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