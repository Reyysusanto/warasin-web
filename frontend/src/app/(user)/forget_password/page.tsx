"use client";

import React, { useState } from "react";
import Logo from "@/components/logo";
import { FaEnvelope } from "react-icons/fa";
// import axios from "axios";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
//   const [successMessage, setSuccessMessage] = useState<string>("");

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setErrorMessage("");
  //     setSuccessMessage("");

  //     console.log("Mengirim data:", { name, email, password });

  //     try {
  //       const response = await axios.post(
  //         `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
  //         {
  //           email,
  //           password,
  //         }
  //       );

  //       if (response.status === 200) {
  //         setSuccessMessage("Login berhasil");
  //       }
  //       console.log(response)
  //       // router.push("/");
  //     } catch (err) {
  //       setErrorMessage("Terjadi kesalahan saat login");
  //     }
  //   };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-tr from-[#ECEEFF] to-white">
      <div className="w-full flex items-center justify-center">
        <form className="flex flex-col w-full max-w-md p-6 rounded-lg gap-6">
          <div>
            <div className="flex flex-col justify-center items-center gap-4">
              <Logo size="100px" ukuranTeks="2xl" />
              <h1 className="text-4xl text-primaryTextColor font-bold">
                GANTI PASSWORD
              </h1>
              <p className="text-sm text-tertiaryTextColor font-light md:font-normal text-center">
                Jika kamu lupa kata sandi, tidak perlu khawatir. Sederhananya,
                berikan kami alamat email kamu, dan kami akan mengirimkan email
                berisi tautan untuk mereset kata sandi sehingga kamu dapat
                membuat yang baru.
              </p>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}
            {/* {successMessage && (
              <p className="text-green-500 text-center mb-4">
                {successMessage}
              </p>
            )} */}
          </div>

          <div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-primaryTextColor font-medium mb-2"
              >
                Email
              </label>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-3 text-primaryColor" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email anda"
                  className="w-full pl-10 p-2 bg-transparent border-2 border-primaryColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
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

            <button
              type="submit"
              className="w-full p-2 bg-primaryColor text-secondaryTextColor rounded-md hover:bg-secondaryColor"
            >
              Reset Password Link
            </button>

            <button className="flex w-full p-2 bg-transparent text-primaryColor rounded-md mt-4 items-center justify-center border-2 border-primaryColor shadow-sm hover:shadow-md transition font-medium">
              Kembali
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
