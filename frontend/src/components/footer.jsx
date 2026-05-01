import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
        { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
        { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
        { icon: <Youtube size={20} />, label: "Youtube", href: "#" },
    ];

    const quickLinks = [
        { path: "/", label: "Home" },
        { path: "/about_us", label: "About Us" },
        { path: "/recipe_collection", label: "Recipes" },
        { path: "/community_cookbook", label: "Community" },
    ];

    const legalLinks = [
        { path: "/legal_notice", label: "Privacy Policy" },
        { path: "/legal_notice", label: "Cookie Policy" },
        { path: "/contact_us", label: "Contact Us" },
    ];

    return (
        <footer className="bg-card border-t-2 border-orange-500/10 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <motion.h1 
                            className="text-2xl font-extrabold italic text-orange-500"
                            whileHover={{ scale: 1.05 }}
                        >
                            Food Fusion
                        </motion.h1>
                        <p className="text-muted-foreground leading-relaxed">
                            Empowering home cooks to explore, create, and share culinary magic. 
                            Join our global community and discover the joy of fusion cooking.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a 
                                    key={social.label} 
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Explore</h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link 
                                        to={link.path} 
                                        className="text-muted-foreground hover:text-orange-500 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Support */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Legal</h4>
                        <ul className="space-y-4">
                            {legalLinks.map((link) => (
                                <li key={link.label}>
                                    <Link 
                                        to={link.path} 
                                        className="text-muted-foreground hover:text-orange-500 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-lg mb-6">Get in Touch</h4>
                        <div className="flex items-start gap-3 text-muted-foreground">
                            <MapPin className="text-orange-500 shrink-0 mt-1" size={18} />
                            <p>123 Culinary Ave, Foodie City, FC 12345</p>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <Phone className="text-orange-500 shrink-0" size={18} />
                            <p>+1 (555) 000-FOOD</p>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <Mail className="text-orange-500 shrink-0" size={18} />
                            <p>hello@foodfusion.com</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-orange-500/10 text-center">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} Food Fusion. All rights reserved. 
                        Inspired by home cooks everywhere.
                    </p>
                </div>
            </div>
        </footer>
    );
}
