"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const CardConsultation = () => {
  const [status, setStatus] = useState<"Menunggu Konsultasi" | "Selesai" | "Dibatalkan">("Menunggu Konsultasi");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selesai":
        return "text-green-600";
      case "Dibatalkan":
        return "text-red-600";
      case "Menunggu Konsultasi":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const handleCancel = () => {
    const confirmCancel = confirm("Apakah kamu yakin ingin membatalkan konsultasi?");
    if (confirmCancel) {
      setStatus("Dibatalkan");
    }
  };

  return (
    <div className="flex flex-col bg-transparent px-4 py-4 rounded-xl w-full shadow-md gap-4">
      <div className="flex gap-4 items-center">
        <Image
          width={150}
          height={150}
          src={"/Images/FAQ.png"}
          alt="Foto Psikolog"
          className="object-cover size-28 rounded-xl"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-lg font-semibold text-gray-800">Dr. Alfonsus Nortus</h1>
          <p className="text-sm text-gray-600">Psikolog Klinis Dewasa</p>
          <p className="text-sm text-yellow-500">⭐ 4.9 (120 ulasan)</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 text-sm text-gray-700">
        <h3 className="text-base font-semibold text-primaryTextColor">Detail Konsultasi</h3>
        <p><span className="font-medium text-primaryTextColor">Tanggal:</span> Senin, 15 April 2025</p>
        <p><span className="font-medium text-primaryTextColor">Waktu:</span> 10:00 - 11:00 WIB</p>
        <p><span className="font-medium text-primaryTextColor">Metode:</span> Online (Video Call)</p>
        <p>
          <span className="font-medium text-primaryTextColor">Status:</span>{" "}
          <span className={getStatusColor(status)}>{status}</span>
        </p>
      </div>

      {status === "Menunggu Konsultasi" && (
        <div className="flex gap-2 justify-end md:justify-start mt-2">
          <Button variant="destructive" className="text-sm hover:scale-105 transition duration-150 ease-in-out" onClick={handleCancel}>
            Batalkan Konsultasi
          </Button>
        </div>
      )}

      {status === "Selesai" && (
        <div className="flex justify-end">
          <Button variant="secondary" className="text-sm">
            Lihat Rekap Konsultasi
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardConsultation;
