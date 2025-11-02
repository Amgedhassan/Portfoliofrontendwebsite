import { Link } from 'react-router-dom';
import { Linkedin, Mail, Phone, Zap, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/amgad-hassan-243248145',
      label: 'LinkedIn',
      color: '#00fff2',
    },
    {
      icon: Mail,
      href: 'mailto:amgedhassan@outlook.com',
      label: 'Email',
      color: '#7000ff',
    },
    {
      icon: Phone,
      href: 'tel:+201111976054',
      label: 'Phone',
      color: '#ff006e',
    },
  ];

  const footerLinks = [
    { path: '/work', label: 'Work' },
    { path: '/about', label: 'About' },
    { path: '/mentorship', label: 'Mentorship' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="relative bg-background border-t-2 border-primary/30 mt-32 overflow-hidden">
      {/* Top tech line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        style={{ boxShadow: '0 0 10px rgba(0, 255, 242, 0.5)' }}
      />

      {/* Background tech grid */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 242, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 242, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-primary" size={24} style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 242, 0.8))' }} />
              <h3 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Amgad Hassan
              </h3>
            </div>
            <p className="text-muted-foreground mb-6 font-mono">
              {'>'} Product Designer<br />
              {'>'} Digital Architect<br />
              {'>'} UX Innovator
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 border-2 flex items-center justify-center transition-all relative group overflow-hidden"
                  style={{ 
                    borderColor: link.color,
                    background: `${link.color}10`,
                  }}
                  aria-label={link.label}
                >
                  <link.icon size={18} style={{ color: link.color }} className="relative z-10" />
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: link.color }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.2 }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 flex items-center gap-2">
              <Terminal size={18} className="text-secondary" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li 
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">{'>'}</span>
                    <span>{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 flex items-center gap-2">
              <Mail size={18} className="text-accent" />
              <span>Get In Touch</span>
            </h4>
            <ul className="space-y-3 text-muted-foreground font-mono">
              <li>
                <a href="mailto:amgedhassan@outlook.com" className="hover:text-primary transition-colors block">
                  amgedhassan@outlook.com
                </a>
              </li>
              <li>
                <a href="tel:+201111976054" className="hover:text-primary transition-colors block">
                  +20 111 197 6054
                </a>
              </li>
              <li>
                <a
                  href="https://www.behance.net/amgedhassan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors block"
                >
                  behance.net/amgedhassan
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground font-mono">
            © {currentYear} Amgad Hassan. All rights reserved.
          </p>
          <motion.p 
            className="text-muted-foreground font-mono"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {'>'} Designed with <span className="text-accent">passion</span> & <span className="text-primary">code</span>
          </motion.p>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/30" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/30" />
    </footer>
  );
}
