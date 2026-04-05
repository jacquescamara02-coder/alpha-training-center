import { Star } from "lucide-react";

const testimonials = [
  { name: "Jean-Paul M.", role: "Élève Auto-École", text: "Excellente formation, moniteurs patients et véhicules en bon état. J'ai obtenu mon permis du premier coup !", rating: 5 },
  { name: "Marie K.", role: "Cliente Construction", text: "Travaux de qualité, respect des délais. Alpha Training Center est notre partenaire de confiance pour tous nos projets.", rating: 5 },
  { name: "Patrick L.", role: "Entrepreneur", text: "Service de sous-traitance impeccable. Équipes compétentes et professionnelles. Je recommande vivement.", rating: 5 },
  { name: "Sophie N.", role: "Particulier", text: "La livraison de matériaux est toujours ponctuelle et les prix sont compétitifs. Très satisfaite !", rating: 4 },
  { name: "David M.", role: "Client Sécurité", text: "Personnel de sécurité bien formé et fiable. Un service de grande qualité à Lubumbashi.", rating: 5 },
  { name: "Grace T.", role: "Élève Couture", text: "Formation en coupe et couture très complète. Les formateurs sont passionnés et à l'écoute.", rating: 5 },
];

const TestimonialsSection = () => {
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
        </div>
      </div>
      <div className="relative">
        <div className="flex animate-marquee gap-6">
          {[...testimonials, ...testimonials].map((t, i) => (
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
    </section>
  );
};

export default TestimonialsSection;
