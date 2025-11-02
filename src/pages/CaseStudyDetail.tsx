import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Play } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { api } from '../utils/api';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ScrollReveal } from '../components/ScrollReveal';

export function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, loading, error } = useApi(
    () => api.getCaseStudy(slug!),
    [slug]
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="h-96 bg-accent rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="mb-4">Project Not Found</h2>
          <Button asChild>
            <Link to="/work">Back to Work</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Back Button */}
      <div className="px-6 lg:px-12 mb-12">
        <div className="max-w-6xl mx-auto">
          <Button asChild variant="ghost">
            <Link to="/work" className="flex items-center gap-2">
              <ArrowLeft size={18} />
              Back to Work
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero */}
      <div className="px-6 lg:px-12 mb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                {project.isFeatured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
                {project.tags?.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
              <h1 className="mb-6">{project.title}</h1>
              <p className="text-muted-foreground max-w-3xl leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {project.prototypeLink && (
                <Button asChild>
                  <a
                    href={project.prototypeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    View Prototype
                    <ExternalLink size={16} />
                  </a>
                </Button>
              )}
              {project.videoLink && (
                <Button asChild variant="outline">
                  <a
                    href={project.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Watch Video
                    <Play size={16} />
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Image */}
      <div className="px-6 lg:px-12 mb-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="aspect-video rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <img
                src={project.caseStudyImage}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg width="1200" height="675" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="1200" height="675" fill="%23e5e5e5"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="24" fill="%23999"%3ECase study image not available%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Project Details */}
      <div className="px-6 lg:px-12 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Problem Statement */}
            <ScrollReveal>
              <div className="lg:col-span-2">
                <h2 className="mb-6">Problem Statement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.problemStatement}
                </p>
              </div>
            </ScrollReveal>

            {/* My Role */}
            <ScrollReveal delay={0.1}>
              <div>
                <h3 className="mb-4">My Role</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.myRole}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      {project.keyMetrics && project.keyMetrics.length > 0 && (
        <div className="px-6 lg:px-12 mb-20">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="mb-12">Key Metrics & Impact</h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.keyMetrics.map((metric, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
                    <p className="text-primary mb-2">{metric.value}</p>
                    <h3 className="mb-3">{metric.metric}</h3>
                    {metric.description && (
                      <p className="text-muted-foreground leading-relaxed">
                        {metric.description}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cover Image */}
      {project.coverImage !== project.caseStudyImage && (
        <div className="px-6 lg:px-12 mb-20">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <img
                  src={project.coverImage}
                  alt={`${project.title} cover`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg width="1200" height="750" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="1200" height="750" fill="%23e5e5e5"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="24" fill="%23999"%3ECover image not available%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="bg-accent/50 rounded-3xl p-12 text-center">
              <h2 className="mb-6">Interested in working together?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                I'm always open to discussing new projects and opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/contact">Get In Touch</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/work">View More Work</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
