import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Linkedin } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { useToast } from "../context/ToastContext";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function Contact() {
  const { addContactMessage } = useAdmin();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    addContactMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    showToast("Message sent successfully", "success");
    setFormData({ name: "", phone: "", email: "", message: "" });
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
            CONTACT US
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight uppercase max-w-3xl mx-auto">
            Start Your Next Project Today
          </h1>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 mt-8">
        {/* Container for Form */}
        <div className="rounded-[32px] overflow-hidden flex flex-col">
          {/* Form and Details Section */}
          <section className="bg-brand-brown text-brand-light w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left: Form Area */}
              <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 xl:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="uppercase tracking-widest text-xs font-bold mb-6 flex items-center gap-4 before:content-['['] after:content-[']']">
                  INQUIRY FORM
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium tracking-tight mb-4">
                  Any ideas, big or small, we'll hear them.
                </h2>
                <p className="text-brand-light/90 leading-relaxed mb-10 max-w-lg text-base md:text-lg">
                  Enhance your property's exterior with robust and beautiful
                  custom timber structures. From elegant cabinetry to structural
                  enhancements, we bring an artisan's touch to modern living.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 max-w-lg"
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
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
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full transition-shadow"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    required
                    rows={5}
                    className="bg-brand-light text-brand-dark placeholder:text-brand-dark/50 px-5 py-4 rounded-sm outline-none focus:ring-2 focus:ring-brand-gold w-full resize-none transition-shadow"
                  ></textarea>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="self-start mt-2"
                  >
                    <button
                      type="submit"
                      className="bg-[#D3A971] text-brand-dark btn-fill-white transition-colors px-8 py-3.5 font-bold uppercase tracking-widest text-xs rounded-sm w-full sm:w-auto"
                    >
                      SUBMIT
                    </button>
                  </motion.div>
                </form>
              </div>

              {/* Right: Contact Details Area */}
              <div className="lg:col-span-5 p-8 sm:p-12 md:p-16 xl:p-24 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium tracking-tight mb-10">
                  Connect with us.
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

                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-white/70 mb-2">
                      ADDRESS
                    </h4>
                    <p className="text-white font-medium leading-relaxed text-base md:text-lg">
                      123 Road Street
                      <br />
                      Townsville
                      <br />
                      Countyland
                      <br />
                      20193
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-white/70 mb-3">
                      SOCIALS
                    </h4>
                    <div className="flex items-center gap-4">
                      <a
                        href="#"
                        className="hover:text-brand-gold transition-colors"
                      >
                        <Facebook size={20} />
                      </a>
                      <a
                        href="#"
                        className="hover:text-brand-gold transition-colors"
                      >
                        <Linkedin size={20} />
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 text-brand-light/90 text-base leading-relaxed max-w-sm">
                    From grand entryways to stunning pergolas, we extend our
                    craftsmanship to the great outdoors. Sustainable sourcing
                    meets masterful execution in every project we take on.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Additional Map Section */}
      <section className="py-20 lg:py-28 px-4 md:px-8 text-center max-w-[1600px] mx-auto mt-12">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight text-brand-dark mb-12 uppercase">
          Find Us Here
        </h2>

        <div className="w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden bg-brand-dark/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101258.9404285741!2d-122.18663842340321!3d37.52554707437894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f95c4709d22df%3A0xc3b7cb7106ce61ed!2sSan%20Francisco%20Bay%20Area%2C%20CA!5e0!3m2!1sen!2sus!4v1714429712391!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
