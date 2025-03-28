import Image from "next/image";
import { FaThumbsUp } from "react-icons/fa";

const DoctorCard = (
    {name, specialty, experience, location, schedule, rating, totalPatients}: 
    {name: string, specialty: string, experience: number, location: string, schedule: string, rating: number, totalPatients: number}
) => {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-4"
    >
      <Image
        src="/Images/Landing_1.png"
        width={80}
        height={80}
        alt="Doctor"
        className="rounded-full border"
      />
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-xl font-semibold text-blue-900">{name}</h2>
        <p className="text-gray-600">Spesialis: {specialty}</p>
        <p className="text-gray-600">{experience} Tahun pengalaman di bidang ini</p>
        <p className="text-gray-800 font-semibold">{location}</p>
        <p className="text-gray-600">Praktek: {schedule}</p>
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm flex items-center">
            <FaThumbsUp className="mr-1" /> {rating}%
          </span>
          <span className="text-gray-600 text-sm">
            {totalPatients} Total Pasien
          </span>
        </div>
      </div>
      <button className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600">
        Jadwalkan Bertemu
      </button>
    </div>
  );
};

export default DoctorCard