import React, { useState, useEffect } from 'react';
import { Users, DollarSign, FileText, Briefcase, Plus, LogOut } from 'lucide-react';
import * as XLSX from 'xlsx';
import { supabase } from './supabaseClient';
import ServicesTable from './components/ServicesTable';
import ExpensesList from './components/ExpensesList';
import PayrollTable from './components/PayrollTable';
import ContactsTable from './components/ContactsTable';
import DashboardStats from './components/DashboardStats';
import Modal from './components/ui/Modal';
import AddServiceForm from './components/forms/AddServiceForm';
import AddExpenseForm from './components/forms/AddExpenseForm';
import AddPayrollForm from './components/forms/AddPayrollForm';
import AddContactForm from './components/forms/AddContactForm';
import Notifications from './components/Notifications';
import Login from './components/Login';


const App = () => {
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('services');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'service', 'expense', 'payroll', 'contact'
  const [editingService, setEditingService] = useState(null);

  // Data States
  const [services, setServices] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch Data on Load (Only if logged in)
  useEffect(() => {
    if (session) fetchData();
  }, [session]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: servicesData } = await supabase.from('services').select('*').order('date', { ascending: false });
      const { data: expensesData } = await supabase.from('expenses').select('*').order('date', { ascending: false });
      const { data: payrollData } = await supabase.from('payroll').select('*');
      const { data: contactsData } = await supabase.from('contacts').select('*');

      if (servicesData) setServices(servicesData);
      if (expensesData) setExpenses(expensesData);
      if (payrollData) setPayroll(payrollData);
      if (contactsData) setContacts(contactsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (type, data = null) => {
    setModalType(type);
    setEditingService(data);
    setIsModalOpen(true);
  };

  const handleSaveService = async (formData) => {
    try {
      if (editingService) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', editingService.id);

        if (error) throw error;

        setServices(services.map(s => s.id === editingService.id ? { ...formData, id: editingService.id } : s));
      } else {
        // Add new service
        const { data, error } = await supabase.from('services').insert([formData]).select();
        if (error) throw error;
        setServices([data[0], ...services]);
      }
      setIsModalOpen(false);
      setEditingService(null);
    } catch (error) {
      alert('Error saving service: ' + error.message);
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه العملية؟')) return;

    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      setServices(services.filter(s => s.id !== id));
    } catch (error) {
      alert('Error deleting service: ' + error.message);
    }
  };

  const handleSaveExpense = async (formData) => {
    try {
      if (editingService) { // We reuse editingService state for all edit modals
        const { error } = await supabase
          .from('expenses')
          .update(formData)
          .eq('id', editingService.id);

        if (error) throw error;

        setExpenses(expenses.map(e => e.id === editingService.id ? { ...formData, id: editingService.id } : e));
      } else {
        const { data, error } = await supabase.from('expenses').insert([formData]).select();
        if (error) throw error;
        setExpenses([data[0], ...expenses]);
      }
      setIsModalOpen(false);
      setEditingService(null);
    } catch (error) {
      alert('Error saving expense: ' + error.message);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المصروف؟')) return;
    try {
      const { error } = await supabase.from('expenses').delete().eq('id', id);
      if (error) throw error;
      setExpenses(expenses.filter(e => e.id !== id));
    } catch (error) {
      alert('Error deleting expense: ' + error.message);
    }
  };


  const handleSavePayroll = async (formData) => {
    try {
      const dbPayload = {
        name: formData.name,
        total_hours: formData.totalHours,
        rate: formData.rate,
        bonus: formData.bonus,
        advance: formData.advance,
        status: formData.status
      };

      if (editingService) {
        const { error } = await supabase
          .from('payroll')
          .update(dbPayload)
          .eq('id', editingService.id);

        if (error) throw error;

        const updatedItem = { ...dbPayload, id: editingService.id, totalHours: dbPayload.total_hours };
        setPayroll(payroll.map(p => p.id === editingService.id ? updatedItem : p));
      } else {
        const { data, error } = await supabase.from('payroll').insert([dbPayload]).select();
        if (error) throw error;

        const newItem = { ...data[0], totalHours: data[0].total_hours };
        setPayroll([newItem, ...payroll]);
      }
      setIsModalOpen(false);
      setEditingService(null);
    } catch (error) {
      alert('Error saving payroll: ' + error.message);
    }
  };

  const handleDeletePayroll = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا السجل؟')) return;
    try {
      const { error } = await supabase.from('payroll').delete().eq('id', id);
      if (error) throw error;
      setPayroll(payroll.filter(p => p.id !== id));
    } catch (error) {
      alert('Error deleting payroll: ' + error.message);
    }
  };


  const handleAddContact = async (newContact) => {
    try {
      const dbPayload = {
        name: newContact.name,
        type: newContact.type,
        tax_id: newContact.taxId,
        start_balance: newContact.startBalance,
        volume: newContact.volume,
        outstanding: newContact.outstanding
      };
      const { data, error } = await supabase.from('contacts').insert([dbPayload]).select();
      if (error) throw error;

      const newItem = {
        ...data[0],
        taxId: data[0].tax_id,
        startBalance: data[0].start_balance
      }
      setContacts([newItem, ...contacts]);
      setIsModalOpen(false);
    } catch (error) {
      alert('Error adding contact: ' + error.message);
    }
  };

  const handleExport = () => {
    let dataToExport = [];
    let fileName = '';

    switch (activeTab) {
      case 'services':
        dataToExport = services.map(s => ({
          'العميل': s.client,
          'التاريخ': s.date,
          'نوع الخدمة': s.type,
          'الموقع': s.location,
          'الموظفين': s.staff,
          'الساعات': s.hours,
          'القيمة': s.revenue,
          'الحالة': s.status
        }));
        fileName = 'سجل_العمليات';
        break;
      case 'expenses':
        dataToExport = expenses.map(e => ({
          'البند': e.item,
          'الفئة': e.category,
          'القيمة': e.amount,
          'التاريخ': e.date,
          'مدفوع بواسطة': e.paid_by
        }));
        fileName = 'سجل_المصاريف';
        break;
      case 'payroll':
        dataToExport = payroll.map(p => ({
          'الاسم': p.name,
          'إجمالي الساعات': p.total_hours || p.totalHours,
          'المعدل/ساعة': p.rate,
          'المكافآت': p.bonus,
          'السلف': p.advance,
          'صافي الراتب': ((p.total_hours || p.totalHours) * p.rate + (Number(p.bonus) || 0) - (Number(p.advance) || 0)).toFixed(2),
          'الحالة': p.status
        }));
        fileName = 'رواتب_الموظفين';
        break;
      case 'contacts':
        dataToExport = contacts.map(c => ({
          'الاسم': c.name,
          'النوع': c.type,
          'الرقم الضريبي': c.tax_id || c.taxId,
          'رصيد البداية': c.start_balance || c.startBalance,
          'إجمالي التعاملات': c.volume,
          'المستحق': c.outstanding
        }));
        fileName = 'العملاء_والموردين';
        break;
      default:
        return;
    }

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // Add RTL direction to sheet
    if (!ws['!dir']) ws['!dir'] = 'rtl';

    XLSX.writeFile(wb, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const mapPayroll = payroll.map(p => ({
    ...p,
    totalHours: p.total_hours !== undefined ? p.total_hours : p.totalHours,
  }));

  const mapContacts = contacts.map(c => ({
    ...c,
    taxId: c.tax_id !== undefined ? c.tax_id : c.taxId,
    startBalance: c.start_balance !== undefined ? c.start_balance : c.startBalance
  }));

  const renderContent = () => {
    if (loading && services.length === 0 && expenses.length === 0) {
      return <div className="p-12 text-center text-gray-400">جاري تحميل البيانات...</div>;
    }

    switch (activeTab) {
      case 'services':
        return <ServicesTable
          services={services}
          onEdit={(item) => handleOpenModal('service', item)}
          onDelete={handleDeleteService}
        />;
      case 'expenses':
        return <ExpensesList
          expenses={expenses}
          onEdit={(item) => handleOpenModal('expense', item)}
          onDelete={handleDeleteExpense}
        />;
      case 'payroll':
        return <PayrollTable
          payroll={mapPayroll}
          onEdit={(item) => handleOpenModal('payroll', item)}
          onDelete={handleDeletePayroll}
        />;
      case 'contacts':
        return <ContactsTable contacts={mapContacts} />;
      default:
        return null;
    }
  };

  const getAlerts = () => {
    const alerts = [];
    const today = new Date().toISOString().split('T')[0];

    // 1. Pending Payments
    const pendingPayments = services.filter(s => s.status === 'بانتظار الدفع');
    if (pendingPayments.length > 0) {
      alerts.push({
        title: 'دفعات معلقة',
        message: `يوجد ${pendingPayments.length} عمليات بانتظار الدفع بقيمة إجمالية ${pendingPayments.reduce((a, b) => a + (Number(b.revenue) || 0), 0).toFixed(2)}€`,
        type: 'warning',
        time: 'الآن'
      });
    }

    // 2. Jobs Today
    const todaysJobs = services.filter(s => s.date === today && s.status === 'مجدول');
    if (todaysJobs.length > 0) {
      alerts.push({
        title: 'عمليات اليوم',
        message: `لديك ${todaysJobs.length} عمليات مجدولة لليوم: ${todaysJobs.map(j => j.client).slice(0, 2).join('، ')}${todaysJobs.length > 2 ? '...' : ''}`,
        type: 'info',
        time: 'اليوم'
      });
    }

    return alerts;
  };

  const getButtonLabel = () => {
    switch (activeTab) {
      case 'services': return 'عملية جديدة';
      case 'expenses': return 'تسجيل مصروف';
      case 'payroll': return 'إضافة موظف';
      case 'contacts': return 'إضافة عميل/مورد';
      default: return 'إضافة جديد';
    }
  };

  if (!session) {
    return <Login />;
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-right">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Pulsar Logo" className="h-16 object-contain" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">نظام إدارة العمليات</h1>
              <p className="text-gray-500 mt-1 flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                ميلانو، إيطاليا - {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0 w-full md:w-auto items-center">
            <button
              onClick={() => supabase.auth.signOut()}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-600 transition"
              title="تسجيل الخروج"
            >
              <LogOut size={20} />
            </button>
            <Notifications alerts={getAlerts()} />

            <button
              onClick={handleExport}
              className="flex-1 md:flex-none justify-center items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 shadow-sm transition font-medium text-sm hidden md:flex"
            >
              <FileText size={16} />
              تصدير Excel
            </button>
            <button
              onClick={() => handleOpenModal(
                activeTab === 'services' ? 'service' :
                  activeTab === 'expenses' ? 'expense' :
                    activeTab === 'payroll' ? 'payroll' : 'contact'
              )}
              className="flex-1 md:flex-none justify-center items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition font-medium text-sm"
            >
              <Plus size={16} />
              {getButtonLabel()}
            </button>
          </div>
        </header>

        {/* Dashboard Cards Summary */}
        <DashboardStats
          revenue={services.reduce((acc, curr) => acc + (Number(curr.revenue) || 0), 0)}
          expenses={expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0)}
          outstanding={services.filter(s => s.status !== 'تم الدفع').reduce((acc, curr) => acc + (Number(curr.revenue) || 0), 0)}
        />

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1.5 flex overflow-x-auto gap-1">
          {[
            { id: 'services', label: 'سجل العمليات', icon: Briefcase },
            { id: 'expenses', label: 'المصاريف', icon: DollarSign },
            { id: 'payroll', label: 'شؤون الموظفين', icon: Users },
            { id: 'contacts', label: 'العملاء والموردين', icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all text-sm font-medium ${activeTab === tab.id
                ? 'bg-gray-800 text-white shadow-md'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px] animate-fade-in">
          {renderContent()}
        </div>

      </div>

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalType === 'service' ? (editingService ? 'تعديل العملية' : 'إضافة عملية جديدة') :
            modalType === 'expense' ? 'تسجيل مصروف جديد' :
              modalType === 'payroll' ? 'إضافة موظف / راتب' :
                modalType === 'contact' ? 'إضافة عميل / مورد' :
                  'إضافة سجل جديد'
        }
      >
        {modalType === 'service' && (
          <AddServiceForm
            initialData={editingService}
            onSave={handleSaveService}
            onCancel={() => setIsModalOpen(false)}
            availableClients={mapContacts}
          />
        )}
        {modalType === 'expense' && (
          <AddExpenseForm
            initialData={editingService}
            onSave={handleSaveExpense}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
        {modalType === 'payroll' && (
          <AddPayrollForm
            initialData={editingService}
            onSave={handleSavePayroll}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
        {modalType === 'contact' && (
          <AddContactForm
            onSave={handleAddContact}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default App;
