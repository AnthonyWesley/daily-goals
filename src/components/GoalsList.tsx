import { useRef, useState } from "react";
import { IGoal } from "../api.ts/GoalApi";
import { useDailySalesContext } from "../context/DailySalesContext";
import { useGoalApiContext } from "../context/GoalApiContext";
import { parseCurrency, toCurrency } from "../helpers/CurrencyFormatter";
import EditableInput from "./ui/EditableInput";

export default function GoalsList({ goals }: { goals: IGoal[] }) {
  const { updateGoal, deleteGoal } = useGoalApiContext();
  const { dailySales } = useDailySalesContext();
  const [isEditing, setIsEditing] = useState(true);
  const updatedListRef = useRef<IGoal | undefined>();

  const handleMonthlyGoalChange = (value: string, goal: IGoal) => {
    const updatedGoal = {
      ...goal,
      monthlyGoal: parseCurrency(value),
      workingDays: goal.workingDays,
    };
    updatedListRef.current = updatedGoal;
  };

  const handleWorkingDaysChange = (value: string, goal: IGoal) => {
    const updatedGoal = {
      ...goal,
      monthlyGoal: goal.monthlyGoal,
      workingDays: parseInt(value),
    };
    updatedListRef.current = updatedGoal;
  };

  const handleEdit = () => {
    if (updatedListRef.current) {
      updateGoal(updatedListRef.current.id ?? "", updatedListRef.current);
    }
  };

  const handleDelete = async () => {
    const goalsId = goals[0].id;
    if (goalsId) await deleteGoal(goalsId);
  };

  const options = [
    {
      id: "delete",
      label: "ph:trash",
      onClick: handleDelete,
    },
    {
      id: "edit",
      label: "line-md:edit",
      onClick: handleEdit,
      action: () => setIsEditing(!isEditing),
    },
  ];

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
      <EditableInput
        label="TOTAL DE VENDAS"
        className={cardStyle}
        options={options}
        initialValue={toCurrency(calculateTotalSales)}
        disabled={true}
      />
      <EditableInput
        label="META DO DIA"
        className={cardStyle}
        options={options}
        initialValue={toCurrency(
          (goal.monthlyGoal - calculateTotalSales) / calculateDailyPending,
        )}
        onChange={(i) => handleWorkingDaysChange(i, goal)}
        disabled={true}
      />
      <EditableInput
        label="META DO MÊS"
        className={cardStyle}
        options={options}
        initialValue={toCurrency(goal.monthlyGoal)}
        onChange={(i) => handleMonthlyGoalChange(i, goal)}
        disabled={isEditing}
        isDisabled
      />
      <EditableInput
        label="DIAS RESTANTES"
        className={cardStyle}
        options={options}
        initialValue={goal.workingDays - dailySales.length}
        onChange={(i) => handleWorkingDaysChange(i, goal)}
        disabled={isEditing}
        isDisabled
        isCurrency
      />
    </div>
  ));
}
