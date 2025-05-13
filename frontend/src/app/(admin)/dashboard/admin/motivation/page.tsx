"use client";

import CategorySection from "./_components/Category";
import MotivationSection from "./_components/Motivation";

const NewsDashboard = () => {
  return (
    <div className="flex flex-col">
      <CategorySection />
      <MotivationSection />
    </div>
  );
};

export default NewsDashboard;
