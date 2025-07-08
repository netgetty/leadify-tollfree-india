import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Save, Eye, EyeOff, Plus, Trash2, Edit3, Code, FileText } from 'lucide-react';
import { toast } from "sonner";
import { useSupabaseData } from '@/hooks/useSupabaseData';

const AdminPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Local state for all form data to prevent auto-save
  const [localWebsiteConfig, setLocalWebsiteConfig] = useState<any>(null);
  const [localTestimonials, setLocalTestimonials] = useState<any[]>([]);
  const [localPricingTabs, setLocalPricingTabs] = useState<any[]>([]);
  const [localPackages, setLocalPackages] = useState<any>({});
  const [localScripts, setLocalScripts] = useState<any[]>([]);
  const [localCustomPages, setLocalCustomPages] = useState<any[]>([]);
  
  const {
    websiteConfig,
    testimonials,
    pricingTabs,
    packages,
    leads,
    scripts,
    customPages,
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
    deletePackage,
    addScript,
    updateScript,
    deleteScript,
    addCustomPage,
    updateCustomPage,
    deleteCustomPage,
    deleteLeads
  } = useSupabaseData();

  // Initialize local states when data loads
  React.useEffect(() => {
    if (websiteConfig && !localWebsiteConfig) {
      setLocalWebsiteConfig({ ...websiteConfig });
    }
  }, [websiteConfig, localWebsiteConfig]);

  React.useEffect(() => {
    if (testimonials.length > 0 && localTestimonials.length === 0) {
      setLocalTestimonials([...testimonials]);
    }
  }, [testimonials, localTestimonials]);

  React.useEffect(() => {
    if (pricingTabs.length > 0 && localPricingTabs.length === 0) {
      setLocalPricingTabs([...pricingTabs]);
    }
  }, [pricingTabs, localPricingTabs]);

  React.useEffect(() => {
    if (Object.keys(packages).length > 0 && Object.keys(localPackages).length === 0) {
      setLocalPackages({ ...packages });
    }
  }, [packages, localPackages]);

  React.useEffect(() => {
    if (scripts.length > 0 && localScripts.length === 0) {
      setLocalScripts([...scripts]);
    }
  }, [scripts, localScripts]);

  React.useEffect(() => {
    if (customPages.length > 0 && localCustomPages.length === 0) {
      setLocalCustomPages([...customPages]);
    }
  }, [customPages, localCustomPages]);

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

  // Local testimonial handlers
  const handleLocalTestimonialChange = (index: number, field: string, value: any) => {
    setLocalTestimonials(prev => 
      prev.map((testimonial, i) => 
        i === index ? { ...testimonial, [field]: value } : testimonial
      )
    );
  };

  const handleSaveTestimonial = (index: number) => {
    const testimonial = localTestimonials[index];
    if (testimonial.id) {
      updateTestimonial(testimonial.id, testimonial);
    }
  };

  const handleAddTestimonial = () => {
    const newTestimonial = {
      id: null,
      name: '',
      company: '',
      text: '',
      rating: 5
    };
    setLocalTestimonials(prev => [...prev, newTestimonial]);
    addTestimonial(newTestimonial);
  };

  // Local pricing tab handlers
  const handleLocalPricingTabChange = (index: number, field: string, value: any) => {
    setLocalPricingTabs(prev => 
      prev.map((tab, i) => 
        i === index ? { ...tab, [field]: value } : tab
      )
    );
  };

  const handleSavePricingTab = (index: number) => {
    const tab = localPricingTabs[index];
    if (tab.id) {
      updatePricingTab(tab.id, tab);
    }
  };

  const handleAddPricingTab = () => {
    const newTab = {
      id: null,
      tab_id: `tab_${Date.now()}`,
      name: 'New Tab',
      active: true,
      sort_order: localPricingTabs.length + 1
    };
    setLocalPricingTabs(prev => [...prev, newTab]);
    addPricingTab(newTab);
  };

  // Local package handlers
  const handleLocalPackageChange = (tabId: string, packageIndex: number, field: string, value: any) => {
    setLocalPackages(prev => ({
      ...prev,
      [tabId]: prev[tabId]?.map((pkg: any, i: number) => 
        i === packageIndex ? { ...pkg, [field]: value } : pkg
      ) || []
    }));
  };

  const handleSavePackage = (tabId: string, packageIndex: number) => {
    const pkg = localPackages[tabId]?.[packageIndex];
    if (pkg?.id) {
      updatePackage(pkg.id, pkg);
    }
  };

  const handleAddPackage = (tabId: string) => {
    const newPackage = {
      id: null,
      tab_id: tabId,
      name: 'New Package',
      price: '₹999',
      features: ['Feature 1', 'Feature 2'],
      sort_order: (localPackages[tabId]?.length || 0) + 1
    };
    setLocalPackages(prev => ({
      ...prev,
      [tabId]: [...(prev[tabId] || []), newPackage]
    }));
    addPackage(newPackage);
  };

  // Script handlers - Fixed to properly work with database
  const handleLocalScriptChange = (index: number, field: string, value: any) => {
    setLocalScripts(prev => 
      prev.map((script, i) => 
        i === index ? { ...script, [field]: value } : script
      )
    );
  };

  const handleSaveScript = async (index: number) => {
    const script = localScripts[index];
    try {
      if (script.id) {
        await updateScript(script.id, script);
      } else {
        const newScript = await addScript({
          name: script.name,
          script_content: script.script_content,
          position: script.position,
          active: script.active
        });
        // Update local state with the new script ID
        setLocalScripts(prev => 
          prev.map((s, i) => i === index ? { ...s, id: newScript.id } : s)
        );
      }
    } catch (error) {
      console.error('Error saving script:', error);
    }
  };

  const handleAddScript = async () => {
    const newScript = {
      id: null,
      name: 'New Script',
      script_content: '',
      position: 'head',
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setLocalScripts(prev => [...prev, newScript]);
  };

  const handleDeleteScript = async (scriptId: string, index: number) => {
    if (scriptId) {
      try {
        await deleteScript(scriptId);
        setLocalScripts(prev => prev.filter((_, i) => i !== index));
      } catch (error) {
        console.error('Error deleting script:', error);
      }
    } else {
      // If no ID, just remove from local state
      setLocalScripts(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Custom page handlers - Fixed to properly work with database
  const handleLocalCustomPageChange = (index: number, field: string, value: any) => {
    setLocalCustomPages(prev => 
      prev.map((page, i) => 
        i === index ? { ...page, [field]: value } : page
      )
    );
  };

  const handleSaveCustomPage = async (index: number) => {
    const page = localCustomPages[index];
    try {
      if (page.id) {
        await updateCustomPage(page.id, page);
      } else {
        const newPage = await addCustomPage({
          title: page.title,
          slug: page.slug,
          content: page.content,
          active: page.active,
          show_in_footer: page.show_in_footer,
          sort_order: page.sort_order
        });
        // Update local state with the new page ID
        setLocalCustomPages(prev => 
          prev.map((p, i) => i === index ? { ...p, id: newPage.id } : p)
        );
      }
    } catch (error) {
      console.error('Error saving custom page:', error);
    }
  };

  const handleAddCustomPage = async () => {
    const newPage = {
      id: null,
      title: 'New Page',
      slug: `page-${Date.now()}`,
      content: '<p>Your page content here...</p>',
      active: true,
      show_in_footer: true,
      sort_order: localCustomPages.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setLocalCustomPages(prev => [...prev, newPage]);
  };

  const handleDeleteCustomPage = async (pageId: string, index: number) => {
    if (pageId) {
      try {
        await deleteCustomPage(pageId);
        setLocalCustomPages(prev => prev.filter((_, i) => i !== index));
      } catch (error) {
        console.error('Error deleting custom page:', error);
      }
    } else {
      // If no ID, just remove from local state
      setLocalCustomPages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      await deleteLeads(leadId);
    }
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
              <TabsList className="grid w-full grid-cols-10">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="testimonials">Reviews</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="manage-leads">Manage Leads</TabsTrigger>
                <TabsTrigger value="scripts">Scripts</TabsTrigger>
                <TabsTrigger value="pages">Pages</TabsTrigger>
              </TabsList>

              {/* Basic Info Tab */}
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

              {/* Content Tab */}
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

              {/* Pricing Tab */}
              <TabsContent value="pricing" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Pricing Tabs Management</h3>
                  <Button onClick={handleAddPricingTab} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tab
                  </Button>
                </div>
                <div className="space-y-4">
                  {localPricingTabs.map((tab, index) => (
                    <Card key={tab.id || index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 grid grid-cols-3 gap-4">
                          <Input
                            placeholder="Tab Name"
                            value={tab.name}
                            onChange={(e) => handleLocalPricingTabChange(index, 'name', e.target.value)}
                          />
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={tab.active}
                              onChange={(e) => handleLocalPricingTabChange(index, 'active', e.target.checked)}
                            />
                            <span className="text-sm">Active</span>
                          </div>
                          <Button onClick={() => handleSavePricingTab(index)} size="sm" variant="outline">
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        </div>
                        <Button
                          onClick={() => tab.id && deletePricingTab(tab.id)}
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

              {/* Packages Tab */}
              <TabsContent value="packages" className="space-y-6 mt-6">
                <h3 className="text-lg font-semibold">Package Management</h3>
                {localPricingTabs.filter(tab => tab.active).map((tab) => (
                  <Card key={tab.id} className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-medium">{tab.name} Packages</h4>
                      <Button onClick={() => handleAddPackage(tab.tab_id)} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Package
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {(localPackages[tab.tab_id] || []).map((pkg: any, packageIndex: number) => (
                        <Card key={pkg.id || packageIndex} className="p-4 bg-gray-50">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1 grid grid-cols-3 gap-4">
                              <div>
                                <Label>Package Name</Label>
                                <Input
                                  value={pkg.name}
                                  onChange={(e) => handleLocalPackageChange(tab.tab_id, packageIndex, 'name', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>Price</Label>
                                <Input
                                  value={pkg.price}
                                  onChange={(e) => handleLocalPackageChange(tab.tab_id, packageIndex, 'price', e.target.value)}
                                />
                              </div>
                              <Button onClick={() => handleSavePackage(tab.tab_id, packageIndex)} size="sm" variant="outline">
                                <Save className="h-4 w-4 mr-1" />
                                Save
                              </Button>
                            </div>
                            <Button
                              onClick={() => pkg.id && deletePackage(pkg.id)}
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
                                onClick={() => handleLocalPackageChange(tab.tab_id, packageIndex, 'features', [...pkg.features, 'New Feature'])}
                                size="sm" 
                                variant="outline"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Add Feature
                              </Button>
                            </div>
                            <div className="space-y-2">
                              {pkg.features.map((feature: string, featureIndex: number) => (
                                <div key={featureIndex} className="flex gap-2">
                                  <Input
                                    value={feature}
                                    onChange={(e) => {
                                      const newFeatures = [...pkg.features];
                                      newFeatures[featureIndex] = e.target.value;
                                      handleLocalPackageChange(tab.tab_id, packageIndex, 'features', newFeatures);
                                    }}
                                    className="flex-1"
                                  />
                                  <Button
                                    onClick={() => {
                                      const newFeatures = pkg.features.filter((_: any, i: number) => i !== featureIndex);
                                      handleLocalPackageChange(tab.tab_id, packageIndex, 'features', newFeatures);
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

              {/* Testimonials Tab */}
              <TabsContent value="testimonials" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <Label>Customer Testimonials</Label>
                  <Button onClick={handleAddTestimonial} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Testimonial
                  </Button>
                </div>
                <div className="space-y-4 mt-2">
                  {localTestimonials.map((testimonial, index) => (
                    <Card key={testimonial.id || index} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Testimonial</h4>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleSaveTestimonial(index)}
                            variant="outline"
                            size="sm"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            onClick={() => testimonial.id && deleteTestimonial(testimonial.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input
                          placeholder="Customer Name"
                          value={testimonial.name}
                          onChange={(e) => handleLocalTestimonialChange(index, 'name', e.target.value)}
                        />
                        <Input
                          placeholder="Company Name"
                          value={testimonial.company}
                          onChange={(e) => handleLocalTestimonialChange(index, 'company', e.target.value)}
                        />
                      </div>
                      <Textarea
                        placeholder="Testimonial text"
                        value={testimonial.text}
                        onChange={(e) => handleLocalTestimonialChange(index, 'text', e.target.value)}
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
                          onChange={(e) => handleLocalTestimonialChange(index, 'rating', parseInt(e.target.value))}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* SEO Tab */}
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

              {/* Leads Tab */}
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

              {/* Manage Leads Tab */}
              <TabsContent value="manage-leads" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Manage Leads</h3>
                  <div className="text-sm text-gray-600">
                    Total Leads: {leads?.length || 0}
                  </div>
                </div>
                
                {leads && leads.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leads.map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell className="font-medium">{lead.name}</TableCell>
                            <TableCell>{lead.phone}</TableCell>
                            <TableCell>{lead.email || 'N/A'}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                lead.service === 'ivr' ? 'bg-blue-100 text-blue-800' :
                                lead.service === 'tollfree' ? 'bg-green-100 text-green-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {lead.service.toUpperCase()}
                              </span>
                            </TableCell>
                            <TableCell>
                              {new Date(lead.created_at).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </TableCell>
                            <TableCell>
                              <Button
                                onClick={() => handleDeleteLead(lead.id)}
                                variant="destructive"
                                size="sm"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No leads found</p>
                    <p className="text-sm">Leads will appear here when customers submit the contact form</p>
                  </div>
                )}
              </TabsContent>

              {/* Scripts Tab */}
              <TabsContent value="scripts" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Code className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">3rd-Party Scripts</h3>
                  </div>
                  <Button onClick={handleAddScript} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Script
                  </Button>
                </div>
                <div className="space-y-4">
                  {localScripts.map((script, index) => (
                    <Card key={script.id || index} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Script Configuration</h4>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleSaveScript(index)}
                            variant="outline"
                            size="sm"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            onClick={() => handleDeleteScript(script.id, index)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input
                          placeholder="Script Name"
                          value={script.name}
                          onChange={(e) => handleLocalScriptChange(index, 'name', e.target.value)}
                        />
                        <Select
                          value={script.position}
                          onValueChange={(value) => handleLocalScriptChange(index, 'position', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="head">Head Section</SelectItem>
                            <SelectItem value="body">Before Body End</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Textarea
                        placeholder="Script content (JavaScript/HTML)"
                        value={script.script_content}
                        onChange={(e) => handleLocalScriptChange(index, 'script_content', e.target.value)}
                        className="mb-4 font-mono text-sm"
                        rows={6}
                      />
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`script-active-${index}`}
                          checked={script.active}
                          onChange={(e) => handleLocalScriptChange(index, 'active', e.target.checked)}
                        />
                        <Label htmlFor={`script-active-${index}`}>Active</Label>
                      </div>
                    </Card>
                  ))}
                  {localScripts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No scripts configured</p>
                      <p className="text-sm">Add tracking codes, analytics, or other 3rd-party scripts</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Custom Pages Tab */}
              <TabsContent value="pages" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Custom Pages</h3>
                  </div>
                  <Button onClick={handleAddCustomPage} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Page
                  </Button>
                </div>
                <div className="space-y-4">
                  {localCustomPages.map((page, index) => (
                    <Card key={page.id || index} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Page Configuration</h4>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleSaveCustomPage(index)}
                            variant="outline"
                            size="sm"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            onClick={() => handleDeleteCustomPage(page.id, index)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input
                          placeholder="Page Title"
                          value={page.title}
                          onChange={(e) => handleLocalCustomPageChange(index, 'title', e.target.value)}
                        />
                        <Input
                          placeholder="URL Slug (e.g., privacy-policy)"
                          value={page.slug}
                          onChange={(e) => handleLocalCustomPageChange(index, 'slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                        />
                      </div>
                      <Textarea
                        placeholder="Page content (HTML allowed)"
                        value={page.content}
                        onChange={(e) => handleLocalCustomPageChange(index, 'content', e.target.value)}
                        className="mb-4"
                        rows={8}
                      />
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`page-active-${index}`}
                            checked={page.active}
                            onChange={(e) => handleLocalCustomPageChange(index, 'active', e.target.checked)}
                          />
                          <Label htmlFor={`page-active-${index}`}>Active</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`page-footer-${index}`}
                            checked={page.show_in_footer}
                            onChange={(e) => handleLocalCustomPageChange(index, 'show_in_footer', e.target.checked)}
                          />
                          <Label htmlFor={`page-footer-${index}`}>Show in Footer</Label>
                        </div>
                        {page.slug && (
                          <div className="text-sm text-blue-600">
                            Preview: <span className="font-mono">/{page.slug}</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                  {localCustomPages.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No custom pages created</p>
                      <p className="text-sm">Create pages like Privacy Policy, Terms of Service, etc.</p>
                    </div>
                  )}
                </div>
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
