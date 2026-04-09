import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Car, Building2, Wrench, TreePine, Shield, Truck, Sparkles,
  Users, Home, BookOpen, Zap, Cpu, Package, Cable, Scissors,
  ArrowLeftRight, Globe, Mountain, HeartPulse, Briefcase, Cog
} from "lucide-react";

import imgAutoEcole from "@/assets/services/auto-ecole.jpg";
import imgConstruction from "@/assets/services/construction.jpg";
import imgSoudure from "@/assets/services/soudure.jpg";
import imgMenuiserie from "@/assets/services/menuiserie.jpg";
import imgSecurite from "@/assets/services/securite.jpg";
import imgTransport from "@/assets/services/transport.jpg";
import imgEsthetique from "@/assets/services/esthetique.jpg";
import imgSousTraitance from "@/assets/services/sous-traitance.jpg";
import imgFemmesMenageres from "@/assets/services/femmes-menageres.jpg";
import imgLocation from "@/assets/services/location.jpg";
import imgEncadrement from "@/assets/services/encadrement.jpg";
import imgElectricite from "@/assets/services/electricite.jpg";
import imgElectronique from "@/assets/services/electronique.jpg";
import imgLivraison from "@/assets/services/livraison.jpg";
import imgInstallationCourant from "@/assets/services/installation-courant.jpg";
import imgCouture from "@/assets/services/couture.jpg";
import imgTransfert from "@/assets/services/transfert.jpg";
import imgImportExport from "@/assets/services/import-export.jpg";
import imgMine from "@/assets/services/mine.jpg";
import imgSoinsMedicaux from "@/assets/services/soins-medicaux.jpg";
import imgMecanique from "@/assets/services/mecanique.jpg";

const services = [
  { icon: Car, label: "Auto École", image: imgAutoEcole, slug: "auto-ecole" },
  { icon: Building2, label: "Construction", image: imgConstruction, slug: "construction" },
  { icon: Wrench, label: "Soudure & Ajustage", image: imgSoudure, slug: "soudure-ajustage" },
  { icon: Cog, label: "Mécanique", image: imgMecanique, slug: "mecanique" },
  { icon: TreePine, label: "Menuiserie", image: imgMenuiserie, slug: "menuiserie" },
  { icon: Shield, label: "Sécurité", image: imgSecurite, slug: "securite" },
  { icon: Truck, label: "Transport", image: imgTransport, slug: "transport" },
  { icon: Sparkles, label: "Esthétique", image: imgEsthetique, slug: "esthetique" },
  { icon: Briefcase, label: "Sous-traitance", image: imgSousTraitance, slug: "sous-traitance" },
  { icon: Users, label: "Déploiement Femmes Ménagères", image: imgFemmesMenageres, slug: "femmes-menageres" },
  { icon: Home, label: "Location", image: imgLocation, slug: "location" },
  { icon: BookOpen, label: "Encadrement Élèves & Adultes", image: imgEncadrement, slug: "encadrement" },
  { icon: Zap, label: "Électricité", image: imgElectricite, slug: "electricite" },
  { icon: Cpu, label: "Électronique", image: imgElectronique, slug: "electronique" },
  { icon: Package, label: "Livraison Matériaux", image: imgLivraison, slug: "livraison-materiaux" },
  { icon: Cable, label: "Installation Courant", image: imgInstallationCourant, slug: "installation-courant" },
  { icon: Scissors, label: "Coupe & Couture", image: imgCouture, slug: "couture" },
  { icon: ArrowLeftRight, label: "Transfert d'Argent & de Colis", image: imgTransfert, slug: "transfert" },
  { icon: Globe, label: "Import & Export", image: imgImportExport, slug: "import-export" },
  { icon: Mountain, label: "Mine", image: imgMine, slug: "mine" },
  { icon: HeartPulse, label: "Soins Médicaux", image: imgSoinsMedicaux, slug: "soins-medicaux" },
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
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {services.map((s, i) => (
            <Link
              to={`/service/${s.slug}`}
              key={i}
              className="reveal opacity-0 translate-y-8 transition-all duration-500 group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-2"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.label}
                  loading="lazy"
                  width={640}
                  height={512}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <div className="absolute bottom-3 left-3 inline-flex rounded-lg bg-primary/90 p-2.5 text-primary-foreground shadow-lg">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <h3 className="font-heading text-sm font-semibold text-foreground">{s.label}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
