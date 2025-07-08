
-- Create table for storing 3rd-party scripts
CREATE TABLE public.scripts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  script_content TEXT NOT NULL,
  position TEXT NOT NULL CHECK (position IN ('head', 'body')),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for custom pages
CREATE TABLE public.custom_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  show_in_footer BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to scripts table
ALTER TABLE public.scripts ENABLE ROW LEVEL SECURITY;

-- Create policies for scripts table
CREATE POLICY "Admin can modify scripts" 
  ON public.scripts 
  FOR ALL 
  USING (true);

CREATE POLICY "Anyone can view active scripts" 
  ON public.scripts 
  FOR SELECT 
  USING (active = true);

-- Add Row Level Security (RLS) to custom_pages table
ALTER TABLE public.custom_pages ENABLE ROW LEVEL SECURITY;

-- Create policies for custom_pages table
CREATE POLICY "Admin can modify custom pages" 
  ON public.custom_pages 
  FOR ALL 
  USING (true);

CREATE POLICY "Anyone can view active custom pages" 
  ON public.custom_pages 
  FOR SELECT 
  USING (active = true);
