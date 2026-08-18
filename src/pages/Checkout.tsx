import React from "react";
import { useState } from "react";
import { useStore } from "../context/StoreContext";
import { useNavigate, Link } from "react-router-dom";
import { Check, ChevronLeft, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function Checkout() {
  const { cart, clearCart, addOrder } = useStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = 15;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    // Simulate API call for checkout
    setTimeout(() => {
      const orderId =
        "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

      addOrder({
        id: orderId,
        items: [...cart],
        total: total,
        status: "Pending",
        date: new Date().toISOString(),
        contactInfo: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          street: `${formData.street} ${formData.apt}`.trim(),
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: "USA",
        },
        trackingCode: "Pending Assignment",
      });

      clearCart();
      setIsProcessing(false);
      navigate(`/order-status?id=${orderId}`);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="pt-40 min-h-screen bg-brand-light flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-medium mb-4">
            Cannot process empty cart
          </h2>
          <Link to="/shop" className="text-brand-brown hover:underline">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-light min-h-screen pb-20 pt-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        <Breadcrumbs />

        <h1 className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-brand-dark mb-12 uppercase">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Form Fields */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Contact Info */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-dark/5">
              <h2 className="text-2xl font-heading font-medium text-brand-dark mb-6">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Address"
                  className="col-span-1 md:col-span-2 bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full"
                />
                <input
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                  placeholder="First Name"
                  className="bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full"
                />
                <input
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Last Name"
                  className="bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full"
                />
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Phone Number"
                  className="col-span-1 md:col-span-2 bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full"
                />
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-dark/5">
              <h2 className="text-2xl font-heading font-medium text-brand-dark mb-6">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  type="text"
                  placeholder="Street Address"
                  className="col-span-1 md:col-span-2 bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full"
                />
                <input
                  name="apt"
                  value={formData.apt}
                  onChange={handleChange}
                  type="text"
                  placeholder="Apt, suite, etc. (optional)"
                  className="col-span-1 md:col-span-2 bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full"
                />
                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  type="text"
                  placeholder="City"
                  className="bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    type="text"
                    placeholder="State"
                    className="bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full"
                  />
                  <input
                    required
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    type="text"
                    placeholder="ZIP Code"
                    className="bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full"
                  />
                </div>
              </div>
            </div>

            {/* Payment Info - Mock */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-dark/5">
              <div className="flex items-center gap-4 mb-6">
                <CreditCard size={28} className="text-brand-dark" />
                <h2 className="text-2xl font-heading font-medium text-brand-dark">
                  Payment
                </h2>
              </div>
              <div className="bg-brand-light p-6 rounded-lg border border-brand-dark/10 flex flex-col items-center justify-center text-center gap-4">
                <p className="text-brand-dark/70 text-sm">
                  This is a demo store. No real payment will be processed.
                  Clicking "Place Order" will simulate a successful transaction.
                </p>
                <div className="flex gap-2 opacity-50">
                  <div className="w-12 h-8 bg-gray-300 rounded"></div>
                  <div className="w-12 h-8 bg-gray-300 rounded"></div>
                  <div className="w-12 h-8 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-brand-dark text-brand-light p-8 rounded-2xl sticky top-32 shadow-xl">
              <h3 className="text-2xl font-heading font-medium mb-6">
                Your Order
              </h3>

              <div className="flex flex-col gap-4 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-4 border-b border-white/10 pb-4"
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden shrink-0 relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-brand-gold text-brand-dark text-[10px] flex items-center justify-center rounded-full font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-heading font-medium text-sm">
                        {item.product.name}
                      </h4>
                    </div>
                    <div className="font-semibold text-brand-gold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 mb-8 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/20 pt-4 flex justify-between items-end">
                  <span className="text-lg">Total</span>
                  <span className="text-3xl font-heading font-semibold text-brand-gold">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-brand-gold text-brand-dark py-4 font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-white transition-colors relative overflow-hidden flex justify-center items-center h-14"
              >
                {isProcessing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="w-6 h-6 border-2 border-brand-dark border-t-transparent rounded-full"
                  />
                ) : (
                  <span>Place Order</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
