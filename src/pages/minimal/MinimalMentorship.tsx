import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { api } from '../../utils/api';
import { Calendar, Clock, Video, CheckCircle, ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../../components/EmptyState';
import { shouldShowEmptyState } from '../../utils/emptyStateHelpers';

export function MinimalMentorship() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSessions() {
      try {
        const data = await api.getMentorshipSessions();
        setSessions(data);
      } catch (error) {
        if (!api.isDevelopment()) {
          console.error('Failed to load sessions:', error);
        }
        setSessions([]);
      } finally {
        setLoading(false);
      }
    }

    loadSessions();
  }, []);

  const benefits = [
    'Personalized feedback on your portfolio',
    'Career guidance and industry insights',
    'Design critique and best practices',
    'Tool and workflow optimization',
    'Interview preparation support',
    'Networking and community access',
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
          <div className="inline-block px-4 py-1.5 mb-6 bg-neutral-100 rounded-full">
            <span className="text-sm font-medium text-neutral-700">1:1 Mentorship</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-medium mb-6 text-neutral-900">
            Grow Your Design Career
          </h1>

          <p className="text-xl text-neutral-600 leading-relaxed mb-8">
            Get personalized guidance, portfolio reviews, and career advice from an 
            experienced product designer. Whether you're starting out or looking to level 
            up, I'm here to help you reach your goals.
          </p>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-medium text-neutral-900">
              What You'll Get
            </h2>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle size={20} className="text-neutral-900 mt-1 flex-shrink-0" />
                  <span className="text-lg text-neutral-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-square bg-neutral-100 rounded-2xl"
          />
        </div>
      </section>

      {/* Session Options */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-medium text-neutral-900 mb-12"
        >
          Mentorship Sessions
        </motion.h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-neutral-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : shouldShowEmptyState(sessions, loading) ? (
          <EmptyState
            icon={GraduationCap}
            title="Mentorship Sessions Coming Soon"
            description="I'm preparing personalized mentorship offerings. Check back soon for 1:1 sessions, portfolio reviews, and career guidance opportunities."
            variant="coming-soon"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="p-8 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors"
              >
                <h3 className="text-2xl font-medium text-neutral-900 mb-2">
                  {session.title}
                </h3>
                <p className="text-neutral-600 mb-6">
                  {session.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Clock size={16} />
                    <span>{session.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Video size={16} />
                    <span>Video Call</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-200">
                  <div className="text-3xl font-medium text-neutral-900 mb-4">
                    ${session.price}
                  </div>
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
                    >
                      Book Session
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-neutral-900 rounded-3xl p-12 lg:p-16 text-center"
        >
          <h2 className="text-4xl font-medium text-white mb-4">
            Ready to take the next step?
          </h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Let's schedule a session and work together on accelerating your design career.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-neutral-900 rounded-lg font-medium hover:bg-neutral-100 transition-colors inline-flex items-center gap-2"
            >
              Get Started
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
