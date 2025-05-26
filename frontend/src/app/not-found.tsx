"use client";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-12 text-center">
      <Image
        src="/Images/not_found.svg"
        alt="404 - Not Found"
        width={300}
        height={300}
        className="mb-6 animate-bounce-slow"
      />
      <h1 className="text-3xl font-bold text-primaryColor mb-2">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6 max-w-md">
        The page you are looking for doesnt exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primaryColor text-white rounded-xl shadow-md hover:bg-opacity-90 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
