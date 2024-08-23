import { createContext, useState, useContext } from "react";
import { DailySalesApi, IDailySales } from "../api.ts/DailySalesApi";

interface IDailySalesContext {
  dailySales: IDailySales[];
  getAllDailySales: (id: string) => Promise<IDailySales[]>;
  createDaySales: (DaySales: IDailySales) => Promise<void>;
  deleteDaySales: (id: string) => Promise<void>;
  updateDaySales: (id: string, DaySales: IDailySales) => Promise<void>;
}

export const DailySalesContext = createContext<IDailySalesContext | null>(null);

export default function dailySalesApiProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const dailySalesApi = new DailySalesApi();
  const [dailySales, setDailySales] = useState<IDailySales[]>([]);

  const getAllDailySales = async (id: string) => {
    const data = await dailySalesApi.list(id);
    const formattedDailySales = await data.map((todo: IDailySales) => ({
      ...todo,
      day: new Date(todo.day),
    }));
    setDailySales(formattedDailySales);
    return formattedDailySales;
  };

  const createDaySales = async (goal: IDailySales) => {
    const data = await dailySalesApi.write(goal);
    if (data) {
      getAllDailySales(goal.goalId);
    }
  };

  const deleteDaySales = async (id: string) => {
    const data = await dailySalesApi.delete(id);
    if (data) {
      getAllDailySales(id);
    }
  };
  const updateDaySales = async (id: string, goal: IDailySales) => {
    const data = await dailySalesApi.update(id, goal);
    if (data) {
      getAllDailySales(id);
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
      "use DailySalesContext must be used within a TaskApiProvider",
    );

  return context;
}
