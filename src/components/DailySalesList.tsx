import { parseCurrency, toCurrency } from "../helpers/CurrencyFormatter";
import { IDailySales } from "../api.ts/DailySalesApi";
import { useDailySalesContext } from "../context/DailySalesContext";
import { useRef, useState } from "react";
import { IGoal } from "../api.ts/GoalApi";
import EditableInput from "./ui/EditableInput";

export default function DailySalesList({
  dailyList,
}: {
  dailyList: IDailySales[];
  goals: IGoal[];
}) {
  const { updateDaySales, deleteDaySales } = useDailySalesContext();
  const updatedListRef = useRef<IDailySales | undefined>();

  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});

  const handleDailySalesChange = (value: string, daily: IDailySales) => {
    const updatedGoal = {
      ...daily,
      sales: parseCurrency(value),
    };
    updatedListRef.current = updatedGoal;
  };

  const handleEdit = async (id: string) => {
    const dailyList = updatedListRef.current;
    if (dailyList) {
      await updateDaySales(dailyList.id ?? "", dailyList);
    }
    setIsEditing((prev) => ({ ...prev, [id]: false }));
  };

  const handleDelete = async (id: string, goalId: string) => {
    if (goalId) await deleteDaySales(id, goalId);
  };

  const toggleEdit = (id: string) => {
    setIsEditing((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const options = (id: string, goalId: string) => [
    {
      id: "delete",
      label: "ph:trash",
      onClick: () => handleDelete(id, goalId),
    },
    {
      id: "edit",
      label: "line-md:edit",
      onClick: () => handleEdit(id),
      action: () => toggleEdit(id),
    },
  ];

  return (
    <div>
      <div className="rounded-sm bg-[#3c6e71] p-2 text-white">
        VENDAS DIÁRIAS
      </div>
      <div className="max-h-[58vh] w-full overflow-hidden overflow-y-scroll rounded-md">
        <table className="h-full w-full rounded-md border border-gray-300 bg-white">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-300 bg-[#3c6e71] px-6 py-3 text-left text-base font-medium uppercase tracking-wider text-white">
                Dia
              </th>
              <th className="border-b-2 border-gray-300 bg-[#3c6e71] px-6 py-3 text-left text-base font-medium uppercase tracking-wider text-white">
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            {dailyList?.map((sale, index) => (
              <tr
                key={sale.id}
                className={` ${index % 2 === 0 ? "bg-neutral-100" : "bg-neutral-200"}`}
              >
                <td className="border-b border-gray-200 p-4 text-lg">
                  <EditableInput
                    // options={options(sale.id ?? "", sale.goalId)}
                    initialValue={(sale.day as Date).toLocaleDateString(
                      "pt-BR",
                    )}
                    disabled={true}
                    className="w-28 lg:w-40"
                  />
                </td>
                <td className="border-b border-gray-200 text-lg">
                  <EditableInput
                    options={options(sale.id ?? "", sale.goalId)}
                    initialValue={toCurrency(sale.sales)}
                    onChange={(i) => handleDailySalesChange(i, sale)}
                    disabled={!isEditing[sale.id ?? ""]}
                    className="w-full px-4"
                    isCurrency
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
