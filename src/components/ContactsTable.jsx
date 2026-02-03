import React, { useState } from 'react';
import { FileText, Users, ShoppingBag } from 'lucide-react';

const ContactsTable = ({ contacts }) => {
    const [filterType, setFilterType] = useState('all'); // all, client, supplier

    const filteredContacts = contacts.filter(item => {
        if (filterType === 'all') return true;
        if (filterType === 'client') return item.type === 'عميل';
        if (filterType === 'supplier') return item.type === 'مورد';
        return true;
    });

    return (
        <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <FileText size={18} className="text-orange-600" />
                    دليل العملاء والموردين (Anagrafica)
                </h3>

                <div className="flex bg-gray-200 p-1 rounded-lg">
                    <button
                        onClick={() => setFilterType('all')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${filterType === 'all' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                        الكل
                    </button>
                    <button
                        onClick={() => setFilterType('client')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-1 ${filterType === 'client' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                        <Users size={14} />
                        عملاء
                    </button>
                    <button
                        onClick={() => setFilterType('supplier')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-1 ${filterType === 'supplier' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                        <ShoppingBag size={14} />
                        موردين
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-right text-gray-700">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3">الاسم</th>
                            <th className="px-4 py-3">النوع</th>
                            <th className="px-4 py-3">P.IVA / CF</th>
                            <th className="px-4 py-3">رصيد البداية</th>
                            <th className="px-4 py-3">إجمالي التعاملات</th>
                            <th className="px-4 py-3">المستحق</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredContacts.map((item) => (
                            <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-bold text-gray-800">{item.name}</td>
                                <td className="px-4 py-3">
                                    <span className={`text-xs px-2 py-0.5 rounded border ${item.type === 'عميل' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                                        {item.type}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{item.taxId}</td>
                                <td className="px-4 py-3 text-gray-500">{item.startBalance} €</td>
                                <td className="px-4 py-3 text-gray-600">{item.volume} €</td>
                                <td className="px-4 py-3 font-bold">
                                    {item.outstanding > 0 ? (
                                        <span className="text-red-600">{item.outstanding} €</span>
                                    ) : (
                                        <span className="text-green-600">0 €</span>
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

export default ContactsTable;
