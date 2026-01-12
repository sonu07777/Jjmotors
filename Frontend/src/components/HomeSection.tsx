import { useState } from 'react';
import { CustomerTable } from './CustomerTable';
import { CustomerStats } from './CustomerStats';
import { AddCustomerModal } from './AddCustomerModal';
import { Plus } from 'lucide-react';
import { Customer } from '../App';

interface HomeSectionProps {
  initialCustomers: Customer[];
}

export function HomeSection({ initialCustomers }: HomeSectionProps) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });

  const handleAddCustomer = (customer: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString()
    };
    setCustomers([newCustomer, ...customers]);
    setIsAddModalOpen(false);
  };

  const handleEditCustomer = (updatedCustomer: Customer) => {
    setCustomers(customers.map(c => 
      c.id === updatedCustomer.id ? updatedCustomer : c
    ));
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDate = true;
    if (dateFilter.startDate || dateFilter.endDate) {
      const customerDate = new Date(customer.joinDate);
      
      if (dateFilter.startDate && dateFilter.endDate) {
        const startDate = new Date(dateFilter.startDate);
        const endDate = new Date(dateFilter.endDate);
        matchesDate = customerDate >= startDate && customerDate <= endDate;
      } else if (dateFilter.startDate) {
        const startDate = new Date(dateFilter.startDate);
        matchesDate = customerDate >= startDate;
      } else if (dateFilter.endDate) {
        const endDate = new Date(dateFilter.endDate);
        matchesDate = customerDate <= endDate;
      }
    }
    
    return matchesSearch && matchesDate;
  });

  const clearDateFilter = () => {
    setDateFilter({ startDate: '', endDate: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Management</h1>
        <p className="text-gray-600">Manage and track your customer relationships</p>
      </div>

      {/* Stats */}
      <CustomerStats customers={customers} />

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Customer
          </button>
        </div>
        
        {/* Date Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by Join Date:</span>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-1">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">From:</label>
              <input
                type="date"
                value={dateFilter.startDate}
                onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">To:</label>
              <input
                type="date"
                value={dateFilter.endDate}
                onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {(dateFilter.startDate || dateFilter.endDate) && (
              <button
                onClick={clearDateFilter}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors underline"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <CustomerTable
        customers={filteredCustomers}
        onEdit={handleEditCustomer}
        onDelete={handleDeleteCustomer}
      />

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <AddCustomerModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddCustomer}
        />
      )}
    </div>
  );
}
