import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PaperType } from '../types';
import { Button } from '../components/Button';
import { CreditCard, CheckCircle, Truck, Package } from 'lucide-react';

const Checkout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const designId = searchParams.get('designId');
  const navigate = useNavigate();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
      name: '',
      address: '',
      city: '',
      country: 'Egypt',
      postalCode: '',
      quantity: 5,
      paper: PaperType.Standard,
      envelope: false
  });

  const basePrice = 2.50; // Mock base price
  const subtotal = (basePrice * formData.quantity) + (formData.envelope ? 0.5 * formData.quantity : 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const val = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
      setFormData({ ...formData, [e.target.name]: val });
  };

  const handlePayment = () => {
      setLoading(true);
      // Simulate Stripe
      setTimeout(() => {
          setLoading(false);
          setStep('confirmation');
      }, 2000);
  };

  if (step === 'confirmation') {
      return (
          <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                  <p className="text-gray-500 mb-6">Your postcards are being prepared. Order #ORD-{Math.floor(Math.random() * 10000)}</p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                      <p className="text-sm text-gray-600"><span className="font-medium">Estimated Delivery:</span> 5-7 Business Days</p>
                      <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Shipping to:</span> {formData.city}, {formData.country}</p>
                  </div>
                  <Button onClick={() => navigate('/')} className="w-full">Back to Home</Button>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column: Forms */}
              <div className="md:col-span-2 space-y-6">
                  
                  {/* Shipping Section */}
                  <div className={`bg-white p-6 rounded-xl shadow-sm border ${step === 'shipping' ? 'border-brand-500 ring-1 ring-brand-500' : 'border-gray-200'}`}>
                      <div className="flex items-center gap-3 mb-4">
                          <Truck className="w-5 h-5 text-brand-600" />
                          <h2 className="text-lg font-bold text-gray-900">1. Shipping Details</h2>
                      </div>
                      
                      {step === 'shipping' ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                            </div>
                            <Button onClick={() => setStep('payment')} className="w-full mt-4">Continue to Payment</Button>
                        </div>
                      ) : (
                          <div className="text-sm text-gray-500 flex justify-between">
                              <span>{formData.name}, {formData.city}</span>
                              <button onClick={() => setStep('shipping')} className="text-brand-600 font-medium hover:underline">Edit</button>
                          </div>
                      )}
                  </div>

                  {/* Payment Section */}
                  <div className={`bg-white p-6 rounded-xl shadow-sm border ${step === 'payment' ? 'border-brand-500 ring-1 ring-brand-500' : 'border-gray-200'}`}>
                      <div className="flex items-center gap-3 mb-4">
                          <CreditCard className="w-5 h-5 text-brand-600" />
                          <h2 className="text-lg font-bold text-gray-900">2. Payment</h2>
                      </div>
                      
                      {step === 'payment' && (
                          <div className="space-y-4">
                              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center gap-3">
                                  <div className="w-4 h-4 rounded-full bg-brand-600"></div>
                                  <span className="font-medium">Credit Card (Stripe)</span>
                                  <div className="ml-auto flex gap-2">
                                      <div className="w-8 h-5 bg-gray-300 rounded"></div>
                                      <div className="w-8 h-5 bg-gray-300 rounded"></div>
                                  </div>
                              </div>
                              <div className="pt-4">
                                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                <input type="text" placeholder="0000 0000 0000 0000" disabled className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50 cursor-not-allowed" />
                                <p className="text-xs text-gray-500 mt-1">This is a mock checkout. No payment will be processed.</p>
                              </div>
                              <Button 
                                onClick={handlePayment} 
                                className="w-full mt-4" 
                                disabled={loading}
                              >
                                {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                              </Button>
                          </div>
                      )}
                  </div>

              </div>

              {/* Right Column: Order Summary */}
              <div className="md:col-span-1">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <Package className="w-5 h-5" /> Order Summary
                      </h3>
                      
                      <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                          <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Paper Type</label>
                              <select 
                                name="paper" 
                                value={formData.paper} 
                                onChange={handleInputChange}
                                className="w-full text-sm border-gray-300 rounded-md shadow-sm p-1.5"
                              >
                                  {Object.values(PaperType).map(t => <option key={t} value={t}>{t}</option>)}
                              </select>
                          </div>
                          <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Quantity</label>
                              <select 
                                name="quantity" 
                                value={formData.quantity} 
                                onChange={handleInputChange} // Need to cast string to number
                                className="w-full text-sm border-gray-300 rounded-md shadow-sm p-1.5"
                              >
                                  {[1, 5, 10, 25, 50, 100].map(n => <option key={n} value={n}>{n} Pack</option>)}
                              </select>
                          </div>
                          <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                id="envelope" 
                                checked={formData.envelope}
                                onChange={(e) => setFormData({...formData, envelope: e.target.checked})}
                                className="rounded text-brand-600 focus:ring-brand-500" 
                              />
                              <label htmlFor="envelope" className="ml-2 text-sm text-gray-700">Add Envelopes (+$0.50/ea)</label>
                          </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span>${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                              <span>Shipping</span>
                              <span>${shipping.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100 mt-2">
                              <span>Total</span>
                              <span>${total.toFixed(2)}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Checkout;
