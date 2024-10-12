import React from 'react'
import NavbarTop from './nav-top'
import BaseNavbar from './base-navbar'
import TopAnnounce from './top-announce'

const Navbar = () => {
  return (
    <React.Fragment>
        <NavbarTop/>
        <BaseNavbar/>
        <TopAnnounce/>
    </React.Fragment>
  )
}

export default Navbar