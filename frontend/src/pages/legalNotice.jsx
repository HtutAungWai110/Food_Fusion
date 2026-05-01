
import { Cookie, ShieldCheck, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
export default function CookiePolicy() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background pb-20 pt-12"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-orange-500/10 rounded-2xl text-orange-500 mb-2">
            <Cookie className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Cookie <span className="text-orange-500">Policy</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transparent information about how we use cookies to keep your account secure.
          </p>
        </header>

        <div className="space-y-8">
          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-orange-600 dark:text-orange-500">
                <Lock className="w-6 h-6" />
                Essential Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Food Fusion uses only **essential cookies** to provide core website functionality. Specifically, we use these cookies to store your authentication tokens.
              </p>
              <div className="bg-muted/50 p-6 rounded-2xl space-y-4">
                <h4 className="font-bold text-foreground">What this means for you:</h4>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="h-2 w-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                    <p><span className="font-semibold text-foreground">Security:</span> These cookies allow us to identify your session and keep you logged in as you navigate between pages.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="h-2 w-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                    <p><span className="font-semibold text-foreground">Functionality:</span> Without these cookies, you would not be able to access your personal cookbook, post comments, or manage your profile.</p>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-green-600 dark:text-green-500">
                <ShieldCheck className="w-6 h-6" />
                No Third-Party Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Your privacy is our priority. Unlike many other platforms, **Food Fusion does not use third-party cookies for tracking your activities, advertising, or profiling.**
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                We believe in a clean, focused culinary experience that respects your data and your digital footprint.
              </p>
            </CardContent>
          </Card>

          <div className="text-center pt-8">
            <p className="text-sm text-muted-foreground">
              Last updated: May 2026
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
