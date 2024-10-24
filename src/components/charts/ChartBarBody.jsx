import React, { useEffect, useRef } from "react";

import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";
import { MONTHS, CONFIG } from 'src/helpers/chart';

const ChartBarBody = ({ data, config = CONFIG}) => {
  const chartRef = useRef(null);
  console.log('config: ', config);
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
      <CChartBar
        ref={chartRef}
        style={{ height: "300px", marginTop: "40px" }}
        data={{
          labels: MONTHS,
          datasets: [
            {
              label: config.datasets.label,
              backgroundColor: `rgba(${getStyle("--cui-info-rgb")}, .1)`,
              borderColor: getStyle("--cui-info"),
              pointHoverBackgroundColor: getStyle("--cui-info"),
              borderWidth: 2,
              data: data,
              fill: true,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle("--cui-border-color-translucent"),
                drawOnChartArea: false,
              },
              // title: {
              //   color: 'red',
              //   align: 'end',
              //   display: true,
              //   text: 'Month',
              //   font: {
              //     size: 16
              //   }
              // },
              ticks: {
                color: getStyle("--cui-body-color"),
              },
            },
            y: {
              beginAtZero: true,
              // title: {
              //   color: 'red',
              //   align: 'end',
              //   display: true,
              //   text: 'Product',
              //   font: {
              //     size: 16
              //   }
              // },
              border: {
                color: getStyle("--cui-border-color-translucent"),
              },
              grid: {
                color: getStyle("--cui-border-color-translucent"),
              },
              max: Math.ceil(Math.max(...data) + 50.5),
              ticks: {
                color: getStyle("--cui-body-color"),
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
                callback: function(value, index, ticks) {
                  return  value + config.scales.y.suffix;
              }
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
        // options={{
        //   indexAxis: 'y'
        // }}
      />
    </>
  );
};

export default ChartBarBody;
