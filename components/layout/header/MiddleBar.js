
import Navbar from 'react-bootstrap/Navbar';

import React, { useState } from 'react';
import Link from 'next/link';
import SearchComponent from './SearchBar';
import GoogleTranslate from '../header/GoogleTranslate';
import MobileMenuBar from '../header/mobilenav'
import Image from 'next/image';

function Header() {
  

  return (
    <>
    
    <Navbar collapseOnSelect expand="lg" variant="dark"  className="header_nav topbar hide_on_small ">
      <div className="container-fluid">
       <div className="row">
        <div className="logo_bar col col-sm-6 col-md-2 col-lg-2">
        <Link href="/"><Image  width={200} height={100}
           className="site-logo"
          src="/uploads/images/site-logo3.png"
          alt="site_logo" priority
        /></Link>
        </div>
         <div className="col col-sm-6 col-md-6 col-lg-6 searchBar">
        <SearchComponent  />
        </div>

        <div className="col col-sm-6 col-md-2 col-lg-2 social-icons hide_on_mobile">
        <a href="https://www.linkedin.com/in/global-indians-info-b87034259/?originalSubdomain=in" target="blank"> <Image  width={30} height = {30} src="/social/icons8-linkedin.svg" alt="linkedin" /></a>
              <a href="https://www.facebook.com/groups/globalindiansinfo/" target="blank"> <Image  width={30} height = {30} src="/social/icons8-facebook.svg" alt="fb" /></a>
              <a href="https://www.instagram.com/global_indian_official/" target="blank"><Image  width={30} height = {30} src="/social/icons8-instagram.svg" alt="insta" /></a>
              <a href="https://twitter.com/globalindian_in" target="blank"><Image  width={30} height = {30} src="/social/icons8-twitter.svg" alt="twitter"/></a>
              
            
            
        </div>
       
        
       <div className="col col-sm-6 col-md-2 col-lg-2 google_translate hide_on_mobile">
        <GoogleTranslate/> 
      </div>
        </div>
      </div>
      
       
    </Navbar>


    <div className="container-fluid hide_on_big mt-5 p-2"><div className="row">
        <div className="col-sm-6 logo_bar ">
        <Link href="/"><Image  width={400} height = {400}
          className="site-logo"
          src="/uploads/images/site-logo3.png"
          alt="site_logo"
        /></Link>
        </div>
        <div className="col-sm-6 menu_bar ">
        
        {
      <MobileMenuBar/>
       }
 
        </div>
        </div></div>
     
     </>
  );
}

export default Header;