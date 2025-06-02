"use client";

import { getAllConsultationPsychologService } from "@/services/dashboardPsychologService/consultation/getAllConsultation";
import { updateConsultationService } from "@/services/dashboardPsychologService/consultation/updateConsultation";
import { Consultation } from "@/types/consultation";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdDone, MdEdit } from "react-icons/md";

const ConsultationSection = () => {
  const [consultationList, setConsultationList] = useState<Consultation[]>([]);
  const [isEditingId, setIsEditingId] = useState<string | null>(null);
  const [editedStatus, setEditedStatus] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const response = await getAllConsultationPsychologService();
        if (response.status === true) {
          setConsultationList(response.data.consultation);
        }
      } catch (error) {
        alert(`Gagal mengambil data konsultasi: ${error}`);
      }
    };

    fetchConsultation();
  }, []);

  const handleEditClick = (consultationId: string, currentStatus: number) => {
    setIsEditingId(consultationId);
    setEditedStatus((prev) => ({ ...prev, [consultationId]: currentStatus }));
  };

  const handleStatusChange = (consultationId: string, newStatus: number) => {
    setEditedStatus((prev) => ({ ...prev, [consultationId]: newStatus }));
  };

  const handleSaveClick = async (consultationId: string) => {
    const newStatus = editedStatus[consultationId];
    const result = await updateConsultationService(consultationId, newStatus);

    if (result.status === true) {
      setConsultationList((prev) =>
        prev.map((item) =>
          item.consul_id === consultationId
            ? { ...item, consul_status: newStatus }
            : item
        )
      );
      setIsEditingId(null);
    }
  };

  return (
    <div className="bg-white text-gray-800 flex flex-col rounded-xl p-6 gap-4 w-full shadow-md">
      <div className="overflow-x-auto rounded-lg">
        <h2 className="text-xl font-semibold mb-6">All Consultation</h2>
        <table className="min-w-full table-auto text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600 border-b border-gray-300">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Patient</th>
              <th className="py-3 px-4">Consultation Method</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Comment</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {consultationList.map((consultation) => {
              const isEditing = isEditingId === consultation.consul_id;

              return (
                <tr
                  key={consultation.consul_id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    {dayjs(consultation.consul_date).format("dddd, DD-MM-YYYY")}
                  </td>
                  <td className="px-4 py-4">{consultation.user.user_name}</td>
                  <td className="px-4 py-4">
                    <div
                      className={`px-2 py-1 rounded-sm ${
                        consultation.practice.prac_type === "Praktek Klinik"
                          ? "bg-amber-200 text-amber-600"
                          : "bg-purple-200 text-purple-600"
                      }`}
                    >
                      {consultation.practice.prac_type}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {consultation.practice.prac_name}
                  </td>
                  <td className="px-4 py-4">
                    {isEditing ? (
                      <select
                        value={
                          editedStatus[consultation.consul_id] ??
                          consultation.consul_status
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            consultation.consul_id,
                            parseInt(e.target.value)
                          )
                        }
                        className="text-xs px-2 py-1 rounded-sm border border-gray-300"
                      >
                        <option value={0}>Upcoming</option>
                        <option value={1}>Cancelled</option>
                        <option value={2}>Done</option>
                      </select>
                    ) : (
                      <div
                        className={`px-2 py-1 rounded-sm text-center ${
                          consultation.consul_status === 0
                            ? "bg-orange-200 text-orange-500"
                            : consultation.consul_status === 1
                            ? "bg-red-200 text-red-500"
                            : "bg-blue-200 text-blue-500"
                        }`}
                      >
                        {consultation.consul_status === 0
                          ? "Upcoming"
                          : consultation.consul_status === 1
                          ? "Cancelled"
                          : "Done"}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      {consultation.consul_rate}
                    </div>
                  </td>
                  <td className="px-4 py-4">{consultation.consul_comment}</td>
                  <td className="flex items-center justify-evenly px-4 py-4">
                    {isEditing ? (
                      <button
                        onClick={() => handleSaveClick(consultation.consul_id)}
                        className="group p-1 rounded-full hover:bg-green-500"
                      >
                        <MdDone className="text-green-500 group-hover:text-white size-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleEditClick(
                            consultation.consul_id,
                            consultation.consul_status
                          )
                        }
                        className="group p-1 rounded-full hover:bg-primaryColor"
                      >
                        <MdEdit className="text-primaryColor group-hover:text-white size-5" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
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
