"use client"

import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import Header from '../_components/header';
import Image from 'next/image';
import Link from 'next/link';
import { AuthService } from '@/services/authServices';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try{
      const response = await AuthService.login(email, password)

      if(response.success) {
        localStorage.setItem('token', JSON.stringify(response.token))

        router.push('/home')
      } else {
        console.log('hai')
      }

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
        <div className="w-1/2 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md p-6 rounded-lg">
            <Header />
            <div className="mb-4">
              <label htmlFor="email" className="block text-primaryTextColor font-medium mb-2">Email</label>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-3 text-tertiaryTextColor" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center text-tertiaryTextColor">
                <input type="checkbox" className="mr-2" /> Ingat saya
              </label>
              <a href="#" className="text-primaryColor hover:underline">Lupa Password?</a>
            </div>

            <button type="submit" className="w-full p-2 bg-primaryColor text-secondaryTextColor rounded-md hover:bg-secondaryColor">Sign In</button>

            <button className="flex w-full p-2 bg-backgroundPrimaryColor text-primaryTextColor rounded-md mt-4 items-center justify-center border border-tertiaryTextColor shadow-sm hover:shadow-md transition">
              <FcGoogle className="mr-2 text-2xl" />
              Sign in with Google
            </button>

            <p className="mt-4 text-tertiaryTextColor text-sm text-center">Tidak punya akun? <Link href="/register" className="text-primaryColor hover:underline">Sign Up!</Link></p>
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

export default Login;
