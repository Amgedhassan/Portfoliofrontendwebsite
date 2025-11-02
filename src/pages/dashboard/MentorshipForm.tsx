import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import { dashboardApi } from '../../utils/dashboardApi';
import { Mentorship } from '../../utils/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { GlitchText } from '../../components/GlitchText';
import { ScrollReveal } from '../../components/ScrollReveal';
import { toast } from 'sonner@2.0.3';

export function MentorshipForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditMode);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    sessionType: 'one-on-one' as Mentorship['sessionType'],
    targetAudience: '',
    description: '',
    preparationRequired: '',
    duration: '60 minutes',
    price: 0,
    offerPrice: 0,
    offerEndDate: '',
    currency: 'USD',
    bookingLink: '',
    isActive: true,
    isFeatured: false,
  });

  const [whatToExpect, setWhatToExpect] = useState<string[]>(['']);
  const [testimonials, setTestimonials] = useState<Array<{ author: string; quote: string }>>([]);

  useEffect(() => {
    if (isEditMode && id) {
      loadSession();
    }
  }, [id]);

  const loadSession = async () => {
    try {
      const sessions = await dashboardApi.getAllMentorshipSessions();
      const session = sessions.find(s => s._id === id || s.slug === id);
      
      if (session) {
        setFormData({
          title: session.title || '',
          slug: session.slug || '',
          sessionType: session.sessionType || 'one-on-one',
          targetAudience: session.targetAudience || '',
          description: session.description || '',
          preparationRequired: session.preparationRequired || '',
          duration: session.duration || '60 minutes',
          price: session.price || 0,
          offerPrice: session.offerPrice || 0,
          offerEndDate: session.offerEndDate || '',
          currency: session.currency || 'USD',
          bookingLink: session.bookingLink || '',
          isActive: session.isActive !== undefined ? session.isActive : true,
          isFeatured: session.isFeatured || false,
        });

        setWhatToExpect(session.whatToExpect && session.whatToExpect.length > 0 ? session.whatToExpect : ['']);
        setTestimonials(session.testimonials || []);
      } else {
        toast.error('Session not found');
        navigate('/dashboard/mentorship');
      }
    } catch (error) {
      toast.error('Failed to load session');
      navigate('/dashboard/mentorship');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const filteredExpectations = whatToExpect.filter(e => e.trim());
      const filteredTestimonials = testimonials.filter(t => t.author && t.quote);

      const data: Partial<Mentorship> = {
        ...formData,
        whatToExpect: filteredExpectations,
        testimonials: filteredTestimonials.length > 0 ? filteredTestimonials : undefined,
        offerPrice: formData.offerPrice || undefined,
        offerEndDate: formData.offerEndDate || undefined,
        preparationRequired: formData.preparationRequired || undefined,
      };

      if (isEditMode && id) {
        await dashboardApi.updateMentorshipSession(id, data);
        toast.success('Session updated successfully', {
          style: {
            background: 'rgba(0, 255, 242, 0.1)',
            border: '1px solid #00fff2',
            color: '#00fff2',
          },
        });
      } else {
        await dashboardApi.createMentorshipSession(data);
        toast.success('Session created successfully', {
          style: {
            background: 'rgba(0, 255, 242, 0.1)',
            border: '1px solid #00fff2',
            color: '#00fff2',
          },
        });
      }

      navigate('/dashboard/mentorship');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save session');
    } finally {
      setLoading(false);
    }
  };

  const addExpectation = () => {
    setWhatToExpect([...whatToExpect, '']);
  };

  const removeExpectation = (index: number) => {
    if (whatToExpect.length > 1) {
      setWhatToExpect(whatToExpect.filter((_, i) => i !== index));
    }
  };

  const updateExpectation = (index: number, value: string) => {
    const updated = [...whatToExpect];
    updated[index] = value;
    setWhatToExpect(updated);
  };

  const addTestimonial = () => {
    setTestimonials([...testimonials, { author: '', quote: '' }]);
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const updateTestimonial = (index: number, field: 'author' | 'quote', value: string) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <ScrollReveal>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/dashboard/mentorship')}
            className="border-primary/50 hover:bg-primary/10"
          >
            <ArrowLeft size={18} className="text-primary" />
          </Button>
          <div>
            <GlitchText text={isEditMode ? 'EDIT_SESSION' : 'NEW_SESSION'} className="mb-2" />
            <p className="text-muted-foreground font-mono">
              <span className="text-primary">{'>'}</span> {isEditMode ? 'Update session details' : 'Create mentorship offering'}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Form */}
      <ScrollReveal delay={0.1}>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <motion.div
            className="border-2 border-primary/20 bg-card/50 backdrop-blur-sm p-8 relative"
            style={{ boxShadow: '0 0 30px rgba(0, 255, 242, 0.1)' }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

            <h3 className="mb-6 text-primary font-mono">BASIC_INFORMATION</h3>

            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-primary font-mono">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono"
                  required
                  placeholder="Session name"
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-primary font-mono">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono"
                  required
                  placeholder="session-url-slug"
                />
                <p className="text-muted-foreground text-sm">URL-friendly identifier</p>
              </div>

              {/* Session Type */}
              <div className="space-y-2">
                <Label htmlFor="sessionType" className="text-primary font-mono">Session Type *</Label>
                <Select
                  value={formData.sessionType}
                  onValueChange={(value) => setFormData({ ...formData, sessionType: value as any })}
                >
                  <SelectTrigger className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-on-one">One-on-One</SelectItem>
                    <SelectItem value="group">Group</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Target Audience */}
              <div className="space-y-2">
                <Label htmlFor="targetAudience" className="text-primary font-mono">Target Audience *</Label>
                <Input
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono"
                  required
                  placeholder="Who is this for?"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-primary font-mono">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono min-h-32"
                  required
                  placeholder="Detailed session description"
                />
              </div>
            </div>
          </motion.div>

          {/* What to Expect */}
          <motion.div
            className="border-2 border-secondary/20 bg-card/50 backdrop-blur-sm p-8 relative"
            style={{ boxShadow: '0 0 30px rgba(112, 0, 255, 0.1)' }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-secondary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-secondary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-secondary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-secondary" />

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-secondary font-mono">WHAT_TO_EXPECT</h3>
              <Button
                type="button"
                size="sm"
                onClick={addExpectation}
                className="border-2 border-secondary bg-secondary/10 hover:bg-secondary/20 text-secondary font-mono"
              >
                <Plus size={16} />
                <span>ADD_ITEM</span>
              </Button>
            </div>

            <div className="space-y-4">
              {whatToExpect.map((expectation, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={expectation}
                    onChange={(e) => updateExpectation(index, e.target.value)}
                    placeholder="What participants will learn/get"
                    className="bg-input-background border-2 border-secondary/30 focus:border-secondary font-mono"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => removeExpectation(index)}
                    className="border-accent/50 hover:bg-accent/10 text-accent"
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Session Details */}
          <motion.div
            className="border-2 border-accent/20 bg-card/50 backdrop-blur-sm p-8 relative"
            style={{ boxShadow: '0 0 30px rgba(255, 0, 110, 0.1)' }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent" />

            <h3 className="mb-6 text-accent font-mono">SESSION_DETAILS</h3>

            <div className="space-y-6">
              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-accent font-mono">Duration *</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="bg-input-background border-2 border-accent/30 focus:border-accent font-mono"
                  required
                  placeholder="e.g., 60 minutes, 2 hours"
                />
              </div>

              {/* Preparation Required */}
              <div className="space-y-2">
                <Label htmlFor="preparationRequired" className="text-accent font-mono">Preparation Required</Label>
                <Textarea
                  id="preparationRequired"
                  value={formData.preparationRequired}
                  onChange={(e) => setFormData({ ...formData, preparationRequired: e.target.value })}
                  className="bg-input-background border-2 border-accent/30 focus:border-accent font-mono min-h-24"
                  placeholder="What participants should prepare beforehand"
                />
              </div>

              {/* Booking Link */}
              <div className="space-y-2">
                <Label htmlFor="bookingLink" className="text-accent font-mono">Booking Link *</Label>
                <Input
                  id="bookingLink"
                  value={formData.bookingLink}
                  onChange={(e) => setFormData({ ...formData, bookingLink: e.target.value })}
                  className="bg-input-background border-2 border-accent/30 focus:border-accent font-mono"
                  required
                  placeholder="https://calendly.com/..."
                />
              </div>
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div
            className="border-2 border-primary/20 bg-card/50 backdrop-blur-sm p-8 relative"
            style={{ boxShadow: '0 0 30px rgba(0, 255, 242, 0.1)' }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

            <h3 className="mb-6 text-primary font-mono">PRICING</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Currency */}
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-primary font-mono">Currency *</Label>
                <Input
                  id="currency"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono"
                  required
                  placeholder="USD"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price" className="text-primary font-mono">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono"
                  required
                />
              </div>

              {/* Offer Price */}
              <div className="space-y-2">
                <Label htmlFor="offerPrice" className="text-primary font-mono">Offer Price</Label>
                <Input
                  id="offerPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.offerPrice}
                  onChange={(e) => setFormData({ ...formData, offerPrice: parseFloat(e.target.value) || 0 })}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono"
                  placeholder="Special offer price"
                />
              </div>

              {/* Offer End Date */}
              <div className="space-y-2">
                <Label htmlFor="offerEndDate" className="text-primary font-mono">Offer End Date</Label>
                <Input
                  id="offerEndDate"
                  type="date"
                  value={formData.offerEndDate}
                  onChange={(e) => setFormData({ ...formData, offerEndDate: e.target.value })}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono"
                />
              </div>
            </div>
          </motion.div>

          {/* Testimonials (Optional) */}
          <motion.div
            className="border-2 border-secondary/20 bg-card/50 backdrop-blur-sm p-8 relative"
            style={{ boxShadow: '0 0 30px rgba(112, 0, 255, 0.1)' }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-secondary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-secondary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-secondary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-secondary" />

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-secondary font-mono">SESSION_TESTIMONIALS</h3>
              <Button
                type="button"
                size="sm"
                onClick={addTestimonial}
                className="border-2 border-secondary bg-secondary/10 hover:bg-secondary/20 text-secondary font-mono"
              >
                <Plus size={16} />
                <span>ADD_TESTIMONIAL</span>
              </Button>
            </div>

            {testimonials.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No testimonials added yet</p>
            ) : (
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="border border-secondary/30 p-4 bg-secondary/5 space-y-3">
                    <div className="flex justify-between items-start">
                      <Label className="text-secondary font-mono">Testimonial {index + 1}</Label>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeTestimonial(index)}
                        className="h-6 w-6 text-accent hover:bg-accent/10"
                      >
                        <X size={14} />
                      </Button>
                    </div>
                    <Input
                      value={testimonial.author}
                      onChange={(e) => updateTestimonial(index, 'author', e.target.value)}
                      placeholder="Author name"
                      className="bg-input-background border-2 border-secondary/30 focus:border-secondary font-mono"
                    />
                    <Textarea
                      value={testimonial.quote}
                      onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                      placeholder="Testimonial quote"
                      className="bg-input-background border-2 border-secondary/30 focus:border-secondary font-mono min-h-20"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Settings */}
          <motion.div
            className="border-2 border-primary/20 bg-card/50 backdrop-blur-sm p-8 relative"
            style={{ boxShadow: '0 0 30px rgba(0, 255, 242, 0.1)' }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

            <h3 className="mb-6 text-primary font-mono">SETTINGS</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-primary/30 bg-primary/5">
                <div>
                  <Label htmlFor="isActive" className="text-primary font-mono">Active Session</Label>
                  <p className="text-muted-foreground text-sm">Available for booking</p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-primary/30 bg-primary/5">
                <div>
                  <Label htmlFor="isFeatured" className="text-primary font-mono">Featured Session</Label>
                  <p className="text-muted-foreground text-sm">Display on homepage and featured sections</p>
                </div>
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                />
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard/mentorship')}
              className="border-accent/50 hover:bg-accent/10 text-accent font-mono"
              disabled={loading}
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              className="flex-1 border-2 border-primary bg-primary/10 hover:bg-primary/20 text-primary font-mono"
              disabled={loading}
            >
              {loading ? (
                <motion.div
                  className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <>
                  <Save size={16} />
                  <span>{isEditMode ? 'UPDATE_SESSION' : 'CREATE_SESSION'}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </ScrollReveal>
    </div>
  );
}
