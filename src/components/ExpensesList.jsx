import React from 'react';
import { DollarSign, FileText, Edit, Trash2 } from 'lucide-react';

const ExpensesList = ({ expenses, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <DollarSign size={18} className="text-red-600" />
                    سجل المصروفات والمشتريات
                </h3>
            </div>
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-right text-gray-700">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3">التاريخ</th>
                            <th className="px-4 py-3">البند</th>
                            <th className="px-4 py-3">الفئة</th>
                            <th className="px-4 py-3">المورد</th>
                            <th className="px-4 py-3">القيمة</th>
                            <th className="px-4 py-3">الدفع</th>
                            <th className="px-4 py-3">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {expenses.map((item) => (
                            <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{item.date}</td>
                                <td className="px-4 py-3 font-medium text-gray-900">{item.item}</td>
                                <td className="px-4 py-3">
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">{item.category}</span>
                                </td>
                                <td className="px-4 py-3 text-gray-700">{item.vendor}</td>
                                <td className="px-4 py-3 font-bold text-red-600">-{item.amount} €</td>
                                <td className="px-4 py-3 text-gray-500">{item.method}</td>
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
                {expenses.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-gray-800">{item.item}</h4>
                                <span className="text-xs text-gray-500">{item.date}</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => onEdit(item)} className="text-blue-500 p-1 bg-blue-50 rounded"><Edit size={14} /></button>
                                <button onClick={() => onDelete(item.id)} className="text-red-500 p-1 bg-red-50 rounded"><Trash2 size={14} /></button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs border border-gray-200">{item.category}</span>
                            <span className="text-gray-500 text-xs flex items-center">{item.method}</span>
                        </div>

                        <div className="flex justify-between items-center border-t pt-2 mt-2">
                            <span className="text-gray-600 text-sm">{item.vendor}</span>
                            <span className="font-bold text-red-600">-{item.amount} €</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpensesList;
