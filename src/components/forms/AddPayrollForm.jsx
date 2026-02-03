import React, { useState } from 'react';
import { Save } from 'lucide-react';

const AddPayrollForm = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        totalHours: 0,
        rate: 10,
        bonus: 0,
        advance: 0,
        status: 'لم يتم'
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
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">اسم العامل</label>
                <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="الاسم الثلاثي"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">ساعات العمل</label>
                    <input
                        type="number"
                        step="0.5"
                        name="totalHours"
                        value={formData.totalHours}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">سعر الساعة (€)</label>
                    <input
                        type="number"
                        step="0.5"
                        name="rate"
                        value={formData.rate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">بدلات / مكافآت (€)</label>
                    <input
                        type="number"
                        step="1"
                        name="bonus"
                        value={formData.bonus}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">سلفيات / خصومات (€)</label>
                    <input
                        type="number"
                        step="1"
                        name="advance"
                        value={formData.advance}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">حالة التحويل</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                    <option value="لم يتم">لم يتم</option>
                    <option value="معلق">معلق (Pending)</option>
                    <option value="تم التحويل">تم التحويل (Paid)</option>
                </select>
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

export default AddPayrollForm;
