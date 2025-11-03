import { motion } from 'motion/react';
import { Linkedin, Mail, Phone, Award, Briefcase, GraduationCap } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticButton } from '../components/MagneticButton';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';

export function About() {
  const experience = [
    {
      title: 'Digital Product Designer',
      company: 'Vodafone Intelligent Solutions (VOIS)',
      period: '2021 - Present',
      highlights: [
        'Collaborated with business teams and developers to launch more than 12 live products for Vodafone in Italy, UK, and Germany',
        'Designed 3D experiences for 3 live global virtual events serving both Vodafone employees and external customers',
        'Promoted to Seniority level after 17 months due to outstanding performance',
        'Awarded Hero of the Month (2022), Recognition Certificate (November & December 2022), and Rising Star Award (2024)',
      ],
    },
    {
      title: 'UI/UX Instructor',
      company: 'Information Technology Institute (ITI), Egypt',
      period: '2023 - Present',
      highlights: [
        'Instructing and mentoring people in different topics in the UI/UX field',
        'Helping students to be ready for the market',
      ],
    },
    {
      title: 'UI/UX Designer',
      company: 'Robocore systems USA',
      period: '2021',
      highlights: [
        'Designed dashboards for different customers across the USA in collaboration with managers and developers',
      ],
    },
    {
      title: 'Architectural Engineer',
      company: 'AGAP Architects',
      period: '2017 - 2019',
      highlights: [
        'Contributed to multiple architectural projects, ensuring adherence to client requirements and industry standards',
      ],
    },
  ];

  const certifications = [
    'UI/UX Design Diploma - Information Technology Institute (2021)',
    'Design for the 21st Century with Don Norman - Interaction Design Foundation',
    'How to design for augmented and virtual reality - Interaction Design Foundation',
    'Interaction Design - Interaction Design Foundation',
    'Motion Design with UX/UI - UDEMY',
    'Figma: Animations, Graphics, Motion Design - UXCEL',
    'Design Thinking - UXCEL',
    'Enhancing UX Workflow with AI - UXCEL',
  ];

  const skills = [
    'Product Design',
    'UI/UX Design',
    'User Research',
    'Prototyping',
    'Design Systems',
    'Motion Design',
    'Interaction Design',
    'Figma',
    'Design Thinking',
    '3D Design',
    'AR/VR Design',
    'Usability Testing',
  ];

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
            <p className="text-primary mb-4">About Me</p>
            <h1 className="mb-8">
              Engineering Background,{' '}
              <span className="relative inline-block">
                Design Mindset
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -z-10"
                />
              </span>
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-8">
              As a product designer, I leverage my engineering background to offer a unique blend of technical expertise
              and creative problem-solving. My passion lies in crafting websites and apps that resonate with users,
              driven by meticulous attention to detail.
            </p>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticButton>
                <Button asChild size="lg">
                  <a href="mailto:amgedhassan@outlook.com" className="flex items-center gap-2">
                    <Mail size={18} />
                    Email Me
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild variant="outline" size="lg">
                  <a
                    href="https://www.linkedin.com/in/amgad-hassan-243248145"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Linkedin size={18} />
                    LinkedIn
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:+201111976054" className="flex items-center gap-2">
                    <Phone size={18} />
                    Call Me
                  </a>
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 lg:px-12 mb-32">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <Briefcase size={32} className="text-primary mx-auto mb-4" />
                <p className="text-foreground mb-2">4+ Years</p>
                <p className="text-muted-foreground">Product Design Experience</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <Award size={32} className="text-primary mx-auto mb-4" />
                <p className="text-foreground mb-2">3 Awards</p>
                <p className="text-muted-foreground">Recognition at VOIS</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <GraduationCap size={32} className="text-primary mx-auto mb-4" />
                <p className="text-foreground mb-2">UI/UX Instructor</p>
                <p className="text-muted-foreground">at ITI Egypt</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Experience Section */}
      <div className="px-6 lg:px-12 mb-32">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="mb-12">Experience</h2>
          </ScrollReveal>

          <div className="space-y-12">
            {experience.map((job, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <h3 className="mb-2">{job.title}</h3>
                      <p className="text-muted-foreground">{job.company}</p>
                    </div>
                    <Badge variant="secondary" className="mt-2 md:mt-0">
                      {job.period}
                    </Badge>
                  </div>
                  <ul className="space-y-3">
                    {job.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="px-6 lg:px-12 mb-32">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="mb-12">Skills & Expertise</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 bg-card border border-border rounded-full"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Education & Certifications */}
      <div className="px-6 lg:px-12 mb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <ScrollReveal>
              <div>
                <h2 className="mb-8">Education</h2>
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h3 className="mb-2">Alexandria University</h3>
                  <p className="text-muted-foreground mb-4">
                    Faculty of Fine Arts, Architecture Department
                  </p>
                  <p className="text-muted-foreground">
                    This multidisciplinary background provides me with a unique perspective
                    in product design, combining spatial thinking with user-centered design principles.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Certifications */}
            <ScrollReveal delay={0.1}>
              <div>
                <h2 className="mb-8">Certifications</h2>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-12 lg:p-16 text-center text-primary-foreground">
              <h2 className="mb-6 text-primary-foreground">Let's Create Something Amazing</h2>
              <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                I'm always excited to take on new challenges and collaborate on innovative projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton>
                  <Button asChild size="lg" variant="secondary">
                    <Link to="/contact">Start a Conversation</Link>
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                    <Link to="/work">View My Work</Link>
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
