import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Instagram, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
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

  const focusMessageForm = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const inputElement = document.getElementById('name');
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      inputElement?.focus();
    }, 350);
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
    <section id="contact" className="pt-16 md:pt-20 pb-4 md:pb-6 relative overflow-hidden bg-transparent">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F0F2F5] blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D0D3D9] bg-[#FFFFFF] text-xs font-bold text-[#000000] mb-4 tracking-wider uppercase font-mono shadow-xs">
            <Mail size={12} />
            Transmission Channel
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-display text-[#000000] tracking-tight">
            Get in <span className="text-[#000000] font-black">Touch</span>
          </h2>
          <div className="flex items-center gap-2 mt-4">
            <div className="h-1.5 w-16 bg-[#000000] rounded-full"></div>
            <div className="h-1.5 w-3 bg-[#66676A] rounded-full"></div>
          </div>
          <p className="mt-4 text-[#2E3033] max-w-2xl font-semibold text-base md:text-lg">
            Have a project in mind or interested in hiring? Send me a message and let's collaborate on your next big idea.
          </p>
        </motion.div>

        {/* Contact Layout Grid */}
        <div className="space-y-8 text-left">
          
          {/* ── Top Full-Width Editorial Pure Black "LET'S TALK" Banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ type: "spring", stiffness: 70, damping: 15 }}
            className="w-full"
          >
            <div className="p-8 sm:p-12 rounded-3xl bg-[#000000] text-white border border-[#222222] shadow-[0_20px_60px_rgba(0,0,0,0.35)] relative overflow-hidden flex flex-col justify-between min-h-[340px]">
              
              {/* Top ambient highlight line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Top Row: Spaced Social Text Badges */}
              <div className="flex items-center justify-between flex-wrap gap-4 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase font-black select-none border-b border-zinc-800/80 pb-5">
                <div className="flex items-center gap-6 flex-wrap">
                  <a href="https://www.instagram.com/viswas.kasi/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">INSTAGRAM</a>
                  <a href="https://github.com/viswaskasi" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">GITHUB</a>
                  <a href="https://www.linkedin.com/in/kasi-viswas" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">LINKEDIN</a>
                  <span className="hidden sm:inline hover:text-white transition-colors">COMMUNITY</span>
                  <span className="hidden sm:inline hover:text-white transition-colors">PORTFOLIO</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-[10px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-mono font-bold tracking-wider uppercase">AVAILABLE FOR WORK</span>
                </div>
              </div>

              {/* Center: Massive Metallic "LET'S TALK" Typography */}
              <div className="my-8 sm:my-10 text-center sm:text-left">
                <h3 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-tighter uppercase leading-[0.88] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#E4E4E7] to-[#71717A] select-none">
                  LET'S TALK
                </h3>
              </div>

              {/* Bottom Row: Stylish Pill Buttons with Attractive Icons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Instagram Pill */}
                  <a
                    href="https://www.instagram.com/viswas.kasi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-zinc-200 text-[#000000] font-black text-xs font-mono tracking-wider uppercase transition-all duration-300 shadow-md hover:scale-105 group cursor-pointer border border-white"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <Instagram size={14} className="text-[#000000] group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <span>INSTAGRAM</span>
                  </a>

                  {/* GitHub Pill */}
                  <a
                    href="https://github.com/viswaskasi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-zinc-200 text-[#000000] font-black text-xs font-mono tracking-wider uppercase transition-all duration-300 shadow-md hover:scale-105 group cursor-pointer border border-white"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <Github size={14} className="text-[#000000] group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <span>GITHUB</span>
                  </a>

                  {/* LinkedIn Pill */}
                  <a
                    href="https://www.linkedin.com/in/kasi-viswas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-zinc-200 text-[#000000] font-black text-xs font-mono tracking-wider uppercase transition-all duration-300 shadow-md hover:scale-105 group cursor-pointer border border-white"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <Linkedin size={14} className="text-[#000000] group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <span>LINKEDIN</span>
                  </a>

                  {/* Contact Me Outlined Pill -> Direct to Send Message Form */}
                  <button
                    onClick={focusMessageForm}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-white/10 text-white border border-white/40 hover:border-white font-black text-xs font-mono tracking-wider uppercase transition-all duration-300 shadow-md hover:scale-105 group cursor-pointer"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <Mail size={14} className="text-white group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <span>SEND MESSAGE</span>
                  </button>
                </div>

                {/* Bottom Copyright & Design Credit */}
                <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold flex items-center gap-3">
                  <span>© PORTFOLIO</span>
                  <span>•</span>
                  <span className="text-zinc-400 font-black">DESIGN BY KASI VISWAS</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ── 2-Column Row: Left (Direct Coordinates) & Right (Send Message Form) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* ── Left Column: Direct Coordinates Card ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ type: "spring", stiffness: 70, damping: 15 }}
              className="lg:col-span-5 flex flex-col"
            >
              <div className="p-6 sm:p-8 rounded-3xl flowing-border-card flex flex-col justify-between h-full space-y-6">
                
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                    <h4 className="text-xs uppercase font-mono tracking-widest text-[#000000] font-black flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#000000] text-white flex items-center justify-center">
                        <Sparkles size={12} />
                      </div>
                      Direct Coordinates
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      ● Active Online
                    </span>
                  </div>

                  <p className="text-xs text-[#2E3033] font-medium mt-3 leading-relaxed">
                    Direct access communication channels. Connect immediately for engineering opportunities, project collaborations, or technical advisory.
                  </p>
                </div>

                {/* Coordinate Channel Items */}
                <div className="space-y-3 flex-1">
                  
                  {/* Email Item */}
                  <button 
                    onClick={focusMessageForm}
                    className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F8F9FB] border border-[#D0D3D9] hover:border-[#000000] hover:bg-[#FFFFFF] transition-all text-left cursor-pointer group shadow-xs hover:shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#D0D3D9] group-hover:border-[#000000] group-hover:bg-[#000000] group-hover:text-white flex items-center justify-center text-[#000000] transition-all shrink-0 shadow-xs">
                      <Mail size={16} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="truncate">
                      <span className="text-[9px] uppercase font-mono text-[#2E3033] block font-bold tracking-wider">Email (Send Message)</span>
                      <span className="text-xs font-black text-[#000000] truncate font-mono">viswaskasi2006@gmail.com</span>
                    </div>
                  </button>

                  {/* Phone Item */}
                  <a 
                    href="tel:+918074800497" 
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F8F9FB] border border-[#D0D3D9] hover:border-[#000000] hover:bg-[#FFFFFF] transition-all group shadow-xs hover:shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#D0D3D9] group-hover:border-[#000000] group-hover:bg-[#000000] group-hover:text-white flex items-center justify-center text-[#000000] transition-all shrink-0 shadow-xs">
                      <Phone size={16} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-mono text-[#2E3033] block font-bold tracking-wider">Direct Phone</span>
                      <span className="text-xs font-black text-[#000000] font-mono">+91 8074800497</span>
                    </div>
                  </a>

                  {/* Location Item */}
                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F8F9FB] border border-[#D0D3D9] shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#D0D3D9] flex items-center justify-center text-[#000000] shrink-0 shadow-xs">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-mono text-[#2E3033] block font-bold tracking-wider">Geographic Base</span>
                      <span className="text-xs font-bold text-[#000000]">Visakhapatnam, Andhra Pradesh, India</span>
                    </div>
                  </div>

                </div>

                {/* Response Commitment Footer Card */}
                <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#D0D3D9] space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between text-[10px] font-mono font-black text-[#000000]">
                    <span>ESTIMATED RESPONSE TIME</span>
                    <span className="text-emerald-700 font-bold">&lt; 2 Hours</span>
                  </div>
                  <p className="text-[11px] text-[#2E3033] font-medium leading-relaxed">
                    Open for Software Engineer, Full-Stack, and AI Engineer roles globally.
                  </p>
                </div>

              </div>
            </motion.div>

            {/* ── Right Column: Message Transmission Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ type: "spring", stiffness: 70, damping: 15 }}
              className="lg:col-span-7"
            >
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="p-8 sm:p-10 rounded-3xl flowing-border-card space-y-5 scroll-mt-28 h-full flex flex-col justify-between"
                noValidate
              >
                <div>
                  <div className="pb-3 border-b border-[#E5E7EB] mb-5">
                    <h3 className="text-2xl font-black font-display text-[#000000] tracking-tight">Send a Message</h3>
                    <p className="text-xs text-[#2E3033] font-medium mt-1">Have a project, inquiry, or proposal? Drop your details below.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1.5 text-left relative group">
                      <label htmlFor="name" className="text-[10px] uppercase font-mono tracking-widest text-[#000000] font-black pl-1">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl border bg-[#FFFFFF] text-[#000000] font-semibold focus:outline-none transition-all placeholder:text-[#2E3033]/50 text-sm ${
                          errors.name ? 'border-[#000000] focus:border-[#000000]' : 'border-[#D0D3D9] focus:border-[#000000] focus:ring-1 focus:ring-[#000000]/10 focus:shadow-xs'
                        }`}
                      />
                      {errors.name && <p className="text-[#000000] text-xs mt-1 pl-1 font-mono font-bold">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5 text-left relative group">
                      <label htmlFor="email" className="text-[10px] uppercase font-mono tracking-widest text-[#000000] font-black pl-1">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-xl border bg-[#FFFFFF] text-[#000000] font-semibold focus:outline-none transition-all placeholder:text-[#2E3033]/50 text-sm ${
                          errors.email ? 'border-[#000000] focus:border-[#000000]' : 'border-[#D0D3D9] focus:border-[#000000] focus:ring-1 focus:ring-[#000000]/10 focus:shadow-xs'
                        }`}
                      />
                      {errors.email && <p className="text-[#000000] text-xs mt-1 pl-1 font-mono font-bold">{errors.email}</p>}
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5 text-left relative group">
                      <label htmlFor="message" className="text-[10px] uppercase font-mono tracking-widest text-[#000000] font-black pl-1">Message</label>
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell me about your project or opportunity..."
                        className={`w-full px-4 py-3 rounded-xl border bg-[#FFFFFF] text-[#000000] font-semibold focus:outline-none transition-all placeholder:text-[#2E3033]/50 resize-none text-sm ${
                          errors.message ? 'border-[#000000] focus:border-[#000000]' : 'border-[#D0D3D9] focus:border-[#000000] focus:ring-1 focus:ring-[#000000]/10 focus:shadow-xs'
                        }`}
                      ></textarea>
                      {errors.message && <p className="text-[#000000] text-xs mt-1 pl-1 font-mono font-bold">{errors.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Status Box */}
                  {status === 'success' && (
                    <div className="flex items-center gap-2.5 text-emerald-950 bg-emerald-50 border border-emerald-300 rounded-xl px-4 py-3 text-xs font-bold">
                      <CheckCircle size={15} className="text-emerald-700 stroke-[2.5]" />
                      <span>Message sent successfully! I will get back to you shortly.</span>
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="flex items-center gap-2.5 text-red-950 bg-red-50 border border-red-300 rounded-xl px-4 py-3 text-xs font-bold">
                      <AlertCircle size={15} className="text-[#000000]" />
                      <span>Transmission error. Please attempt again or email directly.</span>
                    </div>
                  )}
                  {status === 'unconfigured' && (
                    <div className="flex flex-col gap-2 text-[#000000] bg-[#F8F9FB] border border-[#D0D3D9] rounded-xl p-4 text-xs text-left">
                      <div className="flex items-center gap-2 font-black">
                        <AlertCircle size={15} className="shrink-0 text-[#000000]" />
                        <span>Contact Form Setup Required</span>
                      </div>
                      <p className="text-[#2E3033] font-medium leading-relaxed">
                        To receive visitors' messages directly in your email inbox, please follow this setup:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-[#000000] font-mono text-[9px] bg-[#FFFFFF] p-2.5 rounded-xl border border-[#D0D3D9] pl-3 font-bold">
                        <li>Go to <a href="https://web3forms.com" target="_blank" rel="noreferrer" className="text-[#000000] underline font-black">web3forms.com</a></li>
                        <li>Submit <code className="text-[#000000] bg-[#F8F9FB] px-1 py-0.5 rounded font-mono select-all">viswaskasi2006@gmail.com</code></li>
                        <li>Copy key from email and paste at <code className="text-[#000000] bg-[#F8F9FB] px-1 py-0.5 rounded">src/components/Contact.tsx</code> line 5</li>
                      </ol>
                    </div>
                  )}

                  {/* Submit Trigger */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full relative px-6 py-3.5 font-black text-white rounded-xl bg-[#000000] hover:bg-[#1C1C1C] hover:border-[#333538] border border-[#000000] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.22)] group"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        <span className="text-xs uppercase tracking-wider font-black">TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs uppercase tracking-wider font-black">Send Message</span>
                        <Send size={14} className="group-hover:translate-x-1 transition-all text-white" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
