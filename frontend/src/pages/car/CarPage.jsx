import CarsTable from "../../components/tables/CarsTable/CarsTable";
import './car-page.css'

export const CarPage = () => {
    return (
        <div className='car-page-container'>
            <div className='car-table'>
                <CarsTable/>
            </div>
        </div>
    )
}