import { useState } from "react";
import { autoCurrency, toNumber } from "../helpers/CurrencyFormatter";
import Input from "./ui/Input";
import DailySalesList from "./DailySalesList";
import { useDailySalesContext } from "../context/DailySalesContext";
import { IGoal } from "../api.ts/GoalApi";
import { formatISO } from "date-fns";
import Accordion from "./ui/Accordion";
import { toast } from "react-toastify";

export default function DailySalesArea({ goals }: { goals: IGoal[] }) {
  const [sales, setSales] = useState("");

  const { createDaySales, getAllDailySales, dailySales } =
    useDailySalesContext();

  const handleSalesChange = (value: string) => {
    setSales(autoCurrency(value.replace(/[^\d]/g, "")));
  };

  const addDailySales = async (id: string) => {
    if (sales.length > 1) {
      const saleAmount = toNumber(sales);
      const currentDate = formatISO(new Date());
      await createDaySales({
        day: currentDate,
        sales: saleAmount,
        goalId: id,
      });
      setSales("");

      await getAllDailySales(id);
      toast.success(`Venda adicionada com sucesso!`);
    }
  };

  return goals.map((goal, i) => (
    <div key={i} className="flex flex-col gap-1 rounded-md">
      <Accordion
        title={" ADICIONAR VENDA"}
        content={
          <div className="flex w-full flex-col gap-2 rounded-md bg-[#353535] p-3">
            <Input
              label="Vendas de hoje"
              value={sales}
              onChange={handleSalesChange}
            />

            <button
              className="rounded-md bg-[#3c6e71] py-2 text-[#ffffff]"
              onClick={() => addDailySales(goal.id ?? "")}
            >
              ADD
            </button>
          </div>
        }
      />

      <DailySalesList dailyList={dailySales} goals={goals} />
    </div>
  ));
}
