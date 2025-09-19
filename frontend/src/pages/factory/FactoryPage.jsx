import FactoriesTable from "../../components/tables/FactoriesTable/FactoriesTable";
import './factory-page.css'

export const FactoryPage = () => {
    return (
        <div className='factory-page-container'>
            <div className='factory-table'>
                <FactoriesTable/>
            </div>
        </div>
    )
}