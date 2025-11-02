import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { api } from '../../utils/api';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export function MinimalCaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      if (!slug) return;
      
      try {
        const data = await api.getCaseStudy(slug);
        setProject(data);
      } catch (error) {
        if (!api.isDevelopment()) {
          console.error('Failed to load project:', error);
        }
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-neutral-900 mb-4">Project not found</h2>
          <Link to="/work" className="text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            Back to Work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Back Button */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
        <Link 
          to="/work" 
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Work
        </Link>
      </section>

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-4 py-1.5 bg-neutral-100 rounded-full text-sm font-medium text-neutral-700">
              {project.myRole}
            </span>
            {project.tags?.map((tag: string) => (
              <span key={tag} className="px-4 py-1.5 bg-neutral-100 rounded-full text-sm font-medium text-neutral-700">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-5xl lg:text-7xl font-medium mb-6 text-neutral-900">
            {project.title}
          </h1>

          <p className="text-xl text-neutral-600 max-w-3xl mb-8">
            {project.problemStatement}
          </p>

          {project.prototypeLink && (
            <a 
              href={project.prototypeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
            >
              View Prototype
              <ExternalLink size={18} />
            </a>
          )}
        </motion.div>
      </section>

      {/* Featured Image */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl overflow-hidden bg-neutral-100 aspect-video"
        >
          {project.caseStudyImage && (
            <img
              src={project.caseStudyImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </section>

      {/* Project Details */}
      <section className="max-w-[900px] mx-auto px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div>
            <h3 className="text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wider">Type</h3>
            <p className="text-lg text-neutral-900">Case Study</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wider">Role</h3>
            <p className="text-lg text-neutral-900">{project.myRole}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wider">Year</h3>
            <p className="text-lg text-neutral-900">{new Date(project.createdAt).getFullYear()}</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          <div>
            <h2 className="text-3xl font-medium mb-4 text-neutral-900">Problem Statement</h2>
            <div className="text-lg text-neutral-700 leading-relaxed space-y-4">
              <p>{project.problemStatement}</p>
            </div>
          </div>

          {project.keyMetrics && project.keyMetrics.length > 0 && (
            <div>
              <h2 className="text-3xl font-medium mb-4 text-neutral-900">Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.keyMetrics.map((metric, index) => (
                  <div key={index} className="p-6 bg-neutral-50 rounded-2xl">
                    <div className="text-3xl font-medium text-neutral-900 mb-2">{metric.value}</div>
                    <div className="font-medium text-neutral-900 mb-1">{metric.metric}</div>
                    {metric.description && (
                      <div className="text-sm text-neutral-600">{metric.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.videoLink && (
            <div>
              <h2 className="text-3xl font-medium mb-4 text-neutral-900">Video Walkthrough</h2>
              <div className="aspect-video bg-neutral-100 rounded-2xl overflow-hidden">
                <iframe
                  src={project.videoLink}
                  className="w-full h-full"
                  allowFullScreen
                  title="Project video"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="bg-neutral-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-medium text-neutral-900 mb-4">
            Interested in working together?
          </h2>
          <p className="text-neutral-600 mb-8">
            Let's discuss how I can help bring your project to life.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
            >
              Start a Conversation
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
