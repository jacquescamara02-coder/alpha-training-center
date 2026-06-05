
-- 1. user_roles: prevent privilege escalation with admin-only write policies
CREATE POLICY "Only admins can insert user_roles"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update user_roles"
  ON public.user_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete user_roles"
  ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. services: hide non-visible rows (and their contact_phone) from public
DROP POLICY IF EXISTS "Anyone can read visible services" ON public.services;
CREATE POLICY "Anyone can read visible services"
  ON public.services FOR SELECT TO anon, authenticated
  USING (visible = true);
-- Admins still need to see hidden services for management
CREATE POLICY "Admins can read all services"
  ON public.services FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 3. Restrict has_role EXECUTE to signed-in users only
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;

-- 4. Tighten public INSERT policies with basic validation (no more bare TRUE)
DROP POLICY IF EXISTS "Anyone can submit a registration" ON public.registrations;
CREATE POLICY "Anyone can submit a registration"
  ON public.registrations FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND char_length(phone) BETWEEN 1 AND 30
    AND char_length(service) BETWEEN 1 AND 100
    AND (email IS NULL OR char_length(email) <= 255)
    AND (message IS NULL OR char_length(message) <= 2000)
  );

DROP POLICY IF EXISTS "Anyone can insert testimonials" ON public.testimonials;
CREATE POLICY "Anyone can insert testimonials"
  ON public.testimonials FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND char_length(text) BETWEEN 1 AND 2000
    AND rating BETWEEN 1 AND 5
    AND approved = false
  );

-- 5. Remove broad public listing policy on gallery bucket
-- (Bucket remains public, so direct object URLs still work; only enumeration is blocked.)
DROP POLICY IF EXISTS "Gallery images are publicly accessible" ON storage.objects;
