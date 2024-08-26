import { useState } from "react";
import { useGoalApiContext } from "../context/GoalApiContext";
import { autoCurrency, toNumber } from "../helpers/CurrencyFormatter";
import GoalsList from "./GoalsList";
import Input from "./ui/Input";
import { IGoal } from "../api.ts/GoalApi";

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
    <div className="flex w-full flex-col gap-4 rounded-md lg:flex-row">
      <div className="grid grid-cols-3 gap-2 rounded-md bg-[#ffffff] p-3 lg:w-96">
        <Input
          label="Nome"
          value={name}
          onChange={handleNameChange}
          className="col-span-3"
        />
        <Input
          label="Meta"
          value={monthlyGoal}
          onChange={handleMonthlyGoalChange}
          className="col-span-2"
        />
        <Input
          label="Dias"
          value={workingDays}
          onChange={handleWorkingDaysChange}
        />

        <button
          className="col-span-3 w-full rounded-md bg-[#3c6e71] p-2 text-[#ffffff]"
          onClick={addGoal}
        >
          Adicionar Meta
        </button>
      </div>

      <GoalsList goals={goals} />
    </div>
  );
}
