import { useState, useEffect } from "react";
import { Star, Send, Plus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", text: "", rating: 5 });

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("id, name, role, text, rating")
        .eq("approved", true)
        .order("created_at", { ascending: false });
      if (data) setTestimonials(data);
    };
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from("testimonials").insert({
      name: form.name.trim(),
      role: form.role.trim() || "Client",
      text: form.text.trim(),
      rating: form.rating,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Erreur lors de l'envoi. Réessayez.");
      return;
    }
    toast.success("Merci ! Votre avis sera publié après validation.");
    setForm({ name: "", role: "", text: "", rating: 5 });
    setShowForm(false);
  };

  return (
    <section id="avis" className="overflow-hidden border-y border-border bg-card py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Témoignages
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Ce que disent nos clients
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showForm ? "Fermer" : "Laisser un avis"}
          </button>
        </div>

        {/* Review form */}
        {showForm && (
          <div className="mx-auto mb-12 max-w-lg animate-fade-in">
            <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-background p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Votre nom *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Votre rôle (ex: Élève)"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <textarea
                placeholder="Votre témoignage *"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                required
                rows={3}
                className="w-full rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="mr-2 text-sm text-muted-foreground">Note :</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                    >
                      <Star
                        className={`h-5 w-5 transition-colors ${
                          star <= form.rating ? "fill-primary text-primary" : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Envoi..." : "Envoyer"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Marquee */}
      {testimonials.length > 0 && (
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-6">
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="w-[350px] flex-shrink-0 rounded-xl border border-border bg-background p-6"
              >
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
