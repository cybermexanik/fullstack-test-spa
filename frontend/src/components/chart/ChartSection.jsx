import React, { useState } from "react";
import { AgCharts } from "ag-charts-react";
import {factoryMockData} from "../data/MockChart";

const ChartSection = () => {
    const [chartOptions] = useState({
        data: factoryMockData,
        series: [
            {
                type: "line",
                xKey: "factory",
                yKey: "income",
                yName: "Annual Income",
                stroke: "#ffffff",
                strokeWidth: 2,
                marker: {
                    enabled: true,
                    size: 6,
                    fill: "#ffffff",
                    stroke: "#ffffff",
                },
                fill: "rgba(255,255,255,0.1)",
            },
        ],
        axes: [
            {
                type: "category",
                position: "bottom",
                label: {
                    color: "#ffffff"
                },
                line: {
                    stroke: "rgba(255,255,255,0.3)"
                },
            },
            {
                type: "number",
                position: "left",
                label: {
                    color: "#ffffff"
                },
                line: {
                    stroke: "rgba(255,255,255,0.3)"
                },
                gridLine: {
                    style: [
                        { stroke: "rgba(255,255,255,0.1)", lineDash: [] }
                    ]
                },
            },
        ],
        background: {
            fill: "transparent"
        },
        legend: {
            enabled: false
        },
    });

    return (
        <div
            style={{
                height: "400px",
                width: "100%",
                background: "linear-gradient(160deg,#2c2c2c,#1f1f1f)",
                padding: 0,
                boxSizing: "border-box",
            }}
        >
            <AgCharts options={chartOptions} />
        </div>
    );
};

export default ChartSection;
