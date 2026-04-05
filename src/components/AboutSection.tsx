import { useEffect, useRef, useState, useCallback } from "react";
import { Target, Users, Award, TrendingUp } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const stats = [
  { icon: Users, end: 5000, suffix: "+", label: "Élèves formés" },
  { icon: Award, end: 20, suffix: "+", label: "Services offerts" },
  { icon: TrendingUp, end: 10, suffix: "+", label: "Années d'expérience" },
  { icon: Target, end: 4, suffix: "", label: "Sites à travers la RDC" },
];

const useCountUp = (end: number, duration = 2000, start = false) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, end, duration]);
  return value;
};

const StatCard = ({ stat, index, counting }: { stat: typeof stats[0]; index: number; counting: boolean }) => {
  const value = useCountUp(stat.end, stat.end > 100 ? 2500 : 1500, counting);
  return (
    <div
      className="reveal opacity-0 translate-y-8 transition-all duration-700 group rounded-xl border border-border bg-background p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
      style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
    >
      <stat.icon className="mb-2 h-5 w-5 text-primary" />
      <p className="font-heading text-2xl font-black text-foreground">
        {value}{stat.suffix}
      </p>
      <p className="text-xs text-muted-foreground">{stat.label}</p>
    </div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in-view");
            setCounting(true);
          }
        });
      },
      { threshold: 0.15 }
    );
    const items = sectionRef.current?.querySelectorAll(".reveal");
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="apropos" ref={sectionRef} className="relative overflow-hidden border-y border-border bg-card py-24">
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image side */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-primary/10 blur-2xl" />
              <img
                src={logo}
                alt="Alpha Training Center"
                className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl mx-auto"
                loading="lazy"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 z-20 rounded-xl border border-primary/30 bg-card p-4 shadow-xl glow-green sm:right-4">
                <p className="text-2xl font-black text-primary font-heading">10+</p>
                <p className="text-xs text-muted-foreground">ans d'excellence</p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <div className="reveal opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: "0.1s" }}>
              <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                À Propos de Nous
              </span>
              <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                Un centre de formation <span className="text-gradient">multi-services</span>
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Alpha Training Center (ATC)</strong> est un centre de formation professionnelle et une entreprise multi-services basée à Lubumbashi et Kolwezi, en République Démocratique du Congo.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Depuis notre création, nous nous engageons à fournir des formations de qualité et des services professionnels dans plus de 20 domaines. Notre mission est de contribuer au développement des compétences locales et d'accompagner les entreprises et particuliers dans leurs projets.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="reveal opacity-0 translate-y-8 transition-all duration-700 group rounded-xl border border-border bg-background p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                  style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
                >
                  <stat.icon className="mb-2 h-5 w-5 text-primary" />
                  <p className="font-heading text-2xl font-black text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
