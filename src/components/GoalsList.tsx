import { useState } from "react";
import { IGoal } from "../api.ts/GoalApi";
import { useDailySalesContext } from "../context/DailySalesContext";
import { useGoalApiContext } from "../context/GoalApiContext";
import { parseCurrency, toCurrency } from "../helpers/CurrencyFormatter";
import Card from "./ui/Card";

export default function GoalsList({ goals }: { goals: IGoal[] }) {
  const { updateGoal, deleteGoal } = useGoalApiContext();
  const { dailySales } = useDailySalesContext();
  const [updatedGoal, setUpdatedGoal] = useState<IGoal | null>(null);

  const handleEdit = async (goal: IGoal) => {
    const goalToUpdate = updatedGoal || goal;
    if (goalToUpdate) {
      await updateGoal(goalToUpdate.id ?? "", {
        name: goalToUpdate.name,
        monthlyGoal: parseCurrency(goalToUpdate.monthlyGoal),
        workingDays: Number(goalToUpdate.workingDays),
      });
    }
  };

  const handleDelete = async () => {
    const goalToUpdate = updatedGoal || goals[0];
    await deleteGoal(goalToUpdate?.id ?? "");
  };

  const menuOptions = (goal: IGoal) => [
    { id: "delete", label: "ph:trash", onClick: handleDelete },
    { id: "edit", label: "line-md:edit", onClick: () => handleEdit(goal) },
  ];

  const handleWorkingDaysChange = (goal: IGoal, value: number) => {
    setUpdatedGoal({
      ...goal,
      workingDays: value,
    });
  };

  const handleMonthlyGoalChange = (goal: IGoal, value: number) => {
    setUpdatedGoal({
      ...goal,
      monthlyGoal: value,
    });
  };

  const calculateTotalSales = dailySales.reduce(
    (sum, item) => sum + item.sales,
    0,
  );
  const calculateDailyPending = goals[0]?.workingDays - dailySales.length;

  const cardStyle = "bg-white p-2 text-4xl rounded-md font-semibold";
  return goals.map((goal) => (
    <div
      key={goal.id}
      className="flex w-full flex-col gap-2 lg:grid lg:grid-cols-2"
    >
      <Card
        className={cardStyle}
        label="TOTAL DE VENDAS"
        value={toCurrency(calculateTotalSales)}
        isDisabled={true}
      />
      <Card
        className={cardStyle}
        label="META DO DIA"
        value={toCurrency(
          (goal.monthlyGoal - calculateTotalSales) / calculateDailyPending,
        )}
        isDisabled={true}
      />
      <Card
        className={cardStyle}
        label="META DO MÊS"
        value={toCurrency(goal.monthlyGoal)}
        onChange={(value) => handleMonthlyGoalChange(goal, value as number)}
        menuOptions={menuOptions(goal)}
      />
      <Card
        className={cardStyle}
        label="DIAS RESTANTES"
        value={goal.workingDays - dailySales.length}
        onChange={(value) => handleWorkingDaysChange(goal, value as number)}
        menuOptions={menuOptions(goal)}
        isCurrency
      />
    </div>
  ));
}
