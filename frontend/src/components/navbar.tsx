"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { jwtDecode } from "jwt-decode";
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/navigation";

const NavigationBar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [decoded, setDecoded] = useState(null);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.5] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setDecoded(jwtDecode(token));
        } catch (error) {
          console.error("Token tidak valid", error);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const options = [
    { name: "Konsulin", path: "/concultation" },
    { name: "Tanyain", path: "/chatbot" },
    { name: "Ajarin", path: "/ajarin" },
    { name: "Dopamin", path: "/dopamin" },
    { name: "Terapiin", path: "/terapiin" },
    { name: "Emosiin", path: "/emosiin" },
    { name: "Lihat Semuanya", path: "/layanan" },
  ];

  const handleSelect = (_: { name: string; path: string }) => {
    setDropDown(false);
    console.log(_);
  };

  return (
    <nav className="flex flex-col md:flex-row px-6 md:px-10 md:pt-4 py-2 justify-between items-center relative md:z-[999] md:fixed w-full bg-backgroundPrimaryColor md:bg-transparent md:backdrop-blur-sm">
      <div className="flex items-center w-full justify-between md:justify-start gap-3">
        <div className="flex gap-4 items-center">
          <Image
            src={"/Images/logo.png"}
            width={60}
            height={60}
            className="cursor-pointer"
            alt="Logo"
            onClick={() => router.push("/")}
          />
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
        {pathname === "/" ? (
          <Link
            className={`${
              activeSection === "home"
                ? "text-primaryColor font-semibold underline"
                : "hover:text-primaryColor"
            } transition-all duration-200 ease-in-out`}
            href={"#home"}
          >
            Beranda
          </Link>
        ) : (
          <Link
            className={`${
              pathname === "/"
                ? "text-primaryColor font-semibold underline"
                : "hover:text-primaryColor transition-colors duration-200"
            }`}
            href={"/"}
          >
            Beranda
          </Link>
        )}
        {pathname === "/" ? (
          <Link
            className={`${
              activeSection === "about"
                ? "text-primaryColor font-semibold underline"
                : "hover:text-primaryColor"
            } transition-all duration-200 ease-in-out`}
            href={"#about"}
          >
            Tentang Kami
          </Link>
        ) : (
          <Link
            className={`${
              pathname === "/tentang-kami"
                ? "text-primaryColor font-semibold underline"
                : "hover:text-primaryColor transition-colors duration-200"
            }`}
            href={"/tentang-kami"}
          >
            Tentang Kami
          </Link>
        )}
        {pathname === "/" ? (
          decoded ? (
            <div className="relative">
              <button
                className={`${
                  activeSection === "services"
                    ? "text-primaryColor font-semibold underline"
                    : "hover:text-primaryColor"
                } flex items-center gap-1 transition-all duration-200 ease-in-out`}
                onClick={() => setDropDown(!dropDown)}
              >
                Layanan <FaChevronDown className="text-sm" />
              </button>
              {dropDown && (
                <ul className="flex flex-col absolute bg-white shadow-md border rounded-md mt-2 w-40 translate-y-7 md:translate-y-0">
                  {options.map((option, index) => (
                    <Link
                      href={option.path}
                      key={index}
                      className={`${
                        pathname === option.path ||
                        pathname.startsWith("/concultation")
                          ? "text-primaryColor font-semibold underline"
                          : "hover:text-primaryColor transition-colors duration-200"
                      } px-4 py-2 cursor-pointer hover:bg-gray-100`}
                      onClick={() => handleSelect(option)}
                    >
                      {option.name}
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <Link
              className={`${
                activeSection === "services"
                  ? "text-primaryColor font-semibold underline"
                  : "hover:text-primaryColor transition-colors duration-200"
              }`}
              href={"#services"}
            >
              Layanan
            </Link>
          )
        ) : (
          <div className="relative">
            <button
              className="flex items-center gap-1 hover:text-primaryColor transition-colors duration-200"
              onClick={() => setDropDown(!dropDown)}
            >
              Layanan <FaChevronDown className="text-sm" />
            </button>
            {dropDown && (
              <ul className="flex flex-col absolute bg-white shadow-md border rounded-md mt-2 w-40 translate-y-7 md:translate-y-0">
                {options.map((option, index) => (
                  <Link
                    href={option.path}
                    key={index}
                    className={`${
                      pathname === option.path ||
                      pathname === "/concultation/:id"
                        ? "text-primaryColor font-semibold underline"
                        : "hover:text-primaryColor transition-colors duration-200"
                    } px-4 py-2 cursor-pointer hover:bg-gray-100`}
                    onClick={() => handleSelect(option)}
                  >
                    {option.name}
                  </Link>
                ))}
              </ul>
            )}
          </div>
        )}
        <Link
          className={`${
            activeSection === "footer"
              ? "text-primaryColor font-semibold underline"
              : "hover:text-primaryColor transition-colors duration-200"
          }`}
          href={"#footer"}
        >
          Kontak
        </Link>
      </div>

      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex gap-x-3 mt-4 md:mt-0 w-full md:w-auto`}
      >
        {decoded ? (
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <Link
              href={"/profile"}
              className="flex w-full items-center justify-between gap-4"
            >
              <div className="flex flex-col">
                <h4 className="font-semibold text-base text-primaryTextColor">
                  Andre Kessler
                </h4>
                <p className="font-thin text-sm text-primaryTextColor">
                  george31@gmail.com
                </p>
              </div>
              <CgProfile className="text-4xl bg-backgroundSecondaryColor rounded-full" />
            </Link>
            <button
              onClick={handleLogout}
              className={`flex items-center transition ease-in-out md:border md:px-2 md:rounded-md md:border-dangerColor text-dangerColor font-semibold hover:underline md:hover:bg-dangerColor md:hover:text-white md:hover:no-underline`}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              href={"/login"}
              className="pointer rounded-lg bg-primaryColor text-backgroundPrimaryColor px-6 md:px-10 py-2 w-full md:w-auto text-center hover:bg-primaryColor/90 transition-colors duration-200"
            >
              Masuk
            </Link>
            <Link
              href={"/register"}
              className="pointer rounded-lg bg-transparent text-primaryColor border-primaryColor px-6 md:px-10 py-2 border-2 w-full md:w-auto text-center hover:bg-primaryColor/10 transition-colors duration-200"
            >
              Daftar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
