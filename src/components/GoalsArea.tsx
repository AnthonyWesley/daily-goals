import { useState } from "react";
import { useGoalApiContext } from "../context/GoalApiContext";
import { autoCurrency, toNumber } from "../helpers/CurrencyFormatter";
import GoalsList from "./GoalsList";
import Input from "./ui/Input";
import { IGoal } from "../api.ts/GoalApi";
import Accordion from "./ui/Accordion";

export default function GoalsArea({ goals }: { goals: IGoal[] }) {
  const [name, setName] = useState("");
  const [monthlyGoal, setMonthlyGoal] = useState("");
  const [workingDays, setWorkingDays] = useState("");
  const { createGoal } = useGoalApiContext();

  const handleMonthlyGoalChange = (value: string) => {
    setMonthlyGoal(autoCurrency(value.replace(/[^\d]/g, "")));
  };

  const handleWorkingDaysChange = (value: string) => {
    setWorkingDays(value.replace(/[^\d]/g, ""));
  };

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const addGoal = async () => {
    if (monthlyGoal && workingDays && name) {
      await createGoal({
        name,
        monthlyGoal: toNumber(monthlyGoal),
        workingDays: toNumber(workingDays),
      });
      setMonthlyGoal("");
      setWorkingDays("");
      setName("");
    }
  };

  return (
    <div className="flex w-full flex-col gap-1 rounded-md">
      <Accordion
        title={" ADICIONAR META"}
        content={
          <div className="flex w-full flex-col gap-2 rounded-md bg-zinc-600 p-3 lg:flex-row">
            <Input
              label="Nome"
              value={name}
              onChange={handleNameChange}
              className="w-full"
            />
            <Input
              label="Meta"
              value={monthlyGoal}
              onChange={handleMonthlyGoalChange}
              className="w-full"
            />
            <Input
              label="Dias"
              value={workingDays}
              onChange={handleWorkingDaysChange}
              className="lg:w-40"
            />

            <button
              className="col-span-3 w-80 rounded-md bg-[#3c6e71] p-2 text-[#ffffff]"
              onClick={addGoal}
            >
              ADD
            </button>
          </div>
        }
      />

      <GoalsList goals={goals} />
    </div>
  );
}
