import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Trash2, Plus, Upload, Image, Loader2 } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

const categories = ["Construction", "Formation", "Installation", "Divers"];

interface Props {
  images: GalleryImage[];
  onRefresh: () => void;
}

const AdminGallery = ({ images, onRefresh }: Props) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Divers");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleUpload = async () => {
    if (!file || !title) {
      toast({ title: "Erreur", description: "Titre et image requis", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file, { contentType: file.type });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(fileName);

      const { error: dbError } = await supabase.from("gallery_images").insert({
        title,
        category,
        image_url: publicUrl,
        display_order: images.length,
      });

      if (dbError) throw dbError;

      toast({ title: "Image ajoutée avec succès" });
      setOpen(false);
      setTitle("");
      setCategory("Divers");
      setFile(null);
      setPreview(null);
      onRefresh();
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (img: GalleryImage) => {
    // Extract file name from URL
    const urlParts = img.image_url.split("/");
    const fileName = urlParts[urlParts.length - 1];

    const { error: storageError } = await supabase.storage.from("gallery").remove([fileName]);
    if (storageError) console.warn("Storage delete error:", storageError);

    const { error } = await supabase.from("gallery_images").delete().eq("id", img.id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Image supprimée" });
    onRefresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Gestion des Images</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" /> Ajouter une image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Ajouter une image à la galerie</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Titre *</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Construction d'immeuble" />
              </div>
              <div>
                <Label>Catégorie</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Image *</Label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div
                  onClick={() => fileRef.current?.click()}
                  className="mt-1 border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="max-h-40 mx-auto rounded-lg object-cover" />
                  ) : (
                    <div className="text-muted-foreground">
                      <Upload className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Cliquez pour sélectionner une image</p>
                    </div>
                  )}
                </div>
              </div>
              <Button onClick={handleUpload} disabled={uploading} className="w-full">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                {uploading ? "Envoi en cours..." : "Ajouter"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {images.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <Image className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Aucune image dans la galerie</p>
            <p className="text-sm mt-1">Cliquez sur "Ajouter une image" pour commencer</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {images.map((img) => (
              <div key={img.id} className="group relative rounded-lg overflow-hidden border border-border">
                <img src={img.image_url} alt={img.title} className="w-full aspect-[4/3] object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="flex justify-end">
                    <Button variant="destructive" size="icon" className="h-7 w-7" onClick={() => handleDelete(img)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div>
                    <Badge variant="secondary" className="text-xs mb-1">{img.category}</Badge>
                    <p className="text-white text-sm font-medium truncate">{img.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
