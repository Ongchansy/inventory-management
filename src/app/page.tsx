"use client";
import { useSession} from "next-auth/react";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session ) {
    redirect("/inventory-management/home/dashboard");
  }
  if (session) {
    redirect("/inventory-management/home/dashboard");
  }


  return (
    <div>
      
    </div>
  );
};

export default DashboardPage;
