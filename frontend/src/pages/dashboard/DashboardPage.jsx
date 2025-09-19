import './dashboard-page.css'
import React from "react";
import CarsTable from "../../components/tables/CarsTable/CarsTable";
import FactoriesTable from "../../components/tables/FactoriesTable/FactoriesTable";
import ChartSection from "../../components/chart/ChartSection";

export const DashboardPage = () => {
    return (
        <>
            <ChartSection/>
            <div className='dashboard-page-container'>
                <div className='dashboard-car-table'>
                    <CarsTable showActions={false}/>
                </div>
                <div className='dashboard-factory-table'>
                    <FactoriesTable showAction={false}/>
                </div>
            </div>
        </>
    )
};
