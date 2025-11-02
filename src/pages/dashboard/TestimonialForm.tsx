import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Save, ArrowLeft } from 'lucide-react';
import { dashboardApi } from '../../utils/dashboardApi';
import { Testimonial } from '../../utils/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { GlitchText } from '../../components/GlitchText';
import { ScrollReveal } from '../../components/ScrollReveal';
import { toast } from 'sonner';

export function TestimonialForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditMode);
  
  const [formData, setFormData] = useState({
    quote: '',
    authorName: '',
    authorTitle: '',
    clientCompany: '',
    authorImage: '',
    authorLinkedIn: '',
    rating: 5,
    projectName: '',
    testimonialType: 'Client' as Testimonial['testimonialType'],
    isFeatured: false,
  });

  useEffect(() => {
    if (isEditMode && id) {
      loadTestimonial();
    }
  }, [id]);

  const loadTestimonial = async () => {
    try {
      const testimonials = await dashboardApi.getAllTestimonials();
      const testimonial = testimonials.find(t => t._id === id);
      
      if (testimonial) {
        setFormData({
          quote: testimonial.quote || '',
          authorName: testimonial.authorName || '',
          authorTitle: testimonial.authorTitle || '',
          clientCompany: testimonial.clientCompany || '',
          authorImage: testimonial.authorImage || '',
          authorLinkedIn: testimonial.authorLinkedIn || '',
          rating: testimonial.rating || 5,
          projectName: testimonial.projectName || '',
          testimonialType: testimonial.testimonialType || 'Client',
          isFeatured: testimonial.isFeatured || false,
        });
      } else {
        toast.error('Testimonial not found');
        navigate('/dashboard/testimonials');
      }
    } catch (error) {
      toast.error('Failed to load testimonial');
      navigate('/dashboard/testimonials');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data: Partial<Testimonial> = formData;

      if (isEditMode && id) {
        await dashboardApi.updateTestimonial(id, data);
        toast.success('Testimonial updated successfully', {
          style: {
            background: 'rgba(0, 255, 242, 0.1)',
            border: '1px solid #00fff2',
            color: '#00fff2',
          },
        });
      } else {
        await dashboardApi.createTestimonial(data);
        toast.success('Testimonial created successfully', {
          style: {
            background: 'rgba(0, 255, 242, 0.1)',
            border: '1px solid #00fff2',
            color: '#00fff2',
          },
        });
      }

      navigate('/dashboard/testimonials');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save testimonial');
    } finally {
      setLoading(false);
    }
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
            onClick={() => navigate('/dashboard/testimonials')}
            className="border-primary/50 hover:bg-primary/10"
          >
            <ArrowLeft size={18} className="text-primary" />
          </Button>
          <div>
            <GlitchText text={isEditMode ? 'EDIT_TESTIMONIAL' : 'NEW_TESTIMONIAL'} className="mb-2" />
            <p className="text-muted-foreground font-mono">
              <span className="text-primary">{'>'}</span> {isEditMode ? 'Update testimonial details' : 'Add client feedback'}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Form */}
      <ScrollReveal delay={0.1}>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Quote */}
          <motion.div
            className="border-2 border-primary/20 bg-card/50 backdrop-blur-sm p-8 relative"
            style={{ boxShadow: '0 0 30px rgba(0, 255, 242, 0.1)' }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

            <h3 className="mb-6 text-primary font-mono">TESTIMONIAL_TEXT</h3>

            <div className="space-y-2">
              <Label htmlFor="quote" className="text-primary font-mono">Quote *</Label>
              <Textarea
                id="quote"
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono min-h-32"
                required
                placeholder="The testimonial text..."
              />
              <p className="text-muted-foreground text-sm">What the client said about your work</p>
            </div>
          </motion.div>

          {/* Author Information */}
          <motion.div
            className="border-2 border-secondary/20 bg-card/50 backdrop-blur-sm p-8 relative"
            style={{ boxShadow: '0 0 30px rgba(112, 0, 255, 0.1)' }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-secondary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-secondary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-secondary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-secondary" />

            <h3 className="mb-6 text-secondary font-mono">AUTHOR_INFORMATION</h3>

            <div className="space-y-6">
              {/* Author Name */}
              <div className="space-y-2">
                <Label htmlFor="authorName" className="text-secondary font-mono">Author Name *</Label>
                <Input
                  id="authorName"
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  className="bg-input-background border-2 border-secondary/30 focus:border-secondary font-mono"
                  required
                  placeholder="John Doe"
                />
              </div>

              {/* Author Title */}
              <div className="space-y-2">
                <Label htmlFor="authorTitle" className="text-secondary font-mono">Author Title *</Label>
                <Input
                  id="authorTitle"
                  value={formData.authorTitle}
                  onChange={(e) => setFormData({ ...formData, authorTitle: e.target.value })}
                  className="bg-input-background border-2 border-secondary/30 focus:border-secondary font-mono"
                  required
                  placeholder="CEO at Company"
                />
              </div>

              {/* Client Company */}
              <div className="space-y-2">
                <Label htmlFor="clientCompany" className="text-secondary font-mono">Company</Label>
                <Input
                  id="clientCompany"
                  value={formData.clientCompany}
                  onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                  className="bg-input-background border-2 border-secondary/30 focus:border-secondary font-mono"
                  placeholder="Company name"
                />
              </div>

              {/* Author Image */}
              <div className="space-y-2">
                <Label htmlFor="authorImage" className="text-secondary font-mono">Author Image URL</Label>
                <Input
                  id="authorImage"
                  value={formData.authorImage}
                  onChange={(e) => setFormData({ ...formData, authorImage: e.target.value })}
                  className="bg-input-background border-2 border-secondary/30 focus:border-secondary font-mono"
                  placeholder="https://example.com/avatar.jpg"
                />
                {formData.authorImage && (
                  <img src={formData.authorImage} alt="Author preview" className="w-24 h-24 object-cover border border-secondary/30 rounded-full" />
                )}
              </div>

              {/* LinkedIn */}
              <div className="space-y-2">
                <Label htmlFor="authorLinkedIn" className="text-secondary font-mono">LinkedIn URL</Label>
                <Input
                  id="authorLinkedIn"
                  value={formData.authorLinkedIn}
                  onChange={(e) => setFormData({ ...formData, authorLinkedIn: e.target.value })}
                  className="bg-input-background border-2 border-secondary/30 focus:border-secondary font-mono"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>
          </motion.div>

          {/* Additional Details */}
          <motion.div
            className="border-2 border-accent/20 bg-card/50 backdrop-blur-sm p-8 relative"
            style={{ boxShadow: '0 0 30px rgba(255, 0, 110, 0.1)' }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent" />

            <h3 className="mb-6 text-accent font-mono">ADDITIONAL_DETAILS</h3>

            <div className="space-y-6">
              {/* Testimonial Type */}
              <div className="space-y-2">
                <Label htmlFor="testimonialType" className="text-accent font-mono">Type</Label>
                <Select
                  value={formData.testimonialType}
                  onValueChange={(value) => setFormData({ ...formData, testimonialType: value as any })}
                >
                  <SelectTrigger className="bg-input-background border-2 border-accent/30 focus:border-accent font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Client">Client</SelectItem>
                    <SelectItem value="Mentee">Mentee</SelectItem>
                    <SelectItem value="Colleague">Colleague</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="projectName" className="text-accent font-mono">Project Name</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="bg-input-background border-2 border-accent/30 focus:border-accent font-mono"
                  placeholder="Related project"
                />
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label htmlFor="rating" className="text-accent font-mono">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                  className="bg-input-background border-2 border-accent/30 focus:border-accent font-mono"
                />
              </div>
            </div>
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

            <div className="flex items-center justify-between p-4 border border-primary/30 bg-primary/5">
              <div>
                <Label htmlFor="isFeatured" className="text-primary font-mono">Featured Testimonial</Label>
                <p className="text-muted-foreground text-sm">Display on homepage and featured sections</p>
              </div>
              <Switch
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard/testimonials')}
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
                  <span>{isEditMode ? 'UPDATE_TESTIMONIAL' : 'CREATE_TESTIMONIAL'}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </ScrollReveal>
    </div>
  );
}
