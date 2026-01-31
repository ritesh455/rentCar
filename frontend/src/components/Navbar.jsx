import { useState } from "react"
import "../index.css" 

const navItems = ["Home", "About", "Contact"]

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="flex justify-between items-center px-4 h-14">
        <h1 className="text-xl font-bold">RentCar</h1>

        {/* Desktop menu :- For Desktop navbar   */}
        <ul className="hidden md:flex gap-10 mr-10">
          {navItems.map(item => (
            <li
              key={item}
              className="cursor-pointer hover:text-blue-500"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Mobile button :- Here md Hide this element when the screen width is 768px or larger */}
        <button
          className="md:hidden "
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu :- If both are true then show navbar in mobile*/}
      {open && (
        <ul className="md:hidden bg-gray-100 p-4 space-y-2">
          {navItems.map(item => (
            <li
              key={item}
              className="p-2 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

    </nav>
  )
}

export default Navbar
