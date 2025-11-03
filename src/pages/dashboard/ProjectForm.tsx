import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import { dashboardApi } from '../../utils/dashboardApi';
import { CaseStudy } from '../../utils/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { GlitchText } from '../../components/GlitchText';
import { ScrollReveal } from '../../components/ScrollReveal';
import { toast } from 'sonner';

export function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditMode);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    coverImage: '',
    caseStudyImage: '',
    problemStatement: '',
    myRole: '',
    prototypeLink: '',
    videoLink: '',
    isFeatured: false,
  });

  const [keyMetrics, setKeyMetrics] = useState<Array<{ metric: string; value: string; description?: string }>>([
    { metric: '', value: '', description: '' }
  ]);

  const [tags, setTags] = useState<string[]>(['']);

  useEffect(() => {
    if (isEditMode && id) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      const projects = await dashboardApi.getAllCaseStudies();
      const project = projects.find(p => p._id === id || p.slug === id);
      
      if (project) {
        setFormData({
          title: project.title || '',
          slug: project.slug || '',
          coverImage: project.coverImage || '',
          caseStudyImage: project.caseStudyImage || '',
          problemStatement: project.problemStatement || '',
          myRole: project.myRole || '',
          prototypeLink: project.prototypeLink || '',
          videoLink: project.videoLink || '',
          isFeatured: project.isFeatured || false,
        });

        // Handle keyMetrics - could be array or object
        if (Array.isArray(project.keyMetrics)) {
          setKeyMetrics(project.keyMetrics.length > 0 ? project.keyMetrics : [{ metric: '', value: '', description: '' }]);
        } else if (typeof project.keyMetrics === 'object') {
          // Convert object to array format
          const metricsArray = Object.entries(project.keyMetrics).map(([metric, value]) => ({
            metric,
            value: String(value),
            description: ''
          }));
          setKeyMetrics(metricsArray.length > 0 ? metricsArray : [{ metric: '', value: '', description: '' }]);
        }

        setTags(project.tags && project.tags.length > 0 ? project.tags : ['']);
      } else {
        toast.error('Project not found');
        navigate('/dashboard/projects');
      }
    } catch (error) {
      toast.error('Failed to load project');
      navigate('/dashboard/projects');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Filter out empty metrics and tags
      const filteredMetrics = keyMetrics.filter(m => m.metric && m.value);
      const filteredTags = tags.filter(t => t.trim());

      const data: Partial<CaseStudy> = {
        ...formData,
        keyMetrics: filteredMetrics,
        tags: filteredTags,
      };

      if (isEditMode && id) {
        await dashboardApi.updateCaseStudy(id, data);
        toast.success('Project updated successfully', {
          style: {
            background: 'rgba(0, 255, 242, 0.1)',
            border: '1px solid #00fff2',
            color: '#00fff2',
          },
        });
      } else {
        await dashboardApi.createCaseStudy(data);
        toast.success('Project created successfully', {
          style: {
            background: 'rgba(0, 255, 242, 0.1)',
            border: '1px solid #00fff2',
            color: '#00fff2',
          },
        });
      }

      navigate('/dashboard/projects');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const addMetric = () => {
    setKeyMetrics([...keyMetrics, { metric: '', value: '', description: '' }]);
  };

  const removeMetric = (index: number) => {
    if (keyMetrics.length > 1) {
      setKeyMetrics(keyMetrics.filter((_, i) => i !== index));
    }
  };

  const updateMetric = (index: number, field: keyof typeof keyMetrics[0], value: string) => {
    const updated = [...keyMetrics];
    updated[index] = { ...updated[index], [field]: value };
    setKeyMetrics(updated);
  };

  const addTag = () => {
    setTags([...tags, '']);
  };

  const removeTag = (index: number) => {
    if (tags.length > 1) {
      setTags(tags.filter((_, i) => i !== index));
    }
  };

  const updateTag = (index: number, value: string) => {
    const updated = [...tags];
    updated[index] = value;
    setTags(updated);
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
            onClick={() => navigate('/dashboard/projects')}
            className="border-primary/50 hover:bg-primary/10"
          >
            <ArrowLeft size={18} className="text-primary" />
          </Button>
          <div>
            <GlitchText text={isEditMode ? 'EDIT_PROJECT' : 'NEW_PROJECT'} className="mb-2" />
            <p className="text-muted-foreground font-mono">
              <span className="text-primary">{'>'}</span> {isEditMode ? 'Update project details' : 'Create a new case study'}
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
                  placeholder="Project name"
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
                  placeholder="project-url-slug"
                />
                <p className="text-muted-foreground text-sm">URL-friendly identifier (e.g., my-awesome-project)</p>
              </div>

              {/* Problem Statement */}
              <div className="space-y-2">
                <Label htmlFor="problemStatement" className="text-primary font-mono">Problem Statement *</Label>
                <Textarea
                  id="problemStatement"
                  value={formData.problemStatement}
                  onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono min-h-32"
                  required
                  placeholder="What problem does this project solve?"
                />
              </div>

              {/* My Role */}
              <div className="space-y-2">
                <Label htmlFor="myRole" className="text-primary font-mono">My Role *</Label>
                <Textarea
                  id="myRole"
                  value={formData.myRole}
                  onChange={(e) => setFormData({ ...formData, myRole: e.target.value })}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono min-h-24"
                  required
                  placeholder="Your role and responsibilities"
                />
              </div>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            className="border-2 border-primary/20 bg-card/50 backdrop-blur-sm p-8 relative"
            style={{ boxShadow: '0 0 30px rgba(0, 255, 242, 0.1)' }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

            <h3 className="mb-6 text-primary font-mono">IMAGES</h3>

            <div className="space-y-6">
              {/* Cover Image */}
              <div className="space-y-2">
                <Label htmlFor="coverImage" className="text-primary font-mono">Cover Image URL *</Label>
                <Input
                  id="coverImage"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono"
                  required
                  placeholder="https://example.com/cover.jpg"
                />
                {formData.coverImage && (
                  <img src={formData.coverImage} alt="Cover preview" className="w-full h-48 object-cover border border-primary/30" />
                )}
              </div>

              {/* Case Study Image */}
              <div className="space-y-2">
                <Label htmlFor="caseStudyImage" className="text-primary font-mono">Case Study Image URL *</Label>
                <Input
                  id="caseStudyImage"
                  value={formData.caseStudyImage}
                  onChange={(e) => setFormData({ ...formData, caseStudyImage: e.target.value })}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono"
                  required
                  placeholder="https://example.com/case-study.jpg"
                />
                {formData.caseStudyImage && (
                  <img src={formData.caseStudyImage} alt="Case study preview" className="w-full h-48 object-cover border border-primary/30" />
                )}
              </div>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            className="border-2 border-secondary/20 bg-card/50 backdrop-blur-sm p-8 relative"
            style={{ boxShadow: '0 0 30px rgba(112, 0, 255, 0.1)' }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-secondary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-secondary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-secondary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-secondary" />

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-secondary font-mono">KEY_METRICS</h3>
              <Button
                type="button"
                size="sm"
                onClick={addMetric}
                className="border-2 border-secondary bg-secondary/10 hover:bg-secondary/20 text-secondary font-mono"
              >
                <Plus size={16} />
                <span>ADD_METRIC</span>
              </Button>
            </div>

            <div className="space-y-4">
              {keyMetrics.map((metric, index) => (
                <div key={index} className="flex gap-4 items-start border border-secondary/30 p-4 bg-secondary/5">
                  <div className="flex-1 space-y-4">
                    <Input
                      value={metric.metric}
                      onChange={(e) => updateMetric(index, 'metric', e.target.value)}
                      placeholder="Metric name (e.g., User Satisfaction)"
                      className="bg-input-background border-2 border-secondary/30 focus:border-secondary font-mono"
                    />
                    <Input
                      value={metric.value}
                      onChange={(e) => updateMetric(index, 'value', e.target.value)}
                      placeholder="Value (e.g., 95%)"
                      className="bg-input-background border-2 border-secondary/30 focus:border-secondary font-mono"
                    />
                    <Input
                      value={metric.description || ''}
                      onChange={(e) => updateMetric(index, 'description', e.target.value)}
                      placeholder="Description (optional)"
                      className="bg-input-background border-2 border-secondary/30 focus:border-secondary font-mono"
                    />
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => removeMetric(index)}
                    className="border-accent/50 hover:bg-accent/10 text-accent shrink-0"
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            className="border-2 border-accent/20 bg-card/50 backdrop-blur-sm p-8 relative"
            style={{ boxShadow: '0 0 30px rgba(255, 0, 110, 0.1)' }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent" />

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-accent font-mono">TAGS</h3>
              <Button
                type="button"
                size="sm"
                onClick={addTag}
                className="border-2 border-accent bg-accent/10 hover:bg-accent/20 text-accent font-mono"
              >
                <Plus size={16} />
                <span>ADD_TAG</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tags.map((tag, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={tag}
                    onChange={(e) => updateTag(index, e.target.value)}
                    placeholder="Tag name"
                    className="bg-input-background border-2 border-accent/30 focus:border-accent font-mono"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => removeTag(index)}
                    className="border-accent/50 hover:bg-accent/10 text-accent"
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Additional Links */}
          <motion.div
            className="border-2 border-primary/20 bg-card/50 backdrop-blur-sm p-8 relative"
            style={{ boxShadow: '0 0 30px rgba(0, 255, 242, 0.1)' }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

            <h3 className="mb-6 text-primary font-mono">ADDITIONAL_LINKS</h3>

            <div className="space-y-6">
              {/* Prototype Link */}
              <div className="space-y-2">
                <Label htmlFor="prototypeLink" className="text-primary font-mono">Prototype Link</Label>
                <Input
                  id="prototypeLink"
                  value={formData.prototypeLink}
                  onChange={(e) => setFormData({ ...formData, prototypeLink: e.target.value })}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono"
                  placeholder="https://figma.com/..."
                />
              </div>

              {/* Video Link */}
              <div className="space-y-2">
                <Label htmlFor="videoLink" className="text-primary font-mono">Video Link</Label>
                <Input
                  id="videoLink"
                  value={formData.videoLink}
                  onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono"
                  placeholder="https://youtube.com/..."
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
                <Label htmlFor="isFeatured" className="text-primary font-mono">Featured Project</Label>
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
              onClick={() => navigate('/dashboard/projects')}
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
                  <span>{isEditMode ? 'UPDATE_PROJECT' : 'CREATE_PROJECT'}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </ScrollReveal>
    </div>
  );
}
