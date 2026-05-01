import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, X } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function ConsentPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("foodFusionConsent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("foodFusionConsent", "true");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl"
                >
                    <div className="bg-card/80 backdrop-blur-xl border border-orange-500/20 shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                        <div className="bg-orange-500/10 p-3 rounded-xl text-orange-500 hidden md:block">
                            <Cookie className="w-8 h-8" />
                        </div>
                        
                        <div className="flex-1 text-center md:text-left space-y-1">
                            <h3 className="font-bold text-lg text-foreground">We value your privacy</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                We use only essential cookies to manage your login session and ensure a secure experience. 
                                No third-party tracking or advertising cookies are used. 
                                Read our <Link to="/legal_notice" className="text-orange-500 hover:underline font-semibold">Cookie Policy</Link> for details.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <Button 
                                onClick={handleAccept}
                                className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 rounded-xl h-11"
                            >
                                Accept
                            </Button>
                            <button 
                                onClick={handleAccept}
                                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
