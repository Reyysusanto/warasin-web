import CardConsultation from "./_components/ConsultationCard";
import CreateConsultation from "./_components/CreateConsultation";

const consultationDashboard = () => {
  return (
    <div className="bg-white text-gray-800 rounded-xl p-6 w-full shadow-md">
      <CreateConsultation />
      <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
        <CardConsultation />
        <CardConsultation />
        <CardConsultation />
      </div>
    </div>
  );
};

export default consultationDashboard;
