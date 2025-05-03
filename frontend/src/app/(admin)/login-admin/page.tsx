"use client";

import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/app/(user)/_components/header";
import { z } from "zod";
import { LoginAdminSchema } from "@/validations/admin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginAdminService } from "@/services/LoginAdmin";

type LoginAdminSchemaType = z.infer<typeof LoginAdminSchema>;

const LoginDashboard = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: formData,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginAdminSchemaType>({
    resolver: zodResolver(LoginAdminSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginAdminSchemaType) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const successLogin = await LoginAdminService(data);
      if (successLogin) {
        setSuccessMessage("Login admin berhasil");
        router.push("/dashboard/admin");
      } else {
        setErrorMessage("Login admin gagal");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Terjadi kesalahan yang tidak diketahui");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
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
                {...formData("email")}
                placeholder="Masukkan email anda"
                className="w-full pl-10 p-2 border border-tertiaryTextColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
            <div className="flex justify-center">
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
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
                {...formData("password")}
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
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
              <Link href="/login" className="text-primaryColor hover:underline">
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
