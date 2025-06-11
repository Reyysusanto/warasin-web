"use client";

import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "../_components/header";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/validations/user";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./_components/input";
import { loginService } from "@/services/login";
import { showErrorAlert, showSuccessAlert } from "@/components/alert";

type LoginSchemaType = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
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

  useEffect(() => {
    if (errorMessage) {
      showErrorAlert("Login Gagal", errorMessage);
    }
  }, [errorMessage]);

  const onSubmit = async (data: LoginSchemaType) => {
    setErrorMessage("");

    try {
      const success = await loginService(data);
      if (success) {
        await showSuccessAlert("Login Berhasil", "Selamat datang di Warasin");
        router.push("/");
      } else {
        await showErrorAlert("Login Gagal", errorMessage);
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
            <Link
              href="/forget_password"
              className="text-primaryColor hover:underline"
            >
              Lupa Password?
            </Link>
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
              <span>
                <Link
                  href="/login-admin"
                  className="text-primaryColor hover:underline"
                >
                  Admin
                </Link>
                {" / "}
                <Link
                  href="/login-psycholog"
                  className="text-primaryColor hover:underline"
                >
                  Psycholog
                </Link>
              </span>
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
