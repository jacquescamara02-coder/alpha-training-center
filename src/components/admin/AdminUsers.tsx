import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Plus, Loader2, ShieldCheck, Trash2, UserPlus } from "lucide-react";

interface AdminUser {
  id: string;
  user_id: string;
  role: string;
  email?: string;
}

interface Props {
  onRefresh: () => void;
}

const AdminUsers = ({ onRefresh }: Props) => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    fetchAdmins();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setCurrentUserId(user.id);
  };

  const fetchAdmins = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("user_roles")
      .select("*")
      .eq("role", "admin");
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    }
    setAdmins(data || []);
    setLoading(false);
  };

  const handleAddAdmin = async () => {
    if (!form.email || !form.password) {
      toast({ title: "Erreur", description: "Email et mot de passe sont requis", variant: "destructive" });
      return;
    }
    if (form.password.length < 6) {
      toast({ title: "Erreur", description: "Le mot de passe doit contenir au moins 6 caractères", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      // Use edge function to create admin user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Non authentifié");

      const response = await supabase.functions.invoke("create-admin", {
        body: { email: form.email, password: form.password },
      });

      if (response.error) throw new Error(response.error.message);
      if (response.data?.error) throw new Error(response.data.error);

      toast({ title: "Administrateur ajouté avec succès", description: `${form.email} peut maintenant se connecter` });
      setOpen(false);
      setForm({ email: "", password: "" });
      fetchAdmins();
      onRefresh();
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAdmin = async (adminRole: AdminUser) => {
    if (adminRole.user_id === currentUserId) {
      toast({ title: "Impossible", description: "Vous ne pouvez pas retirer votre propre rôle admin", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from("user_roles").delete().eq("id", adminRole.id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Rôle admin retiré" });
    fetchAdmins();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Gestion des Administrateurs</h3>
          <p className="text-sm text-muted-foreground">Ajoutez ou retirez des administrateurs du système</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" /> Nouvel administrateur
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                Ajouter un administrateur
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@exemple.com"
                />
              </div>
              <div>
                <Label>Mot de passe *</Label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Minimum 6 caractères"
                />
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 inline mr-1" />
                Le nouvel administrateur pourra se connecter avec ces identifiants et aura un accès complet au tableau de bord.
              </div>
              <Button onClick={handleAddAdmin} disabled={submitting} className="w-full">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
                {submitting ? "Création en cours..." : "Créer l'administrateur"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur ID</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : admins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">Aucun administrateur</TableCell>
              </TableRow>
            ) : admins.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-mono text-xs">
                  {a.user_id === currentUserId ? (
                    <span className="flex items-center gap-2">
                      {a.user_id.slice(0, 8)}...
                      <Badge variant="outline" className="text-xs">Vous</Badge>
                    </span>
                  ) : (
                    `${a.user_id.slice(0, 8)}...`
                  )}
                </TableCell>
                <TableCell>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    <ShieldCheck className="h-3 w-3 mr-1" /> Admin
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="default">Actif</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {a.user_id !== currentUserId && (
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteAdmin(a)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsers;
