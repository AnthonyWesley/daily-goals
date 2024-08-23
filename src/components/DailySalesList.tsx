import { toCurrency } from "../helpers/CurrencyFormatter";
import { IDailySales } from "../api.ts/DailySalesApi";

export default function DailySalesList({
  dailyList,
}: {
  dailyList: IDailySales[];
}) {
  // console.log(dailyList[0]?.day);

  return (
    <div className="max-h-72 w-full overflow-hidden overflow-y-scroll rounded-md">
      <table className="h-full w-full rounded-md border border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 bg-[#284B63] px-6 py-3 text-left text-base font-medium uppercase tracking-wider text-white">
              Valor
            </th>
            <th className="border-b-2 border-gray-300 bg-[#284B63] px-6 py-3 text-left text-base font-medium uppercase tracking-wider text-white">
              Dia
            </th>
          </tr>
        </thead>
        <tbody>
          {dailyList?.map((date, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-neutral-100" : "bg-neutral-200"}
            >
              <td className="border-b border-gray-200 px-6 py-4 text-lg">
                {toCurrency(date.sales)}
              </td>
              <td className="border-b border-gray-200 px-6 py-4 text-lg">
                {(date.day as Date).toLocaleDateString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
