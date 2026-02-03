import React from 'react';
import { Briefcase, Filter, CheckCircle, Clock, Calendar, Pencil, Trash2, FileDown } from 'lucide-react';
import { generateInvoiceXML } from '../utils/xmlGenerator';

const ServicesTable = ({ services, contacts, onEdit, onDelete }) => {

    const handleDownloadXML = (service) => {
        // Find full client details from contacts list
        const clientData = contacts?.find(c => c.name === service.client);

        try {
            const xmlContent = generateInvoiceXML(service, clientData);

            // Create a blob and trigger download
            const blob = new Blob([xmlContent], { type: 'application/xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Fattura_${service.client}_${service.date}.xml`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            alert('Error generating XML: ' + error.message);
        }
    };
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
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
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
                            <th className="px-4 py-3">إجراءات</th>
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
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <button
                                        onClick={() => handleDownloadXML(item)}
                                        className="text-green-600 hover:bg-green-50 p-1.5 rounded transition"
                                        title="تنزيل فاتورة XML"
                                    >
                                        <FileDown size={15} />
                                    </button>
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="text-blue-500 hover:bg-blue-50 p-1.5 rounded transition"
                                        title="تعديل"
                                    >
                                        <Pencil size={15} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="text-red-500 hover:bg-red-50 p-1.5 rounded transition"
                                        title="حذف"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View (Cards) */}
            <div className="md:hidden flex flex-col gap-3 p-3 bg-gray-50">
                {services.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-gray-800">{item.client}</h4>
                                <span className="text-xs text-gray-500">{item.date}</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleDownloadXML(item)} className="text-green-600 p-1 bg-green-50 rounded"><FileDown size={14} /></button>
                                <button onClick={() => onEdit(item)} className="text-blue-500 p-1 bg-blue-50 rounded"><Pencil size={14} /></button>
                                <button onClick={() => onDelete(item.id)} className="text-red-500 p-1 bg-red-50 rounded"><Trash2 size={14} /></button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded border ${item.type === 'تنظيف عميق' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                {item.type}
                            </span>
                            {item.status === 'تم الدفع' ? (
                                <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs border border-green-100 flex items-center gap-1"><CheckCircle size={10} /> {item.status}</span>
                            ) : (
                                <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-xs border border-orange-100 flex items-center gap-1"><Clock size={10} /> {item.status}</span>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 border-t pt-2 mt-2">
                            <div><span className="text-gray-400 text-xs">الموقع:</span> {item.location}</div>
                            <div><span className="text-gray-400 text-xs">الموظف:</span> {item.staff}</div>
                            <div><span className="text-gray-400 text-xs">الساعات:</span> {item.hours}</div>
                            <div className="font-bold text-gray-800"><span className="text-gray-400 font-normal text-xs">القيمة:</span> {item.revenue} €</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesTable;
