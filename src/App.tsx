import { useEffect, useState } from "react";
import DailySalesArea from "./components/DailySalesArea";
import GoalsArea from "./components/GoalsArea";
import Dropdown from "./components/ui/Dropdown";
import { useGoalApiContext } from "./context/GoalApiContext";
import Spin from "./components/ui/Spin";
import { useDailySalesContext } from "./context/DailySalesContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [option, setOption] = useState("");
  const { goals, loadingGoalApi } = useGoalApiContext();
  const { getAllDailySales, loadingDailyApi } = useDailySalesContext();

  const dropdownSelect = (option: string) => {
    setOption(option);
  };

  useEffect(() => {
    if (goals.length > 0) {
      getAllDailySales(goals.filter((g) => g.name === option)[0].id ?? "");
    }
  }, [option]);

  return (
    <div className="container mx-auto my-1 flex w-full flex-col gap-1 rounded-md bg-[#d9d9d9] p-4">
      {loadingGoalApi && <Spin />}
      {loadingDailyApi && <Spin />}
      <h1 className="flex items-center justify-between rounded-md bg-[#3c6e71] p-4 font-semibold text-white lg:text-3xl">
        MINHAS METAS
        <Dropdown
          dropdownList={goals.map((g) => g.name)}
          dropdownSelect={dropdownSelect}
        />
      </h1>
      <div className="flex w-full flex-col gap-2 lg:flex-row">
        <GoalsArea goals={goals.filter((g) => g.name === option)} />
        <DailySalesArea goals={goals.filter((g) => g.name === option)} />
      </div>
      <ToastContainer />
    </div>
  );
}
