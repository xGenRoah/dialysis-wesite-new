import { useState, useEffect, useRef } from 'react';
import { CalendarDays, Clock, User, FileText, CheckCircle, ChevronRight, ChevronLeft, AlertCircle, Package } from 'lucide-react';

const sessionTypes = [
  {
    id: 'single',
    label: 'Single Session',
    price: '₹1,800',
    desc: 'One-time dialysis session',
    duration: '4–5 hrs',
    icon: '💉',
  },
  {
    id: 'monthly',
    label: 'Monthly Package (12 sessions)',
    price: '₹19,500',
    desc: 'Save ₹2,100 vs. individual',
    duration: '4-week quota',
    icon: '📅',
    popular: true,
  },
  {
    id: 'quarterly',
    label: 'Quarterly Package (36 sessions)',
    price: '₹54,000',
    desc: 'Best value — save ₹10,800',
    duration: '12-week quota',
    icon: '🗓️',
  },
  {
    id: 'emergency',
    label: 'Emergency Session',
    price: '₹2,500',
    desc: 'Urgent / off-schedule sessions',
    duration: 'Priority access',
    icon: '🚨',
  },
];

const shifts = [
  { id: 'morning', label: 'Morning Shift', time: '6:00 AM – 10:00 AM' },
  { id: 'afternoon', label: 'Afternoon Shift', time: '11:00 AM – 3:00 PM' },
  { id: 'evening', label: 'Evening Shift', time: '4:00 PM – 8:00 PM' },
  { id: 'night', label: 'Night Shift', time: '9:00 PM – 1:00 AM' },
];

const doctors = [
  { id: 'fahad', label: 'Dr. Mohammed Fahad Khan', role: 'Founder & VC' },
  { id: 'tausif', label: 'Dr. Tausif', role: 'Senior Consultant' },
  { id: 'ammar', label: 'Dr. Ammar Yasir', role: 'Consultant' },
  { id: 'any', label: 'No Preference (On-duty)', role: 'Auto-assign' },
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

const paymentMethods = [
  { id: 'upi', label: 'UPI (GPay / PhonePe / Paytm)', icon: '📱' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
  { id: 'cash', label: 'Cash / Counter Pay', icon: '💵' },
  { id: 'insurance', label: 'Insurance / TPA Claim', icon: '📄' },
];

export default function Booking() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    sessionType: '',
    shift: '',
    doctor: '',
    date: '',
    name: '',
    phone: '',
    bloodGroup: '',
    lastDialysis: '',
    notes: '',
    payment: '',
    insurance: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const canNext = () => {
    if (step === 1) return form.sessionType && form.shift && form.date;
    if (step === 2) return form.name && form.phone && form.bloodGroup;
    if (step === 3) return form.payment;
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-slate-50 to-teal-50/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 section-reveal">
          <span className="inline-block bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-teal-100">
            Book a Session
          </span>
          <h2 className="text-4xl font-black text-[#0a1f44] font-montserrat mb-4">
            Schedule Your <br />
            <span className="gradient-text">Dialysis Session</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed font-inter">
            Choose your package, preferred shift, and complete your booking in 3 simple steps. Receive instant confirmation via SMS.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pricing Sidebar */}
          <div className="lg:col-span-1 space-y-4 section-reveal">
            <h3 className="text-sm font-bold text-[#0a1f44] uppercase tracking-widest font-montserrat flex items-center gap-2 mb-5">
              <Package size={15} className="text-teal-500" />
              Transparent Pricing
            </h3>
            {sessionTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => { update('sessionType', type.id); setStep(1); }}
                className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all
                  ${form.sessionType === type.id
                    ? 'border-teal-500 bg-teal-50 shadow-md'
                    : 'border-slate-100 bg-white hover:border-teal-200 hover:shadow-sm'
                  }`}
              >
                {type.popular && (
                  <span className="absolute -top-2.5 right-4 bg-teal-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">{type.icon}</span>
                  <span className="text-[#0a1f44] font-black font-montserrat text-lg">{type.price}</span>
                </div>
                <div className="font-bold text-[#0a1f44] text-sm font-montserrat">{type.label}</div>
                <div className="text-slate-500 text-xs mt-0.5 font-inter">{type.desc}</div>
                <div className="text-teal-600 text-xs font-semibold mt-2 font-inter">⏱ {type.duration}</div>
              </div>
            ))}

            {/* Info box */}
            <div className="bg-[#0a1f44] rounded-2xl p-5 text-white">
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm font-montserrat mb-1">Need Emergency Dialysis?</p>
                  <p className="text-slate-300 text-xs leading-relaxed font-inter">Don't use the form. Call directly for immediate attention.</p>
                  <a href="tel:+916398311550" className="mt-2 inline-block text-teal-400 font-bold text-sm hover:text-teal-300 transition-colors">
                    📞 +91 6398311550
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2 section-reveal">
            {!submitted ? (
              <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
                {/* Progress Steps */}
                <div className="bg-slate-50 border-b border-slate-100 px-8 py-5">
                  <div className="flex items-center gap-2">
                    {[
                      { n: 1, label: 'Session Details', icon: <CalendarDays size={14} /> },
                      { n: 2, label: 'Patient Info', icon: <User size={14} /> },
                      { n: 3, label: 'Payment', icon: <FileText size={14} /> },
                    ].map((s, i) => (
                      <div key={s.n} className="flex items-center gap-2 flex-1">
                        <div
                          className={`flex items-center gap-1.5 text-xs font-semibold font-inter whitespace-nowrap
                            ${step === s.n ? 'text-teal-600' : step > s.n ? 'text-teal-500' : 'text-slate-400'}`}
                        >
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all
                            ${step === s.n ? 'bg-teal-600 text-white shadow-md' : step > s.n ? 'bg-teal-100 text-teal-600' : 'bg-slate-100 text-slate-400'}`}>
                            {step > s.n ? <CheckCircle size={14} /> : s.n}
                          </div>
                          <span className="hidden sm:inline">{s.label}</span>
                        </div>
                        {i < 2 && <div className={`flex-1 h-0.5 rounded-full ${step > s.n ? 'bg-teal-400' : 'bg-slate-200'}`} />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8">
                  {/* Step 1: Session Details */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-[#0a1f44] uppercase tracking-wide mb-3 font-montserrat">
                          <CalendarDays size={12} className="inline mr-1.5 text-teal-500" />
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          min={minDateStr}
                          value={form.date}
                          onChange={e => update('date', e.target.value)}
                          className="form-input"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0a1f44] uppercase tracking-wide mb-3 font-montserrat">
                          <Clock size={12} className="inline mr-1.5 text-teal-500" />
                          Preferred Shift
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {shifts.map((shift) => (
                            <label
                              key={shift.id}
                              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all
                                ${form.shift === shift.id ? 'border-teal-500 bg-teal-50' : 'border-slate-100 hover:border-teal-200'}`}
                            >
                              <input
                                type="radio"
                                name="shift"
                                value={shift.id}
                                checked={form.shift === shift.id}
                                onChange={() => update('shift', shift.id)}
                                className="text-teal-600 accent-teal-600"
                              />
                              <div>
                                <div className="text-xs font-bold text-[#0a1f44] font-montserrat">{shift.label}</div>
                                <div className="text-xs text-slate-500 font-inter">{shift.time}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0a1f44] uppercase tracking-wide mb-3 font-montserrat">
                          Preferred Doctor
                        </label>
                        <select
                          value={form.doctor}
                          onChange={e => update('doctor', e.target.value)}
                          className="form-input"
                        >
                          <option value="">Select doctor preference…</option>
                          {doctors.map(d => (
                            <option key={d.id} value={d.id}>{d.label} ({d.role})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Patient Info */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[#0a1f44] uppercase tracking-wide mb-2 font-montserrat">Full Name *</label>
                          <input
                            type="text"
                            placeholder="Patient's full name"
                            value={form.name}
                            onChange={e => update('name', e.target.value)}
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#0a1f44] uppercase tracking-wide mb-2 font-montserrat">Phone Number *</label>
                          <input
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            value={form.phone}
                            onChange={e => update('phone', e.target.value)}
                            className="form-input"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[#0a1f44] uppercase tracking-wide mb-2 font-montserrat">Blood Group *</label>
                          <select
                            value={form.bloodGroup}
                            onChange={e => update('bloodGroup', e.target.value)}
                            className="form-input"
                          >
                            <option value="">Select blood group…</option>
                            {bloodGroups.map(bg => <option key={bg}>{bg}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#0a1f44] uppercase tracking-wide mb-2 font-montserrat">Last Dialysis Date</label>
                          <input
                            type="date"
                            value={form.lastDialysis}
                            onChange={e => update('lastDialysis', e.target.value)}
                            className="form-input"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0a1f44] uppercase tracking-wide mb-2 font-montserrat">Prescription / Medical Notes</label>
                        <textarea
                          rows={3}
                          placeholder="Any relevant medical history, allergies, or doctor's instructions…"
                          value={form.notes}
                          onChange={e => update('notes', e.target.value)}
                          className="form-input resize-none"
                        />
                      </div>
                      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                        <p className="text-amber-700 text-xs font-inter">
                          <strong>Note:</strong> You may also upload your prescription and previous KFT reports at the center counter. Our team will call you to confirm your booking within 2 hours.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Payment */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-[#0a1f44] uppercase tracking-wide mb-3 font-montserrat">
                          Select Payment Method *
                        </label>
                        <div className="space-y-2.5">
                          {paymentMethods.map((method) => (
                            <label
                              key={method.id}
                              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                                ${form.payment === method.id ? 'border-teal-500 bg-teal-50' : 'border-slate-100 hover:border-teal-200'}`}
                            >
                              <input
                                type="radio"
                                name="payment"
                                value={method.id}
                                checked={form.payment === method.id}
                                onChange={() => update('payment', method.id)}
                                className="accent-teal-600"
                              />
                              <span className="text-xl">{method.icon}</span>
                              <span className="text-sm font-semibold text-[#0a1f44] font-inter">{method.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {form.payment === 'insurance' && (
                        <div>
                          <label className="block text-xs font-bold text-[#0a1f44] uppercase tracking-wide mb-2 font-montserrat">Insurance Provider / TPA Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Star Health, Medi-Assist, Ayushman Bharat…"
                            value={form.insurance}
                            onChange={e => update('insurance', e.target.value)}
                            className="form-input"
                          />
                        </div>
                      )}

                      {/* Summary */}
                      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                        <h4 className="font-bold text-[#0a1f44] text-sm font-montserrat mb-3">Booking Summary</h4>
                        <div className="space-y-2">
                          {[
                            { label: 'Session Type', value: sessionTypes.find(s => s.id === form.sessionType)?.label || '—' },
                            { label: 'Date', value: form.date || '—' },
                            { label: 'Shift', value: shifts.find(s => s.id === form.shift)?.label || '—' },
                            { label: 'Patient', value: form.name || '—' },
                            { label: 'Total', value: sessionTypes.find(s => s.id === form.sessionType)?.price || '—', bold: true },
                          ].map((item) => (
                            <div key={item.label} className="flex justify-between text-xs font-inter">
                              <span className="text-slate-500">{item.label}</span>
                              <span className={`font-semibold ${item.bold ? 'text-teal-600 text-sm' : 'text-[#0a1f44]'}`}>{item.value}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-slate-400 text-xs mt-3 font-inter">* GST-compliant digital receipt issued immediately after booking confirmation.</p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                    <button
                      onClick={() => setStep(s => s - 1)}
                      disabled={step === 1}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-inter"
                    >
                      <ChevronLeft size={16} />
                      Back
                    </button>
                    {step < 3 ? (
                      <button
                        onClick={() => setStep(s => s + 1)}
                        disabled={!canNext()}
                        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-7 py-3 rounded-xl transition-all shadow-md font-inter"
                      >
                        Continue
                        <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={!canNext()}
                        className="flex items-center gap-2 bg-[#0a1f44] hover:bg-[#0d2a5c] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold px-8 py-3 rounded-xl transition-all shadow-lg font-inter"
                      >
                        <CheckCircle size={16} />
                        Confirm Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Success State */
              <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-[#0a1f44] font-montserrat mb-3">Booking Request Received!</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-inter max-w-md mx-auto">
                  Thank you, <strong>{form.name}</strong>. Your booking request for <strong>{sessionTypes.find(s => s.id === form.sessionType)?.label}</strong> on <strong>{form.date}</strong> has been received. Our team will call you within 2 hours to confirm your slot.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => { setSubmitted(false); setStep(1); setForm({ sessionType: '', shift: '', doctor: '', date: '', name: '', phone: '', bloodGroup: '', lastDialysis: '', notes: '', payment: '', insurance: '' }); }}
                    className="flex items-center justify-center gap-2 bg-teal-600 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-teal-700 transition-all"
                  >
                    Book Another Session
                  </button>
                  <a
                    href="tel:+916398311550"
                    className="flex items-center justify-center gap-2 border border-[#0a1f44] text-[#0a1f44] text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#0a1f44] hover:text-white transition-all"
                  >
                    📞 Call for Immediate Help
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
