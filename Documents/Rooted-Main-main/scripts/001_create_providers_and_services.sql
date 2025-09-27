-- Create providers table
CREATE TABLE IF NOT EXISTS public.providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating DECIMAL(2,1) NOT NULL DEFAULT 4.0,
  review_count INTEGER NOT NULL DEFAULT 0,
  starting_price INTEGER NOT NULL,
  image_url TEXT,
  specialties TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  booking_count INTEGER NOT NULL DEFAULT 0,
  trend_percentage INTEGER NOT NULL DEFAULT 0,
  price INTEGER NOT NULL,
  provider_name TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required for browsing)
CREATE POLICY "providers_select_all" ON public.providers FOR SELECT USING (true);
CREATE POLICY "services_select_all" ON public.services FOR SELECT USING (true);
