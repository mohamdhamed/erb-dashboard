import React, { useState } from 'react';
import { Save } from 'lucide-react';

const AddServiceForm = ({ onSave, onCancel, initialData, availableClients = [] }) => {
    const [formData, setFormData] = useState(initialData || {
        client: '',
        type: 'تنظيف عميق', // Default value
        location: '',
        staff: '',
        hours: 0,
        revenue: 0,
        status: 'مجدول',
        invoice: '',
        date: new Date().toISOString().split('T')[0] // Today's date
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
                    <label className="text-sm font-medium text-gray-700">العميل</label>
                    <input
                        type="text"
                        name="client"
                        required
                        list="client-options"
                        value={formData.client}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="اسم العميل"
                        autoComplete="off"
                    />
                    <datalist id="client-options">
                        {availableClients
                            .filter(c => c.type === 'عميل' || !c.type) // Show clients or undefined types
                            .map((c, index) => (
                                <option key={index} value={c.name} />
                            ))
                        }
                    </datalist>
                </div>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">نوع الخدمة</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                        <option value="تنظيف عميق">تنظيف عميق</option>
                        <option value="مكتبي">مكتبي</option>
                        <option value="تعقيم">تعقيم</option>
                        <option value="تلميع أرضيات">تلميع أرضيات</option>
                        <option value="واجهات زجاجية">واجهات زجاجية</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">الموقع</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="المدينة / المنطقة"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">الموظفين</label>
                <input
                    type="text"
                    name="staff"
                    value={formData.staff}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="أحمد، محمد..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">عدد الساعات</label>
                    <input
                        type="number"
                        step="0.5"
                        name="hours"
                        value={formData.hours}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">القيمة (€)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="revenue"
                        value={formData.revenue}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">الحالة</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                        <option value="مجدول">مجدول</option>
                        <option value="بانتظار الدفع">بانتظار الدفع</option>
                        <option value="تم الدفع">تم الدفع</option>
                        <option value="ملغي">ملغي</option>
                    </select>
                </div>
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

export default AddServiceForm;
