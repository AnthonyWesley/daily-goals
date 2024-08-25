import { useState } from "react";
import { IGoal } from "./api.ts/GoalApi";
import DailySalesArea from "./components/DailySalesArea";
import GoalsArea from "./components/GoalsArea";
import Dropdown from "./components/ui/Dropdown";
import { useGoalApiContext } from "./context/GoalApiContext";

export default function App() {
  const [selectedGoals, setSelectedGoals] = useState<IGoal[]>([]);
  const { goals, ip } = useGoalApiContext();

  const dropdownSelect = (option: string) => {
    const aGoal = goals?.filter((g) => g.name === option);
    if (aGoal && aGoal !== selectedGoals) {
      setSelectedGoals(aGoal);
    }
  };

  return (
    <div className="container mx-auto flex w-full flex-col gap-4 bg-[#d9d9d9] p-4">
      <h1 className="flex items-center justify-between rounded-md border-l-[20px] border-l-[#284B63] bg-[#ffffff] p-1 font-semibold text-[#353535] lg:text-3xl">
        MINHAS METAS
        <Dropdown
          dropdownList={goals.map((g) => g.name)}
          dropdownSelect={dropdownSelect}
        />
      </h1>
      <GoalsArea goals={selectedGoals} />

      <DailySalesArea goals={selectedGoals} />
      <p>ip:{ip}</p>
    </div>
  );
}
