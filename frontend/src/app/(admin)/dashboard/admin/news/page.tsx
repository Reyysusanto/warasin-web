"use client";

import { useAuthRedirectLoginAdmin } from "@/services/useAuthRedirect";
import CreateNews from "./_components/CreateNews";
import ViewNewsPage from "./_components/ViewNews";

const NewsDashboard = () => {
  useAuthRedirectLoginAdmin();

  return (
    <div>
      <CreateNews />
      <ViewNewsPage />
    </div>
  );
};

export default NewsDashboard;
