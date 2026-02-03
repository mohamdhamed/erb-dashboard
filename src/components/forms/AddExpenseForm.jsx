import React, { useState } from 'react';
import { Save } from 'lucide-react';

const AddExpenseForm = ({ onSave, onCancel, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        date: new Date().toISOString().split('T')[0],
        category: 'منظفات',
        vendor: '',
        amount: 0,
        method: 'نقدي',
        receipt: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">التاريخ</label>
                    <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">الفئة</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                        <option value="منظفات">منظفات</option>
                        <option value="وقود">وقود</option>
                        <option value="صيانة معدات">صيانة معدات</option>
                        <option value="إيجار">إيجار</option>
                        <option value="تسويق">تسويق</option>
                        <option value="أخرى">أخرى</option>
                    </select>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">المورد / المتجر</label>
                <input
                    type="text"
                    name="vendor"
                    required
                    value={formData.vendor}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="مثال: محطة شيل"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">المبلغ (€)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="amount"
                        required
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">طريقة الدفع</label>
                    <select
                        name="method"
                        value={formData.method}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                        <option value="نقدي">نقدي (Cash)</option>
                        <option value="تحويل بنكي">تحويل بنكي (Bonifico)</option>
                        <option value="بطاقة">بطاقة (Carta)</option>
                    </select>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">رابط الفاتورة (اختياري)</label>
                <input
                    type="text"
                    name="receipt"
                    value={formData.receipt}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="https://..."
                />
            </div>

            <div className="pt-4 flex gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                    إلغاء
                </button>
                <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 shadow transition font-medium flex justify-center items-center gap-2"
                >
                    <Save size={18} />
                    حفظ
                </button>
            </div>
        </form>
    );
};

export default AddExpenseForm;
