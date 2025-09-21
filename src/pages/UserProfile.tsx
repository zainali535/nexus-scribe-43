import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { PostCard } from "@/components/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Trophy, 
  FileText, 
  MessageCircle,
  Star,
  Users,
  Code
} from "lucide-react";

// Mock user data
const mockUsers = {
  "react_master": {
    id: "1",
    username: "react_master",
    displayName: "Alex Chen",
    email: "alex@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=react_master",
    bio: "Senior Frontend Engineer at TechCorp. Passionate about React, TypeScript, and building scalable web applications. Always learning and sharing knowledge with the community.",
    location: "San Francisco, CA",
    website: "https://alexchen.dev",
    joinedDate: "2023-03-15",
    score: 2840,
    rank: 12,
    badge: "Expert",
    stats: {
      posts: 45,
      comments: 128,
      votes: 892,
      followers: 234
    },
    technologies: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    posts: [
      {
        id: "1",
        title: "Building Scalable React Applications with TypeScript",
        content: "Learn how to structure large React applications using TypeScript for better maintainability and developer experience.",
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
        id: "5",
        title: "React Performance Optimization: Advanced Techniques",
        content: "Dive deep into React performance optimization with practical examples and real-world scenarios.",
        tags: ["React", "Performance", "Optimization", "Hooks"],
        votes: 89,
        userVote: null as 'up' | 'down' | null,
        commentCount: 17,
        author: {
          username: "react_master", 
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=react_master",
          score: 2840
        },
        createdAt: "2024-01-10T14:20:00Z"
      }
    ]
  }
};

export default function UserProfile() {
  const { username } = useParams<{ username: string }>();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [profileUser, setProfileUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    // Load current user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }

    // Load profile user data (mock)
    if (username && mockUsers[username as keyof typeof mockUsers]) {
      setProfileUser(mockUsers[username as keyof typeof mockUsers]);
    }
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    if (!profileUser) return;
    
    setProfileUser((prev: any) => ({
      ...prev,
      posts: prev.posts.map((post: any) => {
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
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gradient-dark">
        <Navigation user={currentUser} onLogout={handleLogout} />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">User not found</h1>
            <p className="text-muted-foreground">The user you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navigation user={currentUser} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="card-3d mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Avatar and basic info */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                <Avatar className="h-32 w-32 border-4 border-primary/20">
                  <AvatarImage src={profileUser.avatar} alt={profileUser.username} />
                  <AvatarFallback className="text-2xl bg-gradient-primary text-primary-foreground">
                    {profileUser.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="text-center lg:text-left flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold">{profileUser.displayName}</h1>
                    <Badge variant="default" className="self-center lg:self-auto">
                      {profileUser.badge}
                    </Badge>
                  </div>
                  
                  <p className="text-xl text-muted-foreground mb-2">@{profileUser.username}</p>
                  
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 mr-1" />
                      Rank #{profileUser.rank}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      {profileUser.score.toLocaleString()} points
                    </div>
                    {profileUser.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {profileUser.location}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Joined {formatDate(profileUser.joinedDate)}
                    </div>
                  </div>

                  {profileUser.bio && (
                    <p className="text-muted-foreground mb-4 max-w-2xl">
                      {profileUser.bio}
                    </p>
                  )}

                  {profileUser.website && (
                    <a 
                      href={profileUser.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary-glow transition-colors"
                    >
                      <LinkIcon className="h-4 w-4 mr-1" />
                      {profileUser.website.replace('https://', '')}
                    </a>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:min-w-[200px]">
                {[
                  { label: "Posts", value: profileUser.stats.posts, icon: FileText },
                  { label: "Comments", value: profileUser.stats.comments, icon: MessageCircle },
                  { label: "Votes", value: profileUser.stats.votes, icon: Star },
                  { label: "Followers", value: profileUser.stats.followers, icon: Users }
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start mb-1">
                      <stat.icon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-2xl font-bold text-primary">
                        {stat.value.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            {profileUser.technologies && profileUser.technologies.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center mb-3">
                  <Code className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">Technologies</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileUser.technologies.map((tech: string) => (
                    <Badge key={tech} variant="secondary" className="px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="posts">Posts ({profileUser.stats.posts})</TabsTrigger>
            <TabsTrigger value="comments">Comments ({profileUser.stats.comments})</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            {profileUser.posts && profileUser.posts.length > 0 ? (
              profileUser.posts.map((post: any) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onVote={currentUser ? handleVote : undefined}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground">This user hasn't published any posts.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="comments" className="space-y-6">
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comments</h3>
              <p className="text-muted-foreground">Comments feature coming soon!</p>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <div className="text-center py-12">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Activity Feed</h3>
              <p className="text-muted-foreground">Activity timeline coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}