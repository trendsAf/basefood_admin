import React from "react";

interface DashboardProps {
  isCollapsed?: boolean;
}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div className=" flex flex-col md:flex-row w-full pt-3 items-start justify-between gap-3 dark:text-white">
      Dashboard
    </div>
  );
};

export default Dashboard;
