"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Languages,
  Clock,
  User,
  Calendar,
  ChevronRight,
} from "lucide-react";

type PsychologCardProps = {
  id: string;
  name: string;
  psy_image: string;
  specialty: string[];
  work_year: string;
  location: string;
  language: string[];
  description: string;
};

const truncate = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const PsychologCard = ({
  id,
  name,
  psy_image,
  specialty,
  work_year,
  location,
  language,
  description,
}: PsychologCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/consultation/${id}`);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
      {/* Header with gradient background */}
      <div className="relative bg-primaryColor p-6 pb-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

        {/* Profile Image */}
        <div className="relative flex justify-center">
          <Image
            src={psy_image || "/Images/default-profile.png"}
            width={100}
            height={100}
            alt={name}
            className="relative rounded-full w-24 h-24 object-cover border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primaryTextColor mb-2">
            {name}
          </h2>
        </div>

        {/* Info Grid */}
        <div className="space-y-4 mb-6">
          {/* Specialties */}
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Spesialisasi
              </p>
              <div className="flex flex-wrap gap-1">
                {specialty.length > 0 ? (
                  specialty.slice(0, 2).map((spec, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {spec}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">-</span>
                )}
                {specialty.length > 2 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                    +{specialty.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Experience and Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-green-50 p-2 rounded-lg">
                <Clock className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Pengalaman</p>
                <p className="text-sm font-semibold text-gray-700">
                  {work_year} tahun
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-purple-50 p-2 rounded-lg">
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Lokasi</p>
                <p className="text-sm font-semibold text-gray-700">
                  {truncate(location, 15)}
                </p>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-2 rounded-lg">
              <Languages className="w-4 h-4 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 mb-1">Bahasa</p>
              <p className="text-sm text-gray-600">
                {language.length > 0 ? language.join(", ") : "-"}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 leading-relaxed italic">
              {truncate(description, 120)}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClick}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
        >
          <Calendar className="w-5 h-5" />
          <span>Jadwalkan Konsultasi</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default PsychologCard;
