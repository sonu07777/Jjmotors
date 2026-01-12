import React, { useState } from 'react';
import { Edit2, Trash2, Mail, Phone, Building, MessageCircle, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Customer, Product } from '../App';
import { EditCustomerModal } from './EditCustomerModal';
import { ProductsList } from './ProductsList';
import { AddProductModal } from './AddProductModal';

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

export function CustomerTable({ customers, onEdit, onDelete }: CustomerTableProps) {
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [addingProductFor, setAddingProductFor] = useState<Customer | null>(null);

  const toggleRow = (customerId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(customerId)) {
      newExpanded.delete(customerId);
    } else {
      newExpanded.add(customerId);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusColor = (status: Customer['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleEdit = (customer: Customer) => {
    onEdit(customer);
    setEditingCustomer(null);
  };

  const handleAddProduct = (customerId: string, product: Omit<Product, 'id'>) => {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;

    const newProduct: Product = {
      ...product,
      id: `p${Date.now()}`
    };

    const updatedCustomer: Customer = {
      ...customer,
      products: [...customer.products, newProduct],
      totalSpent: customer.totalSpent + product.paid
    };

    onEdit(updatedCustomer);
    setAddingProductFor(null);
    
    // Automatically expand the row to show the new product
    const newExpanded = new Set(expandedRows);
    newExpanded.add(customerId);
    setExpandedRows(newExpanded);
  };

  const sendWhatsAppMessage = (customer: Customer) => {
    const cleanPhone = customer.phone.replace(/\D/g, '');
    
    const totalPending = customer.products.reduce((sum, p) => sum + p.pending, 0);
    
    let message = '';
    if (totalPending > 0) {
      message = `Hello ${customer.name}, you have a pending payment of ₹${totalPending.toLocaleString('en-IN')} with us. Please let us know if you need any assistance with the payment.`;
    } else if (customer.status === 'pending') {
      message = `Hello ${customer.name}, we noticed you have a pending registration with us at ${customer.company}. We'd love to complete your onboarding!`;
    } else {
      message = `Hello ${customer.name}, thank you for being a valued customer! Please let us know if you need any assistance.`;
    }
    
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (customers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <p className="text-gray-500">No customers found</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid / Pending
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => {
                const isExpanded = expandedRows.has(customer.id);
                const totalPaid = customer.products.reduce((sum, p) => sum + p.paid, 0);
                const totalPending = customer.products.reduce((sum, p) => sum + p.pending, 0);
                
                return (
                  <React.Fragment key={customer.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleRow(customer.id)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{customer.name}</div>
                          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <Building className="w-3 h-3" />
                            {customer.company}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-900">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {customer.phone}
                          </div>
                          <button
                            onClick={() => sendWhatsAppMessage(customer)}
                            className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Send WhatsApp
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="font-medium">{customer.products.length}</span> product{customer.products.length !== 1 ? 's' : ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-green-600">
                            ₹{totalPaid.toLocaleString('en-IN')}
                          </div>
                          {totalPending > 0 && (
                            <div className="text-sm font-medium text-red-600">
                              ₹{totalPending.toLocaleString('en-IN')}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setAddingProductFor(customer)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Add product"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingCustomer(customer)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit customer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this customer?')) {
                                onDelete(customer.id);
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete customer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 bg-gray-50">
                          <div className="max-w-3xl">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-semibold text-gray-900">Products Purchased</h4>
                              <button
                                onClick={() => setAddingProductFor(customer)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                                Add Product
                              </button>
                            </div>
                            <ProductsList products={customer.products} />
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editingCustomer && (
        <EditCustomerModal
          customer={editingCustomer}
          onClose={() => setEditingCustomer(null)}
          onSave={handleEdit}
        />
      )}

      {addingProductFor && (
        <AddProductModal
          customerName={addingProductFor.name}
          onClose={() => setAddingProductFor(null)}
          onAdd={(product) => handleAddProduct(addingProductFor.id, product)}
        />
      )}
    </>
  );
}