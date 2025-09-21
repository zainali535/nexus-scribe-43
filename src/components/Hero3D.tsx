import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Users, Trophy, Zap } from "lucide-react";

export function Hero3D() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Large floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float opacity-60" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float opacity-60" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-success/20 rounded-full blur-3xl animate-float opacity-40" style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Floating tech icons */}
        <div className="absolute top-1/4 left-1/4 transform-3d animate-float">
          <div className="w-16 h-16 bg-card-elevated rounded-xl flex items-center justify-center shadow-3d hover:shadow-elevated transition-shadow duration-300">
            <Code className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="absolute top-3/4 right-1/4 transform-3d animate-float" style={{ animationDelay: '0.5s' }}>
          <div className="w-12 h-12 bg-card-elevated rounded-lg flex items-center justify-center shadow-3d hover:shadow-elevated transition-shadow duration-300">
            <Users className="w-6 h-6 text-accent" />
          </div>
        </div>
        <div className="absolute top-1/3 right-1/3 transform-3d animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="w-14 h-14 bg-card-elevated rounded-xl flex items-center justify-center shadow-3d hover:shadow-elevated transition-shadow duration-300">
            <Trophy className="w-7 h-7 text-warning" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-pulse-glow">
            <Zap className="w-4 h-4 mr-2" />
            The Future of Developer Communities
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Share Code.
            </span>
            <br />
            <span className="text-foreground">
              Build Together.
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
              Level Up.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the ultimate 3D developer community where knowledge meets innovation. 
            Share your expertise, discover cutting-edge solutions, and connect with brilliant minds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button asChild size="lg" variant="glow" className="text-lg px-8 py-4 h-auto">
              <Link to="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 h-auto">
              <Link to="/feed">
                Explore Posts
              </Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Code,
                title: "Smart Sharing",
                description: "Share code snippets, tutorials, and insights with syntax highlighting and AI-powered suggestions."
              },
              {
                icon: Users,
                title: "Expert Community",
                description: "Connect with developers from startups to FAANG companies. Learn from the best in the industry."
              },
              {
                icon: Trophy,
                title: "Gamified Learning",
                description: "Earn reputation points, unlock achievements, and climb the leaderboard as you contribute."
              }
            ].map((feature, index) => (
              <div 
                key={feature.title} 
                className="card-3d p-6 text-center group hover:glow-primary transform transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}