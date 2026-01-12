import { Users, UserCheck, UserX, Clock } from 'lucide-react';
import { Customer } from '../App';

interface CustomerStatsProps {
  customers: Customer[];
}

export function CustomerStats({ customers }: CustomerStatsProps) {
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const inactiveCustomers = customers.filter(c => c.status === 'inactive').length;
  const pendingCustomers = customers.filter(c => c.status === 'pending').length;
  
  // Calculate total paid and pending across all customers
  let totalPaid = 0;
  let totalPending = 0;
  customers.forEach(customer => {
    customer.products.forEach(product => {
      totalPaid += product.paid;
      totalPending += product.pending;
    });
  });

  const stats = [
    {
      label: 'Total Customers',
      value: totalCustomers.toString(),
      icon: Users,
      color: 'bg-blue-500',
      showCurrency: false
    },
    {
      label: 'Active',
      value: activeCustomers.toString(),
      icon: UserCheck,
      color: 'bg-green-500',
      showCurrency: false
    },
    {
      label: 'Total Paid',
      value: totalPaid.toLocaleString('en-IN'),
      icon: Clock,
      color: 'bg-green-500',
      showCurrency: true
    },
    {
      label: 'Total Pending',
      value: totalPending.toLocaleString('en-IN'),
      icon: UserX,
      color: 'bg-red-500',
      showCurrency: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">
                {stat.showCurrency && '₹'}
                {stat.value}
              </p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}