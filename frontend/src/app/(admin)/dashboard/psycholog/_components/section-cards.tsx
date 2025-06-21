"use client";

import { useEffect, useState } from "react";
import InformationCard from "./InformationCard";
import { getAllConsultationPsychologService } from "@/services/dashboardPsychologService/consultation/getAllConsultation";
import { getAllPracticesService } from "@/services/dashboardPsychologService/time-practices/getAllPractices";

export function SectionCards() {
  const [consultation, setConsultation] = useState<number>();
  const [practice, setPractice] = useState<number>();

  useEffect(() => {
    const fetchConsultation = async () => {
      const result = await getAllConsultationPsychologService();

      if (result.status === true) {
        setConsultation(result.data.consultation.length);
      }
    };

    const fetchPractice = async () => {
      const result = await getAllPracticesService();

      if (result.status === true) {
        setPractice(result.data.practice.length);
      }
    };

    fetchConsultation();
    fetchPractice();
  });

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-2 md:grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <InformationCard
        title="Total Consultations"
        count={consultation || 0}
        desc="Total number of consultation sessions completed by users"
      />
      <InformationCard
        title="Total Practice"
        count={practice || 0}
        desc="Total number of available practice methods, including online and clinic-based"
      />
    </div>
  );
}
