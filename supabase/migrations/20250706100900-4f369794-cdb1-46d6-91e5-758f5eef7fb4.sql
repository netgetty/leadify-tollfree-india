
-- Enable Row Level Security and create tables for the admin panel data

-- Create admin users table for authentication
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create website configuration table
CREATE TABLE public.website_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL DEFAULT 'Leadify',
  phone TEXT NOT NULL DEFAULT '+91 123-456-7890',
  email TEXT NOT NULL DEFAULT 'support@leadify.com',
  whatsapp TEXT NOT NULL DEFAULT '911234567890',
  hero_headline TEXT NOT NULL DEFAULT 'Boost Your Business with Smart IVR & Toll-Free Numbers',
  hero_subheadline TEXT NOT NULL DEFAULT 'Affordable Pricing • Easy To Use • 24x7 Call Routing • Cloud Hosted • No Hardware Needed',
  logo_url TEXT DEFAULT '',
  lead_webhook_url TEXT DEFAULT '',
  lead_email TEXT NOT NULL DEFAULT 'leads@leadify.com',
  seo_title TEXT NOT NULL DEFAULT 'Leadify - Best IVR & Toll-Free Number Services in India',
  seo_description TEXT NOT NULL DEFAULT 'Get professional IVR systems and toll-free numbers for your business. 24x7 support, easy setup, affordable pricing. Trusted by 5000+ businesses.',
  seo_keywords TEXT NOT NULL DEFAULT 'IVR system, toll-free number, virtual number, cloud telephony, business phone system',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create pricing tabs table
CREATE TABLE public.pricing_tabs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tab_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create packages table
CREATE TABLE public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tab_id TEXT NOT NULL,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  FOREIGN KEY (tab_id) REFERENCES pricing_tabs(tab_id) ON DELETE CASCADE
);

-- Create leads table to store form submissions
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL CHECK (service IN ('ivr', 'tollfree', 'both')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default website configuration
INSERT INTO public.website_config (
  company_name, phone, email, whatsapp, hero_headline, hero_subheadline,
  lead_email, seo_title, seo_description, seo_keywords
) VALUES (
  'Leadify',
  '+91 123-456-7890',
  'support@leadify.com',
  '911234567890',
  'Boost Your Business with Smart IVR & Toll-Free Numbers',
  'Affordable Pricing • Easy To Use • 24x7 Call Routing • Cloud Hosted • No Hardware Needed',
  'leads@leadify.com',
  'Leadify - Best IVR & Toll-Free Number Services in India',
  'Get professional IVR systems and toll-free numbers for your business. 24x7 support, easy setup, affordable pricing. Trusted by 5000+ businesses.',
  'IVR system, toll-free number, virtual number, cloud telephony, business phone system'
);

-- Insert default testimonial
INSERT INTO public.testimonials (name, company, text, rating) VALUES (
  'Rajesh Kumar',
  'TechSolutions Pvt Ltd',
  'Leadify''s IVR system increased our customer satisfaction by 40%. Professional service and great support!',
  5
);

-- Insert default pricing tabs
INSERT INTO public.pricing_tabs (tab_id, name, active, sort_order) VALUES 
('cloudIVR', 'Cloud IVR', TRUE, 1),
('officeIVR', 'Office IVR', TRUE, 2),
('cloudTollFree', 'Cloud Toll-Free', TRUE, 3),
('officeTollFree', 'Office Toll-Free', TRUE, 4),
('unlimited', 'Unlimited', TRUE, 5),
('dialer', 'Dialer', TRUE, 6);

-- Insert default packages for Cloud IVR
INSERT INTO public.packages (tab_id, name, price, features, sort_order) VALUES 
('cloudIVR', 'Basic', '₹499', ARRAY['2 Extensions', '24x7 Support', 'Call Recording', 'Web Dashboard'], 1),
('cloudIVR', 'Standard', '₹999', ARRAY['5 Extensions', '24x7 Support', 'Call Recording', 'Web Dashboard', 'SMS Integration'], 2),
('cloudIVR', 'Premium', '₹1999', ARRAY['Unlimited Extensions', '24x7 Support', 'Call Recording', 'Web Dashboard', 'SMS Integration', 'CRM Integration'], 3);

-- Insert default packages for Office IVR
INSERT INTO public.packages (tab_id, name, price, features, sort_order) VALUES 
('officeIVR', 'Basic', '₹799', ARRAY['Hardware Included', '3 Extensions', 'Local Support', 'Call Recording'], 1),
('officeIVR', 'Standard', '₹1499', ARRAY['Hardware Included', '8 Extensions', 'Local Support', 'Call Recording', 'Queue Management'], 2),
('officeIVR', 'Premium', '₹2999', ARRAY['Hardware Included', 'Unlimited Extensions', 'Local Support', 'Call Recording', 'Queue Management', 'Analytics'], 3);

-- Enable Row Level Security on all tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_tabs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (for now, allowing all operations - will implement proper admin auth later)
-- These policies will need to be updated once we implement proper authentication

-- Admin users policies (restrict access)
CREATE POLICY "Admin users can view themselves" ON public.admin_users FOR SELECT USING (true);
CREATE POLICY "Admin users can insert" ON public.admin_users FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin users can update themselves" ON public.admin_users FOR UPDATE USING (true);

-- Website config policies (admin only)
CREATE POLICY "Anyone can view website config" ON public.website_config FOR SELECT USING (true);
CREATE POLICY "Admin can modify website config" ON public.website_config FOR ALL USING (true);

-- Testimonials policies (admin only for modifications, public for reading)
CREATE POLICY "Anyone can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admin can modify testimonials" ON public.testimonials FOR ALL USING (true);

-- Pricing tabs policies (admin only for modifications, public for reading)
CREATE POLICY "Anyone can view pricing tabs" ON public.pricing_tabs FOR SELECT USING (true);
CREATE POLICY "Admin can modify pricing tabs" ON public.pricing_tabs FOR ALL USING (true);

-- Packages policies (admin only for modifications, public for reading)
CREATE POLICY "Anyone can view packages" ON public.packages FOR SELECT USING (true);
CREATE POLICY "Admin can modify packages" ON public.packages FOR ALL USING (true);

-- Leads policies (admin only)
CREATE POLICY "Admin can view all leads" ON public.leads FOR SELECT USING (true);
CREATE POLICY "Anyone can submit leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can modify leads" ON public.leads FOR UPDATE USING (true);
CREATE POLICY "Admin can delete leads" ON public.leads FOR DELETE USING (true);
