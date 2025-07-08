
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, MessageCircle, Star, CheckCircle, Users, Award, TrendingUp, Shield, Headphones, Zap, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import AdminPanel from '@/components/AdminPanel';
import { Link } from 'react-router-dom';

const Index = () => {
  const [websiteConfig, setWebsiteConfig] = useState<any>(null);
  const [pricingTabs, setPricingTabs] = useState<any[]>([]);
  const [packages, setPackages] = useState<any>({});
  const [customPages, setCustomPages] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'ivr'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activePricingTab, setActivePricingTab] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: configData } = await supabase
        .from('website_config')
        .select('*')
        .single();
      
      if (configData) setWebsiteConfig(configData);

      const { data: tabsData } = await supabase
        .from('pricing_tabs')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });
      
      if (tabsData) {
        setPricingTabs(tabsData);
        if (tabsData.length > 0) {
          setActivePricingTab(tabsData[0].tab_id);
        }
      }

      const { data: packagesData } = await supabase
        .from('packages')
        .select('*')
        .order('sort_order', { ascending: true });

      if (packagesData) {
        const groupedPackages: any = {};
        packagesData.forEach((pkg) => {
          if (!groupedPackages[pkg.tab_id]) {
            groupedPackages[pkg.tab_id] = [];
          }
          groupedPackages[pkg.tab_id].push(pkg);
        });
        setPackages(groupedPackages);
      }

      // Load custom pages for footer
      const { data: customPagesData } = await supabase
        .from('custom_pages')
        .select('*')
        .eq('active', true)
        .eq('show_in_footer', true)
        .order('sort_order', { ascending: true });
      
      if (customPagesData) setCustomPages(customPagesData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          service: formData.service
        }]);

      if (error) throw error;

      toast.success('Thank you! We will contact you soon.');
      setFormData({ name: '', phone: '', email: '', service: 'ivr' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!websiteConfig) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <AdminPanel />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-indigo-900/50"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-400/30 mb-8">
              <Sparkles className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-yellow-300 font-semibold">India's #1 Cloud Telephony Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                {websiteConfig.hero_headline}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-blue-100 mb-12 font-light leading-relaxed max-w-4xl mx-auto">
              {websiteConfig.hero_subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <a 
                href={`tel:${websiteConfig.phone}`}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 min-w-[200px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <Phone className="h-6 w-6 mr-3 relative z-10" />
                <span className="relative z-10">Call Now</span>
              </a>
              
              <a 
                href={`https://wa.me/${websiteConfig.whatsapp}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 min-w-[200px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <MessageCircle className="h-6 w-6 mr-3 relative z-10" />
                <span className="relative z-10">WhatsApp</span>
              </a>
            </div>

            {/* Limited Time Offer Banner */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-full p-1 animate-pulse">
                <div className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 rounded-full py-4 px-8 text-center">
                  <span className="font-black text-lg md:text-xl">🎉 Limited Time: FREE Setup Worth ₹5,000! Call Now!</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full blur-sm opacity-30 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">5000+</div>
              <div className="text-blue-200 font-medium">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">99.9%</div>
              <div className="text-blue-200 font-medium">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">24x7</div>
              <div className="text-blue-200 font-medium">Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">50+</div>
              <div className="text-blue-200 font-medium">Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Leadify?</span>
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Transform your business communication with our cutting-edge solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "99.9% Uptime Guarantee",
                description: "Reliable service with enterprise-grade infrastructure"
              },
              {
                icon: Headphones,
                title: "24x7 Expert Support",
                description: "Round-the-clock technical assistance and guidance"
              },
              {
                icon: Zap,
                title: "Instant Setup",
                description: "Get your system running in just 5 minutes"
              },
              {
                icon: Globe,
                title: "Cloud-Based Solution",
                description: "Access your system from anywhere, anytime"
              },
              {
                icon: Users,
                title: "Multi-User Support",
                description: "Manage multiple extensions and departments"
              },
              {
                icon: TrendingUp,
                title: "Advanced Analytics",
                description: "Detailed reports and call analytics dashboard"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <feature.icon className="h-16 w-16 text-blue-400 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-blue-200">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {pricingTabs.length > 0 && (
        <section className="py-20 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Affordable <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Pricing</span>
              </h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                Choose the perfect plan for your business needs
              </p>
            </div>

            <Tabs value={activePricingTab} onValueChange={setActivePricingTab} className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto mb-12" style={{gridTemplateColumns: `repeat(${pricingTabs.length}, 1fr)`}}>
                {pricingTabs.map((tab) => (
                  <TabsTrigger key={tab.tab_id} value={tab.tab_id} className="text-sm md:text-base">
                    {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {pricingTabs.map((tab) => (
                <TabsContent key={tab.tab_id} value={tab.tab_id}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {(packages[tab.tab_id] || []).map((pkg: any, index: number) => (
                      <Card key={pkg.id} className={`relative bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 ${index === 1 ? 'ring-2 ring-blue-400 scale-105' : ''}`}>
                        {index === 1 && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1">
                              Most Popular
                            </Badge>
                          </div>
                        )}
                        <CardContent className="p-8">
                          <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-white mb-4">{pkg.name}</h3>
                            <div className="text-4xl font-black text-white mb-2">{pkg.price}</div>
                            <div className="text-blue-200">per month</div>
                          </div>
                          <ul className="space-y-4 mb-8">
                            {pkg.features.map((feature: string, featureIndex: number) => (
                              <li key={featureIndex} className="flex items-center text-blue-100">
                                <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      )}

      {/* Contact Form Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Get Started <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Today!</span>
              </h2>
              <p className="text-xl text-blue-200">
                Fill out the form below and our experts will contact you within 30 minutes
              </p>
            </div>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Full Name *</label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-blue-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Phone Number *</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-blue-200"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Email Address</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white/10 border-white/20 text-white placeholder-blue-200"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Service Required *</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    >
                      <option value="ivr">IVR System</option>
                      <option value="tollfree">Toll-Free Number</option>
                      <option value="both">Both IVR & Toll-Free</option>
                    </select>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 text-lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Free Consultation'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">{websiteConfig.company_name}</h3>
              <p className="text-blue-200 mb-4">
                India's leading cloud telephony platform trusted by 5000+ businesses.
              </p>
              <div className="flex space-x-4">
                <a href={`tel:${websiteConfig.phone}`} className="text-blue-400 hover:text-blue-300">
                  <Phone className="h-5 w-5" />
                </a>
                <a href={`mailto:${websiteConfig.email}`} className="text-blue-400 hover:text-blue-300">
                  <Mail className="h-5 w-5" />
                </a>
                <a href={`https://wa.me/${websiteConfig.whatsapp}`} className="text-blue-400 hover:text-blue-300">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Cloud IVR</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Toll-Free Numbers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Virtual Numbers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Call Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-blue-200">
                {customPages.map((page) => (
                  <li key={page.id}>
                    <Link to={`/${page.slug}`} className="hover:text-white transition-colors">
                      {page.title}
                    </Link>
                  </li>
                ))}
                {customPages.length === 0 && (
                  <>
                    <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  </>
                )}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-blue-200">
              © 2024 {websiteConfig.company_name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
