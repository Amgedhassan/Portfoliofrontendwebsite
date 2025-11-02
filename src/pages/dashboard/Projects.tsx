import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, Star, Eye, Search } from 'lucide-react';
import { dashboardApi } from '../../utils/dashboardApi';
import { CaseStudy } from '../../utils/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { GlitchText } from '../../components/GlitchText';
import { ScrollReveal } from '../../components/ScrollReveal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import { toast } from 'sonner@2.0.3';

export function Projects() {
  const [projects, setProjects] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await dashboardApi.getAllCaseStudies();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dashboardApi.deleteCaseStudy(id);
      setProjects(projects.filter((p) => p._id !== id));
      toast.success('Project deleted successfully', {
        style: {
          background: 'rgba(0, 255, 242, 0.1)',
          border: '1px solid #00fff2',
          color: '#00fff2',
        },
      });
    } catch (error) {
      toast.error('Failed to delete project');
    } finally {
      setDeleteId(null);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <GlitchText text="PROJECTS_MANAGER" className="mb-2" />
            <p className="text-muted-foreground font-mono">
              <span className="text-primary">{'>'}</span> Manage portfolio case studies
            </p>
          </div>
          
          <Button
            asChild
            className="border-2 border-primary bg-primary/10 hover:bg-primary/20 text-primary font-mono"
          >
            <Link to="/dashboard/projects/new" className="flex items-center gap-2">
              <Plus size={18} />
              <span>NEW_PROJECT</span>
            </Link>
          </Button>
        </div>
      </ScrollReveal>

      {/* Search */}
      <ScrollReveal delay={0.1}>
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="pl-10 bg-input-background border-2 border-primary/30 focus:border-primary font-mono"
          />
        </div>
      </ScrollReveal>

      {/* Projects List */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 border-2 border-primary/20 bg-card/50 backdrop-blur-sm relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <ScrollReveal>
          <div className="text-center py-20 border-2 border-primary/20 bg-card/30 backdrop-blur-sm">
            <p className="text-muted-foreground font-mono">
              {searchQuery ? 'No projects found matching your search' : 'No projects yet'}
            </p>
          </div>
        </ScrollReveal>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project._id} delay={index * 0.05}>
              <motion.div
                className="border-2 border-primary/20 bg-card/50 backdrop-blur-sm p-6 relative overflow-hidden group hover:border-primary/40 transition-all duration-500"
                whileHover={{ x: 4 }}
                style={{
                  boxShadow: '0 0 20px rgba(0, 255, 242, 0.1)',
                }}
              >
                {/* Tech corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Thumbnail */}
                  <div className="w-full md:w-48 h-32 border-2 border-primary/30 overflow-hidden shrink-0 bg-neutral-900">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml,%3Csvg width="200" height="130" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="200" height="130" fill="%231a1a1a"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="12" fill="%2300fff2"%3ENo image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        {project.isFeatured && (
                          <div className="flex items-center gap-1 px-2 py-1 border border-accent bg-accent/10">
                            <Star size={12} className="text-accent" />
                            <span className="text-accent font-mono text-xs">FEATURED</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.problemStatement}
                    </p>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 border border-primary/30 text-primary/70 font-mono text-xs"
                            style={{
                              background: 'rgba(0, 255, 242, 0.05)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="px-2 py-1 border border-primary/30 text-primary/70 font-mono text-xs">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="border-primary/50 hover:bg-primary/10 text-primary font-mono"
                      >
                        <Link to={`/work/${project.slug}`} className="flex items-center gap-2">
                          <Eye size={14} />
                          <span>VIEW</span>
                        </Link>
                      </Button>
                      
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="border-secondary/50 hover:bg-secondary/10 text-secondary font-mono"
                      >
                        <Link to={`/dashboard/projects/edit/${project._id}`} className="flex items-center gap-2">
                          <Edit size={14} />
                          <span>EDIT</span>
                        </Link>
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDeleteId(project._id)}
                        className="border-accent/50 hover:bg-accent/10 text-accent font-mono"
                      >
                        <Trash2 size={14} />
                        <span>DELETE</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Scan line */}
                <motion.div
                  className="absolute left-0 right-0 h-px bg-primary/50 opacity-0 group-hover:opacity-100"
                  animate={{
                    top: ['0%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="border-2 border-accent/50 bg-card/95 backdrop-blur-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-mono text-accent">DELETE_PROJECT</AlertDialogTitle>
            <AlertDialogDescription className="font-mono text-muted-foreground">
              This action cannot be undone. The project will be permanently deleted from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-primary/50 hover:bg-primary/10 font-mono">
              CANCEL
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-accent/20 border-2 border-accent hover:bg-accent/30 text-accent font-mono"
            >
              CONFIRM_DELETE
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
