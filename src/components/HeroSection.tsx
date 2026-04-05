import { ArrowRight, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const HeroSection = () => {
  return (
    <section id="accueil" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(145_70%_42%/0.08),transparent_60%)]" />
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-slide-in">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <MapPin className="h-3 w-3" /> Lubumbashi & Kolwezi, RDC
            </div>
            <h1 className="font-heading text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-foreground">Alpha Training</span>
              <br />
              <span className="text-gradient">Center</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Votre partenaire de confiance pour la formation professionnelle, les services de construction, transport, sécurité et bien plus encore à Lubumbashi et Kolwezi.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#devis"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90 glow-green"
              >
                Demander un Devis <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+243991624845"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 font-semibold text-foreground transition-all hover:bg-muted"
              >
                <Phone className="h-4 w-4" /> +243 991 624 845
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-primary/10 blur-2xl" />
              <img
                src={logo}
                alt="Alpha Training Center Logo"
                className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
