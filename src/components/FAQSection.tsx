import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Quels sont les horaires d'ouverture ?", a: "Nous sommes ouverts du lundi au samedi de 7h00 à 18h00. Pour les urgences, vous pouvez nous contacter via WhatsApp à tout moment." },
  { q: "Comment s'inscrire à l'auto-école ?", a: "Vous pouvez vous inscrire directement dans nos bureaux à Kassapa, Bel Air ou Katuba à Lubumbashi, ou à Kolwezi. Munissez-vous de votre pièce d'identité et de 2 photos passeport." },
  { q: "Proposez-vous des formations à distance ?", a: "La partie théorique de certaines formations peut se faire en ligne. Contactez-nous pour plus de détails sur les formations disponibles à distance." },
  { q: "Quels sont vos tarifs ?", a: "Nos tarifs varient selon les services. Demandez un devis gratuit via notre formulaire ou contactez-nous directement pour obtenir un prix personnalisé." },
  { q: "Intervenez-vous en dehors de Lubumbashi ?", a: "Oui, nous intervenons également à Kolwezi et pouvons étudier des projets dans d'autres villes du Haut-Katanga sur demande." },
  { q: "Quels modes de paiement acceptez-vous ?", a: "Nous acceptons les paiements en espèces, par transfert bancaire, mobile money (M-Pesa, Airtel Money) et par agences de transfert." },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-16 text-center">
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            FAQ
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Questions fréquentes
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-border bg-card px-6 data-[state=open]:border-primary/40"
            >
              <AccordionTrigger className="text-left font-heading text-sm font-semibold text-foreground hover:text-primary hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
