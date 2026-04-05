CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  text TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved testimonials"
ON public.testimonials FOR SELECT
TO anon, authenticated
USING (approved = true);

CREATE POLICY "Anyone can insert testimonials"
ON public.testimonials FOR INSERT
TO anon, authenticated
WITH CHECK (true);

INSERT INTO public.testimonials (name, role, text, rating, approved) VALUES
('Jean-Paul M.', 'Élève Auto-École', 'Excellente formation, moniteurs patients et véhicules en bon état. J''ai obtenu mon permis du premier coup !', 5, true),
('Marie K.', 'Cliente Construction', 'Travaux de qualité, respect des délais. Alpha Training Center est notre partenaire de confiance pour tous nos projets.', 5, true),
('Patrick L.', 'Entrepreneur', 'Service de sous-traitance impeccable. Équipes compétentes et professionnelles. Je recommande vivement.', 5, true),
('Sophie N.', 'Particulier', 'La livraison de matériaux est toujours ponctuelle et les prix sont compétitifs. Très satisfaite !', 4, true),
('David M.', 'Client Sécurité', 'Personnel de sécurité bien formé et fiable. Un service de grande qualité à Lubumbashi.', 5, true),
('Grace T.', 'Élève Couture', 'Formation en coupe et couture très complète. Les formateurs sont passionnés et à l''écoute.', 5, true);