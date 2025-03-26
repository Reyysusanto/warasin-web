"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="flex flex-col md:flex-row px-6 md:px-10 pt-4 pb-2 justify-between items-center z-[999] fixed w-full bg-backgroundPrimaryColor">
      <div className="flex items-center w-full justify-between md:justify-start">
        <div className="flex gap-4 items-center">
          <Image src={"/Images/logo.png"} width={60} height={60} alt="Logo" />
          <div className="flex flex-col">
            <h3 className="text-primaryColor text-xl font-bold">Warasin</h3>
            <p className="text-tertiaryTextColor text-sm font-semibold">
              Pusat Pemulihan Kesehatan Mental
            </p>
          </div>
        </div>

        <button
          className="md:hidden text-primaryTextColor focus:outline-none transition-transform duration-200 hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row gap-4 md:gap-10 text-primaryTextColor font-normal text-base mt-4 md:mt-0 w-full md:bg-transparent z-10`}
      >
        <Link
          className={`${
            pathname === "/" ? "text-primaryColor font-semibold underline" : "hover:text-primaryColor transition-colors duration-200"
          }`}
          href={"/"}
        >
          Beranda
        </Link>
        <Link
          className={`${
            pathname === "/tentang-kami" ? "text-primaryColor font-semibold underline" : "hover:text-primaryColor transition-colors duration-200"
          }`}
          href={"/tentang-kami"}
        >
          Tentang Kami
        </Link>
        <Link
          className={`${
            pathname === "/layanan" ? "text-primaryColor font-semibold underline" : "hover:text-primaryColor transition-colors duration-200"
          }`}
          href={"/layanan"}
        >
          Layanan
        </Link>
        <Link
          className={`${
            pathname === "/our-team" ? "text-primaryColor font-semibold underline" : "hover:text-primaryColor transition-colors duration-200"
          }`}
          href={"/our-team"}
        >
          Kontak
        </Link>
      </div>

      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex gap-x-3 mt-4 md:mt-0 w-full md:w-auto`}
      >
        <Link
          href={"/login"}
          className="pointer rounded-lg bg-primaryColor text-backgroundPrimaryColor px-6 md:px-10 py-2 w-full md:w-auto text-center hover:bg-primaryColor/90 transition-colors duration-200"
        >
          Login
        </Link>
        <Link
          href={"/register"}
          className="pointer rounded-lg bg-transparent text-primaryColor border-primaryColor px-6 md:px-10 py-2 border-2 w-full md:w-auto text-center hover:bg-primaryColor/10 transition-colors duration-200"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
