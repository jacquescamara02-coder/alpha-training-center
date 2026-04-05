import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const serviceOptions = [
  "Auto École", "Construction", "Soudure & Ajustage", "Menuiserie", "Sécurité",
  "Transport", "Esthétique", "Sous-traitance", "Location", "Électricité",
  "Électronique", "Livraison Matériaux", "Installation Courant", "Coupe & Couture",
  "Import & Export", "Mine", "Soins Médicaux", "Autre",
];

const QuoteForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", city: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Bonjour Alpha Training Center,%0A%0ANom: ${form.name}%0ATéléphone: ${form.phone}%0AEmail: ${form.email}%0AService: ${form.service}%0AVille: ${form.city}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/243991624845?text=${text}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";

  return (
    <section id="devis" className="relative border-t border-border py-24 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(160 10% 6%) 0%, hsl(145 40% 10%) 50%, hsl(160 10% 6%) 100%)" }}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(145 70% 42% / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(200 80% 55% / 0.2) 0%, transparent 50%)" }} />
      <div className="container mx-auto max-w-2xl px-4">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Devis Gratuit
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Demandez votre devis
          </h2>
          <p className="mt-4 text-muted-foreground">
            Remplissez le formulaire ci-dessous et recevez un devis personnalisé rapidement.
          </p>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-primary/30 bg-primary/10 p-12 text-center">
            <CheckCircle className="h-12 w-12 text-primary" />
            <p className="font-heading text-lg font-semibold text-foreground">Demande envoyée avec succès !</p>
            <p className="text-sm text-muted-foreground">Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-background p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Nom complet *" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input required placeholder="Téléphone *" className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <input placeholder="Email (optionnel)" type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <select required className={inputClass} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
              <option value="">Sélectionnez un service *</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select required className={inputClass} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
              <option value="">Sélectionnez une ville *</option>
              <option value="Lubumbashi - Kassapa">Lubumbashi - Kassapa</option>
              <option value="Lubumbashi - Bel Air">Lubumbashi - Bel Air</option>
              <option value="Lubumbashi - Katuba">Lubumbashi - Katuba</option>
              <option value="Kolwezi">Kolwezi</option>
            </select>
            <textarea required rows={4} placeholder="Décrivez votre besoin *" className={inputClass} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90 glow-green"
            >
              <Send className="h-4 w-4" /> Envoyer la demande via WhatsApp
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default QuoteForm;
