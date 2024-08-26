import { useEffect, useState } from "react";
import { autoCurrency, toNumber } from "../helpers/CurrencyFormatter";
import Input from "./ui/Input";
import DailySalesList from "./DailySalesList";
import { useDailySalesContext } from "../context/DailySalesContext";
import { IGoal } from "../api.ts/GoalApi";
import { formatISO } from "date-fns";

export default function DailySalesArea({ goals }: { goals: IGoal[] }) {
  const [sales, setSales] = useState("");

  // const [dailyList, setDailyList] = useState<IDailySales[]>([]);
  const { createDaySales, getAllDailySales, dailySales } =
    useDailySalesContext();

  const handleSalesChange = (value: string) => {
    setSales(autoCurrency(value.replace(/[^\d]/g, "")));
  };

  const addDailySales = async (id: string) => {
    if (sales) {
      const saleAmount = toNumber(sales);
      const currentDate = formatISO(new Date());
      await createDaySales({
        day: currentDate,
        sales: saleAmount,
        goalId: id,
      });
    }
    await getAllDailySales(id);
  };

  useEffect(() => {
    const getList = async () => {
      if (goals.length > 0) {
        await getAllDailySales(goals[0]?.id ?? "");
      }
    };
    getList();
  }, [goals]);

  return goals.map((goal, i) => (
    <div key={i} className="flex w-full flex-col gap-4 rounded-md lg:flex-row">
      <div className="flex flex-col gap-1 rounded-md bg-[#ffffff] p-3 lg:w-[295px]">
        <Input
          label="Vendas de hoje"
          value={sales}
          onChange={handleSalesChange}
        />

        <button
          className="col-span-2 w-full rounded-md bg-[#3c6e71] py-2 text-[#ffffff]"
          onClick={() => addDailySales(goal.id ?? "")}
        >
          Adicionar Venda
        </button>
      </div>
      <DailySalesList dailyList={dailySales} />
    </div>
  ));
}
