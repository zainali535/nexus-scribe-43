import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, X, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function CreatePost() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [] as string[]
  });
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Load user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag) && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const generateDraft = async () => {
    if (!formData.title.trim()) {
      setError("Please enter a title first to generate AI draft");
      return;
    }

    setLoading(true);
    try {
      // Simulate AI draft generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const aiDraft = `This is an AI-generated draft about "${formData.title}".

## Introduction
Building on the topic of ${formData.title.toLowerCase()}, this post explores key concepts and practical implementations that every developer should know.

## Key Points
- Understanding the fundamentals
- Best practices and common patterns
- Real-world applications and examples
- Performance considerations
- Future trends and recommendations

## Implementation
Here's a basic example to get you started:

\`\`\`javascript
// Example code implementation
const example = {
  concept: "${formData.title}",
  implementation: "practical approach",
  bestPractices: true
};
\`\`\`

## Conclusion
This topic continues to evolve, and staying updated with the latest developments is crucial for modern development practices.

*Note: This is an AI-generated draft. Please review and customize it according to your specific needs and expertise.*`;

      setFormData(prev => ({
        ...prev,
        content: aiDraft
      }));

      toast({
        title: "AI Draft Generated!",
        description: "Review and customize the generated content as needed.",
      });
    } catch (err) {
      setError("Failed to generate AI draft. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Please fill in both title and content");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Post Created!",
        description: "Your post has been published successfully.",
      });

      navigate('/feed');
    } catch (err) {
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navigation user={user} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
          <p className="text-muted-foreground">Share your knowledge and insights with the community.</p>
        </div>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Create Post
              <Button
                variant="outline"
                size="sm"
                onClick={generateDraft}
                disabled={loading || !formData.title.trim()}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {loading ? "Generating..." : "AI Draft"}
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a descriptive title for your post"
                  className="bg-secondary/50 border-border/50 focus:border-primary"
                  maxLength={120}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.title.length}/120 characters
                </p>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your post content here. Markdown is supported!"
                  className="bg-secondary/50 border-border/50 focus:border-primary min-h-[300px] resize-vertical"
                />
                <p className="text-xs text-muted-foreground">
                  Markdown formatting is supported. Use **bold**, *italic*, `code`, etc.
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (optional)</Label>
                <div className="space-y-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Add tags (press Enter or comma to add)"
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                    disabled={formData.tags.length >= 5}
                  />
                  
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                          {tag}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-destructive/20"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground">
                    Add up to 5 tags to help others discover your post. {formData.tags.length}/5 tags added.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  type="submit" 
                  variant="glow" 
                  disabled={loading}
                  className="flex-1 sm:flex-none"
                >
                  {loading ? "Publishing..." : "Publish Post"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/feed')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}