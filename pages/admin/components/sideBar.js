import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link';

function SideBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 
 


  return (
    <>
      <Button variant="light" onClick={handleShow} className='admin_sidebar_button'>
    <img src='/menu-icon.png' style={{width:30}}></img>
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        <Link href="/"><img
          className="site-logo"
          src="/uploads/images/site-logo.png"
          alt="Third slide"
        /></Link>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {/*  <Link href="/admin" onClick={handleClose} >Admin Page</Link>
         <Link href="/admin/menus"  onClick={handleClose}>Add Menus</Link>
         <Link href="/admin/products" onClick={handleClose}>Add Products</Link> */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;