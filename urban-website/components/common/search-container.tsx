import gsap from 'gsap'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { Input } from '../ui/input'

const SearchContainer = () => {
    const container = useRef(null)
    const logo = useRef(null)
    const items = useRef(null)
    const search = useRef(null)
    const close = useRef(null)
    const input = useRef(null)
    const backdrop = useRef(null)

    useEffect(() => {
      if(backdrop){
        gsap.fromTo(backdrop.current, {opacity:0,ease:'power4.inOut'}, {opacity:1, duration:0.3}).then(()=>{
            gsap.fromTo(container.current, {marginLeft:'100%', ease:'power4.inOut'}, {marginLeft:0, duration:0.3}).then(()=>{
                gsap.fromTo(logo.current, {opacity:0,x:20, ease:'expo.inOut'}, {opacity:1,x:0, duration:0.3})
            })
        })
      }
    }, [backdrop])
    

  return (
    <div className='h-full w-full'>
        <div className="absolute bg-black/50 h-full w-full top-0 left-0 right-0 bottom-0" ref={backdrop}></div>
        <div className="fixed top-0 left-0 ml-[100%] right-0 bg-white p-3" ref={container}>
            <div className="grid grid-cols-2 md:grid-cols-5 relative">
            <Image src='/logo.png' width={60} height={30} alt='logo' ref={logo} className='opacity-0'/>
            <Input className='z-50 rounded-full bg-gray-300'/>
            </div>
            
        </div>
    </div>
  )
}

export default SearchContainer