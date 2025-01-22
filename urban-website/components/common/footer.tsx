"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useGetCategoriesQuery } from '../api/category/category.api'

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
    <div className='mt-5 md:px-20 px-5 border-t border-border grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 pt-10 gap-10'>
      <div className="">
        <p className="text-primary font-semibold text-sm">Popular Categories</p>
        <ul className='[&>*]:my-2 text-xs font-medium text-gray-500 mt-7'>
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
      <div className="md:col-span-2">
      <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F61571611291078&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" className="w-full h-[200px]" style={{border:'none',overflow:'hidden'}} scrolling="no" frameBorder={0} allowFullScreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
      </div>
      <p className="col-span-1 md:col-span-3 lg:col-span-5 mt-3 text-xs text-gray-600">
        © {new Date().getFullYear()} Urban. All Rights Reserved 
      </p>
    </div>
  )
}

export default Footer