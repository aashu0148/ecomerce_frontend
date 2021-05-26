import React from "react";
import { Doughnut } from "react-chartjs-2";

function OrderType() {
  const data = {
    labels: ["Topwear", "Bottomwear", "Footwear"],
    datasets: [
      {
        label: "Type distribution",
        data: [52, 45, 24],
        backgroundColor: ["#a354ef", "violet", "#7cd629"],
      },
    ],
  };

  return (
    <div
      style={{
        margin: "auto",
        minWidth: "250px",
        maxWidth: "450px",
        width: "100%",
        textAlign: "center",
      }}
    >
      <h2>Order Types</h2>
      <Doughnut data={data} />
    </div>
  );
}

export default OrderType;
