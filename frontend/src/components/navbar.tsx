"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 bg-white shadow-md w-full">
      <div className="flex items-center gap-4">
        <Image src={"/Images/logo.png"} width={50} height={50} alt="Logo" />
        <div className="flex flex-col">
          <h3 className="text-primaryColor text-lg md:text-xl font-bold">Warasin</h3>
          <p className="text-tertiaryTextColor text-xs md:text-sm font-semibold">Mental Health and Recovery Center</p>
        </div>
      </div>

      <div className="hidden md:flex gap-8 text-primaryTextColor font-medium">
        <Link className="text-primaryColor underline" href={"#"}>Home</Link>
        <Link href={"#"}>About</Link>
        <Link href={"#"}>Services</Link>
        <Link href={"#"}>Our Team</Link>
      </div>

      <button className="md:hidden text-primaryColor text-2xl" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 md:hidden">
          <Link className="text-primaryColor text-lg" href={"#"}>Home</Link>
          <Link className="text-primaryTextColor text-lg" href={"#"}>About</Link>
          <Link className="text-primaryTextColor text-lg" href={"#"}>Services</Link>
          <Link className="text-primaryTextColor text-lg" href={"#"}>Our Team</Link>
          <div className="flex gap-x-3">
            <button className="rounded-lg bg-primaryColor text-backgroundPrimaryColor px-6 py-2">Login</button>
            <button className="rounded-lg bg-transparent text-primaryColor border-primaryColor px-6 py-2 border-2">Register</button>
          </div>
        </div>
      )}

      <div className="hidden md:flex gap-x-3">
        <button className="rounded-lg bg-primaryColor text-backgroundPrimaryColor px-6 py-2">Login</button>
        <button className="rounded-lg bg-transparent text-primaryColor border-primaryColor px-6 py-2 border-2">Register</button>
      </div>
    </nav>
  );
};

export default NavigationBar;
