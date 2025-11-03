import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';

export function MinimalFooter() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/amgad-hassan-243248145/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:amgedhassan@outlook.com', label: 'Email' },
  ];

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-medium mb-2 text-neutral-900">Amgad Hassan</h3>
            <p className="text-sm text-neutral-600 max-w-xs">
              Product Designer crafting exceptional digital experiences through thoughtful design and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-neutral-900">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/work" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Work
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/mentorship" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Mentorship
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-neutral-900">Connect</h4>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-900 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-600">
            © {currentYear} Amgad Hassan. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="/privacy" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              Privacy
            </a>
            <a href="/terms" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
