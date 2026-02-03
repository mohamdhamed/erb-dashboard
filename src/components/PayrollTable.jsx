import React from 'react';
import { Users, Printer, Edit, Trash2 } from 'lucide-react';

const PayrollTable = ({ payroll, onEdit, onDelete }) => {
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
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-right text-gray-700">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3">الموظف</th>
                            <th className="px-4 py-3">ساعات</th>
                            <th className="px-4 py-3">المعدل</th>
                            <th className="px-4 py-3">مكافآت</th>
                            <th className="px-4 py-3">سلفيات</th>
                            <th className="px-4 py-3 bg-blue-50 text-blue-800">الصافي المستحق</th>
                            <th className="px-4 py-3">حالة التحويل</th>
                            <th className="px-4 py-3"></th>
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
                                <td className="px-4 py-3 flex gap-2 justify-end">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition"
                                        title="تعديل"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition"
                                        title="حذف"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View (Cards) */}
            <div className="md:hidden flex flex-col gap-3 p-3 bg-gray-50">
                {payroll.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-gray-800">{item.name}</h4>
                                <span className="text-xs text-gray-500">{item.totalHours} ساعة @ {item.rate}€</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => onEdit(item)} className="text-blue-500 p-1 bg-blue-50 rounded"><Edit size={14} /></button>
                                <button onClick={() => onDelete(item.id)} className="text-red-500 p-1 bg-red-50 rounded"><Trash2 size={14} /></button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center bg-gray-50 p-2 rounded mb-2">
                            <div className="text-xs space-y-1">
                                <div className="text-green-600">+{item.bonus} مكافأة</div>
                                <div className="text-red-600">-{item.advance} سلفة</div>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs text-gray-500">الصافي</span>
                                <span className="font-bold text-blue-700 text-lg">
                                    {calculateNetPay(item.totalHours, item.rate, item.bonus, item.advance)} €
                                </span>
                            </div>
                        </div>

                        <div className="text-center">
                            {item.status === 'تم التحويل' ? (
                                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs border border-green-200 inline-block">{item.status}</span>
                            ) : (
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs border border-yellow-200 inline-block">{item.status}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PayrollTable;
