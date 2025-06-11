"use client";

import React, { useEffect, useState } from "react";
import { MotivationList } from "@/types/motivation";
import { MotivationCard } from "./_components/motivationCard";
import Footer from "@/components/footer";
import { GetAllMotivationsUserService } from "@/services/users/motivation/getAllMotivation";

const MotivationPage = () => {
  const [motivationData, setMotivationData] = useState<MotivationList[]>([]);

  useEffect(() => {
    const fetchMotivation = async () => {
      try {
        const result = await GetAllMotivationsUserService();
        console.log(result);

        if (result.status === true) {
          setMotivationData(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMotivation();
  }, []);

  //   const handleSaveMotivation = (motivation) => {
  //     setSavedMotivations((prev) => [...prev, motivation]);
  //     console.log("Saved motivation:", motivation);
  //   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Koleksi Motivasi
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Temukan inspirasi dan motivasi untuk kehidupan yang lebih baik
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                {motivationData.length} Motivasi Tersedia
              </span>
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
              //   onSave={handleSaveMotivation}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MotivationPage;
