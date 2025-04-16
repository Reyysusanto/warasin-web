"use client";

import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/app/(auth)/_components/header";

const LoginDashboard = () => {
  const router = useRouter();
  const { login } = useAuth();
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

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        // console.log(response.data.data.access_token)
        await login(response.data.data.access_token);
        setSuccessMessage("Login berhasil");
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Terjadi kesalahan saat login");
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
          <div className="mb-4 mt-3">
            <label
              htmlFor="email"
              className="block text-primaryTextColor font-medium mb-2"
            >
              Email Admin
            </label>
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
            <div className="flex justify-center">
              {!isValidEmail(email) && email != "" && (
                <p className="text-sm text-dangerColor">
                  Masukkan email dengan benar!
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-primaryTextColor font-medium mb-1"
            >
              Password Admin
            </label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-3 text-tertiaryTextColor" />
              <input
                type={showPassword ? "text" : "password"}
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
            <div className="flex justify-center">
              {password.length <= 7 && password != "" && (
                <p className="text-sm text-dangerColor">
                  Password minimal harus 8 karakter!
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center text-tertiaryTextColor">
              <input type="checkbox" className="mr-2" /> Ingat saya
            </label>
            <a href="#" className="text-primaryColor hover:underline">
              Lupa Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-primaryColor text-secondaryTextColor rounded-md hover:bg-secondaryColor"
          >
            Masuk
          </button>

          <div className="flex justify-between">
            <p className="mt-4 text-tertiaryTextColor text-sm text-center">
              Tidak punya akun?{" "}
              <Link
                href="/register"
                className="text-primaryColor hover:underline"
              >
                Daftar
              </Link>
            </p>

            <p className="mt-4 text-tertiaryTextColor text-sm text-center">
              Login sebagai{" "}
              <Link
                href="/login"
                className="text-primaryColor hover:underline"
              >
                User
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="w-1/2 hidden md:block">
        <Image
          className="w-full h-full object-cover"
          src={"/Images/auth.png"}
          width={600}
          height={600}
          alt="auth"
        />
      </div>
    </div>
  );
};

export default LoginDashboard;
