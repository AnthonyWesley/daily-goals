import {
  autoCurrency,
  parseCurrency,
  toCurrency,
} from "../helpers/CurrencyFormatter";
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
  const [sales, setSales] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSalesChange = (id: string, value: string) => {
    const sanitizedValue = value.replace(/[^\d]/g, "");
    setSales(autoCurrency(sanitizedValue));
    setSelectedId(id);
  };

  const onConfirm = async (confirmed: boolean) => {
    if (confirmed && selectedId && sales) {
      await updateDaySales(selectedId, {
        day: new Date(),
        sales: parseCurrency(sales),
        goalId: goals[0]?.id ?? "",
      });
    }
  };

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
              <td className="w-40 border-b border-gray-200 p-1 text-lg">
                <Card
                  value={(sale.day as Date).toLocaleDateString("pt-BR")}
                  confirm={onConfirm}
                  isDisabled={true} // Adjust this based on your conditions
                />
              </td>
              <td className="w-80 border-b border-gray-200 p-1 text-lg">
                <Card
                  value={toCurrency(sale.sales)}
                  onChange={(value) => handleSalesChange(sale.id ?? "", value)}
                  confirm={onConfirm}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
