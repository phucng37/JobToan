import React, { useEffect, useRef } from "react";

import { CChart, CChartBar, CChartPie } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";

const ChartPieBody = ({ data, labels }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    document.documentElement.addEventListener("ColorSchemeChange", () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            "--cui-border-color-translucent"
          );
          chartRef.current.options.scales.x.grid.color = getStyle(
            "--cui-border-color-translucent"
          );
          chartRef.current.options.scales.x.ticks.color =
            getStyle("--cui-body-color");
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            "--cui-border-color-translucent"
          );
          chartRef.current.options.scales.y.grid.color = getStyle(
            "--cui-border-color-translucent"
          );
          chartRef.current.options.scales.y.ticks.color =
            getStyle("--cui-body-color");
          chartRef.current.update();
        });
      }
    });
  }, [chartRef]);

  return (
    <>
      <CChart
        type="doughnut"
        style={{ height: "400px" }}
        data={{
          labels: labels,
          datasets: [
            {
              backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
              data: data,
            },
          ],
        }}
        height={150}
        options={{
          plugins: {
            legend: {
                position: 'right',
              labels: {
                color: getStyle("--cui-body-color"),

              },
            },
          },
        }}
      />
    </>
  );
};

export default ChartPieBody;
