/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllPsychologService } from "@/services/dahsboardService/doctor/getAllPsycholog";
import { Psycholog } from "@/types/psycholog";
import Image from "next/image";
import { useEffect, useState } from "react";

const ViewDoctor = () => {
  const [psychologList, setPsychologList] = useState<Psycholog[]>([]);
  const [error, setError] = useState<string | null>(null);

  const editData = ({ id }: { id: string }) => {
    console.log("edit", id);
  };

  const removeData = ({ id }: { id: string }) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this doctor?"
    );
    if (confirmed) {
      setPsychologList((prev) => prev.filter((p) => p.psy_id !== id));
    }
  };

  useEffect(() => {
    const fetchPsychologData = async () => {
      try {
        const result = await getAllPsychologService();

        if (result.status === true) {
          setPsychologList(result.data)
        } else {
          setError(result.message);
        }
      } catch (error: any) {
        setError(error);
      }
    };

    fetchPsychologData();
  }, []);

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">All Doctors</h2>

      {error && <p className="text-red-500">{error}</p>}

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
                  <Image
                    src={psycholog.psy_image || "/Images/default_profile.png"}
                    alt={psycholog.psy_name}
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
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
                      onClick={() => editData({ id: psycholog.psy_id })}
                      className="hover:text-blue-600"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => removeData({ id: psycholog.psy_id })}
                      className="hover:text-red-500"
                      title="Delete"
                    >
                      🗑️
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
