import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Plus, Loader2, UserPlus } from "lucide-react";

const serviceOptions = [
  "Auto École",
  "Construction",
  "Soudure & Ajustage",
  "Électricité",
  "Transport",
  "Location",
  "Livraison Matériaux",
  "Transfert d'Argent & Colis",
];

interface Props {
  onAdded: () => void;
}

const AdminAddRegistration = ({ onAdded }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    city: "Lubumbashi",
    message: "",
  });

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.service) {
      toast({ title: "Erreur", description: "Nom, téléphone et service sont requis", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("registrations").insert({
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        service: form.service,
        city: form.city,
        message: form.message || null,
      });
      if (error) throw error;
      toast({ title: "Inscription ajoutée avec succès" });
      setOpen(false);
      setForm({ name: "", phone: "", email: "", service: "", city: "Lubumbashi", message: "" });
      onAdded();
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" /> Ajouter une inscription
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Nouvelle inscription
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label>Nom complet *</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Jean Kabwe" />
          </div>
          <div>
            <Label>Téléphone *</Label>
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+243..." />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@exemple.com" />
          </div>
          <div>
            <Label>Service *</Label>
            <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
              <SelectTrigger><SelectValue placeholder="Sélectionner un service" /></SelectTrigger>
              <SelectContent>
                {serviceOptions.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Ville</Label>
            <Select value={form.city} onValueChange={(v) => setForm({ ...form, city: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Lubumbashi">Lubumbashi</SelectItem>
                <SelectItem value="Kolwezi">Kolwezi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Message</Label>
            <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Notes supplémentaires..." rows={3} />
          </div>
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
            {loading ? "Ajout en cours..." : "Ajouter l'inscription"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAddRegistration;
