"use client";

import React, { useState } from "react";
import {
  FaUserAlt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Header from "../_components/header";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    console.log("Mengirim data:", { name, email, password });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        {
          name,
          email,
          password,
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Registrasi berhasil");
      }
      router.push("/login");
    } catch (err) {
      setErrorMessage("Terjadi kesalahan saat registrasi");
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 rounded-lg"
        >
          <Header />
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-center mb-4">{successMessage}</p>
          )}
          <div className="mb-3">
            <label
              htmlFor="nama"
              className="block text-primaryTextColor font-medium mb-2"
            >
              Nama
            </label>
            <div className="relative flex items-center">
              <FaUserAlt className="absolute left-3 text-tertiaryTextColor" />
              <input
                type="text"
                id="nama"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama anda"
                className="w-full pl-10 p-2 border border-tertiaryTextColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
            <div className="flex justify-center">
              {name.length <= 7 && name != "" && (
                <p className="text-sm text-dangerColor">
                  Nama minimal harus 8 karakter!
                </p>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-primaryTextColor font-medium mb-2"
            >
              Email
            </label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-3 text-tertiaryTextColor" />
              <input
                type="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email anda"
                className="w-full pl-10 p-2 border border-tertiaryTextColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
            <div className="flex justify-center">
              {!isValidEmail(email) && email != "" && (
                <p className="text-sm text-dangerColor">
                  Tolong masukkan email dengan benar!
                </p>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-primaryTextColor font-medium mb-1"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-3 text-tertiaryTextColor" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="***********"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-2 border border-tertiaryTextColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
            <div className="flex justify-center">
              {password.length <= 7 && password != "" && (
                <p className="text-sm text-dangerColor">Password minimal harus 8 karakter!</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 text-tertiaryTextColor focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <button
            type="submit"
            className="w-full p-2 bg-primaryColor text-secondaryTextColor rounded-md hover:bg-secondaryColor transition duration-300"
          >
            Sign Up
          </button>

          <button className="flex w-full p-2 bg-backgroundPrimaryColor text-primaryTextColor rounded-md mt-4 items-center justify-center border border-tertiaryTextColor shadow-sm hover:shadow-md transition duration-300">
            <FcGoogle className="mr-2 text-2xl" />
            Sign up with Google
          </button>

          <p className="mt-4 text-tertiaryTextColor text-sm text-center">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-primaryColor hover:underline">
              Sign In!
            </Link>
          </p>
        </form>
      </div>

      <div className="w-full md:w-1/2 hidden md:block">
        <Image
          className="w-full h-full object-cover"
          src={"/Images/auth.png"}
          width={600}
          height={600}
          alt="auth"
          priority
        />
      </div>
    </div>
  );
};

export default RegisterPage;
