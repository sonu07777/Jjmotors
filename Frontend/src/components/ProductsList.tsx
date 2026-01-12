import { Package, IndianRupee } from 'lucide-react';
import { Product } from '../App';

interface ProductsListProps {
  products: Product[];
}

export function ProductsList({ products }: ProductsListProps) {
  if (products.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic py-2">No products purchased yet</div>
    );
  }

  const totalValue = products.reduce((sum, p) => sum + p.value, 0);
  const totalPaid = products.reduce((sum, p) => sum + p.paid, 0);
  const totalPending = products.reduce((sum, p) => sum + p.pending, 0);

  return (
    <div className="space-y-3">
      {/* Products List */}
      <div className="space-y-2">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex items-start justify-between gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-gray-900">{product.name}</span>
              </div>
              <div className="text-xs text-gray-500">
                Purchased: {new Date(product.purchaseDate).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
            <div className="text-right space-y-1 min-w-[140px]">
              <div className="flex items-center justify-end gap-1 text-sm font-semibold text-gray-900">
                <IndianRupee className="w-3 h-3" />
                {product.value.toLocaleString('en-IN')}
              </div>
              <div className="flex items-center justify-end gap-1 text-xs text-green-600">
                Paid: ₹{product.paid.toLocaleString('en-IN')}
              </div>
              {product.pending > 0 && (
                <div className="flex items-center justify-end gap-1 text-xs text-red-600 font-medium">
                  Pending: ₹{product.pending.toLocaleString('en-IN')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-gray-300 pt-3 space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Value:</span>
          <span className="font-semibold text-gray-900">₹{totalValue.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Paid:</span>
          <span className="font-semibold text-green-600">₹{totalPaid.toLocaleString('en-IN')}</span>
        </div>
        {totalPending > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Pending:</span>
            <span className="font-semibold text-red-600">₹{totalPending.toLocaleString('en-IN')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
