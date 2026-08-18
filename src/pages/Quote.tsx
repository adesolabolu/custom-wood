import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Linkedin, ChevronDown } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { useToast } from "../context/ToastContext";
import { ImageUploadInput } from "../components/ui/ImageUploadInput";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function Quote() {
  const { addQuoteRequest } = useAdmin();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    budget: "",
    timeline: "",
    details: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    addQuoteRequest({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      type: formData.type,
      budget: formData.budget,
      timeline: formData.timeline,
      details: formData.details,
      image: formData.image,
    });

    showToast("Quote request submitted successfully", "success");
    setFormData({
      name: "",
      email: "",
      phone: "",
      type: "",
      budget: "",
      timeline: "",
      details: "",
      image: "",
    });
  };

  return (
    <div className="bg-brand-light min-h-screen pb-20">
      {/* Header Section */}
      <section className="relative w-full pt-32 pb-10 flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div className="w-full text-left">
          <Breadcrumbs />
        </div>
        <div className="relative z-10 text-brand-dark px-6 w-full">
          <div className="uppercase tracking-widest text-xs font-bold mb-8 flex items-center justify-center gap-4 before:content-['['] after:content-[']']">
            GET A QUOTE
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight uppercase max-w-3xl mx-auto">
            Request an Estimate
          </h1>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 mt-8">
        <div className="rounded-[32px] overflow-hidden flex flex-col">
          {/* Form and Details Section */}
          <section className="bg-brand-brown text-brand-light w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left: Form Area */}
              <div className="lg:col-span-8 p-8 sm:p-12 md:p-16 xl:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="uppercase tracking-widest text-xs font-bold mb-6 flex items-center gap-4 before:content-['['] after:content-[']']">
                  PROJECT DETAILS
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium tracking-tight mb-4">
                  Tell us about your vision.
                </h2>
                <p className="text-brand-light/90 leading-relaxed mb-10 max-w-lg text-base md:text-lg">
                  Provide us with some details about your project, and our team
                  will get back to you with a personalized estimate.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 max-w-2xl"
                >
                  <div className="grid grid-cols-1 gap-6">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full transition-shadow"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      className="bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full transition-shadow"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full transition-shadow"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full transition-shadow appearance-none cursor-pointer"
                      >
                        <option value="" disabled>
                          Project Type
                        </option>
                        <option value="kitchens">Kitchens</option>
                        <option value="bathrooms">Bathrooms</option>
                        <option value="cabinetry">Cabinetry</option>
                        <option value="tables">Tables</option>
                        <option value="seating">Seating</option>
                        <option value="closets">Closets</option>
                        <option value="doors">Doors</option>
                        <option value="millwork">Millwork</option>
                        <option value="cnc">CNC</option>
                        <option value="commercial">Commercial</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-dark/50 pointer-events-none"
                        size={20}
                      />
                    </div>

                    <div className="relative">
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full transition-shadow appearance-none cursor-pointer"
                      >
                        <option value="" disabled>
                          Estimated Budget
                        </option>
                        <option value="under_5k">&lt; $5,000</option>
                        <option value="5k_10k">$5,000 - $10,000</option>
                        <option value="10k_25k">$10,000 - $25,000</option>
                        <option value="25k_plus">$25,000+</option>
                      </select>
                      <ChevronDown
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-dark/50 pointer-events-none"
                        size={20}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full transition-shadow appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Expected Timeline
                      </option>
                      <option value="asap">ASAP</option>
                      <option value="1_month">Within 1 month</option>
                      <option value="3_months">Within 3 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                    <ChevronDown
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-dark/50 pointer-events-none"
                      size={20}
                    />
                  </div>

                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Describe your project details..."
                    required
                    rows={6}
                    className="bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full resize-none transition-shadow"
                  ></textarea>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-white/70">
                      Upload Image (Optional)
                    </label>
                    <ImageUploadInput onUpload={(url) => setFormData(prev => ({ ...prev, image: url }))} />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="self-start mt-2"
                  >
                    <button
                      type="submit"
                      className="bg-[#D3A971] text-brand-dark btn-fill-white transition-colors px-10 py-4 font-bold uppercase tracking-widest text-xs rounded-sm w-full sm:w-auto"
                    >
                      SUBMIT REQUEST
                    </button>
                  </motion.div>
                </form>
              </div>

              {/* Right: Contact Details Area */}
              <div className="lg:col-span-4 p-8 sm:p-12 md:p-16 xl:p-24 flex flex-col bg-black/5">
                <h3 className="text-2xl md:text-3xl font-heading font-medium tracking-tight mb-10">
                  Prefer to call?
                </h3>

                <div className="flex flex-col gap-8">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-white/70 mb-2">
                      PHONE
                    </h4>
                    <a
                      href="tel:+001234209304"
                      className="text-white hover:text-brand-gold transition-colors font-medium text-base md:text-lg"
                    >
                      (+00)-1234-209-304
                    </a>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-white/70 mb-2">
                      EMAIL
                    </h4>
                    <a
                      href="mailto:info@woodworked.co"
                      className="text-white hover:text-brand-gold transition-colors font-medium text-base md:text-lg"
                    >
                      info@woodworked.co
                    </a>
                  </div>

                  <div className="mt-8 text-brand-light/90 text-base leading-relaxed">
                    Our team is available Monday through Friday from 9am to 6pm
                    to answer any questions you might have about our process or
                    pricing.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
