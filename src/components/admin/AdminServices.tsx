import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Trash2, Plus, Upload, Loader2, Pencil, Eye, EyeOff, GripVertical } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  long_description: string;
  image_url: string;
  icon_name: string;
  slug: string;
  contact_phone: string;
  display_order: number;
  visible: boolean;
}

const iconOptions = [
  "Car", "Building2", "Wrench", "TreePine", "Shield", "Truck", "Sparkles",
  "Briefcase", "Users", "Home", "BookOpen", "Zap", "Cpu", "Package",
  "Cable", "Scissors", "ArrowLeftRight", "Globe", "Mountain", "HeartPulse", "Send",
];

interface Props {
  services: Service[];
  onRefresh: () => void;
}

const emptyForm = {
  name: "", description: "", long_description: "", image_url: "",
  icon_name: "Wrench", slug: "", contact_phone: "+243991624845",
  display_order: 0, visible: true,
};

const AdminServices = ({ services, onRefresh }: Props) => {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const openNew = () => {
    setEditId(null);
    setForm({ ...emptyForm, display_order: services.length });
    setOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditId(s.id);
    setForm({
      name: s.name, description: s.description, long_description: s.long_description,
      image_url: s.image_url, icon_name: s.icon_name, slug: s.slug,
      contact_phone: s.contact_phone, display_order: s.display_order, visible: s.visible,
    });
    setOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `services/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("gallery").upload(fileName, file, { contentType: file.type });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(fileName);
      setForm({ ...form, image_url: publicUrl });
    } catch (err: any) {
      toast({ title: "Erreur upload", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) {
      toast({ title: "Erreur", description: "Nom et slug sont requis", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      if (editId) {
        const { error } = await supabase.from("services").update({
          name: form.name, description: form.description, long_description: form.long_description,
          image_url: form.image_url, icon_name: form.icon_name, slug: form.slug,
          contact_phone: form.contact_phone, display_order: form.display_order, visible: form.visible,
        }).eq("id", editId);
        if (error) throw error;
        toast({ title: "Service modifié" });
      } else {
        const { error } = await supabase.from("services").insert({
          name: form.name, description: form.description, long_description: form.long_description,
          image_url: form.image_url, icon_name: form.icon_name, slug: form.slug,
          contact_phone: form.contact_phone, display_order: form.display_order, visible: form.visible,
        });
        if (error) throw error;
        toast({ title: "Service ajouté" });
      }
      setOpen(false);
      onRefresh();
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Service supprimé" });
    onRefresh();
  };

  const toggleVisibility = async (s: Service) => {
    const { error } = await supabase.from("services").update({ visible: !s.visible }).eq("id", s.id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    onRefresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Gestion des Services</h3>
        <Button size="sm" onClick={openNew}>
          <Plus className="h-4 w-4 mr-1" /> Ajouter un service
        </Button>
      </div>

      <div className="space-y-3">
        {services.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center text-muted-foreground">
            Aucun service configuré
          </div>
        ) : services.map((s) => (
          <div key={s.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-colors">
            <GripVertical className="h-5 w-5 text-muted-foreground/40 shrink-0" />
            {s.image_url ? (
              <img src={s.image_url} alt={s.name} className="h-14 w-14 rounded-lg object-cover shrink-0" />
            ) : (
              <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <span className="text-xs text-muted-foreground">N/A</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground truncate">{s.name}</span>
                <Badge variant={s.visible ? "default" : "secondary"} className="text-xs">
                  {s.visible ? "Visible" : "Masqué"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">{s.description || "Pas de description"}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button variant="ghost" size="icon" onClick={() => toggleVisibility(s)} title={s.visible ? "Masquer" : "Afficher"}>
                {s.visible ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => openEdit(s)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? "Modifier le service" : "Nouveau service"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nom *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Auto École" />
              </div>
              <div>
                <Label>Slug *</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-ecole" />
              </div>
            </div>
            <div>
              <Label>Description courte</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
            </div>
            <div>
              <Label>Description détaillée</Label>
              <Textarea value={form.long_description} onChange={(e) => setForm({ ...form, long_description: e.target.value })} rows={4} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Icône</Label>
                <Select value={form.icon_name} onValueChange={(v) => setForm({ ...form, icon_name: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((ic) => (
                      <SelectItem key={ic} value={ic}>{ic}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Téléphone contact</Label>
                <Input value={form.contact_phone} onChange={(e) => setForm({ ...form, contact_phone: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Image</Label>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <div
                onClick={() => fileRef.current?.click()}
                className="mt-1 border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                {uploading ? (
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                ) : form.image_url ? (
                  <img src={form.image_url} alt="Preview" className="max-h-32 mx-auto rounded-lg object-cover" />
                ) : (
                  <div className="text-muted-foreground">
                    <Upload className="h-6 w-6 mx-auto mb-1" />
                    <p className="text-sm">Cliquez pour télécharger</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.visible} onCheckedChange={(v) => setForm({ ...form, visible: v })} />
              <Label>Service visible sur le site</Label>
            </div>
            <Button onClick={handleSave} disabled={loading} className="w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {editId ? "Enregistrer les modifications" : "Ajouter le service"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
