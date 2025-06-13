"use client";

import React, { useEffect, useState } from "react";
import { MotivationList } from "@/types/motivation";
import { MotivationCard } from "./_components/motivationCard";
import Footer from "@/components/footer";
import { GetAllMotivationsUserService } from "@/services/users/motivation/getAllMotivation";
import NavigationBar from "@/components/navbar";
import { useAuthRedirect } from "@/services/useAuthRedirect";

const MotivationPage = () => {
  const [motivationData, setMotivationData] = useState<MotivationList[]>([]);
  useAuthRedirect();

  useEffect(() => {
    const fetchMotivation = async () => {
      try {
        const result = await GetAllMotivationsUserService();
        if (result.status === true) {
          setMotivationData(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMotivation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <NavigationBar />
      <div className="bg-white md:pt-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Koleksi Motivasi
            </h1>

            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Temukan inspirasi dan motivasi untuk kehidupan yang lebih baik
            </p>

            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {motivationData.length} Motivasi Tersedia
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {motivationData.map((motivation) => (
            <MotivationCard
              key={motivation.motivation_id}
              motivation={motivation}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MotivationPage;
