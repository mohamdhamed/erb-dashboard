import React from 'react';
import { DollarSign, FileText } from 'lucide-react';

const ExpensesList = ({ expenses }) => {
    return (
        <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <DollarSign size={18} className="text-red-600" />
                    سجل المصروفات والمشتريات
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-right text-gray-700">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3">التاريخ</th>
                            <th className="px-4 py-3">الفئة</th>
                            <th className="px-4 py-3">المورد</th>
                            <th className="px-4 py-3">المبلغ (IVA inc.)</th>
                            <th className="px-4 py-3">طريقة الدفع</th>
                            <th className="px-4 py-3">الرابط</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {expenses.map((item) => (
                            <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 whitespace-nowrap">{item.date}</td>
                                <td className="px-4 py-3">
                                    <span className="bg-red-50 text-red-700 border border-red-100 text-xs font-medium px-2.5 py-0.5 rounded-full">{item.category}</span>
                                </td>
                                <td className="px-4 py-3 text-gray-700">{item.vendor}</td>
                                <td className="px-4 py-3 font-bold text-red-600">-{item.amount} €</td>
                                <td className="px-4 py-3 text-gray-500">{item.method}</td>
                                <td className="px-4 py-3">
                                    <button className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1 hover:underline">
                                        <FileText size={12} /> عرض
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpensesList;
