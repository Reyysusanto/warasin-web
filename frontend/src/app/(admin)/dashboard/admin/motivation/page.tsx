"use client";

import { useAuthRedirectLoginAdmin } from "@/services/useAuthRedirect";
import CategorySection from "./_components/Category";
import MotivationSection from "./_components/Motivation";

const NewsDashboard = () => {
  useAuthRedirectLoginAdmin();
  
  return (
    <div className="flex flex-col">
      <CategorySection />
      <MotivationSection />
    </div>
  );
};

export default NewsDashboard;
