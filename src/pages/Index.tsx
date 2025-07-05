import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, MessageCircle, Star, Check, PhoneCall } from 'lucide-react';
import { toast } from "sonner";

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'ivr'
  });

  const [siteData, setSiteData] = useState({
    companyName: 'Leadify',
    phone: '+91 123-456-7890',
    email: 'support@leadify.com',
    whatsapp: '911234567890',
    heroHeadline: 'Boost Your Business with Smart IVR & Toll-Free Numbers',
    heroSubheadline: 'Affordable Pricing • Easy To Use • 24x7 Call Routing • Cloud Hosted • No Hardware Needed',
    logoUrl: '',
    leadWebhookUrl: '',
    leadEmail: 'leads@leadify.com',
    seoTitle: 'Leadify - Best IVR & Toll-Free Number Services in India',
    seoDescription: 'Get professional IVR systems and toll-free numbers for your business. 24x7 support, easy setup, affordable pricing. Trusted by 5000+ businesses.',
    seoKeywords: 'IVR system, toll-free number, virtual number, cloud telephony, business phone system',
    testimonials: [
      {
        id: 1,
        name: 'Rajesh Kumar',
        company: 'TechSolutions Pvt Ltd',
        text: 'Leadify\'s IVR system increased our customer satisfaction by 40%. Professional service and great support!',
        rating: 5
      }
    ],
    pricingTabs: [
      { id: 'cloudIVR', name: 'Cloud IVR', active: true },
      { id: 'officeIVR', name: 'Office IVR', active: true },
      { id: 'cloudTollFree', name: 'Cloud Toll-Free', active: true },
      { id: 'officeTollFree', name: 'Office Toll-Free', active: true },
      { id: 'unlimited', name: 'Unlimited', active: true },
      { id: 'dialer', name: 'Dialer', active: true }
    ],
    packages: {
      cloudIVR: [
        { id: 1, name: 'Basic', price: '₹499', features: ['2 Extensions', '24x7 Support', 'Call Recording', 'Web Dashboard'] },
        { id: 2, name: 'Standard', price: '₹999', features: ['5 Extensions', '24x7 Support', 'Call Recording', 'Web Dashboard', 'SMS Integration'] },
        { id: 3, name: 'Premium', price: '₹1999', features: ['Unlimited Extensions', '24x7 Support', 'Call Recording', 'Web Dashboard', 'SMS Integration', 'CRM Integration'] }
      ],
      officeIVR: [
        { id: 1, name: 'Basic', price: '₹799', features: ['Hardware Included', '3 Extensions', 'Local Support', 'Call Recording'] },
        { id: 2, name: 'Standard', price: '₹1499', features: ['Hardware Included', '8 Extensions', 'Local Support', 'Call Recording', 'Queue Management'] },
        { id: 3, name: 'Premium', price: '₹2999', features: ['Hardware Included', 'Unlimited Extensions', 'Local Support', 'Call Recording', 'Queue Management', 'Analytics'] }
      ],
      cloudTollFree: [
        { id: 1, name: 'Basic', price: '₹599', features: ['1800 Number', '500 Minutes', 'Call Recording', 'Web Dashboard'] },
        { id: 2, name: 'Standard', price: '₹1299', features: ['1800 Number', '2000 Minutes', 'Call Recording', 'Web Dashboard', 'Analytics'] },
        { id: 3, name: 'Premium', price: '₹2499', features: ['1800 Number', 'Unlimited Minutes', 'Call Recording', 'Web Dashboard', 'Analytics', 'Priority Support'] }
      ],
      officeTollFree: [
        { id: 1, name: 'Basic', price: '₹899', features: ['Hardware + 1800 Number', '1000 Minutes', 'Local Support', 'Call Recording'] },
        { id: 2, name: 'Standard', price: '₹1799', features: ['Hardware + 1800 Number', '3000 Minutes', 'Local Support', 'Call Recording', 'Queue Management'] },
        { id: 3, name: 'Premium', price: '₹3499', features: ['Hardware + 1800 Number', 'Unlimited Minutes', 'Local Support', 'Call Recording', 'Queue Management', 'Analytics'] }
      ],
      unlimited: [
        { id: 1, name: 'Business', price: '₹2999', features: ['Unlimited IVR + Toll-Free', 'Unlimited Minutes', 'All Features Included', '24x7 Priority Support'] },
        { id: 2, name: 'Enterprise', price: '₹4999', features: ['Multiple Numbers', 'Unlimited Everything', 'Dedicated Support', 'Custom Integration', 'Advanced Analytics'] }
      ],
      dialer: [
        { id: 1, name: 'Starter', price: '₹1499', features: ['Auto Dialer', '1000 Calls/Month', 'Basic CRM', 'Call Recording'] },
        { id: 2, name: 'Professional', price: '₹2999', features: ['Auto + Predictive Dialer', '5000 Calls/Month', 'Advanced CRM', 'Call Recording', 'Analytics'] },
        { id: 3, name: 'Enterprise', price: '₹5999', features: ['All Dialer Types', 'Unlimited Calls', 'Full CRM Suite', 'Advanced Analytics', 'API Access'] }
      ]
    }
  });

  useEffect(() => {
    const savedData = localStorage.getItem('leadify_site_data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setSiteData(prevData => ({ ...prevData, ...parsed }));
    }
  }, []);

  useEffect(() => {
    document.title = siteData.seoTitle;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', siteData.seoDescription);
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', siteData.seoKeywords);
  }, [siteData.seoTitle, siteData.seoDescription, siteData.seoKeywords]);

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
      ...formData,
      timestamp: new Date().toISOString()
    };

    console.log('Lead submitted:', leadData);

    // Send to webhook if configured
    if (siteData.leadWebhookUrl) {
      try {
        await fetch(siteData.leadWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leadData)
        });
      } catch (error) {
        console.error('Error sending to webhook:', error);
      }
    }

    // Send email notification if configured
    if (siteData.leadEmail) {
      console.log('Lead would be sent to email:', siteData.leadEmail);
      // In a real implementation, this would trigger an email service
    }

    toast.success('Thank you! We will contact you within 24 hours.');
    setFormData({ name: '', phone: '', email: '', service: 'ivr' });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {siteData.logoUrl && (
              <img src={siteData.logoUrl} alt={siteData.companyName} className="h-10 w-auto" />
            )}
            <h1 className="text-2xl font-bold text-blue-900">{siteData.companyName}</h1>
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

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {siteData.heroHeadline}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {siteData.heroSubheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleCall}
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg flex items-center space-x-2"
            >
              <PhoneCall className="h-5 w-5" />
              <span>Call Now - {siteData.phone}</span>
            </Button>
            <Button 
              onClick={handleWhatsApp}
              size="lg" 
              variant="outline" 
              className="px-8 py-3 text-lg flex items-center space-x-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Get Quote on WhatsApp</span>
            </Button>
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
          
          <Tabs defaultValue={siteData.pricingTabs.find(tab => tab.active)?.id || 'cloudIVR'} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full max-w-4xl overflow-x-auto">
                {siteData.pricingTabs.filter(tab => tab.active).map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="text-xs md:text-sm whitespace-nowrap px-2 md:px-4"
                  >
                    {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {siteData.pricingTabs.filter(tab => tab.active).map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(siteData.packages[tab.id] || []).map((plan) => (
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
            {siteData.testimonials.map((testimonial) => (
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
              <h4 className="text-xl font-bold mb-4">{siteData.companyName}</h4>
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
            <p>&copy; 2024 {siteData.companyName}. All rights reserved. | Best IVR & Toll-Free Services in India</p>
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
