import React, { useState, useEffect } from 'react';
import { Users, DollarSign, FileText, Briefcase, Plus } from 'lucide-react';
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

const App = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'service', 'expense', 'payroll', 'contact'

  // Data States
  const [services, setServices] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data on Load
  useEffect(() => {
    fetchData();
  }, []);

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

  const handleOpenModal = () => {
    // Determine modal type based on active tab
    if (activeTab === 'services') setModalType('service');
    else if (activeTab === 'expenses') setModalType('expense');
    else if (activeTab === 'payroll') setModalType('payroll');
    else if (activeTab === 'contacts') setModalType('contact');

    setIsModalOpen(true);
  };

  const handleAddService = async (newService) => {
    try {
      const { data, error } = await supabase.from('services').insert([newService]).select();
      if (error) throw error;
      setServices([data[0], ...services]);
      setIsModalOpen(false);
    } catch (error) {
      alert('Error adding service: ' + error.message);
    }
  };

  const handleAddExpense = async (newExpense) => {
    try {
      const { data, error } = await supabase.from('expenses').insert([newExpense]).select();
      if (error) throw error;
      setExpenses([data[0], ...expenses]);
      setIsModalOpen(false);
    } catch (error) {
      alert('Error adding expense: ' + error.message);
    }
  };

  const handleAddPayroll = async (newPayroll) => {
    try {
      const dbPayload = {
        name: newPayroll.name,
        total_hours: newPayroll.totalHours,
        rate: newPayroll.rate,
        bonus: newPayroll.bonus,
        advance: newPayroll.advance,
        status: newPayroll.status
      };
      const { data, error } = await supabase.from('payroll').insert([dbPayload]).select();
      if (error) throw error;

      // Optimistic update or refetch. Here we use the returned data but need to map it back for UI if component expects camelCase
      const newItem = {
        ...data[0],
        totalHours: data[0].total_hours
      }
      setPayroll([newItem, ...payroll]);
      setIsModalOpen(false);
    } catch (error) {
      alert('Error adding payroll: ' + error.message);
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

  const renderContent = () => {
    if (loading && services.length === 0 && expenses.length === 0) {
      return <div className="p-12 text-center text-gray-400">جاري تحميل البيانات...</div>;
    }

    // Map snake_case from DB to camelCase for UI components
    const mapPayroll = payroll.map(p => ({
      ...p,
      totalHours: p.total_hours !== undefined ? p.total_hours : p.totalHours,
    }));

    const mapContacts = contacts.map(c => ({
      ...c,
      taxId: c.tax_id !== undefined ? c.tax_id : c.taxId,
      startBalance: c.start_balance !== undefined ? c.start_balance : c.startBalance
    }));

    switch (activeTab) {
      case 'services':
        return <ServicesTable services={services} />;
      case 'expenses':
        return <ExpensesList expenses={expenses} />;
      case 'payroll':
        return <PayrollTable payroll={mapPayroll} />;
      case 'contacts':
        return <ContactsTable contacts={mapContacts} />;
      default:
        return null;
    }
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

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-right">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">نظام إدارة العمليات</h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              ميلانو، إيطاليا - {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0 w-full md:w-auto">
            <button className="flex-1 md:flex-none justify-center items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 shadow-sm transition font-medium text-sm">
              <FileText size={16} />
              تصدير Excel
            </button>
            <button
              onClick={handleOpenModal}
              className="flex-1 md:flex-none justify-center items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition font-medium text-sm"
            >
              <Plus size={16} />
              {getButtonLabel()}
            </button>
          </div>
        </header>

        {/* Dashboard Cards Summary */}
        <DashboardStats />

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
          modalType === 'service' ? 'إضافة عملية جديدة' :
            modalType === 'expense' ? 'تسجيل مصروف جديد' :
              modalType === 'payroll' ? 'إضافة موظف / راتب' :
                modalType === 'contact' ? 'إضافة عميل / مورد' :
                  'إضافة سجل جديد'
        }
      >
        {modalType === 'service' && (
          <AddServiceForm
            onSave={handleAddService}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
        {modalType === 'expense' && (
          <AddExpenseForm
            onSave={handleAddExpense}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
        {modalType === 'payroll' && (
          <AddPayrollForm
            onSave={handleAddPayroll}
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
