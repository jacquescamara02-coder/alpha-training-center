import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Layers } from "lucide-react";
import heroDriving from "@/assets/hero-driving.jpg";
import heroConstruction from "@/assets/hero-construction.jpg";
import heroTraining from "@/assets/hero-training.jpg";

const slides = [
  {
    image: heroDriving,
    subtitle: "Auto École Professionnelle",
    title: "Obtenez votre permis",
    titleAccent: "en toute confiance",
    description: "Formation complète avec des moniteurs expérimentés et des véhicules modernes.",
  },
  {
    image: heroConstruction,
    subtitle: "Construction & BTP",
    title: "Bâtissons ensemble",
    titleAccent: "votre avenir",
    description: "Services de construction, livraison de matériaux et installation professionnelle.",
  },
  {
    image: heroTraining,
    subtitle: "Formation Technique",
    title: "Développez vos",
    titleAccent: "compétences",
    description: "Soudure, électricité, menuiserie, électronique — des formations qui transforment des vies.",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 700);
    },
    [animating]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [current, goTo]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  return (
    <section id="accueil" className="relative min-h-screen overflow-hidden">
      {/* Background carousel images */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            transform: i === current ? "scale(1)" : "scale(1.1)",
          }}
        >
          <img
            src={slide.image}
            alt={slide.subtitle}
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          {/* Dark overlay with green tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            {slides.map((slide, i) => (
              <div
                key={i}
                className="transition-all duration-700"
                style={{
                  display: i === current ? "block" : "none",
                }}
              >
                <div
                  className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm animate-fade-in"
                >
                  <MapPin className="h-3 w-3" /> {slide.subtitle}
                </div>
                <h1 className="font-heading text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <span className="text-foreground">{slide.title}</span>
                  <br />
                  <span className="text-gradient">{slide.titleAccent}</span>
                </h1>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  {slide.description}
                </p>
              </div>
            ))}

            <div className="mt-8 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <a
                href="#devis"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90 glow-green"
              >
                Demander un Devis <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/80 px-6 py-3 font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-muted"
              >
                <Layers className="h-4 w-4" /> Nos Services
              </a>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="mt-16 flex items-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 text-foreground backdrop-blur-sm transition-all hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative h-1.5 overflow-hidden rounded-full bg-muted transition-all"
                  style={{ width: i === current ? "48px" : "16px" }}
                >
                  {i === current && (
                    <div
                      className="absolute inset-0 rounded-full bg-primary"
                      style={{
                        animation: "progressBar 6s linear",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 text-foreground backdrop-blur-sm transition-all hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="ml-2 text-sm text-muted-foreground">
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
