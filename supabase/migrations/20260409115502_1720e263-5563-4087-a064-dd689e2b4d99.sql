
-- Site content table for editable text blocks
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL DEFAULT '',
  subtitle TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content"
ON public.site_content FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can update site content"
ON public.site_content FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert site content"
ON public.site_content FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site content"
ON public.site_content FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  long_description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  icon_name TEXT NOT NULL DEFAULT 'Wrench',
  slug TEXT NOT NULL UNIQUE,
  contact_phone TEXT NOT NULL DEFAULT '+243991624845',
  display_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read visible services"
ON public.services FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can insert services"
ON public.services FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update services"
ON public.services FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete services"
ON public.services FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Insert initial site content
INSERT INTO public.site_content (content_key, title, subtitle, content) VALUES
('hero_slide_1', 'Votre Partenaire de Confiance', 'Excellence & Innovation', 'ATC vous accompagne dans tous vos projets de construction, formation professionnelle et services techniques à Lubumbashi et Kolwezi.'),
('hero_slide_2', 'Formation Professionnelle', 'Développez vos compétences', 'Des formations certifiantes en auto-école, soudure, électricité et bien plus encore.'),
('hero_slide_3', 'Construction & Rénovation', 'Bâtissons ensemble', 'De la fondation à la finition, nous réalisons vos projets avec expertise et professionnalisme.'),
('about_title', 'Qui sommes-nous ?', 'À Propos', 'Alpha Training Center (ATC) est une entreprise polyvalente basée à Lubumbashi, en République Démocratique du Congo. Fondée avec la vision de fournir des services de qualité, ATC s''est rapidement imposée comme un acteur incontournable dans les domaines de la construction, la formation professionnelle et les services techniques.'),
('why_choose_us', 'Pourquoi Nous Choisir ?', 'Nos Avantages', 'Découvrez ce qui fait d''ATC votre meilleur partenaire pour tous vos projets.'),
('gallery_title', 'Nos Réalisations', 'Portfolio', 'Découvrez quelques-uns de nos projets réalisés à Lubumbashi et Kolwezi'),
('contact_title', 'Contactez-Nous', 'Contact', 'N''hésitez pas à nous contacter pour toute question ou demande de devis.');

-- Insert initial services
INSERT INTO public.services (name, description, long_description, icon_name, slug, contact_phone, display_order) VALUES
('Auto École', 'Obtenez votre permis de conduire avec notre formation complète et professionnelle.', 'Formation complète au code de la route et à la conduite pratique. Nos moniteurs expérimentés vous accompagnent jusqu''à l''obtention de votre permis.', 'Car', 'auto-ecole', '+243991624845', 1),
('Construction', 'Nous réalisons tous vos projets de construction, de la fondation à la finition.', 'Construction de maisons, immeubles, routes et ouvrages. Nous utilisons des matériaux de qualité et respectons les normes en vigueur.', 'Building2', 'construction', '+243991624845', 2),
('Soudure & Ajustage', 'Services de soudure professionnelle et ajustage mécanique de précision.', 'Soudure MIG, TIG, à l''arc. Fabrication et réparation de structures métalliques, portails, grilles et mobilier.', 'Wrench', 'soudure-ajustage', '+243991624845', 3),
('Électricité', 'Installation et maintenance électrique pour tous vos besoins résidentiels et industriels.', 'Installation de tableaux électriques, câblage, mise aux normes, dépannage et maintenance préventive.', 'Zap', 'electricite', '+243991624845', 4),
('Transport', 'Service de transport fiable et sécurisé pour vos biens et matériaux.', 'Transport de matériaux de construction, déménagement et logistique. Flotte de véhicules adaptés à tous types de chargement.', 'Truck', 'transport', '+243991624845', 5),
('Location', 'Location de véhicules, matériel et espaces pour tous vos événements et projets.', 'Location de véhicules, chaises, bâtiments et espaces pour événements. Tarifs compétitifs et service de qualité.', 'Home', 'location', '+243991624845', 6),
('Livraison Matériaux', 'Livraison rapide et fiable de matériaux de construction sur vos chantiers.', 'Livraison de sable, ciment, briques, bois et autres matériaux directement sur votre chantier.', 'Package', 'livraison-materiaux', '+243991624845', 7),
('Transfert d''Argent & Colis', 'Service de transfert d''argent et d''envoi de colis rapide et sécurisé.', 'Transfert d''argent national et international. Envoi et réception de colis en toute sécurité.', 'Send', 'transfert-argent-colis', '+243991624845', 8);
