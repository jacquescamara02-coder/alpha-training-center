import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  Car, Building2, Wrench, TreePine, Shield, Truck, Sparkles,
  Users, Home, BookOpen, Zap, Cpu, Package, Cable, Scissors,
  ArrowLeftRight, Globe, Mountain, HeartPulse, Briefcase
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

const servicesData: Record<string, { icon: any; label: string; image: string; description: string; details: string[]; duration?: string }> = {
  "auto-ecole": {
    icon: Car, label: "Auto École", image: imgAutoEcole,
    description: "Formation complète à la conduite automobile avec des instructeurs certifiés. Nous vous préparons à l'obtention de votre permis de conduire dans les meilleures conditions.",
    details: ["Cours théoriques du code de la route", "Pratique sur véhicules modernes", "Préparation à l'examen du permis", "Conduite défensive et sécurité routière", "Accompagnement personnalisé"],
    duration: "3 à 6 mois"
  },
  "construction": {
    icon: Building2, label: "Construction", image: imgConstruction,
    description: "Services de construction professionnels pour tous types de projets résidentiels et commerciaux. De la fondation à la finition, nous assurons un travail de qualité.",
    details: ["Construction de bâtiments résidentiels", "Projets commerciaux et industriels", "Rénovation et extension", "Gestion de chantier", "Supervision technique"],
  },
  "soudure-ajustage": {
    icon: Wrench, label: "Soudure & Ajustage", image: imgSoudure,
    description: "Formation et services en soudure et ajustage métallique. Nos experts vous forment aux techniques modernes de soudage et d'assemblage.",
    details: ["Soudure à l'arc", "Soudure MIG/MAG", "Ajustage et assemblage mécanique", "Lecture de plans techniques", "Contrôle qualité des soudures"],
    duration: "3 à 12 mois"
  },
  "menuiserie": {
    icon: TreePine, label: "Menuiserie", image: imgMenuiserie,
    description: "Formation et fabrication en menuiserie bois et aluminium. Création de meubles, portes, fenêtres et aménagements sur mesure.",
    details: ["Menuiserie bois traditionnelle", "Menuiserie aluminium", "Fabrication de meubles", "Aménagement intérieur", "Pose de cuisines et placards"],
    duration: "6 à 12 mois"
  },
  "securite": {
    icon: Shield, label: "Sécurité", image: imgSecurite,
    description: "Formation et déploiement d'agents de sécurité professionnels. Nous formons des agents qualifiés pour la protection des personnes et des biens.",
    details: ["Formation d'agents de sécurité", "Gardiennage et surveillance", "Sécurité événementielle", "Protection rapprochée", "Gestion des risques"],
    duration: "1 à 3 mois"
  },
  "transport": {
    icon: Truck, label: "Transport", image: imgTransport,
    description: "Services de transport de personnes et de marchandises. Flotte de véhicules variée pour répondre à tous vos besoins de déplacement et de livraison.",
    details: ["Transport de personnes", "Transport de marchandises", "Location de véhicules avec chauffeur", "Transport scolaire", "Logistique et distribution"],
  },
  "esthetique": {
    icon: Sparkles, label: "Esthétique", image: imgEsthetique,
    description: "Formation aux métiers de la beauté et de l'esthétique. Coiffure, maquillage, soins du visage et du corps.",
    details: ["Coiffure hommes et femmes", "Maquillage professionnel", "Soins du visage", "Manucure et pédicure", "Esthétique corporelle"],
    duration: "3 à 6 mois"
  },
  "sous-traitance": {
    icon: Briefcase, label: "Sous-traitance", image: imgSousTraitance,
    description: "Services de sous-traitance pour les entreprises. Nous mettons à disposition du personnel qualifié pour vos projets et opérations.",
    details: ["Mise à disposition de personnel", "Gestion de projets externalisés", "Main-d'œuvre qualifiée", "Supervision et suivi", "Solutions RH flexibles"],
  },
  "femmes-menageres": {
    icon: Users, label: "Déploiement Femmes Ménagères", image: imgFemmesMenageres,
    description: "Formation et placement de femmes ménagères professionnelles pour les foyers et entreprises.",
    details: ["Formation en entretien ménager", "Placement chez les particuliers", "Services pour entreprises", "Formation en hygiène et propreté", "Suivi et accompagnement"],
  },
  "location": {
    icon: Home, label: "Location", image: imgLocation,
    description: "Service de location de matériels, véhicules et équipements pour vos événements et projets.",
    details: ["Location de chaises et tables", "Location de véhicules", "Location de matériel de construction", "Location de bâtiments", "Équipements événementiels"],
  },
  "encadrement": {
    icon: BookOpen, label: "Encadrement Élèves & Adultes", image: imgEncadrement,
    description: "Programmes d'encadrement et de soutien scolaire pour élèves et formations continues pour adultes.",
    details: ["Soutien scolaire", "Cours de rattrapage", "Formation continue adultes", "Préparation aux examens", "Alphabétisation"],
    duration: "Variable"
  },
  "electricite": {
    icon: Zap, label: "Électricité", image: imgElectricite,
    description: "Formation et services en électricité bâtiment et industrielle. Installation, maintenance et dépannage électrique.",
    details: ["Installation électrique résidentielle", "Électricité industrielle", "Maintenance et dépannage", "Mise aux normes", "Énergie solaire"],
    duration: "6 à 12 mois"
  },
  "electronique": {
    icon: Cpu, label: "Électronique", image: imgElectronique,
    description: "Formation en électronique et réparation d'appareils. Diagnostic, maintenance et réparation de systèmes électroniques.",
    details: ["Réparation de téléphones", "Maintenance informatique", "Électronique générale", "Systèmes embarqués", "Dépannage d'appareils"],
    duration: "6 à 12 mois"
  },
  "livraison-materiaux": {
    icon: Package, label: "Livraison Matériaux", image: imgLivraison,
    description: "Service de livraison de matériaux de construction. Sable, ciment, bois et autres matériaux livrés directement sur votre chantier.",
    details: ["Livraison de sable et gravier", "Livraison de ciment et blocs", "Transport de bois et matériaux", "Livraison sur chantier", "Service rapide et fiable"],
  },
  "installation-courant": {
    icon: Cable, label: "Installation Courant", image: imgInstallationCourant,
    description: "Installation et câblage de réseaux électriques. Courant fort et courant faible pour bâtiments et industries.",
    details: ["Câblage résidentiel", "Installation industrielle", "Courant faible (réseau, télécom)", "Tableaux électriques", "Mise en service"],
  },
  "couture": {
    icon: Scissors, label: "Coupe & Couture", image: imgCouture,
    description: "Formation en coupe et couture. Apprenez la confection de vêtements, la retouche et la création de modèles.",
    details: ["Prise de mesures", "Coupe et patronage", "Confection de vêtements", "Retouche et ajustement", "Création de modèles"],
    duration: "3 à 12 mois"
  },
  "transfert": {
    icon: ArrowLeftRight, label: "Transfert d'Argent & de Colis", image: imgTransfert,
    description: "Service de transfert d'argent et d'envoi de colis fiable et rapide à travers la RDC et à l'international.",
    details: ["Transfert d'argent national", "Transfert international", "Envoi de colis", "Service rapide et sécurisé", "Points de collecte multiples"],
  },
  "import-export": {
    icon: Globe, label: "Import & Export", image: imgImportExport,
    description: "Services d'import-export pour les entreprises et particuliers. Accompagnement dans vos opérations de commerce international.",
    details: ["Import de marchandises", "Export de produits locaux", "Dédouanement", "Logistique internationale", "Conseil en commerce international"],
  },
  "mine": {
    icon: Mountain, label: "Mine", image: imgMine,
    description: "Formation et services pour le secteur minier. Préparation du personnel aux exigences de l'industrie minière en RDC.",
    details: ["Formation en sécurité minière", "Personnel qualifié pour les mines", "Opérations minières", "Gestion environnementale", "Conformité réglementaire"],
    duration: "3 à 6 mois"
  },
  "soins-medicaux": {
    icon: HeartPulse, label: "Soins Médicaux", image: imgSoinsMedicaux,
    description: "Services de soins médicaux de base et formation aux premiers secours. Santé et bien-être pour la communauté.",
    details: ["Premiers secours", "Soins infirmiers de base", "Sensibilisation santé", "Consultations médicales", "Pharmacie de base"],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Service non trouvé</h1>
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={service.image} alt={service.label} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-10">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
              <Icon className="h-7 w-7" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">{service.label}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{service.description}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Ce que nous offrons</h2>
              <ul className="space-y-3">
                {service.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span className="text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Informations</h3>
              {service.duration && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Durée de formation</p>
                  <p className="font-semibold text-foreground">{service.duration}</p>
                </div>
              )}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Localisation</p>
                <p className="font-semibold text-foreground">Lubumbashi & Kolwezi, RDC</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Contact</p>
                <p className="font-semibold text-foreground">+243 XXX XXX XXX</p>
              </div>
            </div>

            <Link
              to="/#contact"
              className="block w-full rounded-xl bg-primary px-6 py-3 text-center font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
