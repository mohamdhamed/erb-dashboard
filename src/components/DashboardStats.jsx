import React from 'react';
import { DollarSign, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const DashboardStats = ({ revenue = 0, expenses = 0, payroll = 0, outstanding = 0 }) => {
    // Net Profit = Revenue - (Operating Expenses + Paid Payroll)
    const netProfit = revenue - (expenses + payroll);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-50 p-2.5 rounded-lg">
                        <DollarSign size={20} className="text-blue-600" />
                    </div>
                </div>
                <div>
                    <div className="text-gray-500 text-sm font-medium mb-1">إيرادات الشهر</div>
                    <div className="text-2xl font-bold text-gray-800">€{revenue.toFixed(2)}</div>
                </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-red-50 p-2.5 rounded-lg">
                        <AlertCircle size={20} className="text-red-600" />
                    </div>
                </div>
                <div>
                    <div className="text-gray-500 text-sm font-medium mb-1">المصاريف + الرواتب</div>
                    <div className="text-2xl font-bold text-gray-800">€{(expenses + payroll).toFixed(2)}</div>
                    <div className="text-xs text-red-500 mt-1">مصاريف: €{expenses.toFixed(0)} | رواتب: €{payroll.toFixed(0)}</div>
                </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-green-50 p-2.5 rounded-lg">
                        <CheckCircle size={20} className="text-green-600" />
                    </div>
                </div>
                <div>
                    <div className="text-gray-500 text-sm font-medium mb-1">صافي الربح</div>
                    <div className="text-2xl font-bold text-gray-800">€{netProfit.toFixed(2)}</div>
                </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-purple-50 p-2.5 rounded-lg">
                        <Clock size={20} className="text-purple-600" />
                    </div>
                </div>
                <div>
                    <div className="text-gray-500 text-sm font-medium mb-1">مستحقات معلقة</div>
                    <div className="text-2xl font-bold text-gray-800">€{outstanding.toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
