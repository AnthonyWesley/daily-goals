import { createContext, useState, useContext } from "react";
import { DailySalesApi, IDailySales } from "../api.ts/DailySalesApi";

interface IDailySalesContext {
  dailySales: IDailySales[];
  getAllDailySales: (goalId: string) => Promise<IDailySales[]>;
  createDaySales: (daySales: IDailySales) => Promise<void>;
  deleteDaySales: (id: string, goalId: string) => Promise<void>;
  updateDaySales: (id: string, daySales: IDailySales) => Promise<void>;
}

export const DailySalesContext = createContext<IDailySalesContext | null>(null);

export default function DailySalesApiProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const dailySalesApi = new DailySalesApi();
  const [dailySales, setDailySales] = useState<IDailySales[]>([]);

  const getAllDailySales = async (goalId: string) => {
    const data = await dailySalesApi.list(goalId);
    const formattedDailySales = data.map((sale: IDailySales) => ({
      ...sale,
      day: new Date(sale.day),
    }));
    setDailySales(formattedDailySales);
    return formattedDailySales;
  };

  const createDaySales = async (daySales: IDailySales) => {
    const data = await dailySalesApi.write(daySales);
    if (data) {
      await getAllDailySales(daySales.goalId);
    }
  };

  const deleteDaySales = async (id: string, goalId: string) => {
    const data = await dailySalesApi.delete(id);
    if (data) {
      await getAllDailySales(goalId);
    }
  };

  const updateDaySales = async (id: string, daySales: IDailySales) => {
    const data = await dailySalesApi.update(id, daySales);
    if (data) {
      await getAllDailySales(daySales.goalId);
    }
  };

  return (
    <DailySalesContext.Provider
      value={{
        dailySales,
        getAllDailySales,
        createDaySales,
        deleteDaySales,
        updateDaySales,
      }}
    >
      {children}
    </DailySalesContext.Provider>
  );
}

export function useDailySalesContext() {
  const context = useContext(DailySalesContext);

  if (!context)
    throw new Error(
      "useDailySalesContext must be used within a DailySalesApiProvider",
    );

  return context;
}
