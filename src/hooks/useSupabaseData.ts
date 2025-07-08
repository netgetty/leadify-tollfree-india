import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface WebsiteConfig {
  id: string;
  company_name: string;
  phone: string;
  email: string;
  whatsapp: string;
  hero_headline: string;
  hero_subheadline: string;
  logo_url: string | null;
  lead_webhook_url: string | null;
  lead_email: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
}

interface Testimonial {
  id: string;
  name: string;
  company: string;
  text: string;
  rating: number;
}

interface PricingTab {
  id: string;
  tab_id: string;
  name: string;
  active: boolean;
  sort_order: number | null;
}

interface Package {
  id: string;
  tab_id: string;
  name: string;
  price: string;
  features: string[];
  sort_order: number | null;
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  created_at: string;
}

interface Script {
  id: string;
  name: string;
  script_content: string;
  position: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  active: boolean;
  show_in_footer: boolean;
  sort_order: number | null;
  created_at: string;
  updated_at: string;
}

export const useSupabaseData = () => {
  const [websiteConfig, setWebsiteConfig] = useState<WebsiteConfig | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [pricingTabs, setPricingTabs] = useState<PricingTab[]>([]);
  const [packages, setPackages] = useState<{ [key: string]: Package[] }>({});
  const [leads, setLeads] = useState<Lead[]>([]);
  const [scripts, setScripts] = useState<Script[]>([]);
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all data
  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load website config
      const { data: configData, error: configError } = await supabase
        .from('website_config')
        .select('*')
        .single();

      if (configError && configError.code !== 'PGRST116') {
        console.error('Error loading website config:', configError);
      } else if (configData) {
        setWebsiteConfig(configData);
      }

      // Load testimonials
      const { data: testimonialsData, error: testimonialsError } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: true });

      if (testimonialsError) {
        console.error('Error loading testimonials:', testimonialsError);
      } else {
        setTestimonials(testimonialsData || []);
      }

      // Load pricing tabs
      const { data: tabsData, error: tabsError } = await supabase
        .from('pricing_tabs')
        .select('*')
        .order('sort_order', { ascending: true });

      if (tabsError) {
        console.error('Error loading pricing tabs:', tabsError);
      } else {
        setPricingTabs(tabsData || []);
      }

      // Load packages
      const { data: packagesData, error: packagesError } = await supabase
        .from('packages')
        .select('*')
        .order('sort_order', { ascending: true });

      if (packagesError) {
        console.error('Error loading packages:', packagesError);
      } else {
        // Group packages by tab_id
        const groupedPackages: { [key: string]: Package[] } = {};
        packagesData?.forEach((pkg) => {
          if (!groupedPackages[pkg.tab_id]) {
            groupedPackages[pkg.tab_id] = [];
          }
          groupedPackages[pkg.tab_id].push(pkg);
        });
        setPackages(groupedPackages);
      }

      // Load leads
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadsError) {
        console.error('Error loading leads:', leadsError);
      } else {
        setLeads(leadsData || []);
      }

      // Load scripts
      const { data: scriptsData, error: scriptsError } = await supabase
        .from('scripts')
        .select('*')
        .order('created_at', { ascending: true });

      if (scriptsError) {
        console.error('Error loading scripts:', scriptsError);
      } else {
        setScripts(scriptsData || []);
      }

      // Load custom pages
      const { data: customPagesData, error: customPagesError } = await supabase
        .from('custom_pages')
        .select('*')
        .order('sort_order', { ascending: true });

      if (customPagesError) {
        console.error('Error loading custom pages:', customPagesError);
      } else {
        setCustomPages(customPagesData || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Save website config
  const saveWebsiteConfig = async (config: Partial<WebsiteConfig>) => {
    try {
      const { error } = await supabase
        .from('website_config')
        .upsert({ 
          id: websiteConfig?.id || undefined,
          ...config,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      await loadData(); // Reload data
      toast.success('Website configuration saved successfully!');
    } catch (error) {
      console.error('Error saving website config:', error);
      toast.error('Failed to save website configuration');
    }
  };

  // Testimonial operations
  const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .insert(testimonial);

      if (error) throw error;
      
      await loadData();
      toast.success('Testimonial added successfully!');
    } catch (error) {
      console.error('Error adding testimonial:', error);
      toast.error('Failed to add testimonial');
    }
  };

  const updateTestimonial = async (id: string, testimonial: Partial<Testimonial>) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ ...testimonial, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      await loadData();
      toast.success('Testimonial updated successfully!');
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast.error('Failed to update testimonial');
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await loadData();
      toast.success('Testimonial deleted successfully!');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete testimonial');
    }
  };

  // Pricing tab operations
  const addPricingTab = async (tab: Omit<PricingTab, 'id'>) => {
    try {
      const { error } = await supabase
        .from('pricing_tabs')
        .insert(tab);

      if (error) throw error;
      
      await loadData();
      toast.success('Pricing tab added successfully!');
    } catch (error) {
      console.error('Error adding pricing tab:', error);
      toast.error('Failed to add pricing tab');
    }
  };

  const updatePricingTab = async (id: string, tab: Partial<PricingTab>) => {
    try {
      const { error } = await supabase
        .from('pricing_tabs')
        .update({ ...tab, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      await loadData();
      toast.success('Pricing tab updated successfully!');
    } catch (error) {
      console.error('Error updating pricing tab:', error);
      toast.error('Failed to update pricing tab');
    }
  };

  const deletePricingTab = async (id: string) => {
    try {
      const { error } = await supabase
        .from('pricing_tabs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await loadData();
      toast.success('Pricing tab deleted successfully!');
    } catch (error) {
      console.error('Error deleting pricing tab:', error);
      toast.error('Failed to delete pricing tab');
    }
  };

  // Package operations
  const addPackage = async (pkg: Omit<Package, 'id'>) => {
    try {
      const { error } = await supabase
        .from('packages')
        .insert(pkg);

      if (error) throw error;
      
      await loadData();
      toast.success('Package added successfully!');
    } catch (error) {
      console.error('Error adding package:', error);
      toast.error('Failed to add package');
    }
  };

  const updatePackage = async (id: string, pkg: Partial<Package>) => {
    try {
      const { error } = await supabase
        .from('packages')
        .update({ ...pkg, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      await loadData();
      toast.success('Package updated successfully!');
    } catch (error) {
      console.error('Error updating package:', error);
      toast.error('Failed to update package');
    }
  };

  const deletePackage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await loadData();
      toast.success('Package deleted successfully!');
    } catch (error) {
      console.error('Error deleting package:', error);
      toast.error('Failed to delete package');
    }
  };

  // Script operations
  const addScript = async (script: Omit<Script, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('scripts')
        .insert({
          name: script.name,
          script_content: script.script_content,
          position: script.position,
          active: script.active
        })
        .select()
        .single();

      if (error) throw error;
      
      await loadData();
      toast.success('Script added successfully!');
      return data;
    } catch (error) {
      console.error('Error adding script:', error);
      toast.error('Failed to add script');
      throw error;
    }
  };

  const updateScript = async (id: string, script: Partial<Script>) => {
    try {
      const { error } = await supabase
        .from('scripts')
        .update({
          name: script.name,
          script_content: script.script_content,
          position: script.position,
          active: script.active,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      await loadData();
      toast.success('Script updated successfully!');
    } catch (error) {
      console.error('Error updating script:', error);
      toast.error('Failed to update script');
      throw error;
    }
  };

  const deleteScript = async (id: string) => {
    try {
      const { error } = await supabase
        .from('scripts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await loadData();
      toast.success('Script deleted successfully!');
    } catch (error) {
      console.error('Error deleting script:', error);
      toast.error('Failed to delete script');
      throw error;
    }
  };

  // Custom page operations
  const addCustomPage = async (page: Omit<CustomPage, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('custom_pages')
        .insert({
          title: page.title,
          slug: page.slug,
          content: page.content,
          active: page.active,
          show_in_footer: page.show_in_footer,
          sort_order: page.sort_order
        })
        .select()
        .single();

      if (error) throw error;
      
      await loadData();
      toast.success('Custom page added successfully!');
      return data;
    } catch (error) {
      console.error('Error adding custom page:', error);
      toast.error('Failed to add custom page');
      throw error;
    }
  };

  const updateCustomPage = async (id: string, page: Partial<CustomPage>) => {
    try {
      const { error } = await supabase
        .from('custom_pages')
        .update({
          title: page.title,
          slug: page.slug,
          content: page.content,
          active: page.active,
          show_in_footer: page.show_in_footer,
          sort_order: page.sort_order,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      await loadData();
      toast.success('Custom page updated successfully!');
    } catch (error) {
      console.error('Error updating custom page:', error);
      toast.error('Failed to update custom page');
      throw error;
    }
  };

  const deleteCustomPage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('custom_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await loadData();
      toast.success('Custom page deleted successfully!');
    } catch (error) {
      console.error('Error deleting custom page:', error);
      toast.error('Failed to delete custom page');
      throw error;
    }
  };

  // Lead operations
  const deleteLeads = async (id: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await loadData();
      toast.success('Lead deleted successfully!');
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error('Failed to delete lead');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
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
    deleteLeads,
    reloadData: loadData
  };
};
