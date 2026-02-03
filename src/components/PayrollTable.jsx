import React from 'react';
import { Users, Printer } from 'lucide-react';

const PayrollTable = ({ payroll }) => {
    // دالة مساعدة لحساب صافي الراتب
    const calculateNetPay = (hours, rate, bonus, advance) => {
        return (hours * rate) + bonus - advance;
    };

    return (
        <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <Users size={18} className="text-green-600" />
                    كشف الرواتب وساعات العمل
                </h3>
                <button className="text-xs flex items-center gap-1 bg-white border px-3 py-1.5 rounded hover:bg-gray-50 text-gray-600">
                    <Printer size={14} /> طباعة الكشف
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-right text-gray-700">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3">اسم العامل</th>
                            <th className="px-4 py-3">ساعات العمل</th>
                            <th className="px-4 py-3">سعر الساعة</th>
                            <th className="px-4 py-3">بدلات</th>
                            <th className="px-4 py-3">سلفيات</th>
                            <th className="px-4 py-3 bg-blue-50 text-blue-800">الصافي المستحق</th>
                            <th className="px-4 py-3">حالة التحويل</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {payroll.map((item) => (
                            <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                                <td className="px-4 py-3 font-mono text-gray-600">{item.totalHours}</td>
                                <td className="px-4 py-3 text-gray-500">{item.rate} €</td>
                                <td className="px-4 py-3 text-green-600 text-xs">+{item.bonus} €</td>
                                <td className="px-4 py-3 text-red-600 text-xs">-{item.advance} €</td>
                                <td className="px-4 py-3 font-bold bg-blue-50 text-blue-700 border-r border-l border-blue-100">
                                    {calculateNetPay(item.totalHours, item.rate, item.bonus, item.advance)} €
                                </td>
                                <td className="px-4 py-3">
                                    {item.status === 'تم التحويل' ? (
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs border border-green-200 block text-center w-full max-w-[80px]">{item.status}</span>
                                    ) : (
                                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs border border-yellow-200 block text-center w-full max-w-[80px]">{item.status}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayrollTable;
