import { useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ReportForm from "@/components/ReportForm";
import MyReports from "@/components/MyReports";

const UserDashboard = () => {
  const reportRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection onScrollToReport={() => reportRef.current?.scrollIntoView({ behavior: "smooth" })} />
      <div ref={reportRef} className="py-10">
        <ReportForm />
      </div>
      <div className="pb-16">
        <MyReports />
      </div>
    </div>
  );
};

export default UserDashboard;
