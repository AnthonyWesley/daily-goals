import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import DailySalesArea from "./components/DailySalesArea";
import GoalsArea from "./components/GoalsArea";
import Dropdown from "./components/ui/Dropdown";
import Footer from "./components/ui/Footer";
import Spin from "./components/ui/Spin";
import { useDailySalesContext } from "./context/DailySalesContext";
import { useGoalApiContext } from "./context/GoalApiContext";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [option, setOption] = useState("");
  const { goals, loadingGoalApi } = useGoalApiContext();
  const { getAllDailySales, loadingDailyApi } = useDailySalesContext();

  const dropdownSelect = (option: string) => {
    setOption(option);
  };

  useEffect(() => {
    if (goals.length > 0) {
      getAllDailySales(goals.filter((g) => g.name === option)[0].id ?? "");
    }
  }, [option]);
  return (
    <div className="min-h-screen text-gray-900">
      <header className="bg-gray-800 py-4 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="p-4 text-xl font-bold">GERENCIADOR DE METAS</h1>
          <Dropdown
            dropdownList={goals.map((g) => g.name)}
            dropdownSelect={dropdownSelect}
          />
        </div>
      </header>

      <main className="container mx-auto p-2">
        <section className="flex w-full flex-col gap-2 lg:flex-row">
          <GoalsArea goals={goals.filter((g) => g.name === option)} />
          <DailySalesArea goals={goals.filter((g) => g.name === option)} />
          {/* <GoalCard className="bg-gray-800 text-white" />
          <GoalCard /> */}
        </section>
      </main>
      <Footer />
      <ToastContainer />
      {loadingGoalApi && <Spin />}
      {loadingDailyApi && <Spin />}
    </div>
  );
}
