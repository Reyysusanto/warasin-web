"use client";

import AddDoctorForm from "./_components/AddDoctor";
import ViewDoctor from "./_components/viewDoctor";


const DoctorDashboard = () => {
  return (
    <div className="bg-white text-gray-800 rounded-xl p-6 w-full shadow-md">
      <AddDoctorForm />
      <ViewDoctor />
    </div>
  );
};

export default DoctorDashboard;
