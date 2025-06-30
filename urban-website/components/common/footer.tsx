"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useGetCategoriesQuery } from '../api/category/category.api'
import Image from 'next/image'

const Footer = () => {
  const {
    data: categories,
    isError,
    error,
  } = useGetCategoriesQuery()

  useEffect(() => {
    if (isError) {
      console.error('Error fetching categories')
      console.error(error)
    }
  }, [isError])
  return (
    <div className='mt-5 md:px-20 px-5 border-t border-border grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 pt-10 gap-5'>
     
      <div className="">
        <p className="text-primary font-semibold text-sm">Popular Categories</p>
        <ul className='[&>*]:my-1 grid grid-cols-2 text-xs font-medium text-gray-500 mt-7'>
          {
            categories?.slice(0,5).map((category) => (
              <li key={category.id}>
                <Link href={`/category/${category.id}`}>
                  {category.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="">
        <p className="text-primary font-semibold text-sm">Customer Zone</p>
        <ul className='[&>*]:my-2 text-xs font-medium text-gray-500 mt-7'>
          <li>
            <Link href='/user/orders'>
              Track Order
            </Link>
          </li>
          <li>
            <Link href='/auth/login'>
              Login
            </Link>
          </li>
          <li>
            <Link href='/auth/register'>
              Register
            </Link>
          </li>
          <li>
            <Link href='/user/orders'>
              My Orders
            </Link>
          </li>
          
        </ul>
      </div>
      <div className="">
        <p className="text-primary font-semibold text-sm">Policies</p>
        <ul className='[&>*]:my-2 text-xs font-medium text-gray-500 mt-7'>
          <li>
            <Link href='#'>
              Customer Policy
            </Link>
          </li>
          <li>
            <Link href='#'>
              Terms of Service
            </Link>
          </li>
          <li>
            <Link href='#'>
              Refund Policy
            </Link>
          </li>
          <li>
            <Link href='#'>
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
      <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F61571611291078&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" className="w-full" style={{border:'none',overflow:'hidden'}} scrolling="no" frameBorder={0} allowFullScreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
      <div className="">
      <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61575584252281%26mibextid%3DwwXIfr&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" className="w-full" style={{border:'none',overflow:'hidden'}} scrolling="no"  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
      <a href="https://wa.me/01772642172" className="bg-primary/10 rounded-md p-2 flex items-center gap-2 justify-end">
      <span className="text-xs">Whatsapp</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height={20}>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
      <span className='font-semibold'>01772642172</span>
      </a>
      </div>
      <p className="col-span-1 md:col-span-3 lg:col-span-5 mt-3 text-xs text-gray-600">
        © {new Date().getFullYear()} Urban. All Rights Reserved 
      </p>
    </div>
  )
}

export default Footer