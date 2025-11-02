import { useState } from 'react';
import { motion } from 'motion/react';
import { useApi } from '../hooks/useApi';
import { api } from '../utils/api';
import { ProjectCard } from '../components/ProjectCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { Button } from '../components/ui/button';

export function Work() {
  const { data: projects, loading } = useApi(() => api.getCaseStudies(), []);
  const [filter, setFilter] = useState<string>('all');

  const allTags = projects
    ? Array.from(new Set(projects.flatMap((p) => p.tags || [])))
    : [];

  const filteredProjects = projects
    ? filter === 'all'
      ? projects
      : projects.filter((p) => p.tags?.includes(filter))
    : [];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="text-primary mb-2">Portfolio</p>
            <h1 className="mb-6">My Work</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A collection of products and experiences I've designed for companies like Vodafone, 
              helping millions of users across Italy, UK, and Germany.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Tags */}
        {allTags.length > 0 && (
          <ScrollReveal delay={0.1}>
            <div className="mb-12 flex flex-wrap gap-3 justify-center">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className="rounded-full"
              >
                All Projects
              </Button>
              {allTags.slice(0, 6).map((tag) => (
                <Button
                  key={tag}
                  variant={filter === tag ? 'default' : 'outline'}
                  onClick={() => setFilter(tag)}
                  className="rounded-full"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[16/10] bg-accent rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No projects found with this filter.</p>
          </div>
        )}

        {/* Stats Section */}
        <ScrollReveal delay={0.2}>
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 p-12 bg-accent/30 rounded-3xl">
            <div className="text-center">
              <p className="text-foreground mb-2">12+</p>
              <p className="text-muted-foreground">Products Launched</p>
            </div>
            <div className="text-center">
              <p className="text-foreground mb-2">95%</p>
              <p className="text-muted-foreground">Reduction in Duplicate Tickets</p>
            </div>
            <div className="text-center">
              <p className="text-foreground mb-2">450+</p>
              <p className="text-muted-foreground">Teams Engaged</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
