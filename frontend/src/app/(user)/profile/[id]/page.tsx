/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuthRedirect } from "@/services/useAuthRedirect";
import { getAllPracticeUserService } from "@/services/users/consultation/getAllPractice";
import { getAvailableSlotUserService } from "@/services/users/consultation/getAvailableSlot";
import { getDetailConsultationUserService } from "@/services/users/consultation/getDetailConsultation";
import { updateConsultationService } from "@/services/users/consultation/updateConsultation";
import { getAllPsychologUserService } from "@/services/users/psycholog/getAllPsycholog";
import { ConsultationUserRequest } from "@/types/consultation";
import { AvailableSlot, Practice } from "@/types/master";
import { Psycholog } from "@/types/psycholog";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditConsultationPage = () => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [slot, setSlot] = useState<AvailableSlot[]>([]);
  const [practice, setPractice] = useState<Practice[]>([]);
  const [psycholog, setPsycholog] = useState<Psycholog[]>([]);
  const [selectedPsycholog, setSelectedPsycholog] = useState("");
  const [selectedPractice, setSelectedPractice] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({
    consul_date: "",
    consul_rate: 0,
    consul_status: 0,
    consul_comment: "",
    slot_id: "",
    prac_id: "",
    psy_id: "",
  });
  useAuthRedirect();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const consulId = params.id as string;

        // Fetch consultation details
        const [consultationResult, psychologResult] = await Promise.all([
          getDetailConsultationUserService(consulId),
          getAllPsychologUserService(),
        ]);

        if (consultationResult.status === true) {
          const data = consultationResult.data;
          setSelectedPsycholog(data.psycholog.psy_id);
          setSelectedPractice(data.practice.prac_id);
          setSelectedSlot(data.available_slot.slot_id);
          setFormData({
            consul_date: data.consul_date,
            consul_rate: data.consul_rate,
            consul_status: data.consul_status,
            consul_comment: data.consul_comment,
            slot_id: data.available_slot.slot_id,
            prac_id: data.practice.prac_id,
            psy_id: data.psycholog.psy_id,
          });
        }

        if (psychologResult.status === true) {
          setPsycholog(psychologResult.data);
        }
      } catch (err: any) {
        setError(err.message || "Gagal memuat data konsultasi");
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    const fetchDependentData = async () => {
      try {
        if (!selectedPsycholog) return;

        setError(null);
        const [practiceResult, slotResult] = await Promise.all([
          getAllPracticeUserService(selectedPsycholog),
          getAvailableSlotUserService(selectedPsycholog),
        ]);

        if (practiceResult.status === true) {
          setPractice(practiceResult.data);
        }

        if (slotResult.status === true) {
          setSlot(slotResult.data);
        }
      } catch (err: any) {
        setError(err.message || "Gagal memuat data terkait");
      }
    };

    fetchDependentData();
  }, [selectedPsycholog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Prepare only changed fields
      const payload: Partial<ConsultationUserRequest> = {};

      if (selectedPsycholog !== formData.psy_id) {
        payload.psy_id = selectedPsycholog;
      }

      if (selectedPractice !== formData.prac_id) {
        payload.prac_id = selectedPractice;
      }

      if (selectedSlot !== formData.slot_id) {
        payload.slot_id = selectedSlot;
      }

      if (
        formData.consul_rate !==
        Number(
          e.currentTarget.querySelector<HTMLInputElement>(
            'input[name="consul_rate"]'
          )?.value
        )
      ) {
        payload.consul_rate = Number(
          e.currentTarget.querySelector<HTMLInputElement>(
            'input[name="consul_rate"]'
          )?.value
        );
      }

      if (
        formData.consul_comment !==
        e.currentTarget.querySelector<HTMLTextAreaElement>(
          'textarea[name="consul_comment"]'
        )?.value
      ) {
        payload.consul_comment =
          e.currentTarget.querySelector<HTMLTextAreaElement>(
            'textarea[name="consul_comment"]'
          )?.value || "";
      }

      console.log("Payload yang dikirim:", payload);

      // Only proceed if there are changes
      if (Object.keys(payload).length > 0) {
        const result = await updateConsultationService(
          params.id as string,
          payload
        );

        if (result.status === true) {
          setSuccess("Konsultasi berhasil diperbarui");
          router.push("/profile")
        } else {
          setError(result.message || "Gagal memperbarui konsultasi");
        }
      } else {
        setSuccess("Tidak ada perubahan yang dilakukan");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat memperbarui konsultasi");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelConsultation = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await updateConsultationService(params.id as string, {
        consul_status: 1,
      });

      if (result.status === true) {
        setSuccess("Konsultasi berhasil dibatalkan");
        router.back();
      } else {
        setError(result.message || "Gagal membatalkan konsultasi");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat membatalkan konsultasi");
    } finally {
      setLoading(false);
    }
  };

  const handlePsychologChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPsycholog(e.target.value);
    setSelectedPractice("");
    setSelectedSlot("");
  };

  const handlePracticeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPractice(e.target.value);
  };

  const handleSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSlot(e.target.value);
  };

  const getSelectedSlot = () => {
    return slot.find((s) => s.slot_id === selectedSlot);
  };

  const getSelectedPractice = () => {
    return practice.find((p) => p.prac_id === selectedPractice);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-primaryTextColor">
        Edit Konsultasi
      </h2>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      {/* Success message */}
      {success && (
        <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-400 rounded">
          {success}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Psikolog Select */}
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Psikolog
          </label>
          <select
            value={selectedPsycholog}
            onChange={handlePsychologChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            required
          >
            <option value="">Pilih Psikolog</option>
            {psycholog.map((psy) => (
              <option key={psy.psy_id} value={psy.psy_id}>
                {psy.psy_name}
              </option>
            ))}
          </select>
        </div>

        {/* Consultation Date */}
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Tanggal Konsultasi
          </label>
          <input
            value={dayjs(formData.consul_date).format("dddd, DD-MM-YYYY")}
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            readOnly
          />
        </div>

        {/* Time Slot */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">
              Jam Mulai
            </label>
            <select
              value={selectedSlot}
              onChange={handleSlotChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              required
              disabled={!selectedPsycholog}
            >
              <option value="">Pilih Slot Waktu</option>
              {slot.map((s) => (
                <option key={s.slot_id} value={s.slot_id}>
                  {s.slot_start}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">
              Jam Selesai
            </label>
            <input
              value={getSelectedSlot()?.slot_end || ""}
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
              readOnly
            />
          </div>
        </div>

        {/* Consultation Method */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">
              Metode Konsultasi
            </label>
            <select
              value={selectedPractice}
              onChange={handlePracticeChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              required
              disabled={!selectedPsycholog}
            >
              <option value="">Pilih Metode</option>
              {practice.map((p) => (
                <option key={p.prac_id} value={p.prac_id}>
                  {p.prac_type}
                </option>
              ))}
            </select>
          </div>
          {getSelectedPractice()?.prac_type === "Konsultasi Online" && (
            <div>
              <label className="block mb-1 font-medium text-sm text-gray-700">
                Link Konsultasi
              </label>
              <input
                value={getSelectedPractice()?.prac_address || ""}
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
                readOnly
              />
            </div>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Rating
          </label>
          <input
            name="consul_rate"
            defaultValue={formData.consul_rate}
            type="number"
            min="0"
            max="5"
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            required
          />
        </div>

        {/* Comment */}
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Komentar
          </label>
          <textarea
            name="consul_comment"
            defaultValue={formData.consul_comment}
            rows={3}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            placeholder="Tulis catatan atau kebutuhan khusus..."
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={handleCancelConsultation}
            disabled={loading}
          >
            Batalkan Konsultasi
          </button>

          <div className="flex gap-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              onClick={() => router.back()}
              disabled={loading}
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditConsultationPage;
