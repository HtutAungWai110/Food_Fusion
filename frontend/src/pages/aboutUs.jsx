
import { motion } from "motion/react";
import { 
  ChefHat, 
  Users, 
  Heart, 
  Target, 
  Sparkles, 
  Globe,
  Leaf
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {useNavigate} from "react-router-dom"

export default function AboutUs() {
  const navigate = useNavigate()
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-orange-500" />,
      title: "Culinary Passion",
      description: "We believe that cooking is more than just preparing food; it's an expression of love and creativity that brings people together."
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Community First",
      description: "Our platform is built by foodies, for foodies. We foster a supportive environment where every home cook can shine."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-orange-500" />,
      title: "Creativity",
      description: "We encourage fusion and experimentation. There are no rules in the kitchen, only delicious discoveries waiting to be made."
    },
    {
      icon: <Target className="w-8 h-8 text-orange-500" />,
      title: "Accessibility",
      description: "Making gourmet-level cooking accessible to everyone, regardless of their skill level or background."
    }
  ];

  const team = [
    {
      name: "Chef Marcus Chen",
      role: "Founder & Head Chef",
      bio: "With 15 years of experience in Michelin-starred kitchens, Marcus founded FoodFusion to bring professional techniques to home kitchens.",
      image: "/founder.png"
    },
    {
      name: "Sarah Jenkins",
      role: "Community Director",
      bio: "A passionate home cook and community builder, Sarah ensures FoodFusion remains a welcoming space for all our members.",
      image: "/community-director.png"
    },
    {
      name: "Elena Rodriguez",
      role: "Culinary Researcher",
      bio: "Elena travels the globe to find authentic recipes and help our community explore diverse culinary traditions.",
      image: "/culinary-researcher.png"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background pb-20"
    >
      {/* Hero Section */}
      <section className=" py-20 aboutus-background overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-background mb-6">
              Our Journey with <span className="text-orange-500">FoodFusion</span>
            </h1>
            <p className="text-xl text-background max-w-3xl mx-auto leading-relaxed">
              We started with a simple idea: that everyone has a culinary story to tell, 
              and every home kitchen is a world of potential waiting to be explored.
            </p>
          </motion.div>
        </div>
        
        
      </section>

      {/* Philosophy Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="flex-1 space-y-6"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-orange-600">Our Culinary Philosophy</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At FoodFusion, we believe that the best meals aren't just about the ingredients or the technique—they're about the connections they create. Our philosophy is rooted in the belief that "Fusion" isn't just about mixing cuisines; it's about blending tradition with innovation, and merging individual passions into a collective culinary movement.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We empower home cooks to move beyond rigid recipes and embrace their intuition, encouraging them to adapt, experiment, and share their unique creations with a global audience.
            </p>
          </motion.div>
          <motion.div 
            className="flex-1 grid grid-cols-2 gap-4"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square bg-card border border-orange-500/20 rounded-3xl flex items-center justify-center p-8">
              <div className="flex flex-col items-center">
                <Leaf className="text-green-700" size={"40"}/>
                <p className="text-sm font-medium uppercase tracking-widest mt-2">Authenticity</p>
              </div>
            </div>
            <div className="aspect-square bg-orange-600 rounded-3xl flex items-center justify-center p-8 text-white">
              <div className="text-center">
                <span className="text-4xl font-bold">10k+</span>
                <p className="text-sm font-medium uppercase tracking-widest mt-2">Active Cooks</p>
              </div>
            </div>
            <div className="aspect-square bg-card border border-orange-500/20 rounded-3xl flex items-center justify-center p-8">
              <div className="text-center">
                <span className="text-4xl font-bold text-orange-500">500+</span>
                <p className="text-sm font-medium uppercase tracking-widest mt-2">Daily Recipes</p>
              </div>
            </div>
            <div className="aspect-square bg-card border border-orange-500/20 rounded-3xl flex items-center justify-center p-8">
              <div className="flex flex-col items-center">
                <Globe className="text-orange-500" size={"40"}/>
                <p className="text-sm font-medium uppercase tracking-widest mt-2">Community</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Values We Live By</h2>
            <div className="w-20 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
                  <CardContent className="pt-8 text-center space-y-4">
                    <div className="inline-flex p-3 bg-orange-500/10 rounded-2xl mb-2">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Meet the Visionaries</h2>
          <p className="text-muted-foreground">The dedicated team behind the FoodFusion platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center group"
            >
              <div className="relative mb-6 inline-block">
                <div className="absolute inset-0 bg-orange-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-3xl border-4 border-orange-500/20 p-2 relative z-10 bg-card object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-orange-600 rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-orange-500/20">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Ready to start your journey?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Join thousands of home cooks and start sharing your passion for culinary excellence today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/signup")} className="px-10 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:bg-orange-50 transition-colors cursor-pointer">
              Join Our Community
            </button>
            <button onClick={() => navigate("/community_cookbook")} className="px-10 py-4 bg-orange-700 text-white font-bold rounded-2xl hover:bg-orange-800 transition-colors cursor-pointer border border-orange-500/30">
              Browse Recipes
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
