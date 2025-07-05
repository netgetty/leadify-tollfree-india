
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Save, Eye, EyeOff } from 'lucide-react';
import { toast } from "sonner";

const AdminPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Default admin credentials (you can change these)
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
    testimonials: [
      {
        name: 'Rajesh Kumar',
        company: 'TechSolutions Pvt Ltd',
        text: 'Leadify\'s IVR system increased our customer satisfaction by 40%. Professional service and great support!',
        rating: 5
      }
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
    // Save to localStorage for persistence
    localStorage.setItem('leadify_site_data', JSON.stringify(siteData));
    toast.success('Changes saved successfully!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ username: '', password: '' });
    toast.success('Logged out successfully!');
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
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
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
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input
                      id="whatsapp"
                      value={siteData.whatsapp}
                      onChange={(e) => setSiteData({...siteData, whatsapp: e.target.value})}
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
                <div className="text-center p-8">
                  <h3 className="text-xl font-bold mb-4">Pricing Management</h3>
                  <p className="text-gray-600 mb-4">
                    Pricing tables are dynamically generated from the component code.
                    To update pricing, you'll need to modify the pricing data in the component.
                  </p>
                  <Button variant="outline">
                    Contact Developer for Pricing Updates
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="testimonials" className="space-y-4 mt-6">
                <div>
                  <Label>Customer Testimonials</Label>
                  <div className="space-y-4 mt-2">
                    {siteData.testimonials.map((testimonial, index) => (
                      <Card key={index} className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="Customer Name"
                            value={testimonial.name}
                            onChange={(e) => {
                              const updatedTestimonials = [...siteData.testimonials];
                              updatedTestimonials[index].name = e.target.value;
                              setSiteData({...siteData, testimonials: updatedTestimonials});
                            }}
                          />
                          <Input
                            placeholder="Company Name"
                            value={testimonial.company}
                            onChange={(e) => {
                              const updatedTestimonials = [...siteData.testimonials];
                              updatedTestimonials[index].company = e.target.value;
                              setSiteData({...siteData, testimonials: updatedTestimonials});
                            }}
                          />
                        </div>
                        <Textarea
                          placeholder="Testimonial text"
                          value={testimonial.text}
                          onChange={(e) => {
                            const updatedTestimonials = [...siteData.testimonials];
                            updatedTestimonials[index].text = e.target.value;
                            setSiteData({...siteData, testimonials: updatedTestimonials});
                          }}
                          className="mt-2"
                          rows={2}
                        />
                      </Card>
                    ))}
                  </div>
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
