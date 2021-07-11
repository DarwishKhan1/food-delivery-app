import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const RevenuChart = ({ orders }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthlyRevenue = [];

  orders.forEach((order) => {
    const orderDate = new Date(order.date);

    const index = monthlyRevenue.findIndex((e) => {
      return (
        e.name ===
        monthNames[orderDate.getMonth()] + " " + orderDate.getFullYear()
      );
    });

    if (index >= 0) {
      monthlyRevenue[index]["Revenue"] =
        monthlyRevenue[index]["Revenue"] + parseInt(order.total_price);
    } else {
      console.log(order.date);
      monthlyRevenue.push({
        name: monthNames[orderDate.getMonth()] + " " + orderDate.getFullYear(),
        Revenue: parseInt(order.total_price),
      });
    }
  });

  console.log(monthlyRevenue);
  return (
    <div className="my-5 text-center">
      <h3 className="my-2">Total Revenue</h3>
      <ResponsiveContainer width="95%" height={400}>
        <LineChart
          width={900}
          height={400}
          data={monthlyRevenue}
          margin={{
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Revenue"
            stroke="#17a2b8"
            strokeWidth="3"
            activeDot={{ r: 10 }}
          />
          <Legend margin={{ top: 40 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenuChart;
