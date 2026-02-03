import React from 'react';
import { DollarSign, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const DashboardStats = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-50 p-2.5 rounded-lg">
                        <DollarSign size={20} className="text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+12%</span>
                </div>
                <div>
                    <div className="text-gray-500 text-sm font-medium mb-1">إيرادات الشهر</div>
                    <div className="text-2xl font-bold text-gray-800">€3,450</div>
                </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-red-50 p-2.5 rounded-lg">
                        <AlertCircle size={20} className="text-red-600" />
                    </div>
                    <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">+5%</span>
                </div>
                <div>
                    <div className="text-gray-500 text-sm font-medium mb-1">المصاريف</div>
                    <div className="text-2xl font-bold text-gray-800">€1,200</div>
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
                    <div className="text-2xl font-bold text-gray-800">€2,250</div>
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
                    <div className="text-2xl font-bold text-gray-800">€450</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
