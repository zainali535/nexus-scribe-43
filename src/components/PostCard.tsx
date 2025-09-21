import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronUp, ChevronDown, MessageCircle, Clock } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
  votes: number;
  userVote?: 'up' | 'down' | null;
  commentCount: number;
  author: {
    username: string;
    avatar?: string;
    score: number;
  };
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  onVote?: (postId: string, voteType: 'up' | 'down') => void;
  compact?: boolean;
}

export function PostCard({ post, onVote, compact = false }: PostCardProps) {
  const [currentVote, setCurrentVote] = useState(post.userVote);
  const [voteCount, setVoteCount] = useState(post.votes);

  const handleVote = (voteType: 'up' | 'down') => {
    if (!onVote) return;

    let newVoteCount = voteCount;
    let newCurrentVote = currentVote;

    // Remove previous vote if exists
    if (currentVote === 'up') newVoteCount--;
    if (currentVote === 'down') newVoteCount++;

    // Apply new vote
    if (currentVote === voteType) {
      // Remove vote if clicking same button
      newCurrentVote = null;
    } else {
      // Apply new vote
      newCurrentVote = voteType;
      if (voteType === 'up') newVoteCount++;
      if (voteType === 'down') newVoteCount--;
    }

    setCurrentVote(newCurrentVote);
    setVoteCount(newVoteCount);
    onVote(post.id, voteType);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="card-3d group hover:glow-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <Link 
              to={`/post/${post.id}`}
              className="block group-hover:text-primary transition-colors duration-200"
            >
              <h3 className={`font-semibold leading-tight line-clamp-2 ${
                compact ? 'text-base' : 'text-lg'
              }`}>
                {post.title}
              </h3>
            </Link>
            
            {!compact && (
              <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                {post.content}
              </p>
            )}
          </div>

          {/* Vote Section */}
          <div className="flex flex-col items-center space-y-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className={`vote-button p-1 h-8 w-8 ${
                currentVote === 'up' ? 'upvoted' : ''
              }`}
              onClick={() => handleVote('up')}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            
            <span className={`text-sm font-medium min-w-[2ch] text-center ${
              voteCount > 0 ? 'text-success' : 
              voteCount < 0 ? 'text-destructive' : 
              'text-muted-foreground'
            }`}>
              {voteCount > 0 ? `+${voteCount}` : voteCount}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              className={`vote-button p-1 h-8 w-8 ${
                currentVote === 'down' ? 'downvoted' : ''
              }`}
              onClick={() => handleVote('down')}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.slice(0, compact ? 2 : 4).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs px-2 py-0.5 hover:bg-primary/10 transition-colors cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > (compact ? 2 : 4) && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{post.tags.length - (compact ? 2 : 4)}
              </Badge>
            )}
          </div>
        )}

        {/* Author & Meta */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={post.author.avatar} alt={post.author.username} />
              <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                {post.author.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Link 
              to={`/user/${post.author.username}`}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {post.author.username}
            </Link>
            <span className="text-muted-foreground">•</span>
            <span className="text-accent font-medium">{post.author.score}</span>
          </div>

          <div className="flex items-center space-x-3 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span className="text-xs">{formatDate(post.createdAt)}</span>
            </div>
            <Link 
              to={`/post/${post.id}`}
              className="flex items-center space-x-1 hover:text-primary transition-colors"
            >
              <MessageCircle className="h-3 w-3" />
              <span className="text-xs">{post.commentCount}</span>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}