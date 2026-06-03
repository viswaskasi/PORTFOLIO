import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Facebook, Instagram, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const WEB3FORMS_KEY = "4fc7e7cf-69db-4156-925e-1c7644776a11";

type Status = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
    if (errors[id as keyof typeof form]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!WEB3FORMS_KEY || WEB3FORMS_KEY.trim() === "" || WEB3FORMS_KEY.includes("YOUR_ACCESS_KEY_HERE")) {
      setStatus('unconfigured');
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-transparent">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[250px] bg-[#FF003C]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FF003C]/20 bg-[#FF003C]/5 text-xs font-semibold text-[#FF003C] mb-4 tracking-wider uppercase">
            <MessageSquare size={12} />
            Connect
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
            Get In <span className="text-gradient-purple font-extrabold" style={{ '--color-accent': '#FF003C' } as React.CSSProperties}>Touch</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#FF003C] to-[#FF3E6C] rounded-full mt-4"></div>
          <p className="mt-4 text-zinc-500 max-w-2xl font-light text-base md:text-lg">
            Have a project or opportunity in mind? Complete the secure connection sequence below.
          </p>
        </motion.div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 70, damping: 15 }}
            className="space-y-6 text-left"
          >
            <div className="p-8 flowing-border-card space-y-8">
              <h3 className="text-2xl font-bold font-display text-white tracking-tight">Secure Channels</h3>

              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-xl shrink-0"
                  style={{
                    color: '#FF003C',
                    borderColor: 'rgba(255, 0, 60, 0.25)',
                    backgroundColor: 'rgba(255, 0, 60, 0.08)',
                    borderWidth: '1px'
                  }}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-1">Email</h4>
                  <a href="mailto:viswaskasi2006@gmail.com" className="text-base text-zinc-300 hover:text-[#FF003C] font-medium transition-colors">
                    viswaskasi2006@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-xl shrink-0"
                  style={{
                    color: '#FF3E6C',
                    borderColor: 'rgba(255, 62, 108, 0.25)',
                    backgroundColor: 'rgba(255, 62, 108, 0.08)',
                    borderWidth: '1px'
                  }}
                >
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-1">Phone</h4>
                  <a href="tel:+918074800497" className="text-base text-zinc-300 hover:text-[#FF3E6C] font-medium transition-colors">
                    +91 8074800497
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-xl shrink-0"
                  style={{
                    color: '#9B001C',
                    borderColor: 'rgba(155, 0, 28, 0.25)',
                    backgroundColor: 'rgba(155, 0, 28, 0.08)',
                    borderWidth: '1px'
                  }}
                >
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-1">Location</h4>
                  <p className="text-base text-zinc-300 font-medium">
                    Visakhapatnam, AP, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social box */}
            <div className="p-6 flowing-border-card text-left">
              <h4 className="text-xs uppercase font-mono tracking-[0.2em] text-zinc-500 mb-4 pl-1">Follow my updates</h4>
              <div className="flex gap-3">
                <a
                  href="https://github.com/viswaskasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#FF003C]/15 hover:border-[#FF003C]/40 transition-all duration-300"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/kasi-viswas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#FF3E6C]/15 hover:border-[#FF3E6C]/40 transition-all duration-300"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61573993324010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#9B001C]/15 hover:border-[#9B001C]/40 transition-all duration-300"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://www.instagram.com/viswas.kasi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#FF003C]/15 hover:border-[#FF003C]/40 transition-all duration-300"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 70, damping: 15 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 flowing-border-card space-y-5"
              noValidate
            >
              {/* Name */}
              <div className="space-y-1.5 text-left relative group">
                <label htmlFor="name" className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold pl-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-xl border bg-black text-white focus:outline-none transition-all placeholder:text-zinc-700 text-sm ${
                    errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-[#FF003C] focus:shadow-[0_0_15px_rgba(255,0,60,0.15)]'
                  }`}
                />
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-[#FF003C] to-[#FF3E6C] transition-all duration-300 group-focus-within:w-full group-focus-within:left-0 rounded-full"></span>
                {errors.name && <p className="text-red-400 text-xs mt-1 pl-1 font-mono">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5 text-left relative group">
                <label htmlFor="email" className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold pl-1">Your Email</label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-xl border bg-black text-white focus:outline-none transition-all placeholder:text-zinc-700 text-sm ${
                    errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-[#FF003C] focus:shadow-[0_0_15px_rgba(255,0,60,0.15)]'
                  }`}
                />
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-[#FF003C] to-[#FF3E6C] transition-all duration-300 group-focus-within:w-full group-focus-within:left-0 rounded-full"></span>
                {errors.email && <p className="text-red-400 text-xs mt-1 pl-1 font-mono">{errors.email}</p>}
              </div>

              {/* Message */}
              <div className="space-y-1.5 text-left relative group">
                <label htmlFor="message" className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold pl-1">Message</label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Initiate communication..."
                  className={`w-full px-4 py-3 rounded-xl border bg-black text-white focus:outline-none transition-all placeholder:text-zinc-700 resize-none text-sm ${
                    errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-[#FF003C] focus:shadow-[0_0_15px_rgba(255,0,60,0.15)]'
                  }`}
                ></textarea>
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-[#FF003C] to-[#FF3E6C] transition-all duration-300 group-focus-within:w-full group-focus-within:left-0 rounded-full"></span>
                {errors.message && <p className="text-red-400 text-xs mt-1 pl-1 font-mono">{errors.message}</p>}
              </div>

              {/* Status Box */}
              {status === 'success' && (
                <div className="flex items-center gap-2.5 text-red-400 bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3 text-xs">
                  <CheckCircle size={14} />
                  <span>Secure connection established. Message sent successfully.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2.5 text-red-400 bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3 text-xs">
                  <AlertCircle size={14} />
                  <span>Transmission error. Please attempt again or direct-mail.</span>
                </div>
              )}
              {status === 'unconfigured' && (
                <div className="flex flex-col gap-2 text-red-400 bg-red-500/5 border border-red-500/20 rounded-xl p-4 text-xs text-left">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>Contact Form Setup Required</span>
                  </div>
                  <p className="text-zinc-400 font-light leading-relaxed">
                    To receive visitors' messages directly in your email inbox, please follow this setup:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-zinc-300 font-mono text-[9px] bg-black/40 p-2.5 rounded-xl border border-white/5 pl-3">
                    <li>Go to <a href="https://web3forms.com" target="_blank" rel="noreferrer" className="text-[#FF003C] hover:underline font-bold">web3forms.com</a></li>
                    <li>Submit <code className="text-white bg-white/10 px-1 py-0.5 rounded font-mono select-all">viswaskasi2006@gmail.com</code></li>
                    <li>Copy key from email and paste at <code className="text-white bg-white/10 px-1 py-0.5 rounded">src/components/Contact.tsx</code> line 5</li>
                  </ol>
                </div>
              )}

              {/* Submit Trigger */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full relative px-6 py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-[#FF003C] to-[#FF3E6C] hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-[0_0_20px_rgba(255,0,60,0.2)]"
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <span className="text-xs uppercase tracking-wider font-bold">TRANSMITTING...</span>
                  </>
                ) : (
                  <>
                    <span className="text-xs uppercase tracking-wider font-bold">Establish Connection</span>
                    <Send size={13} className="transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
