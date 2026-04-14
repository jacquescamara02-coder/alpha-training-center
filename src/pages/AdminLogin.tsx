import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Lock, UserPlus, ArrowLeft, Loader2, KeyRound } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Erreur", description: "Email ou mot de passe incorrect.", variant: "destructive" });
      setLoading(false);
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      toast({ title: "Accès refusé", description: "Vous n'avez pas les droits administrateur.", variant: "destructive" });
      setLoading(false);
      return;
    }

    navigate("/admin");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword.length < 6) {
      toast({ title: "Erreur", description: "Le mot de passe doit contenir au moins 6 caractères.", variant: "destructive" });
      return;
    }
    if (signupPassword !== signupConfirm) {
      toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas.", variant: "destructive" });
      return;
    }
    setSignupLoading(true);

    const { error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
    });

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      setSignupLoading(false);
      return;
    }

    toast({
      title: "Compte créé !",
      description: "Vérifiez votre email pour confirmer votre inscription. Un administrateur devra ensuite vous accorder l'accès.",
    });
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirm("");
    setSignupLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-7 w-7 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Administration ATC</h1>
          <p className="text-sm text-muted-foreground">Accédez au tableau de bord</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="gap-1.5">
              <KeyRound className="h-4 w-4" /> Connexion
            </TabsTrigger>
            <TabsTrigger value="signup" className="gap-1.5">
              <UserPlus className="h-4 w-4" /> Inscription
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@atc.com" />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <KeyRound className="h-4 w-4 mr-2" />}
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} required placeholder="votre@email.com" />
              </div>
              <div>
                <Label htmlFor="signup-password">Mot de passe</Label>
                <Input id="signup-password" type="password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required placeholder="Min. 6 caractères" />
              </div>
              <div>
                <Label htmlFor="signup-confirm">Confirmer le mot de passe</Label>
                <Input id="signup-confirm" type="password" value={signupConfirm} onChange={e => setSignupConfirm(e.target.value)} required placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full" disabled={signupLoading}>
                {signupLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
                {signupLoading ? "Création..." : "Créer un compte"}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Après inscription, un administrateur devra valider votre accès au tableau de bord.
              </p>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-muted-foreground">
            <ArrowLeft className="h-4 w-4 mr-1" /> Retour au site
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;