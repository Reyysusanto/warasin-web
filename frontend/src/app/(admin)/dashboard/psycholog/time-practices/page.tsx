/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Plus, X, Save } from "lucide-react";
import { AvailableSlot, Practice, PracticeRequest, Schedule } from "@/types/master";
import TimeSlotCard from "./_components/AvailableSlot";
import PracticeCard from "./_components/Practices";
import { getAvailableSlot } from "@/services/dashboardPsychologService/profile/time-practices/getAvailableSlotService";
import { getAllPracticesService } from "@/services/dashboardPsychologService/profile/time-practices/getAllPractices";
import { createPracticeService } from "@/services/dashboardPsychologService/profile/time-practices/createPractice";
import { updatePracticeService } from "@/services/dashboardPsychologService/profile/time-practices/updatePractice";

const PsychologistDashboard = () => {
  const [timeSlots, setTimeSlots] = useState<AvailableSlot[]>([]);
  const [practices, setPractices] = useState<Practice[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPractice, setEditingPractice] = useState<Practice | null>(null);
  const [formData, setFormData] = useState({
    prac_name: "",
    prac_type: "",
    prac_address: "",
    prac_phone_number: "",
    practice_schedule: [] as Schedule[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAvailableSlot = async () => {
      try {
        const result = await getAvailableSlot();
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
        if (result.status === true) {
          const validPractices = result.data.practice.filter((p) => p.prac_id);
          setPractices(validPractices);
        }
      } catch (error) {
        console.log(`Error Consume Practice ${error}`);
      }
    };

    fetchAvailableSlot();
    fetchPractices();
  }, []);

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

  const handleEditPractice = (practice: Practice) => {
    setEditingPractice(practice);
    setFormData({
      prac_name: practice.prac_name,
      prac_type: practice.prac_type,
      prac_address: practice.prac_address,
      prac_phone_number: practice.prac_phone_number,
      practice_schedule: practice.practice_schedule || [],
    });
    setShowModal(true);
  };

  const handleDeletePractice = (pracId: string) => {
    setPractices(practices.filter((p) => p.prac_id !== pracId));
  };

  const validateForm = (): boolean => {
    if (!formData.prac_name.trim()) {
      alert("Nama praktik harus diisi");
      return false;
    }
    if (!formData.prac_type) {
      alert("Tipe praktik harus dipilih");
      return false;
    }
    if (!formData.prac_address.trim()) {
      alert("Alamat praktik harus diisi");
      return false;
    }
    if (!formData.prac_phone_number.trim()) {
      alert("Nomor telepon harus diisi");
      return false;
    }
    return true;
  };

  const refreshPractices = async () => {
    try {
      const result = await getAllPracticesService();
      if (result.status === true) {
        const validPractices = result.data.practice.filter((p) => p.prac_id);
        setPractices(validPractices);
      }
    } catch (error) {
      console.log(`Error refreshing practices: ${error}`);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);

    try {
      const practiceData: PracticeRequest = {
        prac_name: formData.prac_name.trim(),
        prac_type: formData.prac_type,
        prac_address: formData.prac_address.trim(),
        prac_phone_number: formData.prac_phone_number.trim(),
      };

      if (editingPractice) {
        const result = await updatePracticeService(
          editingPractice.prac_id,
          practiceData
        );

        if (result.status === true) {
          setPractices((prevPractices) =>
            prevPractices.map((p) =>
              p.prac_id === editingPractice.prac_id
                ? { ...p, ...practiceData }
                : p
            )
          );
          await refreshPractices();
        } else {
          throw new Error(result.message || "Gagal memperbarui praktik");
        }
      } else {
        const result = await createPracticeService(practiceData);
        if (result.status === true) {
          await refreshPractices();
        } else {
          throw new Error(result.message || "Gagal menambahkan praktik");
        }
      }

      setFormData({
        prac_name: "",
        prac_type: "",
        prac_address: "",
        prac_phone_number: "",
        practice_schedule: [],
      });
      setEditingPractice(null);
      setShowModal(false);
    } catch (error: any) {
      console.error("Error in handleSubmit:", error);
      alert(
        `Gagal ${editingPractice ? "memperbarui" : "menambahkan"} praktik: ${
          error.message || error
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {practices
              .filter((p) => p?.prac_id)
              .map((practice) => (
                <PracticeCard
                  key={`${practice.prac_id}-${practice.prac_name}`}
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
                  disabled={isSubmitting}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Praktik <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.prac_name}
                    onChange={(e) =>
                      setFormData({ ...formData, prac_name: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan nama praktik"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipe Praktik <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.prac_type}
                    onChange={(e) =>
                      setFormData({ ...formData, prac_type: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                    required
                  >
                    <option value="">Pilih tipe praktik</option>
                    <option value="Konsultasi Online">Konsultasi Online</option>
                    <option value="Praktek Klinik">Praktek Klinik</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.prac_address}
                    onChange={(e) =>
                      setFormData({ ...formData, prac_address: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan alamat praktik"
                    rows={3}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon <span className="text-red-500">*</span>
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
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 px-4 bg-gray-200 text-primaryTextColor rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  disabled={isSubmitting}
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 px-4 bg-primaryColor text-white rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editingPractice ? "Memperbarui..." : "Menambahkan..."}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {editingPractice ? "Perbarui" : "Simpan"}
                    </>
                  )}
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
