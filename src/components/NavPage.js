import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../pages/Home';
import User from '../pages/User';
import Post from '../pages/Post';


const NavPage = () => {
  return (
    <React.Fragment>
      <section className='p-4'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </section>
    </React.Fragment>
  );
}

export default NavPage