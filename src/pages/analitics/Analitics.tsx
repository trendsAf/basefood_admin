// import ChartData from "../../components/chartData/ChartData";

import { lazy, useState } from "react";

const ChartDataModal = lazy(
  () => import("../../components/chartData/ChartDataModal"),
);

const Analitics = () => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-[80vh]">
      {/* <ChartData /> */}
      <div className="w-4/5 h-3/4 bg-black/10 border-2 border-white rounded-2xl border-dashed flex items-center justify-center">
        <button className="bg-brand-blue px-6 py-2" onClick={toggleModal}>
          {" "}
          Add data
        </button>
      </div>
      {openModal && <ChartDataModal toggleModal={toggleModal} />}
    </div>
  );
};

export default Analitics;
