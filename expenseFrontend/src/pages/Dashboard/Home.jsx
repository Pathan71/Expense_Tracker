import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosIntance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import InfoCard from '../../components/Cards/InfoCard';
import { CreditCard, HandCoins, WalletMinimal } from 'lucide-react';
import { addThousandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpense from "../../components/Dashboard/Last30DaysExpense";
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';


const Home = () => {
  useUserAuth();

  const navigate = useNavigate()

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchDashboardData = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await axiosIntance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);

      if (response.data) {
        setDashboardData(response.data)
      }
    }
    catch (error) {
      console.log('Something went wrong. Please try again.', error)
    }
    finally {
      setLoading(false)
    } 
  }

  useEffect(() => {
    fetchDashboardData();
    return () => { }
  }, [])

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 max-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<CreditCard />}
            label='Total Balance'
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color='bg-violet-500'
          />

          <InfoCard
            icon={<WalletMinimal />}
            label='Total Income'
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color='bg-orange-500'
          />

          <InfoCard
            icon={<HandCoins />}
            label='Total Expense'
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color='bg-red-500'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <RecentTransactions
            transactions={dashboardData?.recentTransaction}
            onSeeMore={() => navigate('/expense')}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpense?.transaction || []}
            onSeeMore={() => navigate('/expense')}
          />

          <Last30DaysExpense
            data={dashboardData?.last30DaysExpense?.transaction || []}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transaction?.slice(0, 4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transaction || []}
            onSeeMore={() => navigate('/income')}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home