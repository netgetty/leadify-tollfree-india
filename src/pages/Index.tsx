import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, CheckCircle, Star, Users, Shield, Clock, Zap, PhoneCall, MessageSquare, Globe, Award, TrendingUp, HeadphonesIcon } from 'lucide-react';
import { toast } from "sonner";
import AdminPanel from '@/components/AdminPanel';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: ''
  });
  const [dynamicHeadline, setDynamicHeadline] = useState("Boost Your Business with Smart IVR & Toll-Free Numbers");

  // Dynamic headline based on UTM parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmCampaign = urlParams.get('utm_campaign');
    const utmSource = urlParams.get('utm_source');
    
    if (utmCampaign?.includes('ivr')) {
      setDynamicHeadline("Get Professional IVR System for Your Business");
    } else if (utmCampaign?.includes('tollfree')) {
      setDynamicHeadline("Boost Customer Trust with Toll-Free Numbers");
    } else if (utmSource === 'google') {
      setDynamicHeadline("India's #1 Cloud-Based Phone Solutions");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Google Ads conversion tracking with proper type checking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'
      });
    }
    
    // Form submission logic
    console.log('Lead form submitted:', formData);
    toast.success("Thank you! We'll contact you within 2 hours.");
    
    // Reset form
    setFormData({ name: '', phone: '', email: '', service: '' });
  };

  const pricingPlans = {
    cloudIVR: [
      {
        name: "Budding",
        price: "₹499",
        features: {
          channels: "1",
          users: "2",
          proLicense: "0",
          afterCallSMS: "✗",
          departments: "2",
          webhook: "✗",
          outgoingV2: "✗",
          fixDid: "0",
          whatsappMarketing: "✗",
          whatsappService: "✗",
          whatsappUtility: "✗",
          validity: "30 Days",
          gst: "₹90",
          total: "₹589"
        }
      },
      {
        name: "Basic",
        price: "₹999",
        features: {
          channels: "2",
          users: "5",
          proLicense: "1",
          afterCallSMS: "✓",
          departments: "5",
          webhook: "✓",
          outgoingV2: "✗",
          fixDid: "1",
          whatsappMarketing: "✗",
          whatsappService: "✓",
          whatsappUtility: "✗",
          validity: "30 Days",
          gst: "₹180",
          total: "₹1,179"
        },
        popular: true
      },
      {
        name: "Growth",
        price: "₹1,999",
        features: {
          channels: "5",
          users: "10",
          proLicense: "3",
          afterCallSMS: "✓",
          departments: "10",
          webhook: "✓",
          outgoingV2: "✓",
          fixDid: "2",
          whatsappMarketing: "✓",
          whatsappService: "✓",
          whatsappUtility: "✓",
          validity: "30 Days",
          gst: "₹360",
          total: "₹2,359"
        }
      },
      {
        name: "Business",
        price: "₹3,999",
        features: {
          channels: "10",
          users: "25",
          proLicense: "5",
          afterCallSMS: "✓",
          departments: "Unlimited",
          webhook: "✓",
          outgoingV2: "✓",
          fixDid: "5",
          whatsappMarketing: "✓",
          whatsappService: "✓",
          whatsappUtility: "✓",
          validity: "30 Days",
          gst: "₹720",
          total: "₹4,719"
        }
      },
      {
        name: "Premium",
        price: "₹7,999",
        features: {
          channels: "25",
          users: "50",
          proLicense: "10",
          afterCallSMS: "✓",
          departments: "Unlimited",
          webhook: "✓",
          outgoingV2: "✓",
          fixDid: "10",
          whatsappMarketing: "✓",
          whatsappService: "✓",
          whatsappUtility: "✓",
          validity: "30 Days",
          gst: "₹1,440",
          total: "₹9,439"
        }
      }
    ],
    officeIVR: [
      {
        name: "Budding",
        price: "₹799",
        features: {
          channels: "2",
          users: "3",
          proLicense: "1",
          afterCallSMS: "✓",
          departments: "3",
          webhook: "✗",
          outgoingV2: "✗",
          fixDid: "1",
          whatsappMarketing: "✗",
          whatsappService: "✗",
          whatsappUtility: "✗",
          validity: "30 Days",
          gst: "₹144",
          total: "₹943"
        }
      },
      {
        name: "Basic",
        price: "₹1,299",
        features: {
          channels: "3",
          users: "7",
          proLicense: "2",
          afterCallSMS: "✓",
          departments: "7",
          webhook: "✓",
          outgoingV2: "✗",
          fixDid: "2",
          whatsappMarketing: "✗",
          whatsappService: "✓",
          whatsappUtility: "✗",
          validity: "30 Days",
          gst: "₹234",
          total: "₹1,533"
        },
        popular: true
      },
      {
        name: "Growth",
        price: "₹2,499",
        features: {
          channels: "7",
          users: "15",
          proLicense: "4",
          afterCallSMS: "✓",
          departments: "15",
          webhook: "✓",
          outgoingV2: "✓",
          fixDid: "3",
          whatsappMarketing: "✓",
          whatsappService: "✓",
          whatsappUtility: "✓",
          validity: "30 Days",
          gst: "₹450",
          total: "₹2,949"
        }
      },
      {
        name: "Business",
        price: "₹4,999",
        features: {
          channels: "15",
          users: "30",
          proLicense: "7",
          afterCallSMS: "✓",
          departments: "Unlimited",
          webhook: "✓",
          outgoingV2: "✓",
          fixDid: "7",
          whatsappMarketing: "✓",
          whatsappService: "✓",
          whatsappUtility: "✓",
          validity: "30 Days",
          gst: "₹900",
          total: "₹5,899"
        }
      },
      {
        name: "Premium",
        price: "₹9,999",
        features: {
          channels: "30",
          users: "75",
          proLicense: "15",
          afterCallSMS: "✓",
          departments: "Unlimited",
          webhook: "✓",
          outgoingV2: "✓",
          fixDid: "15",
          whatsappMarketing: "✓",
          whatsappService: "✓",
          whatsappUtility: "✓",
          validity: "30 Days",
          gst: "₹1,800",
          total: "₹11,799"
        }
      }
    ],
    cloudTollFree: [
      {
        name: "Budding",
        price: "₹899",
        features: {
          channels: "2",
          users: "3",
          proLicense: "1",
          afterCallSMS: "✓",
          departments: "3",
          webhook: "✗",
          outgoingV2: "✗",
          fixDid: "1",
          whatsappMarketing: "✗",
          whatsappService: "✗",
          whatsappUtility: "✗",
          validity: "30 Days",
          gst: "₹162",
          total: "₹1,061"
        }
      },
      {
        name: "Basic",
        price: "₹1,499",
        features: {
          channels: "3",
          users: "7",
          proLicense: "2",
          afterCallSMS: "✓",
          departments: "7",
          webhook: "✓",
          outgoingV2: "✗",
          fixDid: "2",
          whatsappMarketing: "✗",
          whatsappService: "✓",
          whatsappUtility: "✗",
          validity: "30 Days",
          gst: "₹270",
          total: "₹1,769"
        },
        popular: true
      },
      {
        name: "Growth",
        price: "₹2,999",
        features: {
          channels: "7",
          users: "15",
          proLicense: "4",
          afterCallSMS: "✓",
          departments: "15",
          webhook: "✓",
          outgoingV2: "✓",
          fixDid: "3",
          whatsappMarketing: "✓",
          whatsappService: "✓",
          whatsappUtility: "✓",
          validity: "30 Days",
          gst: "₹540",
          total: "₹3,539"
        }
      },
      {
        name: "Business",
        price: "₹5,999",
        features: {
          channels: "15",
          users: "30",
          proLicense: "7",
          afterCallSMS: "✓",
          departments: "Unlimited",
          webhook: "✓",
          outgoingV2: "✓",
          fixDid: "7",
          whatsappMarketing: "✓",
          whatsappService: "✓",
          whatsappUtility: "✓",
          validity: "30 Days",
          gst: "₹1,080",
          total: "₹7,079"
        }
      },
      {
        name: "Premium",
        price: "₹11,999",
        features: {
          channels: "30",
          users: "75",
          proLicense: "15",
          afterCallSMS: "✓",
          departments: "Unlimited",
          webhook: "✓",
          outgoingV2: "✓",
          fixDid: "15",
          whatsappMarketing: "✓",
          whatsappService: "✓",
          whatsappUtility: "✓",
          validity: "30 Days",
          gst: "₹2,160",
          total: "₹14,159"
        }
      }
    ]
  };

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "TechSolutions Pvt Ltd",
      text: "Leadify's IVR system increased our customer satisfaction by 40%. Professional service and great support!",
      rating: 5
    },
    {
      name: "Priya Sharma", 
      company: "E-commerce Store",
      text: "The toll-free number gave our business instant credibility. Sales increased by 60% in just 2 months!",
      rating: 5
    },
    {
      name: "Amit Patel",
      company: "Healthcare Clinic",
      text: "24x7 call routing ensures we never miss a patient call. Best investment for our practice!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Phone className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">Leadify</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+911234567890" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <PhoneCall className="h-5 w-5" />
              <span className="font-semibold">+91 123-456-7890</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {dynamicHeadline}
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Affordable Pricing • Easy To Use • 24x7 Call Routing • Cloud Hosted • No Hardware Needed
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Setup in 24 Hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>24x7 Support</span>
                </div>
              </div>
            </div>

            {/* Lead Form */}
            <Card className="p-6 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-gray-800">
                  Get Free Quote in 2 Minutes!
                </CardTitle>
                <p className="text-center text-gray-600">Save up to 70% on your phone bills</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="mt-1"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      className="mt-1"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="mt-1"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">Service Required *</Label>
                    <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ivr">IVR System</SelectItem>
                        <SelectItem value="tollfree">Toll-Free Number</SelectItem>
                        <SelectItem value="both">Both IVR & Toll-Free</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold">
                    Get Free Quote Now →
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    No spam. We'll contact you within 2 hours.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Services?</h2>
            <p className="text-xl text-gray-600">Trusted by 5000+ businesses across India</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24x7 Availability</h3>
              <p className="text-gray-600">Never miss a call with round-the-clock service</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Setup</h3>
              <p className="text-gray-600">Get started within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">99.9% Uptime</h3>
              <p className="text-gray-600">Reliable service you can count on</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Dedicated support team to help you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Perfect Plan</h2>
            <p className="text-xl text-gray-600">Transparent pricing with no hidden charges</p>
          </div>

          <Tabs defaultValue="cloudIVR" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="cloudIVR">Cloud IVR</TabsTrigger>
              <TabsTrigger value="officeIVR">Office IVR</TabsTrigger>
              <TabsTrigger value="cloudTollFree">Cloud Toll-Free</TabsTrigger>
              <TabsTrigger value="officeTollFree">Office Toll-Free</TabsTrigger>
              <TabsTrigger value="unlimited">Unlimited</TabsTrigger>
              <TabsTrigger value="dialer">Dialer</TabsTrigger>
            </TabsList>

            <TabsContent value="cloudIVR">
              <div className="grid md:grid-cols-5 gap-6">
                {pricingPlans.cloudIVR.map((plan, index) => (
                  <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-lg' : ''}`}>
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
                      <p className="text-sm text-gray-500">per month</p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Channels:</span>
                          <span className="font-semibold">{plan.features.channels}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Users:</span>
                          <span className="font-semibold">{plan.features.users}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pro License:</span>
                          <span className="font-semibold">{plan.features.proLicense}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>After Call SMS:</span>
                          <span className={plan.features.afterCallSMS === '✓' ? 'text-green-600' : 'text-red-500'}>
                            {plan.features.afterCallSMS}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Departments:</span>
                          <span className="font-semibold">{plan.features.departments}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Webhook:</span>
                          <span className={plan.features.webhook === '✓' ? 'text-green-600' : 'text-red-500'}>
                            {plan.features.webhook}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>WhatsApp Service:</span>
                          <span className={plan.features.whatsappService === '✓' ? 'text-green-600' : 'text-red-500'}>
                            {plan.features.whatsappService}
                          </span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between text-sm">
                            <span>Base Price:</span>
                            <span>{plan.price}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>GST (18%):</span>
                            <span>{plan.features.gst}</span>
                          </div>
                          <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span className="text-blue-600">{plan.features.total}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant={plan.popular ? "default" : "outline"}>
                        Choose Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="officeIVR">
              <div className="grid md:grid-cols-5 gap-6">
                {pricingPlans.officeIVR.map((plan, index) => (
                  <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-lg' : ''}`}>
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
                      <p className="text-sm text-gray-500">per month</p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Channels:</span>
                          <span className="font-semibold">{plan.features.channels}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Users:</span>
                          <span className="font-semibold">{plan.features.users}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pro License:</span>
                          <span className="font-semibold">{plan.features.proLicense}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>After Call SMS:</span>
                          <span className={plan.features.afterCallSMS === '✓' ? 'text-green-600' : 'text-red-500'}>
                            {plan.features.afterCallSMS}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Departments:</span>
                          <span className="font-semibold">{plan.features.departments}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Webhook:</span>
                          <span className={plan.features.webhook === '✓' ? 'text-green-600' : 'text-red-500'}>
                            {plan.features.webhook}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>WhatsApp Service:</span>
                          <span className={plan.features.whatsappService === '✓' ? 'text-green-600' : 'text-red-500'}>
                            {plan.features.whatsappService}
                          </span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between text-sm">
                            <span>Base Price:</span>
                            <span>{plan.price}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>GST (18%):</span>
                            <span>{plan.features.gst}</span>
                          </div>
                          <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span className="text-blue-600">{plan.features.total}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant={plan.popular ? "default" : "outline"}>
                        Choose Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cloudTollFree">
              <div className="grid md:grid-cols-5 gap-6">
                {pricingPlans.cloudTollFree.map((plan, index) => (
                  <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-lg' : ''}`}>
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
                      <p className="text-sm text-gray-500">per month</p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Channels:</span>
                          <span className="font-semibold">{plan.features.channels}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Users:</span>
                          <span className="font-semibold">{plan.features.users}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pro License:</span>
                          <span className="font-semibold">{plan.features.proLicense}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>After Call SMS:</span>
                          <span className={plan.features.afterCallSMS === '✓' ? 'text-green-600' : 'text-red-500'}>
                            {plan.features.afterCallSMS}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Departments:</span>
                          <span className="font-semibold">{plan.features.departments}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Webhook:</span>
                          <span className={plan.features.webhook === '✓' ? 'text-green-600' : 'text-red-500'}>
                            {plan.features.webhook}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>WhatsApp Service:</span>
                          <span className={plan.features.whatsappService === '✓' ? 'text-green-600' : 'text-red-500'}>
                            {plan.features.whatsappService}
                          </span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between text-sm">
                            <span>Base Price:</span>
                            <span>{plan.price}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>GST (18%):</span>
                            <span>{plan.features.gst}</span>
                          </div>
                          <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span className="text-blue-600">{plan.features.total}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant={plan.popular ? "default" : "outline"}>
                        Choose Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="officeTollFree">
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Office Toll-Free Plans</h3>
                <p className="text-gray-600 mb-8">Coming Soon! Similar pricing structure to Cloud Toll-Free with office-specific features.</p>
                <Button>Contact for Custom Quote</Button>
              </div>
            </TabsContent>

            <TabsContent value="unlimited">
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Unlimited Plans</h3>
                <p className="text-gray-600 mb-8">Unlimited calling plans starting from ₹2,999/month. Perfect for high-volume businesses.</p>
                <Button>Contact for Custom Quote</Button>
              </div>
            </TabsContent>

            <TabsContent value="dialer">
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Dialer Plans</h3>
                <p className="text-gray-600 mb-8">Advanced dialer solutions for sales teams and call centers. Starting from ₹1,999/month.</p>
                <Button>Contact for Custom Quote</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <div className="flex justify-center items-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-xl font-semibold ml-2">4.9/5 Rating</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Trusted by Leading Businesses</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-blue-600 mb-2" />
              <span className="text-2xl font-bold text-gray-800">5000+</span>
              <span className="text-gray-600">Happy Customers</span>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="h-12 w-12 text-green-600 mb-2" />
              <span className="text-2xl font-bold text-gray-800">50+</span>
              <span className="text-gray-600">Cities Covered</span>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-12 w-12 text-purple-600 mb-2" />
              <span className="text-2xl font-bold text-gray-800">99.9%</span>
              <span className="text-gray-600">Uptime</span>
            </div>
            <div className="flex flex-col items-center">
              <TrendingUp className="h-12 w-12 text-orange-600 mb-2" />
              <span className="text-2xl font-bold text-gray-800">24x7</span>
              <span className="text-gray-600">Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Business?</h2>
          <p className="text-xl mb-8">Join 5000+ businesses already using our services</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Get Free Quote
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Phone className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">Leadify</span>
              </div>
              <p className="text-gray-300 mb-4">
                India's leading cloud-based IVR and toll-free number service provider.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Cloud IVR System</li>
                <li>Toll-Free Numbers</li>
                <li>Virtual Numbers</li>
                <li>Call Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li>24x7 Customer Support</li>
                <li>Setup Assistance</li>
                <li>Technical Documentation</li>
                <li>Video Tutorials</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p>📞 +91 123-456-7890</p>
                <p>📧 support@leadify.com</p>
                <p>📍 Mumbai, Delhi, Bangalore</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Leadify Toll-Free India. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/911234567890?text=Hi, I'm interested in your IVR and toll-free services"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </div>

      {/* Click to Call Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <a 
          href="tel:+911234567890"
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-colors"
        >
          <Phone className="h-6 w-6" />
        </a>
      </div>

      {/* Admin Panel */}
      <AdminPanel />
    </div>
  );
};

export default Index;
