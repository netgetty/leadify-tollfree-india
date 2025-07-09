import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, MessageCircle, Star, CheckCircle, Users, Award, TrendingUp, Shield, Headphones, Zap, Globe, ArrowRight, Sparkles, Menu, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    return <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
      <div className="text-foreground text-xl font-poppins">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <AdminPanel />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              {websiteConfig?.logo_url ? (
                <img 
                  src={websiteConfig.logo_url} 
                  alt={websiteConfig.company_name}
                  className="h-8 md:h-12 w-auto"
                />
              ) : (
                <h1 className="text-xl md:text-2xl font-black text-primary font-poppins">
                  {websiteConfig?.company_name || 'Leadify'}
                </h1>
              )}
            </div>

            {/* Contact Buttons */}
            <div className="flex items-center space-x-4">
              <a 
                href={`https://wa.me/${websiteConfig?.whatsapp || '911234567890'}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              
              <a 
                href={`tel:${websiteConfig?.phone || '+91 123-456-7890'}`}
                className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-300 mb-8">
              <Sparkles className="h-5 w-5 text-blue-200 mr-2 animate-pulse" />
              <span className="text-blue-100 font-semibold font-poppins">India's #1 Cloud Telephony Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight font-poppins">
              <span className="text-white">
                {websiteConfig?.hero_headline || 'Boost Your Business with Smart IVR & Toll-Free Numbers'}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-blue-100 mb-12 font-light leading-relaxed max-w-4xl mx-auto font-inter">
              {websiteConfig?.hero_subheadline || 'Affordable Pricing • Easy To Use • 24x7 Call Routing • Cloud Hosted • No Hardware Needed'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href={`tel:${websiteConfig?.phone || '+91 123-456-7890'}`}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 min-w-[200px] glow-blue font-poppins"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <Phone className="h-6 w-6 mr-3 relative z-10" />
                <span className="relative z-10">Call Now</span>
              </a>
              
              <a 
                href={`https://wa.me/${websiteConfig?.whatsapp || '911234567890'}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 min-w-[200px] glow-green font-poppins"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <MessageCircle className="h-6 w-6 mr-3 relative z-10" />
                <span className="relative z-10">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-blue-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2 font-poppins">5000+</div>
              <div className="text-gray-600 font-medium font-inter">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-blue-700 mb-2 font-poppins">99.9%</div>
              <div className="text-gray-600 font-medium font-inter">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2 font-poppins">24x7</div>
              <div className="text-gray-600 font-medium font-inter">Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2 font-poppins">50+</div>
              <div className="text-gray-600 font-medium font-inter">Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 font-poppins">
              Why Choose <span className="text-gradient-blue">Leadify?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
              Transform your business communication with our cutting-edge solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "99.9% Uptime Guarantee",
                description: "Reliable service with enterprise-grade infrastructure",
                color: "blue"
              },
              {
                icon: Headphones,
                title: "24x7 Expert Support",
                description: "Round-the-clock technical assistance and guidance",
                color: "blue"
              },
              {
                icon: Zap,
                title: "Instant Setup",
                description: "Get your system running in just 5 minutes",
                color: "blue"
              },
              {
                icon: Globe,
                title: "Cloud-Based Solution",
                description: "Access your system from anywhere, anytime",
                color: "blue"
              },
              {
                icon: Users,
                title: "Multi-User Support",
                description: "Manage multiple extensions and departments",
                color: "blue"
              },
              {
                icon: TrendingUp,
                title: "Advanced Analytics",
                description: "Detailed reports and call analytics dashboard",
                color: "blue"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-white border-blue-200 hover:bg-blue-50 transition-all duration-300 hover:scale-105 glow-blue">
                <CardContent className="p-8 text-center">
                  <feature.icon className="h-16 w-16 mx-auto mb-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-800 mb-4 font-poppins">{feature.title}</h3>
                  <p className="text-gray-600 font-inter">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {pricingTabs.length > 0 && (
        <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 font-poppins">
                Affordable <span className="text-gradient-blue">Pricing</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
                Choose the perfect plan for your business needs
              </p>
            </div>

            <Tabs value={activePricingTab} onValueChange={setActivePricingTab} className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto mb-12 bg-white border border-blue-200" style={{gridTemplateColumns: `repeat(${pricingTabs.length}, 1fr)`}}>
                {pricingTabs.map((tab) => (
                  <TabsTrigger key={tab.tab_id} value={tab.tab_id} className="text-sm md:text-base font-poppins data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {pricingTabs.map((tab) => (
                <TabsContent key={tab.tab_id} value={tab.tab_id}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {(packages[tab.tab_id] || []).map((pkg: any, index: number) => (
                      <Card key={pkg.id} className={`relative bg-white border-blue-200 hover:bg-blue-50 transition-all duration-300 hover:scale-105 ${index === 1 ? 'ring-2 ring-blue-500 scale-105 glow-blue' : 'hover:shadow-lg'}`}>
                        {index === 1 && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 font-poppins">
                              Most Popular
                            </Badge>
                          </div>
                        )}
                        <CardContent className="p-8">
                          <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-poppins">{pkg.name}</h3>
                            <div className="text-4xl font-black text-blue-600 mb-2 font-poppins">{pkg.price}</div>
                            <div className="text-gray-500 font-inter">per month</div>
                          </div>
                          <ul className="space-y-4 mb-8">
                            {pkg.features.map((feature: string, featureIndex: number) => (
                              <li key={featureIndex} className="flex items-center text-gray-600 font-inter">
                                <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 font-poppins">
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
      <section id="contact" className="py-20 bg-gradient-to-br from-white via-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-6 font-poppins">
                Get Started <span className="text-gradient-blue">Today!</span>
              </h2>
              <p className="text-xl text-gray-600 font-inter">
                Fill out the form below and our experts will contact you within 30 minutes
              </p>
            </div>

            <Card className="bg-white border-blue-200 shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2 font-poppins">Full Name *</label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="bg-white border-blue-200 text-gray-800 placeholder-gray-500 font-inter focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2 font-poppins">Phone Number *</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                        className="bg-white border-blue-200 text-gray-800 placeholder-gray-500 font-inter focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 font-poppins">Email Address</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white border-blue-200 text-gray-800 placeholder-gray-500 font-inter focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 font-poppins">Service Required *</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-inter"
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
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 text-lg font-poppins"
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
      <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-poppins">{websiteConfig?.company_name || 'Leadify'}</h3>
              <p className="text-blue-100 mb-4 font-inter">
                India's leading cloud telephony platform trusted by 5000+ businesses.
              </p>
              <div className="flex space-x-4">
                <a href={`tel:${websiteConfig?.phone || '+91 123-456-7890'}`} className="text-blue-100 hover:text-white transition-colors">
                  <Phone className="h-5 w-5" />
                </a>
                <a href={`mailto:${websiteConfig?.email || 'support@leadify.com'}`} className="text-blue-100 hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
                <a href={`https://wa.me/${websiteConfig?.whatsapp || '911234567890'}`} className="text-blue-100 hover:text-white transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 font-poppins">Services</h4>
              <ul className="space-y-2 text-blue-100 font-inter">
                <li><a href="#" className="hover:text-white transition-colors">Cloud IVR</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Toll-Free Numbers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Virtual Numbers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Call Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 font-poppins">Support</h4>
              <ul className="space-y-2 text-blue-100 font-inter">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 font-poppins">Legal</h4>
              <ul className="space-y-2 text-blue-100 font-inter">
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
          
          <div className="border-t border-blue-700 mt-8 pt-8 text-center">
            <p className="text-blue-100 font-inter">
              © 2024 {websiteConfig?.company_name || 'Leadify'}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
