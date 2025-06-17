/* eslint-disable @typescript-eslint/no-explicit-any */
import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { assetsURL } from "@/config/api";
import { deletePsychologService } from "@/services/dahsboardService/doctor/deletePsycholog";
import { getAllPsychologService } from "@/services/dahsboardService/doctor/getAllPsycholog";
import { Psycholog } from "@/types/psycholog";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ViewDoctor = () => {
  const [psychologList, setPsychologList] = useState<Psycholog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      showErrorAlert("Terjadi Suatu Masalah", error);
    }
  }, [error]);

  const editData = (id: string) => {
    router.push(`/dashboard/admin/doctors/${id}`);
  };

  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath) return "/Images/default_profile.png";

    if (imagePath.startsWith("http")) return imagePath;

    return `${assetsURL}/psycholog/${imagePath}`;
  };

  useEffect(() => {
    const fetchPsychologData = async () => {
      try {
        const result = await getAllPsychologService();

        if (result.status === true) {
          setPsychologList(result.data);
        } else {
          setError(result.message);
        }
      } catch (error: any) {
        setError(error);
      }
    };

    fetchPsychologData();
  }, []);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        showSuccessAlert(
          "Psycholog Berhasil Dihapus",
          "Psycholog Berhasil Dihapus"
        );
      }
    });
    try {
      const result = await deletePsychologService(id);
      if (result.status) {
        setPsychologList((prev) =>
          prev.filter((psycholog) => psycholog.psy_id !== id)
        );
        await showSuccessAlert("Psycholog Berhasil Dihapus", result.message);
      } else {
        await showErrorAlert("Psycholog Gagal Dihapus", result.message);
      }
    } catch (error: any) {
      await showErrorAlert("Terjadi Suatu Masalah", error.message);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">All Doctors</h2>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full table-auto text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600 border-b border-gray-300">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">STR Number</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Work Year</th>
              <th className="py-3 px-4">City</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {psychologList.map((psycholog) => (
              <tr
                key={psycholog.psy_id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4 flex items-center gap-3 whitespace-nowrap">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <Image
                      src={
                        getFullImageUrl(psycholog.psy_image) ||
                        "/Images/default_profile.png"
                      }
                      alt={psycholog.psy_name}
                      width={60}
                      height={60}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="font-medium">{psycholog.psy_name}</span>
                </td>

                <td className="px-4 py-4">{psycholog.psy_str_number}</td>
                <td className="px-4 py-4">{psycholog.psy_email}</td>
                <td className="px-4 py-4">{psycholog.psy_phone_number}</td>
                <td className="px-4 py-4">{psycholog.psy_work_year}</td>
                <td className="px-4 py-4">{psycholog.city.city_name}</td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => editData(psycholog.psy_id)}
                      className="hover:text-blue-600"
                      title="Edit"
                    >
                      <PencilIcon className="size-5 text-gray-500 hover:text-blue-600 cursor-pointer transition" />
                    </button>
                    <button
                      onClick={() => handleDelete(psycholog.psy_id)}
                      className="hover:text-red-500"
                      title="Delete"
                    >
                      <Trash2Icon className="size-5 text-gray-500 hover:text-red-500 cursor-pointer transition" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {psychologList.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-500 mt-4 text-right">
        1–{psychologList.length} of {psychologList.length}
      </div>
    </>
  );
};

export default ViewDoctor;
