import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, Star, Search } from 'lucide-react';
import { dashboardApi } from '../../utils/dashboardApi';
import { Testimonial } from '../../utils/api';
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

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await dashboardApi.getAllTestimonials();
      setTestimonials(data);
    } catch (error) {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dashboardApi.deleteTestimonial(id);
      setTestimonials(testimonials.filter((t) => t._id !== id));
      toast.success('Testimonial deleted successfully', {
        style: {
          background: 'rgba(0, 255, 242, 0.1)',
          border: '1px solid #00fff2',
          color: '#00fff2',
        },
      });
    } catch (error) {
      toast.error('Failed to delete testimonial');
    } finally {
      setDeleteId(null);
    }
  };

  const filteredTestimonials = testimonials.filter((testimonial) =>
    testimonial.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.testimonialType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const typeColors: Record<string, string> = {
    Client: '#00fff2',
    Mentee: '#7000ff',
    Colleague: '#ff006e',
    Student: '#00ff88',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <GlitchText text="TESTIMONIALS_MANAGER" className="mb-2" />
            <p className="text-muted-foreground font-mono">
              <span className="text-primary">{'>'}</span> Manage client feedback
            </p>
          </div>
          
          <Button
            asChild
            className="border-2 border-primary bg-primary/10 hover:bg-primary/20 text-primary font-mono"
          >
            <Link to="/dashboard/testimonials/new" className="flex items-center gap-2">
              <Plus size={18} />
              <span>NEW_TESTIMONIAL</span>
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
            placeholder="Search testimonials..."
            className="pl-10 bg-input-background border-2 border-primary/30 focus:border-primary font-mono"
          />
        </div>
      </ScrollReveal>

      {/* Testimonials Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-64 border-2 border-primary/20 bg-card/50 backdrop-blur-sm relative overflow-hidden"
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
      ) : filteredTestimonials.length === 0 ? (
        <ScrollReveal>
          <div className="text-center py-20 border-2 border-primary/20 bg-card/30 backdrop-blur-sm">
            <p className="text-muted-foreground font-mono">
              {searchQuery ? 'No testimonials found matching your search' : 'No testimonials yet'}
            </p>
          </div>
        </ScrollReveal>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTestimonials.map((testimonial, index) => {
            const color = typeColors[testimonial.testimonialType] || '#00fff2';
            
            return (
              <ScrollReveal key={testimonial._id} delay={index * 0.05}>
                <motion.div
                  className="border-2 bg-card/50 backdrop-blur-sm p-6 relative overflow-hidden group hover:border-opacity-60 transition-all duration-500 flex flex-col"
                  whileHover={{ y: -4 }}
                  style={{
                    borderColor: `${color}40`,
                    boxShadow: `0 0 20px ${color}20`,
                  }}
                >
                  {/* Tech corners */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: color }} />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: color }} />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: color }} />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: color }} />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={testimonial.authorImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.authorName)}&background=random`}
                        alt={testimonial.authorName}
                        className="w-12 h-12 border-2"
                        style={{ borderColor: color }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.authorName)}&background=random`;
                        }}
                      />
                      <div>
                        <p className="font-mono" style={{ color }}>{testimonial.authorName}</p>
                        <p className="text-muted-foreground text-sm">{testimonial.authorTitle}</p>
                      </div>
                    </div>
                    
                    {testimonial.isFeatured && (
                      <div className="flex items-center gap-1 px-2 py-1 border border-accent bg-accent/10">
                        <Star size={12} className="text-accent" />
                        <span className="text-accent font-mono text-xs">FEATURED</span>
                      </div>
                    )}
                  </div>

                  {/* Quote */}
                  <blockquote className="flex-1 mb-4 text-muted-foreground font-mono text-sm line-clamp-4 border-l-2 pl-3"
                    style={{ borderColor: `${color}50` }}
                  >
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Type Badge */}
                  <div className="mb-4">
                    <span className="px-3 py-1 border font-mono text-sm"
                      style={{
                        borderColor: color,
                        background: `${color}10`,
                        color,
                      }}
                    >
                      {testimonial.testimonialType}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-secondary/50 hover:bg-secondary/10 text-secondary font-mono flex-1"
                    >
                      <Link to={`/dashboard/testimonials/edit/${testimonial._id}`} className="flex items-center justify-center gap-2">
                        <Edit size={14} />
                        <span>EDIT</span>
                      </Link>
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteId(testimonial._id)}
                      className="border-accent/50 hover:bg-accent/10 text-accent font-mono"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>

                  {/* Scan line */}
                  <motion.div
                    className="absolute left-0 right-0 h-px opacity-30"
                    style={{ background: color }}
                    animate={{
                      top: ['0%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: index * 0.3,
                    }}
                  />
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="border-2 border-accent/50 bg-card/95 backdrop-blur-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-mono text-accent">DELETE_TESTIMONIAL</AlertDialogTitle>
            <AlertDialogDescription className="font-mono text-muted-foreground">
              This action cannot be undone. The testimonial will be permanently deleted from the database.
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
