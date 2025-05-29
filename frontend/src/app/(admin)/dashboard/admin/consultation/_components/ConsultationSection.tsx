/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAllConsultationAdminSrevice } from "@/services/dahsboardService/consultation/getAllConsultation";
import { Consulation } from "@/types/consultation";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const ConsultationSection = () => {
  const [consultationList, setConsultationList] = useState<Consulation[]>([]);

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const response = await getAllConsultationAdminSrevice();

        if (response.status === true) {
          setConsultationList(response.data);
        }
      } catch (error: any) {
        alert(`Gagal mengambil data konsultasi ${error}`);
      }
    };

    fetchConsultation();
  }, []);

  return (
    <div className="bg-white text-gray-800 flex flex-col rounded-xl p-6 gap-4 w-full shadow-md">
      <div className="overflow-x-auto rounded-lg">
        <h2 className="text-xl font-semibold mb-6">All Consultation</h2>
        <table className="min-w-full table-auto text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600 border-b border-gray-300">
              <th className="py-3 px-4">Tanggal</th>
              <th className="py-3 px-4">Pasien</th>
              <th className="py-3 px-4">Dokter</th>
              <th className="py-3 px-4">Lokasi</th>
              <th className="py-3 px-4">Rating</th>
            </tr>
          </thead>
          <tbody>
            {consultationList.map((consultation) => (
              <tr
                key={consultation.consul_id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4 flex items-center gap-4 whitespace-nowrap">
                  <p className="font-normal text-primaryTextColor">
                    {dayjs(consultation.consul_date).format("dddd, DD-MM-YYYY")}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-medium text-primaryTextColor">
                    {consultation.user.user_name}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-medium text-primaryTextColor">
                    {consultation.psycholog.psy_name}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-normal flex items-center text-primaryTextColor gap-x-1">
                    <FaStar className="text-yellow-500" />
                    {consultation.consul_rate}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-normal text-primaryTextColor">
                    {consultation.consul_comment}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-sm text-gray-500 mt-4 text-right">
        1–{consultationList.length} of {consultationList.length}
      </div>
    </div>
  );
};

export default ConsultationSection;
