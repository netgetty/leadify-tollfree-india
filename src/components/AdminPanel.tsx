
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Save, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import { toast } from "sonner";

const AdminPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const adminCredentials = {
    username: 'admin',
    password: 'leadify2024'
  };

  const [siteData, setSiteData] = useState({
    companyName: 'Leadify',
    phone: '+91 123-456-7890',
    email: 'support@leadify.com',
    whatsapp: '911234567890',
    heroHeadline: 'Boost Your Business with Smart IVR & Toll-Free Numbers',
    heroSubheadline: 'Affordable Pricing • Easy To Use • 24x7 Call Routing • Cloud Hosted • No Hardware Needed',
    logoUrl: '',
    leadWebhookUrl: '',
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
    ]
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === adminCredentials.username && loginData.password === adminCredentials.password) {
      setIsLoggedIn(true);
      toast.success('Logged in successfully!');
    } else {
      toast.error('Invalid credentials!');
    }
  };

  const handleSave = () => {
    localStorage.setItem('leadify_site_data', JSON.stringify(siteData));
    toast.success('Changes saved successfully!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ username: '', password: '' });
    toast.success('Logged out successfully!');
  };

  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now(),
      name: '',
      company: '',
      text: '',
      rating: 5
    };
    setSiteData({
      ...siteData,
      testimonials: [...siteData.testimonials, newTestimonial]
    });
  };

  const removeTestimonial = (id: number) => {
    setSiteData({
      ...siteData,
      testimonials: siteData.testimonials.filter(t => t.id !== id)
    });
  };

  const updateTestimonial = (id: number, field: string, value: string | number) => {
    setSiteData({
      ...siteData,
      testimonials: siteData.testimonials.map(t => 
        t.id === id ? { ...t, [field]: value } : t
      )
    });
  };

  const addPricingTab = () => {
    const newTab = {
      id: `tab_${Date.now()}`,
      name: 'New Tab',
      active: true
    };
    setSiteData({
      ...siteData,
      pricingTabs: [...siteData.pricingTabs, newTab]
    });
  };

  const removePricingTab = (id: string) => {
    setSiteData({
      ...siteData,
      pricingTabs: siteData.pricingTabs.filter(tab => tab.id !== id)
    });
  };

  const updatePricingTab = (id: string, field: string, value: string | boolean) => {
    setSiteData({
      ...siteData,
      pricingTabs: siteData.pricingTabs.map(tab => 
        tab.id === id ? { ...tab, [field]: value } : tab
      )
    });
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-20 right-6 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-6 w-6" />
            <span>Admin Panel</span>
          </CardTitle>
          <div className="flex space-x-2">
            {isLoggedIn && (
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            )}
            <Button onClick={() => setIsVisible(false)} variant="outline" size="sm">
              <EyeOff className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  placeholder="Enter username"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  placeholder="Enter password"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="text-sm text-gray-600 p-4 bg-gray-50 rounded">
                <p><strong>Default Credentials:</strong></p>
                <p>Username: admin</p>
                <p>Password: leadify2024</p>
              </div>
            </form>
          ) : (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="testimonials">Reviews</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={siteData.companyName}
                      onChange={(e) => setSiteData({...siteData, companyName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={siteData.phone}
                      onChange={(e) => setSiteData({...siteData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={siteData.email}
                      onChange={(e) => setSiteData({...siteData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number (without +)</Label>
                    <Input
                      id="whatsapp"
                      value={siteData.whatsapp}
                      onChange={(e) => setSiteData({...siteData, whatsapp: e.target.value})}
                      placeholder="911234567890"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    value={siteData.logoUrl}
                    onChange={(e) => setSiteData({...siteData, logoUrl: e.target.value})}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="heroHeadline">Hero Headline</Label>
                  <Input
                    id="heroHeadline"
                    value={siteData.heroHeadline}
                    onChange={(e) => setSiteData({...siteData, heroHeadline: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="heroSubheadline">Hero Subheadline</Label>
                  <Textarea
                    id="heroSubheadline"
                    value={siteData.heroSubheadline}
                    onChange={(e) => setSiteData({...siteData, heroSubheadline: e.target.value})}
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Pricing Tabs Management</h3>
                  <Button onClick={addPricingTab} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tab
                  </Button>
                </div>
                <div className="space-y-4">
                  {siteData.pricingTabs.map((tab) => (
                    <Card key={tab.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <Input
                            placeholder="Tab Name"
                            value={tab.name}
                            onChange={(e) => updatePricingTab(tab.id, 'name', e.target.value)}
                          />
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={tab.active}
                              onChange={(e) => updatePricingTab(tab.id, 'active', e.target.checked)}
                            />
                            <span className="text-sm">Active</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => removePricingTab(tab.id)}
                          variant="destructive"
                          size="sm"
                          className="ml-4"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="testimonials" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <Label>Customer Testimonials</Label>
                  <Button onClick={addTestimonial} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Testimonial
                  </Button>
                </div>
                <div className="space-y-4 mt-2">
                  {siteData.testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Testimonial #{testimonial.id}</h4>
                        <Button
                          onClick={() => removeTestimonial(testimonial.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input
                          placeholder="Customer Name"
                          value={testimonial.name}
                          onChange={(e) => updateTestimonial(testimonial.id, 'name', e.target.value)}
                        />
                        <Input
                          placeholder="Company Name"
                          value={testimonial.company}
                          onChange={(e) => updateTestimonial(testimonial.id, 'company', e.target.value)}
                        />
                      </div>
                      <Textarea
                        placeholder="Testimonial text"
                        value={testimonial.text}
                        onChange={(e) => updateTestimonial(testimonial.id, 'text', e.target.value)}
                        className="mb-4"
                        rows={2}
                      />
                      <div>
                        <Label>Rating</Label>
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          value={testimonial.rating}
                          onChange={(e) => updateTestimonial(testimonial.id, 'rating', parseInt(e.target.value))}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={siteData.seoTitle}
                    onChange={(e) => setSiteData({...siteData, seoTitle: e.target.value})}
                    placeholder="Page title for search engines"
                  />
                </div>
                <div>
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={siteData.seoDescription}
                    onChange={(e) => setSiteData({...siteData, seoDescription: e.target.value})}
                    placeholder="Meta description for search engines"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="seoKeywords">SEO Keywords</Label>
                  <Input
                    id="seoKeywords"
                    value={siteData.seoKeywords}
                    onChange={(e) => setSiteData({...siteData, seoKeywords: e.target.value})}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </TabsContent>

              <TabsContent value="leads" className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="leadWebhookUrl">Lead Webhook URL</Label>
                  <Input
                    id="leadWebhookUrl"
                    value={siteData.leadWebhookUrl}
                    onChange={(e) => setSiteData({...siteData, leadWebhookUrl: e.target.value})}
                    placeholder="https://your-webhook-url.com/leads"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    When someone submits the lead form, data will be sent to this URL as a POST request.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded">
                  <h4 className="font-medium mb-2">Webhook Payload Format:</h4>
                  <pre className="text-xs text-gray-700">
{`{
  "name": "Customer Name",
  "phone": "+91 9876543210", 
  "email": "customer@email.com",
  "service": "ivr|tollfree|both",
  "timestamp": "2024-01-01T00:00:00Z"
}`}
                  </pre>
                </div>
              </TabsContent>

              <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
                <Button onClick={handleSave} className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </div>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
