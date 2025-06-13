"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuthRedirectLoginAdmin = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login-admin");
    }
  }, [router]);
};

export const useAuthRedirectLoginPsycholog = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login-psycholog");
    }
  }, [router]);
};

export const useAuthRedirectLogin = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
};

export const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router]);
};
