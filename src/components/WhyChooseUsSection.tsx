import { Link } from "react-router-dom";
import { Shield, Award, Users, Clock, GraduationCap, ArrowRight } from "lucide-react";

const reasons = [
  {
    icon: GraduationCap,
    title: "Formateurs Qualifiés",
    desc: "Notre équipe est composée de professionnels expérimentés, certifiés et passionnés par la transmission du savoir.",
  },
  {
    icon: Shield,
    title: "Formation Certifiée",
    desc: "Nos formations sont reconnues et vous permettent d'obtenir des certifications valorisées sur le marché de l'emploi.",
  },
  {
    icon: Users,
    title: "Suivi Personnalisé",
    desc: "Chaque apprenant bénéficie d'un accompagnement individuel pour garantir sa réussite et son insertion professionnelle.",
  },
  {
    icon: Clock,
    title: "Horaires Flexibles",
    desc: "Des programmes adaptés à votre emploi du temps avec des sessions en journée et en soirée.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section id="pourquoi" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Nos Avantages
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Pourquoi Nous Choisir ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Depuis notre création, Alpha Training Center s'engage à offrir des formations de qualité supérieure 
            pour accompagner chaque apprenant vers la réussite professionnelle.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-border bg-background p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <r.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{r.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/why-choose-us"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            En savoir plus
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
