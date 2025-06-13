"use client";

import { useAuthRedirectLoginAdmin } from "@/services/useAuthRedirect";
import AddDoctorForm from "./_components/AddDoctor";
import ViewDoctor from "./_components/viewDoctor";

const DoctorDashboard = () => {
  useAuthRedirectLoginAdmin();

  return (
    <div className="bg-white text-gray-800 rounded-xl p-6 w-full shadow-md">
      <AddDoctorForm />
      <ViewDoctor />
    </div>
  );
};

export default DoctorDashboard;
