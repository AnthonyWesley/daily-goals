import { useEffect, useState } from "react";
import DailySalesArea from "./components/DailySalesArea";
import GoalsArea from "./components/GoalsArea";
import Dropdown from "./components/ui/Dropdown";
import { useGoalApiContext } from "./context/GoalApiContext";
import Spin from "./components/ui/Spin";
import { useDailySalesContext } from "./context/DailySalesContext";

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
    <div className="container mx-auto flex w-full flex-col gap-4 bg-[#d9d9d9] p-4">
      {loadingGoalApi && <Spin />}
      {loadingDailyApi && <Spin />}
      <h1 className="flex items-center justify-between rounded-md border-l-[10px] border-l-[#284B63] bg-[#ffffff] p-1 font-semibold text-[#353535] lg:text-3xl">
        MINHAS METAS
        <Dropdown
          dropdownList={goals.map((g) => g.name)}
          dropdownSelect={dropdownSelect}
        />
      </h1>

      <GoalsArea goals={goals.filter((g) => g.name === option)} />
      <DailySalesArea goals={goals.filter((g) => g.name === option)} />
    </div>
  );
}
