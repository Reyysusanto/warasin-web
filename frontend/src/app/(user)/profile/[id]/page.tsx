"use client";

import { getDetailConsultationUserService } from "@/services/users/consultation/getDetailConsultation";
import { getAllPsychologUserService } from "@/services/users/psycholog/getAllPsycholog";
import { AvailableSlot, Practice } from "@/types/master";
import { Psycholog } from "@/types/psycholog";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { string } from "zod";

const EditConsultationPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [slot, setSlot] = useState<AvailableSlot | null>(null);
  const [practice, setPractice] = useState<Practice | null>(null);
  const [psycholog, setPsycholog] = useState<Psycholog | null>(null);
  const [formData, setFormData] = useState({
    consul_date: "",
    consul_rate: 0,
    consul_status: 0,
    consul_comment: "",
    slot_id: "",
    prac_id: "",
    psy_id: "",
  });

  useEffect(() => {
    const fetchConsultation = async () => {
      const consulId = params.id as string;
      const result = await getDetailConsultationUserService(consulId);

      if (result.status === true) {
        const data = result.data;
        setFormData({
          consul_date: data.consul_date,
          consul_rate: data.consul_rate,
          consul_status: data.consul_status,
          consul_comment: data.consul_comment,
          slot_id: data.available_slot.slot_id,
          prac_id: data.practice.prac_id,
          psy_id: data.psycholog.psy_id,
        });

        setSlot(data.available_slot);
        setPractice(data.practice);
        setPsycholog(data.psycholog);
      }
    };

    // const fetchPsycholog = async () => {
    //     const allPsycholog = await getAllPsychologUserService();


    // }

    fetchConsultation();
  }, [params.id]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-primaryTextColor">
        Edit Konsultasi
      </h2>
      <form className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Tanggal Konsultasi
          </label>
          <input
            value={dayjs(formData.consul_date).format("dddd, DD-MM-YYYY")}
            type="date"
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">
              Jam Mulai
            </label>
            <input
              defaultValue={slot?.slot_start}
              type="time"
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">
              Jam Selesai
            </label>
            <input
              value={slot?.slot_end}
              type="time"
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">
              Metode Konsultasi
            </label>
            <input
              value={practice?.prac_type}
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              required
            />
          </div>
          {practice?.prac_type === "Konsultasi Online" && (
            <div>
              <label className="block mb-1 font-medium text-sm text-gray-700">
                Tempat Konsultasi
              </label>
              <input
                value={practice?.prac_address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    consul_rate: Number(e.target.value),
                  })
                }
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                required
              />
            </div>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Rating
          </label>
          <input
            value={formData.consul_rate}
            onChange={(e) =>
              setFormData({ ...formData, consul_rate: Number(e.target.value) })
            }
            type="number"
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Komentar
          </label>
          <textarea
            value={formData.consul_comment}
            onChange={(e) =>
              setFormData({ ...formData, consul_comment: e.target.value })
            }
            rows={3}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            placeholder="Tulis catatan atau kebutuhan khusus..."
          />
        </div>

        <div className="flex justify-between gap-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Batalkan pesanan
          </button>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Batal
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
