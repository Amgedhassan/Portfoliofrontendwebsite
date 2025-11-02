import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Send, Briefcase, Palette } from 'lucide-react';
import { toast } from 'sonner';

export function MinimalContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message sent! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'amgedhassan@outlook.com',
      href: 'mailto:amgedhassan@outlook.com',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect with me',
      href: 'https://www.linkedin.com/in/amgad-hassan-243248145/',
    },
    {
      icon: Palette,
      label: 'Behance',
      value: 'View my portfolio',
      href: 'https://www.behance.net/amgedhassan',
    },
    {
      icon: Briefcase,
      label: 'Upwork',
      value: 'Hire me on Upwork',
      href: 'https://www.upwork.com/freelancers/~0147b1394d722077f1',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl lg:text-7xl font-medium mb-6 text-neutral-900">
            Let's Work Together
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            Have a project in mind or want to discuss opportunities? I'd love to hear 
            from you. Send me a message and I'll respond within 2 hours.
          </p>
        </motion.div>
      </section>

      {/* Contact Form + Methods */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <Send size={18} />}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-medium text-neutral-900 mb-6">
                Other Ways to Connect
              </h2>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + 0.1 * index }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <div className="p-3 bg-white rounded-lg">
                      <method.icon size={24} className="text-neutral-900" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-600">{method.label}</div>
                      <div className="font-medium text-neutral-900">{method.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="p-8 bg-neutral-900 rounded-2xl text-white">
              <h3 className="text-xl font-medium mb-3">
                Quick Response
              </h3>
              <p className="text-neutral-300 mb-4">
                I typically respond to all inquiries within 2 hours. For urgent 
                matters, feel free to reach out via email directly.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-neutral-400">
                  📍 Based in Egypt | 🌍 Available for remote work worldwide
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
