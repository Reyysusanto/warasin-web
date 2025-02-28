"use client"

import React, { useState } from 'react';
import { FaUserAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import Header from '../_components/header';
import Image from 'next/image';
import Link from 'next/link';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-1/2 flex items-center justify-center">
        <form className="w-full max-w-md p-6 rounded-lg">
          <Header />
          <div className="mb-4">
            <label htmlFor="nama" className="block text-primaryTextColor font-medium mb-2">Nama</label>
            <div className="relative flex items-center">
              <FaUserAlt className="absolute left-3 text-tertiaryTextColor" />
              <input
                type="text"
                id="nama"
                placeholder="Masukkan nama anda"
                className="w-full pl-10 p-2 border border-tertiaryTextColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-primaryTextColor font-medium mb-2">Email</label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-3 text-tertiaryTextColor" />
              <input
                type="email"
                id="email"
                placeholder="Masukkan email anda"
                className="w-full pl-10 p-2 border border-tertiaryTextColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-primaryTextColor font-medium mb-1">Password</label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-3 text-tertiaryTextColor" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="***********"
                className="w-full pl-10 p-2 border border-tertiaryTextColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 text-tertiaryTextColor focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full p-2 bg-primaryColor text-secondaryTextColor rounded-md hover:bg-secondaryColor">Sign Up</button>

          <button className="flex w-full p-2 bg-backgroundPrimaryColor text-primaryTextColor rounded-md mt-4 items-center justify-center border border-tertiaryTextColor shadow-sm hover:shadow-md transition">
            <FcGoogle className="mr-2 text-2xl" />
            Sign up with Google
          </button>

          <p className="mt-4 text-tertiaryTextColor text-sm text-center">Sudah punya akun? <Link href="/login" className="text-primaryColor hover:underline">Sign In!</Link></p>
        </form>
      </div>

      <div className="w-1/2 hidden md:block">
        <Image
          className="w-full h-full object-cover"
          src={'/Images/auth.png'}
          width={600}
          height={600}
          alt='auth'
        />
      </div>
    </div>
  );
};

export default Register;
