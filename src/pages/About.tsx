import { ArrowLeft, Users, Target, Award, Handshake, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative bg-card border-b border-border">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Qui sommes-nous ?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Découvrez l'histoire, la mission et l'équipe derrière Alpha Training Center.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Fondateur */}
        <section className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              Le Fondateur
            </span>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              ALPHA MUNENE
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Visionnaire et entrepreneur passionné, <strong className="text-foreground">ALPHA MUNENE</strong> a fondé Alpha Training Center avec une mission claire : offrir des formations professionnelles de qualité accessibles à tous en République Démocratique du Congo.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Fort de plus de 10 ans d'expérience dans le domaine de la formation et des services, il a su bâtir une entreprise reconnue pour son excellence et son engagement envers le développement des compétences locales.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Sous sa direction, ATC est passé d'un petit centre de formation à une entreprise multi-services présente dans plusieurs villes de la RDC, formant des milliers de personnes et accompagnant de nombreuses entreprises.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-primary/10 blur-2xl" />
              <div className="relative rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">ALPHA MUNENE</h3>
                <p className="text-sm text-muted-foreground">Fondateur & Directeur Général</p>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">10+</p>
                    <p className="text-xs text-muted-foreground">Années d'expérience</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">5000+</p>
                    <p className="text-xs text-muted-foreground">Élèves formés</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nos Formateurs */}
        <section>
          <div className="text-center mb-12">
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              Notre Équipe
            </span>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Des formateurs d'excellence
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Expertise reconnue",
                desc: "Nos formateurs sont des professionnels expérimentés dans leurs domaines respectifs, avec des années de pratique sur le terrain.",
              },
              {
                icon: Award,
                title: "Pédagogie adaptée",
                desc: "Chaque formateur adapte son approche pédagogique aux besoins spécifiques des apprenants, garantissant une formation personnalisée et efficace.",
              },
              {
                icon: Target,
                title: "Résultats concrets",
                desc: "Notre équipe s'engage à fournir des compétences directement applicables, permettant à nos élèves d'intégrer rapidement le marché du travail.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="rounded-2xl border border-border bg-card p-8 sm:p-12">
          <div className="text-center mb-10">
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              Notre Mission
            </span>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Le but d'ATC
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Notre Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                Contribuer au développement socio-économique de la RDC en offrant des formations professionnelles de qualité et des services multi-sectoriels. Nous croyons que l'éducation et la formation sont les piliers du progrès.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Notre Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                Devenir le leader de la formation professionnelle et des services multi-sectoriels en RDC, en étant reconnu pour notre excellence, notre innovation et notre impact positif sur la communauté.
              </p>
            </div>
          </div>
        </section>

        {/* Partenaires */}
        <section>
          <div className="text-center mb-12">
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              Collaboration
            </span>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Nos Partenaires
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Entreprises locales", desc: "Collaboration avec les entreprises de Lubumbashi et Kolwezi pour le placement de nos diplômés." },
              { title: "Secteur minier", desc: "Partenariats avec les sociétés minières pour la formation et le déploiement de main-d'œuvre qualifiée." },
              { title: "Institutions publiques", desc: "Travail avec les organismes gouvernementaux pour la certification et la reconnaissance de nos formations." },
              { title: "ONG & Associations", desc: "Collaboration avec des organisations pour l'insertion professionnelle des jeunes et des femmes." },
            ].map((p, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 text-center hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Handshake className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
