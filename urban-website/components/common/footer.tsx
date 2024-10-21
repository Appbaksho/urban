"use client"
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='mt-5 md:px-20 px-5 border-t border-border grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 pt-10 gap-10'>
      <div className="">
        <p className="text-primary font-semibold text-sm">Popular Categories</p>
        <ul className='[&>*]:my-2 text-xs font-medium text-gray-500 mt-7'>
          <li>
            <Link href='/'>
              Hoodies
            </Link>
          </li>
          <li>
            <Link href='/'>
              Sweatshirts
            </Link>
          </li>
          <li>
            <Link href='/'>
              Full Sleves
            </Link>
          </li>
          <li>
            <Link href='/'>
              Hoodies
            </Link>
          </li>
          <li>
            <Link href='/'>
              Hoodies
            </Link>
          </li>
        </ul>
      </div>
      <div className="">
        <p className="text-primary font-semibold text-sm">Customer Zone</p>
        <ul className='[&>*]:my-2 text-xs font-medium text-gray-500 mt-7'>
          <li>
            <Link href='/'>
              Track Order
            </Link>
          </li>
          <li>
            <Link href='/'>
              Login
            </Link>
          </li>
          <li>
            <Link href='/'>
              Register
            </Link>
          </li>
          <li>
            <Link href='/'>
              My Orders
            </Link>
          </li>
          <li>
            <Link href='/'>
              My Returns
            </Link>
          </li>
        </ul>
      </div>
      <div className="">
        <p className="text-primary font-semibold text-sm">Policies</p>
        <ul className='[&>*]:my-2 text-xs font-medium text-gray-500 mt-7'>
          <li>
            <Link href='/'>
              Customer Policy
            </Link>
          </li>
          <li>
            <Link href='/'>
              Terms of Service
            </Link>
          </li>
          <li>
            <Link href='/'>
              Refund Policy
            </Link>
          </li>
          <li>
            <Link href='/'>
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
      <div className="md:col-span-2">

      </div>
      <p className="col-span-1 md:cwol-span-3 lg:col-span-5 mt-3 text-xs text-gray-600">
        © {new Date().getFullYear()} Urban. All Rights Reserved 
      </p>
    </div>
  )
}

export default Footer