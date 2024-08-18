import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Transaction, TransactionType } from "../helpers/types/CommonTypes";
import globalstyles from "../App.module.css";

type ChartData = {
  Date?: string;
  Income: number;
  Expense: number;
  Savings: number;
};

const Dashboard = (props: { transactions: Transaction[] }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    makeChartData();
  }, [props.transactions]);

  const makeChartData = () => {
    let chartData: ChartData[] = [];

    props.transactions.forEach((transaction) => {
      let chartDataNode =
        chartData.find((data) => data.Date && data.Date === transaction.date) ??
        null;
      if (chartDataNode) {
        if (transaction.transactionType === TransactionType.Income) {
          chartDataNode.Income += Number(transaction.sourceValue);
        } else if (transaction.transactionType === TransactionType.Expense) {
          chartDataNode.Expense += Number(transaction.sourceValue);
        } else {
          chartDataNode.Savings += Number(transaction.sourceValue);
        }

        chartData = chartData.map((data) =>
          data.Date === transaction.date ? chartDataNode : data
        ) as ChartData[];
      } else {
        let newChartDataNode: ChartData = {
          Date: transaction.date,
          Income: 0,
          Expense: 0,
          Savings: 0,
        };
        if (transaction.transactionType === TransactionType.Income) {
          newChartDataNode.Income = Number(transaction.sourceValue);
        } else if (transaction.transactionType === TransactionType.Expense) {
          newChartDataNode.Expense = Number(transaction.sourceValue);
        } else {
          newChartDataNode.Savings = Number(transaction.sourceValue);
        }
        chartData.push(newChartDataNode);
      }
    });
    setChartData(chartData);
  };

  return (
    <>
      <h2 className={globalstyles.inputformheading}>Dashboard</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Income"
            stroke="green"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="Expense" stroke="red" />
          <Line type="monotone" dataKey="Savings" stroke="blue" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Dashboard;
