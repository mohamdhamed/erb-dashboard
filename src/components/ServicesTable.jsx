import React from 'react';
import { Briefcase, Filter, CheckCircle, Clock, Calendar } from 'lucide-react';

const ServicesTable = ({ services }) => {
    return (
        <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <Briefcase size={18} className="text-blue-600" />
                    جدول العمليات والخدمات
                </h3>
                <div className="flex gap-2">
                    <button className="text-xs flex items-center gap-1 bg-white border px-3 py-1.5 rounded hover:bg-gray-50 text-gray-600">
                        <Filter size={14} /> تصفية
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-right text-gray-700">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3">التاريخ</th>
                            <th className="px-4 py-3">العميل</th>
                            <th className="px-4 py-3">الخدمة</th>
                            <th className="px-4 py-3">الموقع</th>
                            <th className="px-4 py-3">الموظف</th>
                            <th className="px-4 py-3">ساعات</th>
                            <th className="px-4 py-3">القيمة (€)</th>
                            <th className="px-4 py-3">الحالة</th>
                            <th className="px-4 py-3">الفاتورة</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {services.map((item) => (
                            <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 whitespace-nowrap">{item.date}</td>
                                <td className="px-4 py-3 font-medium text-gray-900">{item.client}</td>
                                <td className="px-4 py-3">
                                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded border ${item.type === 'تنظيف عميق' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                            item.type === 'مكتبي' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                'bg-gray-50 text-gray-600 border-gray-200'
                                        }`}>
                                        {item.type}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-500">{item.location}</td>
                                <td className="px-4 py-3 text-gray-600">{item.staff}</td>
                                <td className="px-4 py-3 text-gray-600 font-mono">{item.hours}</td>
                                <td className="px-4 py-3 font-bold text-gray-800">{item.revenue} €</td>
                                <td className="px-4 py-3">
                                    {item.status === 'تم الدفع' ? (
                                        <span className="flex items-center text-green-600 gap-1 bg-green-50 w-fit px-2 py-0.5 rounded-full text-xs border border-green-100">
                                            <CheckCircle size={12} /> {item.status}
                                        </span>
                                    ) : item.status === 'بانتظار الدفع' ? (
                                        <span className="flex items-center text-orange-600 gap-1 bg-orange-50 w-fit px-2 py-0.5 rounded-full text-xs border border-orange-100">
                                            <Clock size={12} /> {item.status}
                                        </span>
                                    ) : (
                                        <span className="flex items-center text-gray-500 gap-1 bg-gray-100 w-fit px-2 py-0.5 rounded-full text-xs border border-gray-200">
                                            <Calendar size={12} /> {item.status}
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-gray-400 text-xs">{item.invoice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServicesTable;
