import Experience from "@/components/experience";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { TbCalendarCheck } from "react-icons/tb";

export default function Home() {
  return (
    <div className="bg-backgroundPrimaryColor min-h-screen overflow-hidden">
      <nav className="flex px-10 py-4 justify-between items-center">
        <div className="flex gap-4">
          <Image src={'/Images/logo.png'} width={60} height={60} alt="Logo" />
          <div className="flex flex-col">
            <h3 className="text-primaryColor text-xl font-bold">Warasin</h3>
            <p className="text-tertiaryTextColor text-sm font-semibold">Mental Health and Recovery Center</p>
          </div>
        </div>

        <div className="flex gap-10 text-primaryTextColor font-normal text-base">
          <Link className="text-primaryColor underline font-semibold" href={''}>Home</Link>
          <Link href={''}>About</Link>
          <Link href={''}>Services</Link>
          <Link href={''}>Our Team</Link>
        </div>

        <div className="flex gap-x-3">
          <Button className="rounded-lg bg-primaryColor text-backgroundPrimaryColor px-10">Login</Button>
          <Button className="rounded-lg bg-transparent text-primaryColor border-primaryColor px-10 border-2">Register</Button>
        </div>
      </nav>

      <section className="flex px-10 py-16 items-center justify-between">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold text-primaryTextColor leading-tight">
            Brighter Days <span className="text-primaryColor">Mental Health</span> and Recovery Center
          </h1>
          <p className="text-primaryTextColor mt-4 text-lg">
            We provide mental health services by finding a list of reputable psychologists throughout Indonesia
          </p>
          
          <div className="mt-6 flex gap-4">
            <Button className="bg-primaryColor text-white px-6 py-5 rounded-lg text-base font-normal">Our Services</Button>
            <Button className="border-primaryColor text-primaryColor border-2 px-6 py-5 rounded-lg items-center gap-2">
              <TbCalendarCheck className="text-3xl" />
              <p className="text-base font-normal">Book an Appointment</p>
            </Button>
          </div>

          <div className="mt-10 flex gap-10 text-primaryTextColor text-xl font-semibold">
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

        <div className="w-1/2 flex justify-end relative">
          <Image 
            className="absolute top-1/2 left-2/3 transform -translate-x-1/2 object-cover -translate-y-1/2 z-0" 
            src={'/Images/bg_effect.png'} 
            width={800} 
            height={600} 
            alt="BG effect"
          />
          
          <Image 
            className="relative z-10" 
            src={'/Images/concultation.png'} 
            width={500} 
            height={400} 
            alt="Doctor and Patient" 
          />
        </div>
      </section>
    </div>
  );
}
