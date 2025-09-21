import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

// Mock leaderboard data
const mockLeaderboard = [
  {
    rank: 1,
    username: "code_master",
    score: 5420,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=code_master",
    postsCount: 127,
    commentsCount: 289,
    badge: "Legend",
    specialty: "Full Stack"
  },
  {
    rank: 2,
    username: "react_ninja",
    score: 4890,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=react_ninja",
    postsCount: 98,
    commentsCount: 245,
    badge: "Expert",
    specialty: "Frontend"
  },
  {
    rank: 3,  
    username: "backend_guru",
    score: 4320,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=backend_guru",
    postsCount: 76,
    commentsCount: 198,
    badge: "Expert", 
    specialty: "Backend"
  },
  {
    rank: 4,
    username: "ai_researcher",
    score: 3850,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ai_researcher",
    postsCount: 65,
    commentsCount: 156,
    badge: "Pro",
    specialty: "AI/ML"
  },
  {
    rank: 5,
    username: "devops_wizard",
    score: 3420,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=devops_wizard",
    postsCount: 54,
    commentsCount: 132,
    badge: "Pro",
    specialty: "DevOps"
  },
  {
    rank: 6,
    username: "mobile_dev",
    score: 3120,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mobile_dev",
    postsCount: 48,
    commentsCount: 118,
    badge: "Advanced",
    specialty: "Mobile"
  },
  {
    rank: 7,
    username: "security_expert",
    score: 2890,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=security_expert",
    postsCount: 42,
    commentsCount: 104,
    badge: "Advanced",
    specialty: "Security"
  },
  {
    rank: 8,
    username: "ui_designer",
    score: 2650,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ui_designer",
    postsCount: 38,
    commentsCount: 92,
    badge: "Advanced",
    specialty: "UI/UX"
  },
  {
    rank: 9,
    username: "data_scientist",
    score: 2420,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=data_scientist",
    postsCount: 34,
    commentsCount: 78,
    badge: "Intermediate",
    specialty: "Data Science"
  },
  {
    rank: 10,
    username: "game_developer",
    score: 2180,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=game_developer",
    postsCount: 29,
    commentsCount: 65,
    badge: "Intermediate",
    specialty: "Game Dev"
  }
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-warning" />;
    case 2:
      return <Medal className="h-6 w-6 text-muted-foreground" />;
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />;
    default:
      return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  }
};

const getBadgeVariant = (badge: string) => {
  switch (badge) {
    case "Legend":
      return "default";
    case "Expert":
      return "secondary";
    case "Pro":
      return "outline";
    default:
      return "secondary";
  }
};

export default function Leaderboard() {
  const [user, setUser] = useState<any>(null);

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
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navigation user={user} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Trophy className="w-4 h-4 mr-2" />
            Community Champions
          </div>
          <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Celebrating our top contributors who share knowledge, help others, and build the future of tech together.
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {mockLeaderboard.slice(0, 3).map((member, index) => (
            <Card key={member.username} className={`card-3d text-center relative overflow-hidden ${
              member.rank === 1 ? 'order-2 md:order-2 glow-primary' : 
              member.rank === 2 ? 'order-1 md:order-1' :
              'order-3 md:order-3'
            } ${member.rank === 1 ? 'md:scale-105' : ''}`}>
              {member.rank === 1 && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />
              )}
              
              <CardHeader className="pb-4">
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    {getRankIcon(member.rank)}
                    {member.rank === 1 && (
                      <div className="absolute inset-0 animate-pulse-glow rounded-full" />
                    )}
                  </div>
                  
                  <Avatar className={`h-20 w-20 border-4 ${
                    member.rank === 1 ? 'border-primary' : 'border-border'
                  }`}>
                    <AvatarImage src={member.avatar} alt={member.username} />
                    <AvatarFallback className="text-lg bg-gradient-primary text-primary-foreground">
                      {member.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <Link 
                      to={`/user/${member.username}`}
                      className="text-xl font-bold hover:text-primary transition-colors"
                    >
                      {member.username}
                    </Link>
                    <p className="text-sm text-muted-foreground">{member.specialty}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center justify-center">
                  <Badge variant={getBadgeVariant(member.badge)} className="px-3 py-1">
                    {member.badge}
                  </Badge>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {member.score.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">points</div>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{member.postsCount} posts</span>
                  <span>{member.commentsCount} comments</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rest of Leaderboard */}
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Top Contributors
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {mockLeaderboard.slice(3).map((member, index) => (
                <div 
                  key={member.username}
                  className="flex items-center justify-between p-4 border-b border-border/50 last:border-b-0 hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 text-center">
                      {getRankIcon(member.rank)}
                    </div>
                    
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.username} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {member.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <Link 
                        to={`/user/${member.username}`}
                        className="font-semibold hover:text-primary transition-colors block truncate"
                      >
                        {member.username}
                      </Link>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{member.specialty}</span>
                        <Badge variant={getBadgeVariant(member.badge)} className="text-xs">
                          {member.badge}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-right">
                      <div className="font-bold text-primary">
                        {member.score.toLocaleString()}
                      </div>
                      <div className="text-muted-foreground">points</div>
                    </div>
                    
                    <div className="text-right text-muted-foreground">
                      <div>{member.postsCount} posts</div>
                      <div>{member.commentsCount} comments</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Rankings updated every hour • Based on post votes, comments, and community engagement</p>
        </div>
      </main>
    </div>
  );
}