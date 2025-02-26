"use client"

import Experience from "@/components/experience";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { TbCalendarCheck } from "react-icons/tb";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-backgroundPrimaryColor min-h-screen overflow-hidden">
      <nav className="flex flex-col md:flex-row px-4 md:gap-x-2 py-4 justify-between items-center relative">
        <div className="flex items-center w-full justify-between md:justify-start">
          <div className="flex gap-4 items-center">
            <Image src={'/Images/logo.png'} width={60} height={60} alt="Logo" />
            <div className="flex flex-col">
              <h3 className="text-primaryColor text-xl font-bold">Warasin</h3>
              <p className="text-tertiaryTextColor text-sm font-semibold">Mental Health and Recovery Center</p>
            </div>
          </div>

          <button
            className="md:hidden text-primaryTextColor focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-4 md:gap-10 text-primaryTextColor font-normal text-base mt-4 md:mt-0 w-full bg-backgroundPrimaryColor md:bg-transparent z-10`}
        >
          <Link className="text-primaryColor underline font-semibold" href={'/'}>Home</Link>
          <Link className="hover:text-primaryColor" href={''}>About</Link>
          <Link className="hover:text-primaryColor" href={''}>Services</Link>
          <Link className="hover:text-primaryColor" href={''}>Our Team</Link>
        </div>

        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex gap-x-3 mt-4 md:mt-0 w-full md:w-auto`}
        >
          <Button className="rounded-lg bg-primaryColor text-backgroundPrimaryColor px-6 md:px-10 w-full md:w-auto">Login</Button>
          <Button className="rounded-lg bg-transparent text-primaryColor border-primaryColor px-6 md:px-10 border-2 w-full md:w-auto">Register</Button>
        </div>
      </nav>

      <section className="flex flex-col md:flex-row px-4 md:px-10 py-8 md:py-16 items-center justify-between">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-primaryTextColor leading-tight">
            Brighter Days <span className="text-primaryColor">Mental Health</span> and Recovery Center
          </h1>
          <p className="text-primaryTextColor mt-4 text-base md:text-lg">
            We provide mental health services by finding a list of reputable psychologists throughout Indonesia
          </p>
          
          <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Button className="bg-primaryColor text-white px-6 py-4 md:py-5 rounded-lg text-base font-normal">Our Services</Button>
            <Button className="border-primaryColor text-primaryColor border-2 px-6 py-4 md:py-5 rounded-lg items-center gap-2">
              <TbCalendarCheck className="text-3xl" />
              <p className="text-base font-normal">Book an Appointment</p>
            </Button>
          </div>

          <div className="mt-10 flex flex-col md:flex-row gap-6 md:gap-10 text-primaryTextColor text-xl font-semibold justify-center md:justify-start">
            <Experience 
              count={800}
              detail="Happy customers"
            />
            <Experience 
              count={10}
              detail="Years of experience"
            />
            <Experience 
              count={5}
              detail="Award winning"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative mt-8 md:mt-0">
          <Image 
            className="absolute top-1/2 left-2/3 transform -translate-x-1/2 object-cover -translate-y-1/2 z-0" 
            src={'/Images/bg_effect.png'} 
            width={800} 
            height={600} 
            alt="BG effect"
          />
          
          <Image 
            className="relative z-10 w-[80%] md:w-[800px] h-auto translate-x-10" 
            src={'/Images/concultation.png'} 
            width={700} 
            height={600} 
            alt="Doctor and Patient" 
          />
        </div>
      </section>
    </div>
  );
}