import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, TrendingUp, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data
const mockPosts = [
  {
    id: "1",
    title: "Building Scalable React Applications with TypeScript",
    content: "Learn how to structure large React applications using TypeScript for better maintainability and developer experience. This comprehensive guide covers best practices, folder structure, and advanced patterns.",
    tags: ["React", "TypeScript", "Architecture", "Best Practices"],
    votes: 156,
    userVote: null as 'up' | 'down' | null,
    commentCount: 23,
    author: {
      username: "react_master",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=react_master",
      score: 2840
    },
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2", 
    title: "The Future of Web Development: AI-Powered Development Tools",
    content: "Exploring how AI is revolutionizing the way we write code. From GitHub Copilot to ChatGPT, discover tools that can 10x your productivity.",
    tags: ["AI", "Development Tools", "Productivity", "Future Tech"],
    votes: 89,
    userVote: 'up' as 'up' | 'down' | null,
    commentCount: 12,
    author: {
      username: "ai_enthusiast",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ai_enthusiast", 
      score: 1920
    },
    createdAt: "2024-01-14T16:45:00Z"
  },
  {
    id: "3",
    title: "Mastering CSS Grid: Advanced Layout Techniques",
    content: "Deep dive into CSS Grid with practical examples and real-world use cases. Learn to create complex layouts that are both responsive and maintainable.",
    tags: ["CSS", "Grid", "Layout", "Frontend"],
    votes: 67,
    userVote: null as 'up' | 'down' | null,
    commentCount: 8,
    author: {
      username: "css_wizard",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=css_wizard",
      score: 1450
    },
    createdAt: "2024-01-13T09:15:00Z"
  },
  {
    id: "4",
    title: "Node.js Performance Optimization: From Zero to Hero",
    content: "Comprehensive guide to optimizing Node.js applications for production. Covers profiling, memory management, clustering, and advanced techniques.",
    tags: ["Node.js", "Performance", "Backend", "Optimization"],
    votes: 134,
    userVote: null as 'up' | 'down' | null,
    commentCount: 19,
    author: {
      username: "node_expert",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=node_expert",
      score: 3120
    },
    createdAt: "2024-01-12T14:20:00Z"
  }
];

const popularTags = ["React", "TypeScript", "Node.js", "Python", "AI", "CSS", "Performance", "Architecture"];

export default function Feed() {
  const [posts, setPosts] = useState(mockPosts);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("trending");
  const navigate = useNavigate();

  useEffect(() => {
    // Load user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const currentVote = post.userVote;
          let newVotes = post.votes;
          
          // Remove previous vote if exists
          if (currentVote === 'up') newVotes--;
          if (currentVote === 'down') newVotes++;
          
          // Apply new vote if different from current
          if (currentVote !== voteType) {
            if (voteType === 'up') newVotes++;
            if (voteType === 'down') newVotes--;
            return { ...post, votes: newVotes, userVote: voteType };
          } else {
            // Remove vote if clicking same button
            return { ...post, votes: newVotes, userVote: null };
          }
        }
        return post;
      })
    );
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "votes":
        return b.votes - a.votes;
      default: // trending
        // Simple trending algorithm: votes + comment engagement + recency
        const aScore = a.votes + (a.commentCount * 2) + (7 - Math.floor((Date.now() - new Date(a.createdAt).getTime()) / (1000 * 60 * 60 * 24)));
        const bScore = b.votes + (b.commentCount * 2) + (7 - Math.floor((Date.now() - new Date(b.createdAt).getTime()) / (1000 * 60 * 60 * 24)));
        return bScore - aScore;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navigation user={user} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Tech Feed</h1>
          <p className="text-muted-foreground">Discover the latest insights, tutorials, and discussions from the developer community.</p>
        </div>

        {/* Filters */}
        <div className="card-3d p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 bg-secondary/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="card-3d">
                <SelectItem value="trending">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trending
                  </div>
                </SelectItem>
                <SelectItem value="newest">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Newest
                  </div>
                </SelectItem>
                <SelectItem value="votes">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Most Voted
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant={selectedTag === "" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTag("")}
              className="h-8"
            >
              All Topics
            </Button>
            {popularTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary/20 transition-colors px-3 py-1"
                onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {sortedPosts.length > 0 ? (
            sortedPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onVote={user ? handleVote : undefined}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}