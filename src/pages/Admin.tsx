import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { LogOut, Trash2, Check, X, Users, MessageSquare, RefreshCw, Image, Settings, FileText, ShieldCheck } from "lucide-react";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminAddRegistration from "@/components/admin/AdminAddRegistration";
import AdminServices from "@/components/admin/AdminServices";
import AdminContent from "@/components/admin/AdminContent";
import AdminUsers from "@/components/admin/AdminUsers";

interface Registration {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  city: string;
  message: string | null;
  created_at: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  approved: boolean;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [siteContent, setSiteContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { checkAdmin(); }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin-login"); return; }
    const { data: roleData } = await supabase
      .from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    if (!roleData) { navigate("/admin-login"); return; }
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    const [regRes, testRes, galRes, svcRes, contentRes] = await Promise.all([
      supabase.from("registrations").select("*").order("created_at", { ascending: false }),
      supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
      supabase.from("gallery_images").select("*").order("display_order", { ascending: true }),
      supabase.from("services").select("*").order("display_order", { ascending: true }),
      supabase.from("site_content").select("*").order("content_key"),
    ]);
    setRegistrations(regRes.data || []);
    setTestimonials(testRes.data || []);
    setGalleryImages(galRes.data || []);
    setServices(svcRes.data || []);
    setSiteContent(contentRes.data || []);
    setLoading(false);
  };

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/admin-login"); };

  const deleteRegistration = async (id: string) => {
    const { error } = await supabase.from("registrations").delete().eq("id", id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    setRegistrations(prev => prev.filter(r => r.id !== id));
    toast({ title: "Supprimé" });
  };

  const toggleApproval = async (id: string, approved: boolean) => {
    const { error } = await supabase.from("testimonials").update({ approved: !approved }).eq("id", id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, approved: !approved } : t));
    toast({ title: approved ? "Désapprouvé" : "Approuvé" });
  };

  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    setTestimonials(prev => prev.filter(t => t.id !== id));
    toast({ title: "Supprimé" });
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">Tableau de Bord ATC</h1>
            <p className="text-xs text-muted-foreground">Administration complète du site</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Actualiser
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" /> Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: Users, label: "Inscriptions", value: registrations.length, color: "text-primary" },
            { icon: MessageSquare, label: "Témoignages", value: testimonials.length, color: "text-primary" },
            { icon: Image, label: "Images", value: galleryImages.length, color: "text-primary" },
            { icon: Settings, label: "Services", value: services.length, color: "text-primary" },
            { icon: FileText, label: "Contenus", value: siteContent.length, color: "text-primary" },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="registrations">
          <TabsList className="mb-4 flex-wrap h-auto gap-1">
            <TabsTrigger value="registrations">📋 Inscriptions</TabsTrigger>
            <TabsTrigger value="testimonials">💬 Témoignages</TabsTrigger>
            <TabsTrigger value="services">⚙️ Services</TabsTrigger>
            <TabsTrigger value="gallery">🖼️ Galerie</TabsTrigger>
            <TabsTrigger value="content">📝 Contenu</TabsTrigger>
            <TabsTrigger value="admins">🛡️ Administrateurs</TabsTrigger>
          </TabsList>

          <TabsContent value="registrations">
            <div className="flex justify-end mb-4">
              <AdminAddRegistration onAdded={fetchData} />
            </div>
            <div className="rounded-xl border border-border bg-card overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Ville</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.length === 0 ? (
                    <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Aucune inscription</TableCell></TableRow>
                  ) : registrations.map(r => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell>{r.phone}</TableCell>
                      <TableCell>{r.email || "—"}</TableCell>
                      <TableCell><Badge variant="secondary">{r.service}</Badge></TableCell>
                      <TableCell>{r.city}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{formatDate(r.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => deleteRegistration(r.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="testimonials">
            <div className="rounded-xl border border-border bg-card overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Témoignage</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.length === 0 ? (
                    <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Aucun témoignage</TableCell></TableRow>
                  ) : testimonials.map(t => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium">{t.name}</TableCell>
                      <TableCell>{t.role || "—"}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{t.text}</TableCell>
                      <TableCell>{"⭐".repeat(t.rating)}</TableCell>
                      <TableCell>
                        <Badge variant={t.approved ? "default" : "secondary"}>
                          {t.approved ? "Approuvé" : "En attente"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{formatDate(t.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => toggleApproval(t.id, t.approved)}>
                            {t.approved ? <X className="h-4 w-4 text-orange-500" /> : <Check className="h-4 w-4 text-green-500" />}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteTestimonial(t.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="services">
            <AdminServices services={services} onRefresh={fetchData} />
          </TabsContent>

          <TabsContent value="gallery">
            <AdminGallery images={galleryImages} onRefresh={fetchData} />
          </TabsContent>

          <TabsContent value="content">
            <AdminContent items={siteContent} onRefresh={fetchData} />
          </TabsContent>

          <TabsContent value="admins">
            <AdminUsers onRefresh={fetchData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
