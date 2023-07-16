import React from 'react'
import {  Route,Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Category from '../pages/Category'
function Nav() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Category />}></Route>
        <Route path='/:categoryId' element={<Category />}></Route>
      </Routes>
    </div>
  )
}

export default Nav
