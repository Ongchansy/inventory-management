"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // You can add logic to check authentication here if needed
    const isAuthenticated = true; // Replace with your auth logic

    if (!isAuthenticated) {
      router.push("/auth"); // Redirect to the auth route
    }
    if(isAuthenticated){
      router.push("inventory-management/home/dashboard")
    }
  }, [router]);

  return (
    <div>
      {/* Fallback UI until redirect occurs */}
      Redirecting to login...
    </div>
  );
}
