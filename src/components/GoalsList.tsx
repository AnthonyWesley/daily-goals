import { useRef, useState } from "react";
import { IGoal } from "../api.ts/GoalApi";
import { useDailySalesContext } from "../context/DailySalesContext";
import { useGoalApiContext } from "../context/GoalApiContext";
import { parseCurrency, toCurrency } from "../helpers/CurrencyFormatter";
import EditableInput from "./ui/EditableInput";
import { toast } from "react-toastify";

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
      toast.success(`Meta editada com sucesso!`);
    }
  };

  const handleDelete = async () => {
    const goalsId = goals[0].id;
    if (goalsId) await deleteGoal(goalsId);
    toast.success(`Meta deletada com sucesso!`);
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

  const cardStyle = "bg-white p-2 text-3xl rounded-md font-semibold uppercase";

  return goals.map((goal) => (
    <div key={goal.id} className="flex w-full flex-col gap-2">
      <div className="col-span-2 flex w-full items-center justify-between rounded-md bg-[#3c6e71] p-2 text-3xl font-semibold uppercase text-white">
        <EditableInput
          label="Meta Mensal"
          initialValue={toCurrency(goal.monthlyGoal)}
          onChange={(i) => handleMonthlyGoalChange(i, goal)}
          disabled={isEditing}
          isCurrency
        />
        <EditableInput
          label="Dias Totais"
          options={options}
          initialValue={goal.workingDays}
          onChange={(i) => handleWorkingDaysChange(i, goal)}
          disabled={isEditing}
          className="w-80"
        />
      </div>
      <div className="flex flex-col gap-2">
        <EditableInput
          label="Meta Diária"
          className={cardStyle}
          initialValue={toCurrency(
            (goal.monthlyGoal - calculateTotalSales) / calculateDailyPending,
          )}
          disabled={true}
        />
        <EditableInput
          label="Total de Vendas"
          className={cardStyle}
          initialValue={toCurrency(calculateTotalSales)}
          disabled={true}
        />
        <EditableInput
          label="Vendas Restantes"
          className={cardStyle}
          initialValue={toCurrency(goal.monthlyGoal - calculateTotalSales)}
          disabled={true}
        />
        <EditableInput
          label="Dias Restantes"
          className={cardStyle}
          initialValue={goal.workingDays - dailySales.length}
          disabled={true}
        />
      </div>
    </div>
  ));
}
