import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, MessageCircle, Star, Check, PhoneCall, Zap, Shield, Clock, Users, ArrowRight, TrendingUp } from 'lucide-react';
import { toast } from "sonner";
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'ivr'
  });

  const {
    websiteConfig,
    testimonials,
    pricingTabs,
    packages,
    loading
  } = useSupabaseData();

  // Use default values if websiteConfig is not loaded yet
  const siteData = websiteConfig || {
    company_name: 'Leadify',
    phone: '+91 123-456-7890',
    email: 'support@leadify.com',
    whatsapp: '911234567890',
    hero_headline: 'Boost Your Business with Smart IVR & Toll-Free Numbers',
    hero_subheadline: 'Affordable Pricing • Easy To Use • 24x7 Call Routing • Cloud Hosted • No Hardware Needed',
    logo_url: '',
    lead_webhook_url: '',
    lead_email: 'leads@leadify.com',
    seo_title: 'Leadify - Best IVR & Toll-Free Number Services in India',
    seo_description: 'Get professional IVR systems and toll-free numbers for your business. 24x7 support, easy setup, affordable pricing. Trusted by 5000+ businesses.',
    seo_keywords: 'IVR system, toll-free number, virtual number, cloud telephony, business phone system'
  };

  useEffect(() => {
    document.title = siteData.seo_title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', siteData.seo_description);
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', siteData.seo_keywords);
  }, [siteData.seo_title, siteData.seo_description, siteData.seo_keywords]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    const leadData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || null,
      service: formData.service
    };

    try {
      // Save to Supabase
      const { error } = await supabase
        .from('leads')
        .insert(leadData);

      if (error) {
        console.error('Error saving lead:', error);
        toast.error('Failed to submit form. Please try again.');
        return;
      }

      // Send to webhook if configured
      if (siteData.lead_webhook_url) {
        try {
          await fetch(siteData.lead_webhook_url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...leadData,
              timestamp: new Date().toISOString()
            })
          });
        } catch (error) {
          console.error('Error sending to webhook:', error);
        }
      }

      toast.success('Thank you! We will contact you within 24 hours.');
      setFormData({ name: '', phone: '', email: '', service: 'ivr' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    }
  };

  const handleCall = () => {
    const phoneNumber = siteData.phone.replace(/\s+/g, '');
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi! I'm interested in your IVR and Toll-Free services. Please share more details.`);
    const whatsappUrl = `https://wa.me/${siteData.whatsapp}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDiscountCall = () => {
    const phoneNumber = siteData.phone.replace(/\s+/g, '');
    window.location.href = `tel:${phoneNumber}`;
    toast.success('Calling for best discount offer!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {siteData.logo_url && (
              <img src={siteData.logo_url} alt={siteData.company_name} className="h-10 w-auto" />
            )}
            <h1 className="text-2xl font-bold text-blue-900">{siteData.company_name}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleCall}
              variant="outline" 
              size="sm" 
              className="hidden md:flex items-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span>{siteData.phone}</span>
            </Button>
            <Button 
              onClick={handleWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white flex items-center space-x-2"
              size="sm"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 opacity-5"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-8 opacity-80">
              <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1 text-sm">
                <Users className="h-4 w-4 mr-1" />
                5000+ Happy Customers
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1 text-sm">
                <Shield className="h-4 w-4 mr-1" />
                100% Secure & Reliable
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 px-3 py-1 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                24x7 Support
              </Badge>
            </div>

            {/* Main Hero Content */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {siteData.hero_headline}
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                {siteData.hero_subheadline}
              </p>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
                <div className="flex flex-col items-center p-4 bg-white/70 rounded-xl backdrop-blur-sm shadow-sm">
                  <Zap className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-sm font-semibold text-gray-700">30 Min Setup</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-white/70 rounded-xl backdrop-blur-sm shadow-sm">
                  <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-semibold text-gray-700">Boost Sales</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-white/70 rounded-xl backdrop-blur-sm shadow-sm">
                  <Shield className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm font-semibold text-gray-700">Zero Risk</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-white/70 rounded-xl backdrop-blur-sm shadow-sm">
                  <Users className="h-8 w-8 text-orange-600 mb-2" />
                  <span className="text-sm font-semibold text-gray-700">Expert Support</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button 
                  onClick={handleCall}
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 min-w-[280px] sm:min-w-0"
                >
                  <PhoneCall className="h-5 w-5" />
                  <span>Call Now - {siteData.phone}</span>
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 min-w-[280px] sm:min-w-0"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Get Free Quote</span>
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </div>

              {/* Special Offer Banner */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full inline-block shadow-lg animate-pulse">
                <span className="font-bold text-lg">🎉 Limited Time: FREE Setup Worth ₹5,000! Call Now!</span>
              </div>
            </div>

            {/* Customer Testimonial Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-center italic mb-4">
                "Leadify's IVR system transformed our business! We get 50% more qualified leads now."
              </p>
              <div className="text-center">
                <p className="font-semibold text-gray-900">Rajesh Kumar</p>
                <p className="text-sm text-gray-600">CEO, Kumar Enterprises</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our IVR & Toll-Free Solutions?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-700">🚀 Quick Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Get your IVR system live in just 30 minutes. No technical knowledge required.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-700">💰 Best Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Most affordable rates in India with no hidden charges. Starting at just ₹499/month.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-700">🛠️ 24x7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Round the clock technical support in Hindi & English. We're always here to help!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Choose Your Perfect Plan
          </h3>
          
          <Tabs defaultValue={pricingTabs.find(tab => tab.active)?.tab_id || 'cloudIVR'} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full max-w-4xl overflow-x-auto">
                {pricingTabs.filter(tab => tab.active).map((tab) => (
                  <TabsTrigger 
                    key={tab.tab_id} 
                    value={tab.tab_id}
                    className="text-xs md:text-sm whitespace-nowrap px-2 md:px-4"
                  >
                    {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {pricingTabs.filter(tab => tab.active).map((tab) => (
              <TabsContent key={tab.tab_id} value={tab.tab_id}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(packages[tab.tab_id] || []).map((plan) => (
                    <Card key={plan.id} className="relative hover:shadow-xl transition-shadow border-2 hover:border-blue-200">
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl text-blue-900">{plan.name}</CardTitle>
                        <CardDescription className="text-3xl font-bold text-green-600">
                          {plan.price}<span className="text-lg text-gray-500">/month</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-3">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          onClick={handleDiscountCall}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                        >
                          Call for Best Discount
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

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Clients Say
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Generation Form */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h3 className="text-3xl font-bold text-center mb-8">
            Get Your Free Quote Today!
          </h3>
          <Card className="bg-white text-gray-900">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="ivr">IVR System</option>
                    <option value="tollfree">Toll-Free Number</option>
                    <option value="both">Both IVR & Toll-Free</option>
                  </select>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                >
                  Get Free Quote Now
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4">Or call us directly:</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={handleCall}
                    variant="outline" 
                    className="flex items-center space-x-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{siteData.phone}</span>
                  </Button>
                  <Button 
                    onClick={handleWhatsApp}
                    className="bg-green-500 hover:bg-green-600 text-white flex items-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp Now</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">{siteData.company_name}</h4>
              <p className="text-gray-300 mb-4">
                India's leading provider of cloud-based IVR and toll-free number solutions.
              </p>
              <div className="flex space-x-4">
                <Button 
                  onClick={handleCall}
                  variant="outline" 
                  size="sm"
                  className="text-white border-white hover:bg-white hover:text-gray-900"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Cloud IVR Systems</li>
                <li>Office IVR Solutions</li>
                <li>Toll-Free Numbers</li>
                <li>Virtual Phone Numbers</li>
                <li>Call Center Solutions</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{siteData.phone}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp: +{siteData.whatsapp}</span>
                </li>
                <li>Email: {siteData.email}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {siteData.company_name}. All rights reserved. | Best IVR & Toll-Free Services in India</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg animate-pulse"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
