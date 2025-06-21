"use client"

import { useEffect, useState } from "react";
import InformationCard from "./InformationCard";
import { GetAllUsers } from "@/services/dahsboardService/user/users";
import { getAllPsychologService } from "@/services/dahsboardService/doctor/getAllPsycholog";
import { GetAllMotivationsService } from "@/services/dahsboardService/motivation/getAllMotivation";

export function SectionCards() {
  const [user, setUser] = useState<number>();
  const [psycholog, setPsycholog] = useState<number>();
  const [motivation, setMotivation] = useState<number>();

  useEffect(() => {
    const fetchUser = async () => {
      const result = await GetAllUsers();

      if (result.status === true) {
        setUser(result.data.length);
      }
    };

    const fetchPsycholog = async () => {
      const resultPsycholog = await getAllPsychologService();

      if (resultPsycholog.status === true) {
        setPsycholog(resultPsycholog.data.length);
      }
    };

    const fetchMotivation = async () => {
      const resultMotivation = await GetAllMotivationsService();

      if (resultMotivation.status === true) {
        setMotivation(resultMotivation.data.length);
      }
    };

    fetchUser();
    fetchPsycholog();
    fetchMotivation();
  });

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-3 md:grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <InformationCard
        title="Total User"
        count={user || 0}
        desc="Total user since warasin launched"
      />
      <InformationCard
        title="Total Psycholog"
        count={psycholog || 0}
        desc="Total psycholog since warasin launched"
      />
      <InformationCard
        title="Total Motivation"
        count={motivation || 0}
        desc="Total motivation created by admin"
      />
    </div>
  );
}
