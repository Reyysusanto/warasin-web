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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/validations/user";
import Input from "./_components/input";

type RegisterSchemaType = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: RegisterSchemaType) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/user/register`,
        data
      );

      if (response.status === 200) {
        alert("Registrasi berhasil");
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Terjadi kesalahan saat registrasi");
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
            id="name"
            label="Nama"
            placeholder="Masukkan nama anda"
            icon={FaUserAlt}
            register={register("name")}
            error={errors.name?.message}
          />
          <Input
            id="email"
            label="Email"
            placeholder="Masukkan email anda"
            icon={FaEnvelope}
            register={register("email")}
            error={errors.email?.message}
          />
          <Input
            id="password"
            label="Password"
            placeholder="********"
            icon={FaLock}
            type={showPassword ? "text" : "password"}
            register={register("password")}
            error={errors.password?.message}
            rightIcon={showPassword ? FaEyeSlash : FaEye}
            onRightIconClick={togglePasswordVisibility}
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            placeholder="********"
            icon={FaLock}
            type="password"
            register={register("password")}
            error={errors.password?.message}
            rightIcon={showPassword ? FaEyeSlash : FaEye}
            onRightIconClick={togglePasswordVisibility}
          />

          <button
            type="submit"
            className="w-full p-2 bg-primaryColor text-secondaryTextColor rounded-md hover:bg-secondaryColor transition duration-300"
          >
            Daftar
          </button>

          <button className="flex w-full p-2 bg-backgroundPrimaryColor text-primaryTextColor rounded-md mt-4 items-center justify-center border border-tertiaryTextColor shadow-sm hover:shadow-md transition duration-300">
            <FcGoogle className="mr-2 text-2xl" />
            Daftar dengan Google
          </button>

          <p className="mt-4 text-tertiaryTextColor text-sm text-center">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-primaryColor hover:underline">
              Masuk
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
