import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/context/theme-provider";
import { Cloud, Gauge, Bell } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage({  }) {

  const { theme, setTheme } = useTheme();
  const isDark=theme=="dark"
  console.log(isDark);
  return (
    <div className={`${isDark ? "bg-gray-900 text-white" : "bg-gradient-to-b from-sky-50 to-white"}`}>    

      {/* Hero Section */}
      <section className={`container mx-auto px-4 py-20 text-center  `}>
        <h1 className={`text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-sky-900"}   `}>
          Know Your Weather Before It Knows You
        </h1>
        <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-sky-700"}`}>
          Get hyper-local weather forecasts, real-time alerts, and beautiful 
          visualizations designed to help you plan better.
        </p>
        <Button size="lg" className="text-lg" asChild>
          <Link to="/signup">Get Started - It's Free</Link>
        </Button>
        
        {/* Dashboard Preview */}
        <div className="mt-16 rounded-xl border shadow-lg overflow-hidden mx-auto max-w-5xl">
          <div className={`h-96 p-4 ${isDark ? "bg-gray-800 border-gray-700" : "bg-gradient-to-r from-sky-100 to-blue-100"}`}>
            <div className={`w-full h-full rounded-lg border-2 border-dashed flex items-center justify-center ${isDark ? "border-gray-600 bg-gray-700" : "border-sky-200 bg-sky-50"}`}>
              <img src="/image-Photoroom.png" alt="" className="object-cover mb-2 h-[90%]" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`${isDark ? "bg-gray-800 text-white" : "bg-white"} py-20`}>
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <Card className={`p-6 hover:shadow-xl transition-shadow ${isDark ? "bg-gray-700 border-gray-600" : ""}`}>
            <div className="mb-4">
              <Gauge className={`h-8 w-8 ${isDark ? "text-white" : "text-sky-600"}`} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
            <p className={`${isDark ? "text-gray-300" : "text-sky-700"}`}>
              Access minute-by-minute weather updates with our global network 
              of meteorological sources.
            </p>
          </Card>

          <Card className={`p-6 hover:shadow-xl transition-shadow ${isDark ? "bg-gray-700 border-gray-600" : ""}`}>
            <div className="mb-4">
              <Cloud className={`h-8 w-8 ${isDark ? "text-white" : "text-sky-600"}`} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
            <p className={`${isDark ? "text-gray-300" : "text-sky-700"}`}>
              Historical data trends and predictive models help you understand 
              weather patterns better.
            </p>
          </Card>

          <Card className={`p-6 hover:shadow-xl transition-shadow ${isDark ? "bg-gray-700 border-gray-600" : ""}`}>
            <div className="mb-4">
              <Bell className={`h-8 w-8 ${isDark ? "text-white" : "text-sky-600"}`} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Alerts</h3>
            <p className={`${isDark ? "text-gray-300" : "text-sky-700"}`}>
              Set personalized notifications for specific weather conditions 
              in your locations of interest.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${isDark ? "bg-gray-700" : "bg-sky-900 text-white"} py-16`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready for Better Weather Insights?
          </h2>
          <Button size="lg" variant="secondary" className="text-lg" asChild>
            <Link to="/signup">Start Now - Free Forever</Link>
          </Button>
        </div>
      </section>

     
    </div>
  );
}
