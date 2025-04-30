"use client";

import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Header from "../_components/header";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { loginSchema } from "@/validations/user";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./_components/input";

type LoginSchemaType = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginSchemaType) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/user/login`,
        data
      );

      if (response.status === 200) {
        const token = response.data.data.access_token;
        localStorage.setItem("token", token);
        setSuccessMessage("Login berhasil");
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Terjadi kesalahan saat login");
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

          <Input
            id="email"
            label="Email"
            placeholder="Masukkan email anda"
            icon={FaEnvelope}
            login={register("email")}
            error={errors.email?.message}
          />

          <Input
            id="password"
            label="Password"
            placeholder="********"
            icon={FaLock}
            type={showPassword ? "text" : "password"}
            login={register("password")}
            error={errors.password?.message}
            rightIcon={showPassword ? FaEyeSlash : FaEye}
            onRightIconClick={togglePasswordVisibility}
          />

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

          <button className="flex w-full p-2 bg-backgroundPrimaryColor text-primaryTextColor rounded-md mt-4 items-center justify-center border border-tertiaryTextColor shadow-sm hover:shadow-md transition">
            <FcGoogle className="mr-2 text-2xl" />
            Masuk dengan Google
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
                href="/login-admin"
                className="text-primaryColor hover:underline"
              >
                Admin
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

export default Login;
