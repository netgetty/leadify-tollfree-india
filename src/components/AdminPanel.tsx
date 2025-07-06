import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings, Save, Eye, EyeOff, Plus, Trash2, Edit3 } from 'lucide-react';
import { toast } from "sonner";
import { useSupabaseData } from '@/hooks/useSupabaseData';

const AdminPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Local state for form data to prevent auto-save
  const [localWebsiteConfig, setLocalWebsiteConfig] = useState<any>(null);
  
  const {
    websiteConfig,
    testimonials,
    pricingTabs,
    packages,
    loading,
    saveWebsiteConfig,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addPricingTab,
    updatePricingTab,
    deletePricingTab,
    addPackage,
    updatePackage,
    deletePackage
  } = useSupabaseData();

  // Initialize local config when websiteConfig loads
  React.useEffect(() => {
    if (websiteConfig && !localWebsiteConfig) {
      setLocalWebsiteConfig({ ...websiteConfig });
    }
  }, [websiteConfig, localWebsiteConfig]);

  const adminCredentials = {
    username: 'admin',
    password: 'leadify2024'
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === adminCredentials.username && loginData.password === adminCredentials.password) {
      setIsLoggedIn(true);
      toast.success('Logged in successfully!');
    } else {
      toast.error('Invalid credentials!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ username: '', password: '' });
    toast.success('Logged out successfully!');
  };

  // Handle local config changes (no auto-save)
  const handleConfigChange = (field: string, value: string) => {
    setLocalWebsiteConfig((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  // Manual save function
  const handleSaveWebsiteConfig = () => {
    if (localWebsiteConfig) {
      saveWebsiteConfig(localWebsiteConfig);
    }
  };

  const handleAddTestimonial = () => {
    const newTestimonial = {
      name: '',
      company: '',
      text: '',
      rating: 5
    };
    addTestimonial(newTestimonial);
  };

  const handleAddPricingTab = () => {
    const newTab = {
      tab_id: `tab_${Date.now()}`,
      name: 'New Tab',
      active: true,
      sort_order: pricingTabs.length + 1
    };
    addPricingTab(newTab);
  };

  const handleAddPackage = (tabId: string) => {
    const newPackage = {
      tab_id: tabId,
      name: 'New Package',
      price: '₹999',
      features: ['Feature 1', 'Feature 2'],
      sort_order: (packages[tabId]?.length || 0) + 1
    };
    addPackage(newPackage);
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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <Card className="p-8">
          <div className="text-center">Loading...</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
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
                <p><strong>Admin URL:</strong> {window.location.origin}/admin</p>
              </div>
            </form>
          ) : (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="testimonials">Reviews</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-6">
                {localWebsiteConfig && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={localWebsiteConfig.company_name}
                        onChange={(e) => handleConfigChange('company_name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={localWebsiteConfig.phone}
                        onChange={(e) => handleConfigChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={localWebsiteConfig.email}
                        onChange={(e) => handleConfigChange('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp Number (without +)</Label>
                      <Input
                        id="whatsapp"
                        value={localWebsiteConfig.whatsapp}
                        onChange={(e) => handleConfigChange('whatsapp', e.target.value)}
                        placeholder="911234567890"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="logoUrl">Logo URL</Label>
                      <Input
                        id="logoUrl"
                        value={localWebsiteConfig.logo_url || ''}
                        onChange={(e) => handleConfigChange('logo_url', e.target.value)}
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="content" className="space-y-4 mt-6">
                {localWebsiteConfig && (
                  <>
                    <div>
                      <Label htmlFor="heroHeadline">Hero Headline</Label>
                      <Input
                        id="heroHeadline"
                        value={localWebsiteConfig.hero_headline}
                        onChange={(e) => handleConfigChange('hero_headline', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="heroSubheadline">Hero Subheadline</Label>
                      <Textarea
                        id="heroSubheadline"
                        value={localWebsiteConfig.hero_subheadline}
                        onChange={(e) => handleConfigChange('hero_subheadline', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Pricing Tabs Management</h3>
                  <Button onClick={handleAddPricingTab} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tab
                  </Button>
                </div>
                <div className="space-y-4">
                  {pricingTabs.map((tab) => (
                    <Card key={tab.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <Input
                            placeholder="Tab Name"
                            value={tab.name}
                            onChange={(e) => updatePricingTab(tab.id, { name: e.target.value })}
                          />
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={tab.active}
                              onChange={(e) => updatePricingTab(tab.id, { active: e.target.checked })}
                            />
                            <span className="text-sm">Active</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => deletePricingTab(tab.id)}
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

              <TabsContent value="packages" className="space-y-6 mt-6">
                <h3 className="text-lg font-semibold">Package Management</h3>
                {pricingTabs.filter(tab => tab.active).map((tab) => (
                  <Card key={tab.id} className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-medium">{tab.name} Packages</h4>
                      <Button onClick={() => handleAddPackage(tab.tab_id)} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Package
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {(packages[tab.tab_id] || []).map((pkg) => (
                        <Card key={pkg.id} className="p-4 bg-gray-50">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1 grid grid-cols-2 gap-4">
                              <div>
                                <Label>Package Name</Label>
                                <Input
                                  value={pkg.name}
                                  onChange={(e) => updatePackage(pkg.id, { name: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>Price</Label>
                                <Input
                                  value={pkg.price}
                                  onChange={(e) => updatePackage(pkg.id, { price: e.target.value })}
                                />
                              </div>
                            </div>
                            <Button
                              onClick={() => deletePackage(pkg.id)}
                              variant="destructive"
                              size="sm"
                              className="ml-4"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <Label>Features</Label>
                              <Button 
                                onClick={() => updatePackage(pkg.id, { features: [...pkg.features, 'New Feature'] })}
                                size="sm" 
                                variant="outline"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Add Feature
                              </Button>
                            </div>
                            <div className="space-y-2">
                              {pkg.features.map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                  <Input
                                    value={feature}
                                    onChange={(e) => {
                                      const newFeatures = [...pkg.features];
                                      newFeatures[index] = e.target.value;
                                      updatePackage(pkg.id, { features: newFeatures });
                                    }}
                                    className="flex-1"
                                  />
                                  <Button
                                    onClick={() => {
                                      const newFeatures = pkg.features.filter((_, i) => i !== index);
                                      updatePackage(pkg.id, { features: newFeatures });
                                    }}
                                    variant="outline"
                                    size="sm"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="testimonials" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <Label>Customer Testimonials</Label>
                  <Button onClick={handleAddTestimonial} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Testimonial
                  </Button>
                </div>
                <div className="space-y-4 mt-2">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Testimonial</h4>
                        <Button
                          onClick={() => deleteTestimonial(testimonial.id)}
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
                          onChange={(e) => updateTestimonial(testimonial.id, { name: e.target.value })}
                        />
                        <Input
                          placeholder="Company Name"
                          value={testimonial.company}
                          onChange={(e) => updateTestimonial(testimonial.id, { company: e.target.value })}
                        />
                      </div>
                      <Textarea
                        placeholder="Testimonial text"
                        value={testimonial.text}
                        onChange={(e) => updateTestimonial(testimonial.id, { text: e.target.value })}
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
                          onChange={(e) => updateTestimonial(testimonial.id, { rating: parseInt(e.target.value) })}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-4 mt-6">
                {localWebsiteConfig && (
                  <>
                    <div>
                      <Label htmlFor="seoTitle">SEO Title</Label>
                      <Input
                        id="seoTitle"
                        value={localWebsiteConfig.seo_title}
                        onChange={(e) => handleConfigChange('seo_title', e.target.value)}
                        placeholder="Page title for search engines"
                      />
                    </div>
                    <div>
                      <Label htmlFor="seoDescription">SEO Description</Label>
                      <Textarea
                        id="seoDescription"
                        value={localWebsiteConfig.seo_description}
                        onChange={(e) => handleConfigChange('seo_description', e.target.value)}
                        placeholder="Meta description for search engines"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="seoKeywords">SEO Keywords</Label>
                      <Input
                        id="seoKeywords"
                        value={localWebsiteConfig.seo_keywords}
                        onChange={(e) => handleConfigChange('seo_keywords', e.target.value)}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="leads" className="space-y-4 mt-6">
                {localWebsiteConfig && (
                  <>
                    <div>
                      <Label htmlFor="leadWebhookUrl">Lead Webhook URL</Label>
                      <Input
                        id="leadWebhookUrl"
                        value={localWebsiteConfig.lead_webhook_url || ''}
                        onChange={(e) => handleConfigChange('lead_webhook_url', e.target.value)}
                        placeholder="https://your-webhook-url.com/leads"
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        When someone submits the lead form, data will be sent to this URL as a POST request.
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="leadEmail">Lead Email Address</Label>
                      <Input
                        id="leadEmail"
                        type="email"
                        value={localWebsiteConfig.lead_email}
                        onChange={(e) => handleConfigChange('lead_email', e.target.value)}
                        placeholder="leads@yourcompany.com"
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        Leads will also be sent to this email address.
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
                  </>
                )}
              </TabsContent>

              <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
                <Button onClick={handleSaveWebsiteConfig} className="flex items-center space-x-2">
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
