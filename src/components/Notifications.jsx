import React, { useState } from 'react';
import { Bell, AlertCircle, Clock, CheckCircle } from 'lucide-react';

const Notifications = ({ alerts = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const unreadCount = alerts.length;

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            {/* Bell Icon */}
            <button
                onClick={toggleOpen}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="التنبيهات"
            >
                <Bell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-1 ring-white">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute left-0 mt-2 w-80 rounded-xl border border-gray-100 bg-white shadow-lg z-20 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between border-b px-4 py-3 bg-gray-50 rounded-t-xl">
                            <h3 className="font-semibold text-gray-900">التنبيهات</h3>
                            <span className="text-xs text-gray-500">{unreadCount} جديد</span>
                        </div>

                        <div className="max-h-[300px] overflow-y-auto py-1">
                            {alerts.length === 0 ? (
                                <div className="px-4 py-8 text-center text-gray-500">
                                    <CheckCircle className="mx-auto mb-2 opacity-20" size={32} />
                                    <p className="text-sm">لا توجد تنبيهات جديدة</p>
                                </div>
                            ) : (
                                alerts.map((alert, index) => (
                                    <div key={index} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors cursor-default">
                                        <div className={`mt-0.5 rounded-full p-1.5 shrink-0 ${alert.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                                                alert.type === 'danger' ? 'bg-red-100 text-red-600' :
                                                    'bg-blue-100 text-blue-600'
                                            }`}>
                                            {alert.type === 'warning' ? <Clock size={14} /> :
                                                alert.type === 'danger' ? <AlertCircle size={14} /> :
                                                    <Bell size={14} />}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium text-gray-900 leading-none">{alert.title}</p>
                                            <p className="text-xs text-gray-500">{alert.message}</p>
                                            <p className="text-[10px] text-gray-400 mt-1">{alert.time}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Notifications;
