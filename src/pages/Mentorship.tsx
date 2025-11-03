import { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Users, Clock } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { api } from '../utils/api';
import { MentorshipCard } from '../components/MentorshipCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { Button } from '../components/ui/button';

export function Mentorship() {
  const { data: sessions, loading: sessionsLoading } = useApi(() => api.getMentorshipSessions(), []);
  const { data: testimonials, loading: testimonialsLoading } = useApi(() => api.getTestimonials(), []);
  const [filter, setFilter] = useState<'all' | 'one-on-one' | 'learning'>('all');

  const menteeTestimonials = testimonials?.filter(t => t.testimonialType === 'Mentee' || t.testimonialType === 'Student');
  
  const filteredSessions = sessions?.filter(session => {
    if (filter === 'all') return true;
    if (filter === 'one-on-one') return session.sessionType === 'one-on-one';
    if (filter === 'learning') return session.sessionType !== 'one-on-one';
    return true;
  });

  const benefits = [
    {
      icon: GraduationCap,
      title: 'Expert Guidance',
      description: 'Learn from 4+ years of product design experience at companies like Vodafone and real-world projects.',
    },
    {
      icon: Users,
      title: 'Personalized Approach',
      description: 'Each session is tailored to your specific needs, challenges, and career goals in UI/UX design.',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your schedule and learn at your own pace with actionable insights.',
    },
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
            <p className="text-primary mb-4">Mentorship</p>
            <h1 className="mb-8">
              Grow Your{' '}
              <span className="relative inline-block">
                Design Career
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -z-10"
                />
              </span>
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              As a UI/UX Instructor at the Information Technology Institute (ITI) and a Senior Product Designer
              at Vodafone, I'm passionate about helping aspiring designers become market-ready through personalized
              mentorship and practical guidance.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="px-6 lg:px-12 mb-32">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-center mb-12">Why Choose My Mentorship?</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
                    <benefit.icon size={32} className="text-primary" />
                  </div>
                  <h3 className="mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Sessions Section */}
      <div className="px-6 lg:px-12 mb-32">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="mb-4">Available Sessions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Choose from various mentorship sessions designed to help you at different stages of your design journey.
              </p>
              
              {/* Filter Buttons */}
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Button
                  onClick={() => setFilter('all')}
                  variant="outline"
                  className={`font-mono border-2 transition-all ${
                    filter === 'all'
                      ? 'border-primary bg-primary/20 text-primary'
                      : 'border-primary/30 hover:border-primary/50 hover:bg-primary/10'
                  }`}
                  style={filter === 'all' ? {
                    boxShadow: '0 0 20px rgba(0, 255, 242, 0.3)',
                  } : {}}
                >
                  ALL_SESSIONS
                </Button>
                <Button
                  onClick={() => setFilter('one-on-one')}
                  variant="outline"
                  className={`font-mono border-2 transition-all ${
                    filter === 'one-on-one'
                      ? 'border-accent bg-accent/20 text-accent'
                      : 'border-accent/30 hover:border-accent/50 hover:bg-accent/10'
                  }`}
                  style={filter === 'one-on-one' ? {
                    boxShadow: '0 0 20px rgba(255, 0, 110, 0.3)',
                  } : {}}
                >
                  1:1_MENTORSHIP
                </Button>
                <Button
                  onClick={() => setFilter('learning')}
                  variant="outline"
                  className={`font-mono border-2 transition-all ${
                    filter === 'learning'
                      ? 'border-secondary bg-secondary/20 text-secondary'
                      : 'border-secondary/30 hover:border-secondary/50 hover:bg-secondary/10'
                  }`}
                  style={filter === 'learning' ? {
                    boxShadow: '0 0 20px rgba(112, 0, 255, 0.3)',
                  } : {}}
                >
                  WORKSHOPS_&_COURSES
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {sessionsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-accent rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredSessions && filteredSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {filteredSessions.map((session, index) => (
                <MentorshipCard key={session._id} session={session} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-8">
                No sessions found for this filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Testimonials Section */}
      {!testimonialsLoading && menteeTestimonials && menteeTestimonials.length > 0 && (
        <div className="px-6 lg:px-12 mb-32">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="mb-4">What Mentees Say</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Hear from designers I've had the privilege to mentor and guide in their careers.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {menteeTestimonials.slice(0, 3).map((testimonial, index) => (
                <TestimonialCard key={testimonial._id} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="px-6 lg:px-12 mb-32">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="bg-accent/30 rounded-3xl p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-foreground mb-2">UI/UX Instructor</p>
                  <p className="text-muted-foreground">at ITI Egypt since 2023</p>
                </div>
                <div>
                  <p className="text-foreground mb-2">4+ Years</p>
                  <p className="text-muted-foreground">Product Design Experience</p>
                </div>
                <div>
                  <p className="text-foreground mb-2">12+ Products</p>
                  <p className="text-muted-foreground">Launched at Vodafone</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-12 lg:p-16 text-center text-primary-foreground">
              <h2 className="mb-6 text-primary-foreground">Ready to Level Up?</h2>
              <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Book a mentorship session today and take the next step in your UI/UX design journey.
                I'm here to help you achieve your goals and become market-ready.
              </p>
              <p className="text-primary-foreground/90">
                For custom mentorship packages or corporate training, feel free to reach out directly.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
