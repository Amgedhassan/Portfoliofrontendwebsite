import { motion } from 'motion/react';
import { Award, Target, Lightbulb, Users } from 'lucide-react';

export function MinimalAbout() {
  const skills = [
    'User Research',
    'UI/UX Design',
    'Prototyping',
    'Design Systems',
    'Figma',
    'User Testing',
    'Wireframing',
    'Visual Design',
  ];

  const values = [
    {
      icon: Target,
      title: 'User-Centered',
      description: 'Every design decision is grounded in user research and validated through testing.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Pushing boundaries while maintaining usability and accessibility standards.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working closely with teams to ensure seamless execution from concept to launch.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering polished, high-quality work that exceeds expectations.',
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
            About Me
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            I'm a product designer with over 5 years of experience creating digital 
            experiences that balance user needs with business goals. My approach combines 
            strategic thinking, user research, and meticulous attention to detail.
          </p>
        </motion.div>
      </section>

      {/* Image + Story */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-square bg-neutral-100 rounded-2xl"
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-medium text-neutral-900">
              Designing with purpose
            </h2>
            <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
              <p>
                My journey in design started with a fascination for how people interact 
                with technology. Over the years, I've worked with startups and established 
                companies to create products that make a real difference.
              </p>
              <p>
                I believe great design is invisible – it just works. My process involves 
                deep user research, rapid prototyping, and continuous iteration to ensure 
                every pixel serves a purpose.
              </p>
              <p>
                When I'm not designing, you'll find me mentoring aspiring designers, 
                reading about psychology and behavior, or exploring new design tools 
                and methodologies.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-medium text-neutral-900 mb-12"
        >
          What Drives Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="p-6 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors"
            >
              <value.icon size={32} className="text-neutral-900 mb-4" />
              <h3 className="text-xl font-medium text-neutral-900 mb-2">{value.title}</h3>
              <p className="text-neutral-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-medium text-neutral-900 mb-12"
        >
          Skills & Expertise
        </motion.h2>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className="px-6 py-3 bg-neutral-100 rounded-full text-neutral-900 font-medium hover:bg-neutral-900 hover:text-white transition-colors"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
