import React from "react";
import { Line } from "react-chartjs-2";

function OrderType() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Augest",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Sales 2020",
        data: [35, 15, 64, 43, 12, 46, 34, 86, 66, 76],
        borderColor: ["#a354ef"],
        backgroundColor: ["#a354ef"],
        pointBackgroundColor: ["#a354ef"],
        pointBorderColor: ["#a354ef"],
      },
      {
        label: "Sales 2021",
        data: [52, 45, 24, 32, 56, 44, 55, 70, 78],
        borderColor: ["#7cd629"],
        backgroundColor: ["#7cd629"],
        pointBackgroundColor: ["#7cd629"],
        pointBorderColor: ["#7cd629"],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Sales in last 2 years",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            // stepSize: 10,
            max: 200,
          },
        },
      ],
    },
  };

  return (
    <div
      style={{
        minWidth: "600px",
        maxWidth: "950px",
        width: "100%",
        textAlign: "center",
      }}
    >
      <h2>Sales in last Two Years</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default OrderType;
