import { createContext, useContext, useEffect, useState } from "react";
import { GoalApi, IGoal, instanceGoal } from "../api.ts/GoalApi";

interface IGoalApiContext {
  ip: string;
  goals: IGoal[];
  getAllGoals: () => Promise<void>;
  createGoal: (goal: IGoal) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  updateGoal: (id: string, goal: IGoal) => Promise<void>;
  loadingGoalApi: boolean;
}

export const GoalApiContext = createContext<IGoalApiContext | null>(null);

export default function GoalApiProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const goalApi = new GoalApi();
  const [ip, setIp] = useState("");
  const [goals, setGoals] = useState<IGoal[]>([]);
  const [loadingGoalApi, setLoadingGoalApi] = useState(false);
  const getUserIp = async () => {
    const data = await goalApi.getUserDeviceId();

    if (data) {
      setIp(data);
    }
  };
  const getAllGoals = async () => {
    const data = await goalApi.list();

    if (data) {
      setGoals(data);
    }
  };

  const createGoal = async (goal: IGoal) => {
    const data = await goalApi.write(goal);
    if (data) {
      getAllGoals();
    }
  };

  const deleteGoal = async (id: string) => {
    const data = await goalApi.delete(id);
    if (data) {
      getAllGoals();
    }
  };
  const updateGoal = async (id: string, goal: IGoal) => {
    const data = await goalApi.update(id, goal);
    if (data) {
      getAllGoals();
    }
  };

  instanceGoal.interceptors.request.use(
    (req) => {
      setLoadingGoalApi(true);
      return req;
    },
    (error) => {
      setLoadingGoalApi(false);
      return Promise.reject(error);
    },
  );

  instanceGoal.interceptors.response.use(
    (res) => {
      setLoadingGoalApi(false);
      return res;
    },
    (error) => {
      setLoadingGoalApi(false);
      if (error.response && error.response.status === 404) {
      }
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    getUserIp();
    getAllGoals();
  }, []);
  return (
    <GoalApiContext.Provider
      value={{
        ip,
        goals,
        getAllGoals,
        createGoal,
        deleteGoal,
        updateGoal,
        loadingGoalApi,
      }}
    >
      {children}
    </GoalApiContext.Provider>
  );
}

export function useGoalApiContext() {
  const context = useContext(GoalApiContext);

  if (!context)
    throw new Error("useGoalApiContext must be used within a TaskApiProvider");

  return context;
}
