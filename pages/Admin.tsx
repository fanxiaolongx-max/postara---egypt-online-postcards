import React from 'react';
import { MOCK_ORDERS } from '../constants';
import { Button } from '../components/Button';
import { 
  BarChart, 
  Users, 
  DollarSign, 
  Package,
  Printer,
  MoreHorizontal 
} from 'lucide-react';

// Status Badge Component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    'Paid': 'bg-blue-100 text-blue-800',
    'Production': 'bg-purple-100 text-purple-800',
    'Shipped': 'bg-yellow-100 text-yellow-800',
    'Delivered': 'bg-green-100 text-green-800',
    'Draft': 'bg-gray-100 text-gray-800'
  };
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status] || styles['Draft']}`}>
      {status}
    </span>
  );
};

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Manage orders, fulfillment, and templates.</p>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Revenue', value: '$12,345', icon: DollarSign, color: 'text-green-600' },
            { label: 'Active Orders', value: '24', icon: Package, color: 'text-blue-600' },
            { label: 'Pending Print', value: '8', icon: Printer, color: 'text-purple-600' },
            { label: 'Customers', value: '1,203', icon: Users, color: 'text-orange-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
              <div className={`p-3 rounded-full bg-gray-50 mr-4 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <Button size="sm" variant="outline">Export CSV</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MOCK_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-600">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
