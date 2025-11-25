import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ['#875CF5', '#FA2C37', '#FF9600', '#4F39f6']

const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const[chartData, setChartData] = useState([])

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount
        }));
        setChartData(dataArr)
    };

    useEffect(() => {
        prepareChartData();

        return () => {}
    }, [data]);

    return (
        <div className='bg-white p-6 mt-5 rounded-2xl shadow-md shadow-gray-100 border-gray-200/50'>
            <div className='flex items-center justify-between mb-1'>
                <h5 className='text-lg'>Last 60 Days Income</h5>
            </div>

            <CustomPieChart
                data={chartData}
                label='Total Income'
                totalAmount={`${totalIncome}`}
                showTextAnchor
                color={COLORS}
            />
        </div>
    )
}

export default RecentIncomeWithChart