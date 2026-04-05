import {
  Car, Building2, Wrench, TreePine, Shield, Truck, Sparkles,
  Users, Home, BookOpen, Zap, Cpu, Package, Cable, Scissors,
  ArrowLeftRight, Globe, Mountain, HeartPulse, Briefcase
} from "lucide-react";

const services = [
  { icon: Car, label: "Auto École" },
  { icon: Building2, label: "Construction" },
  { icon: Wrench, label: "Soudure & Ajustage" },
  { icon: TreePine, label: "Menuiserie" },
  { icon: Shield, label: "Sécurité" },
  { icon: Truck, label: "Transport" },
  { icon: Sparkles, label: "Esthétique" },
  { icon: Briefcase, label: "Sous-traitance" },
  { icon: Users, label: "Déploiement Femmes Ménagères" },
  { icon: Home, label: "Location" },
  { icon: BookOpen, label: "Encadrement Élèves & Adultes" },
  { icon: Zap, label: "Électricité" },
  { icon: Cpu, label: "Électronique" },
  { icon: Package, label: "Livraison Matériaux" },
  { icon: Cable, label: "Installation Courant" },
  { icon: Scissors, label: "Coupe & Couture" },
  { icon: ArrowLeftRight, label: "Agences de Transfert" },
  { icon: Globe, label: "Import & Export" },
  { icon: Mountain, label: "Mine" },
  { icon: HeartPulse, label: "Soins Médicaux" },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in-view");
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Nos Services
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Une gamme complète de services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            De la formation professionnelle aux services spécialisés, nous répondons à tous vos besoins.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={i}
              className="reveal opacity-0 translate-y-8 transition-all duration-500 group rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-sm font-semibold text-foreground">{s.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
