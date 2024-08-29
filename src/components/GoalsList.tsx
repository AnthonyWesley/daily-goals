import { useState } from "react";
import { IGoal } from "../api.ts/GoalApi";
import { useGoalApiContext } from "../context/GoalApiContext";
import { parseCurrency, toCurrency } from "../helpers/CurrencyFormatter";
import Card from "./ui/Card";
import { useDailySalesContext } from "../context/DailySalesContext";

export default function GoalsList({ goals }: { goals: IGoal[] }) {
  const { updateGoal } = useGoalApiContext();
  const { dailySales } = useDailySalesContext();
  const [updatedGoal, setUpdatedGoal] = useState<IGoal | null>(null);
  console.log(dailySales);

  const onConfirm = async (b: boolean) => {
    if (b && updatedGoal) {
      await updateGoal(updatedGoal.id ?? "", {
        name: updatedGoal.name,
        monthlyGoal: parseCurrency(updatedGoal.monthlyGoal),
        workingDays: Number(updatedGoal.workingDays),
      });
    }
  };

  const handleWorkingDaysChange = (goal: IGoal, newValue: number) => {
    setUpdatedGoal({
      ...goal,
      workingDays: newValue,
    });
  };

  const handleMonthlyGoalChange = (goal: IGoal, newValue: number) => {
    setUpdatedGoal({ ...goal, monthlyGoal: newValue });
  };

  const calculateTotalSales = dailySales.reduce(
    (sum, item) => sum + item.sales,
    0,
  );
  const calculateDailyPending = goals[0]?.workingDays - dailySales.length;

  return goals.map((goal) => (
    <div
      key={goal.id}
      className="flex w-full flex-col gap-2 lg:grid lg:grid-cols-3"
    >
      <Card
        label="META DO DIA"
        value={toCurrency(
          (goal.monthlyGoal - calculateTotalSales) / calculateDailyPending,
        )}
        isDisabled={true}
      />
      <Card
        label="TOTAL DE VENDAS"
        value={toCurrency(calculateTotalSales)}
        isDisabled={true}
      />
      <Card
        label="META DO MÊS"
        value={toCurrency(goal.monthlyGoal)}
        onChange={(newValue) => handleMonthlyGoalChange(goal, newValue)}
        confirm={onConfirm}
      />
      <Card
        label="ATÉ A META"
        value={toCurrency(goal.monthlyGoal - calculateTotalSales)}
        isDisabled={true}
      />
      <Card
        label="DIAS RESTANTES"
        value={goal.workingDays - dailySales.length}
        onChange={(newValue) => handleWorkingDaysChange(goal, newValue)}
        confirm={onConfirm}
        isCurrency
      />
    </div>
  ));
}
