import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { api } from '../../utils/api';
import { ArrowRight, Briefcase } from 'lucide-react';
import { EmptyState } from '../../components/EmptyState';
import { shouldShowEmptyState } from '../../utils/emptyStateHelpers';

export function MinimalWork() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await api.getCaseStudies();
        setProjects(data);
      } catch (error) {
        if (!api.isDevelopment()) {
          console.error('Failed to load projects:', error);
        }
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.myRole || 'Design')))];
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.myRole === filter);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-7xl font-medium mb-6 text-neutral-900">
            Selected Work
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl">
            A collection of projects showcasing my approach to solving complex design challenges 
            through user research, strategic thinking, and beautiful execution.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                filter === category
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/3] bg-neutral-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : shouldShowEmptyState(filteredProjects, loading) ? (
          <EmptyState
            icon={Briefcase}
            title="No Projects Yet"
            description="New case studies and projects will be showcased here soon. Check back for updates on my latest work."
            variant="coming-soon"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/work/${project.slug}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-neutral-100 mb-4">
                    {project.coverImage && (
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
                        {project.title}
                      </h3>
                      <ArrowRight 
                        size={20} 
                        className="text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" 
                      />
                    </div>
                    
                    <p className="text-neutral-600">
                      {project.problemStatement}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-700">
                        {project.myRole}
                      </span>
                      {project.tags?.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
