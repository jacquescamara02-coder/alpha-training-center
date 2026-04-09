import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Save, Loader2, FileText } from "lucide-react";

interface ContentItem {
  id: string;
  content_key: string;
  title: string;
  subtitle: string;
  content: string;
}

interface Props {
  items: ContentItem[];
  onRefresh: () => void;
}

const contentLabels: Record<string, string> = {
  hero_slide_1: "🏠 Slide Accueil 1",
  hero_slide_2: "🏠 Slide Accueil 2",
  hero_slide_3: "🏠 Slide Accueil 3",
  about_title: "ℹ️ À Propos",
  why_choose_us: "⭐ Pourquoi Nous Choisir",
  gallery_title: "🖼️ Galerie",
  contact_title: "📞 Contact",
};

const AdminContent = ({ items, onRefresh }: Props) => {
  const [saving, setSaving] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, ContentItem>>({});

  const getItem = (item: ContentItem) => edits[item.id] || item;

  const updateField = (item: ContentItem, field: keyof ContentItem, value: string) => {
    setEdits((prev) => ({
      ...prev,
      [item.id]: { ...(prev[item.id] || item), [field]: value },
    }));
  };

  const handleSave = async (item: ContentItem) => {
    const edited = getItem(item);
    setSaving(item.id);
    try {
      const { error } = await supabase.from("site_content").update({
        title: edited.title,
        subtitle: edited.subtitle,
        content: edited.content,
      }).eq("id", item.id);
      if (error) throw error;
      toast({ title: "Contenu sauvegardé" });
      setEdits((prev) => { const n = { ...prev }; delete n[item.id]; return n; });
      onRefresh();
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally {
      setSaving(null);
    }
  };

  const hasChanges = (item: ContentItem) => !!edits[item.id];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Gestion du Contenu du Site</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Modifiez les textes affichés sur le site. Cliquez sur "Sauvegarder" après chaque modification.
      </p>

      <div className="space-y-6">
        {items.map((item) => {
          const edited = getItem(item);
          return (
            <div key={item.id} className="rounded-xl border border-border bg-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">
                  {contentLabels[item.content_key] || item.content_key}
                </span>
                <Button
                  size="sm"
                  variant={hasChanges(item) ? "default" : "outline"}
                  disabled={!hasChanges(item) || saving === item.id}
                  onClick={() => handleSave(item)}
                >
                  {saving === item.id ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <Save className="h-4 w-4 mr-1" />
                  )}
                  Sauvegarder
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Titre</Label>
                  <Input
                    value={edited.title}
                    onChange={(e) => updateField(item, "title", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Sous-titre / Badge</Label>
                  <Input
                    value={edited.subtitle}
                    onChange={(e) => updateField(item, "subtitle", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Contenu / Description</Label>
                <Textarea
                  value={edited.content}
                  onChange={(e) => updateField(item, "content", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminContent;
