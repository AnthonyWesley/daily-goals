import { parseCurrency, toCurrency } from "../helpers/CurrencyFormatter";
import { IDailySales } from "../api.ts/DailySalesApi";
import Card from "./ui/Card";
import { useDailySalesContext } from "../context/DailySalesContext";
import { useState } from "react";
import { IGoal } from "../api.ts/GoalApi";

export default function DailySalesList({
  dailyList,
  goals,
}: {
  dailyList: IDailySales[];
  goals: IGoal[];
}) {
  const { updateDaySales } = useDailySalesContext();

  const [updatedDaily, setUpdatedDaily] = useState<{
    id: string;
    sales: number;
  } | null>(null);

  const handleEdit = async () => {
    console.log(updatedDaily);

    if (updatedDaily) {
      await updateDaySales(updatedDaily.id, {
        day: new Date(),
        sales: parseCurrency(updatedDaily.sales),
        goalId: goals[0]?.id ?? "",
      });
      setUpdatedDaily(null);
    }
  };

  const handleDelete = async () => {
    console.log("deletou");
  };

  const menuOptions = [
    { id: "delete", label: "ph:trash", onClick: handleDelete },
    { id: "edit", label: "line-md:edit", onClick: handleEdit },
  ];

  return (
    <div className="max-h-72 w-full overflow-hidden overflow-y-scroll rounded-md">
      <table className="h-full w-full rounded-md border border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 bg-[#284B63] px-6 py-3 text-left text-base font-medium uppercase tracking-wider text-white">
              Dia
            </th>
            <th className="border-b-2 border-gray-300 bg-[#284B63] px-6 py-3 text-left text-base font-medium uppercase tracking-wider text-white">
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          {dailyList?.map((sale, index) => (
            <tr
              key={sale.id}
              className={index % 2 === 0 ? "bg-neutral-100" : "bg-neutral-200"}
            >
              <td className="flex w-40 border-b border-gray-200 p-1 text-lg">
                <Card
                  value={(sale.day as Date).toLocaleDateString("pt-BR")}
                  isDisabled={true}
                />
              </td>
              <td className="w-80 border-b border-gray-200 p-1 text-lg">
                <Card
                  value={toCurrency(sale.sales)}
                  onChange={(e) =>
                    setUpdatedDaily({ id: sale.id ?? "", sales: e as number })
                  }
                  menuOptions={menuOptions}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
