import {
    LayoutDashboard,
    HandCoins,
    WalletMinimal,
    LogOut
} from 'lucide-react'

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        id: '02',
        label: 'Income',
        icon: HandCoins,
        path: '/income'
    },
    {
        id: '03',
        label: 'Expense',
        icon: WalletMinimal,
        path: '/expense'
    },
    {
        id: '04',
        label: 'Logout',
        icon: LogOut,
        path: 'logout'
    }
]