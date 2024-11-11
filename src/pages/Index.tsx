import React from "react";
import InfoCard from "../components/InfoCard";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { FaUsers, FaStoreAlt } from "react-icons/fa";
import Chart from "../components/graphs/Chart";

interface DashboardProps {
  isCollapsed?: boolean;
}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div className=" flex flex-col w-full pt-3 items-start  gap-3 dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <InfoCard
          title="Total Users"
          number={20}
          icon={FaUsers}
          bgColor="bg-light-blue dark:bg-[#161C2C]"
          iconColor="text-brand-blue"
          // onClick={() => handleCardClick("all")}
          // isActive={kycFilter === "all"}
        />
        <InfoCard
          title="Premium"
          number={30}
          icon={MdOutlineVerifiedUser}
          bgColor="bg-light-green dark:bg-[#1E2820]"
          iconColor="text-green"
          // onClick={() => handleCardClick("verified")}
          // isActive={kycFilter === "verified"}
        />
        <InfoCard
          title="Producers"
          number={10}
          icon={VscPreview}
          bgColor="bg-light-orange dark:bg-dark-orange"
          iconColor="text-orange"
          // onClick={() => handleCardClick("in_review")}
          // isActive={kycFilter === "in_review"}
        />
        <InfoCard
          title="Farms"
          number={30}
          icon={FaStoreAlt}
          bgColor="bg-light-red dark:bg-[#2B1C1C]"
          iconColor="text-red"
          // onClick={() => handleCardClick("declined")}
          // isActive={kycFilter === "declined"}
        />
      </div>
      <Chart />
    </div>
  );
};

export default Dashboard;
