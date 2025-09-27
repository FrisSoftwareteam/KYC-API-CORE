-- Insert top-rated providers
INSERT INTO public.providers (name, location, rating, review_count, starting_price, image_url, specialties, category) VALUES
('Crowned Beauty', 'Chelmsford, UK', 4.9, 13, 15, '/modern-hair-salon.png', ARRAY['Hair Styling', 'Color', 'Treatments'], 'Hairstylist'),
('ITSMBEAUTY', 'Manchester, UK', 4.9, 13, 15, '/luxury-spa-treatment-room.png', ARRAY['Makeup', 'Bridal', 'Special Events'], 'Makeup'),
('KDHAIR', 'Leeds, United Kingdom', 4.9, 13, 15, '/elegant-nail-salon.png', ARRAY['Natural Hair', 'Protective Styles', 'Hair Care'], 'Hairstylist'),
('The Tail Bandit', 'Newcastle, UK', 4.9, 13, 15, '/skincare-treatment-room.png', ARRAY['Nail Art', 'Manicures', 'Pedicures'], 'Hairstylist'),
('ITSMBEAUTY', 'Manchester, UK', 4.9, 13, 15, '/makeup-artist-studio.png', ARRAY['Skincare', 'Facials', 'Anti-aging'], 'Makeup');
