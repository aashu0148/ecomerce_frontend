import React from "react";
import { Doughnut } from "react-chartjs-2";

function OrderDistribution() {
  const data = {
    labels: ["Completed", "Processing", "Cancelled"],
    datasets: [
      {
        label: "Orders distribution",
        data: [19, 160, 11],
        backgroundColor: ["#a55fe0", "skyblue", "coral"],
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
      <h2>Total Orders </h2>
      <Doughnut data={data} />
    </div>
  );
}

export default OrderDistribution;
