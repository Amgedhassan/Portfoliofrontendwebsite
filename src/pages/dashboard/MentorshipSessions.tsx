import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, Star, DollarSign, Clock, Search } from 'lucide-react';
import { dashboardApi } from '../../utils/dashboardApi';
import { Mentorship } from '../../utils/api';
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

export function MentorshipSessions() {
  const [sessions, setSessions] = useState<Mentorship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'one-on-one' | 'group' | 'course' | 'workshop'>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const data = await dashboardApi.getAllMentorshipSessions();
      setSessions(data);
    } catch (error) {
      toast.error('Failed to load mentorship sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dashboardApi.deleteMentorshipSession(id);
      setSessions(sessions.filter((s) => s._id !== id));
      toast.success('Session deleted successfully', {
        style: {
          background: 'rgba(0, 255, 242, 0.1)',
          border: '1px solid #00fff2',
          color: '#00fff2',
        },
      });
    } catch (error) {
      toast.error('Failed to delete session');
    } finally {
      setDeleteId(null);
    }
  };

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || session.sessionType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <GlitchText text="MENTORSHIP_MANAGER" className="mb-2" />
            <p className="text-muted-foreground font-mono">
              <span className="text-primary">{'>'}</span> Manage mentorship offerings
            </p>
          </div>
          
          <Button
            asChild
            className="border-2 border-primary bg-primary/10 hover:bg-primary/20 text-primary font-mono"
          >
            <Link to="/dashboard/mentorship/new" className="flex items-center gap-2">
              <Plus size={18} />
              <span>NEW_SESSION</span>
            </Link>
          </Button>
        </div>
      </ScrollReveal>

      {/* Search and Filter */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sessions..."
              className="pl-10 bg-input-background border-2 border-primary/30 focus:border-primary font-mono"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {[
              { value: 'all', label: 'ALL' },
              { value: 'one-on-one', label: '1:1' },
              { value: 'workshop', label: 'WORKSHOP' },
              { value: 'course', label: 'COURSE' },
              { value: 'group', label: 'GROUP' },
            ].map((filter) => (
              <Button
                key={filter.value}
                size="sm"
                variant="outline"
                onClick={() => setFilterType(filter.value as any)}
                className={`font-mono border-2 whitespace-nowrap ${
                  filterType === filter.value
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-primary/30 hover:border-primary/50'
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Sessions Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-80 border-2 border-primary/20 bg-card/50 backdrop-blur-sm relative overflow-hidden"
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
      ) : filteredSessions.length === 0 ? (
        <ScrollReveal>
          <div className="text-center py-20 border-2 border-primary/20 bg-card/30 backdrop-blur-sm">
            <p className="text-muted-foreground font-mono">
              {searchQuery ? 'No sessions found matching your search' : 'No mentorship sessions yet'}
            </p>
          </div>
        </ScrollReveal>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {filteredSessions.map((session, index) => {
            const hasOffer = session.offerPrice && session.offerEndDate && new Date(session.offerEndDate) > new Date();
            const displayPrice = hasOffer ? session.offerPrice : session.price;
            
            return (
              <ScrollReveal key={session._id} delay={index * 0.05}>
                <motion.div
                  className="border-2 border-accent/20 bg-card/50 backdrop-blur-sm p-6 relative overflow-hidden group hover:border-accent/40 transition-all duration-500 flex flex-col h-full"
                  whileHover={{ y: -4 }}
                  style={{
                    boxShadow: '0 0 20px rgba(255, 0, 110, 0.1)',
                  }}
                >
                  {/* Tech corners */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent" />

                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="group-hover:text-accent transition-colors line-clamp-2">
                        {session.title}
                      </h3>
                      {session.isFeatured && (
                        <div className="flex items-center gap-1 px-2 py-1 border border-accent bg-accent/10 shrink-0">
                          <Star size={12} className="text-accent" />
                          <span className="text-accent font-mono text-xs">HOT</span>
                        </div>
                      )}
                    </div>
                    <div className="h-px w-12 bg-accent/50" />
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                    {session.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-accent/20">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Clock size={14} className="text-accent" />
                      <span className="font-mono">{session.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <DollarSign size={14} className="text-accent" />
                      <span className="font-mono">{session.currency} {displayPrice}</span>
                    </div>
                  </div>

                  {/* Status badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 border font-mono text-xs ${
                      session.isActive
                        ? 'border-primary text-primary bg-primary/10'
                        : 'border-muted-foreground/30 text-muted-foreground bg-muted/10'
                    }`}>
                      {session.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                    {hasOffer && (
                      <span className="px-2 py-1 border border-accent text-accent bg-accent/10 font-mono text-xs animate-pulse">
                        SALE
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-secondary/50 hover:bg-secondary/10 text-secondary font-mono flex-1"
                    >
                      <Link to={`/dashboard/mentorship/edit/${session._id}`} className="flex items-center justify-center gap-2">
                        <Edit size={14} />
                        <span>EDIT</span>
                      </Link>
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteId(session._id)}
                      className="border-accent/50 hover:bg-accent/10 text-accent font-mono"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>

                  {/* Scan line */}
                  <motion.div
                    className="absolute left-0 right-0 h-px bg-accent/50 opacity-30"
                    animate={{
                      top: ['0%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: index * 0.4,
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
            <AlertDialogTitle className="font-mono text-accent">DELETE_SESSION</AlertDialogTitle>
            <AlertDialogDescription className="font-mono text-muted-foreground">
              This action cannot be undone. The mentorship session will be permanently deleted from the database.
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
