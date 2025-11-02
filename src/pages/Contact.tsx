import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, MapPin, Send } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticButton } from '../components/MagneticButton';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useState, FormEvent } from 'react';
import { toast } from 'sonner@2.0.3';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'amgedhassan@outlook.com',
      href: 'mailto:amgedhassan@outlook.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+20 111 197 6054',
      href: 'tel:+201111976054',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: 'https://www.linkedin.com/in/amgad-hassan-243248145',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Alexandria, Egypt',
      href: null,
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real implementation, you would send this to your backend
    // For now, we'll create a mailto link
    const mailtoLink = `mailto:amgedhassan@outlook.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;

    toast.success('Opening your email client...');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <div className="px-6 lg:px-12 mb-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-primary mb-4">Contact</p>
            <h1 className="mb-8">
              Let's Start a{' '}
              <span className="relative inline-block">
                Conversation
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -z-10"
                />
              </span>
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Have a project in mind or want to discuss collaboration opportunities? I'd love to hear from you.
              Fill out the form below or reach out directly through my contact information.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="px-6 lg:px-12 mb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal>
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="mb-8">Send Me a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Project Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <MagneticButton className="w-full">
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <Send size={18} className="ml-2" />
                        </>
                      )}
                    </Button>
                  </MagneticButton>
                </form>
              </div>
            </ScrollReveal>

            {/* Contact Information */}
            <div className="space-y-8">
              <ScrollReveal delay={0.1}>
                <div>
                  <h2 className="mb-8">Get In Touch</h2>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        whileHover={info.href ? { x: 4 } : {}}
                        className="flex items-start gap-4"
                      >
                        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                          <info.icon size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">{info.label}</p>
                          {info.href ? (
                            <a
                              href={info.href}
                              target={info.href.startsWith('http') ? '_blank' : undefined}
                              rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-foreground hover:text-primary transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-foreground">{info.value}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="bg-accent/50 rounded-2xl p-8">
                  <h3 className="mb-4">Quick Response</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    I typically respond within 24 hours. For urgent inquiries, feel free to reach out
                    via phone or LinkedIn for a faster response.
                  </p>
                  <div className="flex gap-4">
                    <MagneticButton>
                      <Button asChild size="sm">
                        <a href="tel:+201111976054">
                          <Phone size={16} className="mr-2" />
                          Call Now
                        </a>
                      </Button>
                    </MagneticButton>
                    <MagneticButton>
                      <Button asChild variant="outline" size="sm">
                        <a
                          href="https://www.linkedin.com/in/amgad-hassan-243248145"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin size={16} className="mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    </MagneticButton>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h3 className="mb-4">Availability</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Currently open to freelance projects, consulting opportunities, and mentorship sessions.
                    Let's discuss how I can help bring your ideas to life.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-12 text-center text-primary-foreground">
              <h2 className="mb-4 text-primary-foreground">Trusted by Industry Leaders</h2>
              <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                I've worked with major companies like Vodafone and helped launch products used by millions of users
                across Italy, UK, and Germany.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-primary-foreground/90">
                <div>
                  <p className="mb-1">12+</p>
                  <p className="text-primary-foreground/70">Products Launched</p>
                </div>
                <div>
                  <p className="mb-1">450+</p>
                  <p className="text-primary-foreground/70">Teams Engaged</p>
                </div>
                <div>
                  <p className="mb-1">3</p>
                  <p className="text-primary-foreground/70">Awards Received</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
