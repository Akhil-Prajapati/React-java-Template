import React, { useState } from 'react'

function Header() {
  const [changeHeading, setChangeHeading] = useState('CURD')
  return (
    <div>
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold" onMouseOver={() => { setChangeHeading('Its Not Crud 😎') }}>{changeHeading}</h1>
          <nav className="space-x-4">
            <a href="#" className="text-white hover:text-gray-300">Home</a>
            <a href="#" className="text-white hover:text-gray-300">About</a>
            <a href="#" className="text-white hover:text-gray-300">Services</a>
            <a href="#" className="text-white hover:text-gray-300">Contact</a>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Header
