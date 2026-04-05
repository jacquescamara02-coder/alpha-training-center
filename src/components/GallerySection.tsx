import { useState, useRef, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import construction1 from "@/assets/gallery/construction-1.jpg";
import construction2 from "@/assets/gallery/construction-2.jpg";
import construction3 from "@/assets/gallery/construction-3.jpg";
import formation1 from "@/assets/gallery/formation-1.jpg";
import formation2 from "@/assets/gallery/formation-2.jpg";
import formation3 from "@/assets/gallery/formation-3.jpg";
import installation1 from "@/assets/gallery/installation-1.jpg";
import installation2 from "@/assets/gallery/installation-2.jpg";
import divers1 from "@/assets/gallery/divers-1.jpg";
import divers2 from "@/assets/gallery/divers-2.jpg";

type Category = "Tout" | "Construction" | "Formation" | "Installation" | "Divers";

interface GalleryItem {
  src: string;
  title: string;
  category: Exclude<Category, "Tout">;
}

const items: GalleryItem[] = [
  { src: construction1, title: "Construction d'immeuble", category: "Construction" },
  { src: construction2, title: "Maison moderne achevée", category: "Construction" },
  { src: construction3, title: "Construction routière", category: "Construction" },
  { src: formation1, title: "Formation auto-école", category: "Formation" },
  { src: formation2, title: "Atelier soudure", category: "Formation" },
  { src: formation3, title: "Formation coupe & couture", category: "Formation" },
  { src: installation1, title: "Installation électrique", category: "Installation" },
  { src: installation2, title: "Tableau électrique", category: "Installation" },
  { src: divers1, title: "Livraison de matériaux", category: "Divers" },
  { src: divers2, title: "Dépôt de briques & sable", category: "Divers" },
];

const categories: Category[] = ["Tout", "Construction", "Formation", "Installation", "Divers"];

const GallerySection = () => {
  const [active, setActive] = useState<Category>("Tout");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered = active === "Tout" ? items : items.filter((i) => i.category === active);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("animate-in-view")),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (lightbox === null) return;
      setLightbox((lightbox + dir + filtered.length) % filtered.length);
    },
    [lightbox, filtered.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate(1);
      else if (e.key === "ArrowLeft") navigate(-1);
      else if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, navigate]);

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 reveal opacity-0 translate-y-8 transition-all duration-700">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Nos Réalisations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez quelques-uns de nos projets réalisés à Lubumbashi et Kolwezi
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 reveal opacity-0 translate-y-8 transition-all duration-700">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-background text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <div
              key={item.src + active}
              className="reveal opacity-0 translate-y-8 transition-all duration-500 group relative rounded-xl overflow-hidden cursor-pointer aspect-[4/3]"
              style={{ transitionDelay: `${i * 0.06}s` }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <ZoomIn className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-white/90" />
                <span className="text-xs font-semibold text-primary-foreground bg-primary/80 rounded-full px-3 py-1 w-fit mb-1">
                  {item.category}
                </span>
                <span className="text-white font-semibold text-sm">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={lightbox !== null} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 border-none bg-black/95 overflow-hidden">
          {lightbox !== null && (
            <div className="relative flex items-center justify-center min-h-[60vh]">
              <img
                src={filtered[lightbox].src}
                alt={filtered[lightbox].title}
                className="max-h-[80vh] w-auto mx-auto object-contain"
              />

              {/* Navigation */}
              <button
                onClick={() => navigate(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 text-white transition"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigate(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 text-white transition"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/80 text-primary-foreground text-xs font-semibold mb-2">
                  {filtered[lightbox].category}
                </span>
                <p className="text-white font-semibold text-lg">{filtered[lightbox].title}</p>
                <p className="text-white/60 text-sm mt-1">
                  {lightbox + 1} / {filtered.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;
