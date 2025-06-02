/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Plus, X, Save } from "lucide-react";
import { AvailableSlot, Practice } from "@/types/master";
import TimeSlotCard from "./_components/AvailableSlot";
import PracticeCard from "./_components/Practices";
import { getAvailableSlot } from "@/services/dashboardPsychologService/profile/time-practices/getAvailableSlotService";
import { getAllPracticesService } from "@/services/dashboardPsychologService/profile/time-practices/getAllPractices";

const PsychologistDashboard = () => {
  const [timeSlots, setTimeSlots] = useState<AvailableSlot[]>([]);
  const [practices, setPractices] = useState<Practice[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPractice, setEditingPractice] = useState(null);
  const [formData, setFormData] = useState({
    prac_name: "",
    prac_type: "",
    prac_address: "",
    prac_phone_number: "",
    practice_schedule: [],
  });

  const handleAddPractice = () => {
    setEditingPractice(null);
    setFormData({
      prac_name: "",
      prac_type: "",
      prac_address: "",
      prac_phone_number: "",
      practice_schedule: [],
    });
    setShowModal(true);
  };

  useEffect(() => {
    const fetchAvailableSlot = async () => {
      try {
        const result = await getAvailableSlot();
        console.log(result);

        if (result.status === true) {
          setTimeSlots(result.data.available_slot);
        }
      } catch (error: any) {
        console.log(`Error Consume Available Slot ${error}`);
      }
    };

    const fetchPractices = async () => {
      try {
        const result = await getAllPracticesService();
        console.log(result);

        if (result.status === true) {
          setPractices(result.data.practice);
        }
      } catch (error) {
        console.log(`Error Consume Practice ${error}`);
      }
    };

    fetchAvailableSlot();
    fetchPractices();
  }, []);

  const handleEditPractice = (practice: any) => {
    setEditingPractice(practice);
    setFormData({ ...practice });
    setShowModal(true);
  };

  const handleDeletePractice = (pracId: string) => {
    setPractices(practices.filter((p) => p.prac_id !== pracId));
  };

  // const handleSavePractice = () => {
  //   if (editingPractice) {
  //     setPractices(
  //       practices.map((p) =>
  //         p.prac_id === editingPractice.prac_id ? { ...formData } : p
  //       )
  //     );
  //   } else {
  //     const newPractice = {
  //       ...formData,
  //       prac_id: `new-${Date.now()}`,
  //       practice_schedule: [],
  //     };
  //     setPractices([...practices, newPractice]);
  //   }
  //   setShowModal(false);
  // };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primaryTextColor mb-2">
            Time & Practices
          </h1>
          <p className="text-primaryTextColor">
            Kelola waktu dan praktik psikologi Anda
          </p>
        </div>

        {/* Time Slots Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primaryTextColor">
              Slot Waktu
            </h2>
            <div className="flex items-center space-x-2 text-sm text-primaryTextColor">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Tersedia</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Tidak Tersedia</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeSlots.map((slot) => (
              <TimeSlotCard key={slot.slot_id} slot={slot} />
            ))}
          </div>
        </div>

        {/* Practices Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primaryTextColor">
              Praktik
            </h2>
            <button
              onClick={handleAddPractice}
              className="bg-primaryColor text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Tambah Praktik
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {practices.map((practice) => (
              <PracticeCard
                key={practice.prac_id}
                practice={practice}
                onEdit={handleEditPractice}
                onDelete={handleDeletePractice}
              />
            ))}
          </div>
        </div>

        {/* Modal for Add/Edit Practice */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-primaryTextColor">
                  {editingPractice ? "Edit Praktik" : "Tambah Praktik"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Praktik
                  </label>
                  <input
                    type="text"
                    value={formData.prac_name}
                    onChange={(e) =>
                      setFormData({ ...formData, prac_name: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan nama praktik"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipe Praktik
                  </label>
                  <select
                    value={formData.prac_type}
                    onChange={(e) =>
                      setFormData({ ...formData, prac_type: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Pilih tipe praktik</option>
                    <option value="Konsultasi Online">Konsultasi Online</option>
                    <option value="Praktek Klinik">Praktek Klinik</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat
                  </label>
                  <textarea
                    value={formData.prac_address}
                    onChange={(e) =>
                      setFormData({ ...formData, prac_address: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan alamat praktik"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    value={formData.prac_phone_number}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        prac_phone_number: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 px-4 bg-gray-200 text-primaryTextColor rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  // onClick={handleSavePractice}
                  className="flex-1 py-3 px-4 bg-primaryColor text-white rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PsychologistDashboard;
