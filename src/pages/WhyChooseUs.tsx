import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, Shield, Users, Clock, Award, Target, Handshake, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const WhyChooseUs = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card py-6">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
          <h1 className="mt-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Pourquoi Choisir Alpha Training Center ?
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Découvrez ce qui fait d'ATC le centre de formation de référence à Lubumbashi et Kolwezi.
          </p>
        </div>
      </div>

      {/* Notre Engagement */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-foreground">Notre Engagement</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Chez Alpha Training Center, nous croyons que la formation professionnelle est la clé du développement 
              économique et social. Fondé par Mr ALPHA, notre centre s'est donné pour mission de former des professionnels 
              compétents, capables de répondre aux exigences du marché du travail en République Démocratique du Congo.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Nous ne nous contentons pas de transmettre des connaissances théoriques. Notre approche est résolument 
              pratique, avec des ateliers, des mises en situation réelles et un accompagnement personnalisé qui 
              garantissent l'acquisition de compétences opérationnelles.
            </p>
          </div>
        </div>
      </section>

      {/* Nos Points Forts */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center font-heading text-2xl font-bold text-foreground">Nos Points Forts</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: GraduationCap, title: "Formateurs d'Excellence", text: "Nos formateurs sont des professionnels certifiés avec des années d'expérience sur le terrain. Ils combinent expertise technique et pédagogie pour offrir un enseignement de qualité." },
              { icon: Shield, title: "Certifications Reconnues", text: "Nos formations débouchent sur des certifications reconnues par les entreprises et les institutions, vous ouvrant les portes du marché de l'emploi." },
              { icon: Users, title: "Accompagnement Individuel", text: "Chaque apprenant est unique. Nous adaptons notre suivi pour répondre aux besoins spécifiques de chacun et maximiser les chances de réussite." },
              { icon: Clock, title: "Flexibilité des Horaires", text: "Sessions en journée et en soirée, formations accélérées ou à temps partiel — nous nous adaptons à votre emploi du temps." },
              { icon: Award, title: "Taux de Réussite Élevé", text: "Plus de 95% de nos apprenants obtiennent leur certification et trouvent un emploi dans les 6 mois suivant leur formation." },
              { icon: Target, title: "Équipements Modernes", text: "Nos centres sont équipés de matériel moderne et régulièrement mis à jour pour une formation aux standards actuels du marché." },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages de réussite */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-foreground">Ce Qui Nous Distingue</h2>
            <ul className="mt-6 space-y-4">
              {[
                "Présence dans 2 villes majeures : Lubumbashi et Kolwezi",
                "Plus de 8 filières de formation professionnelle",
                "Partenariats avec des entreprises locales pour l'insertion professionnelle",
                "Formateurs certifiés et expérimentés",
                "Matériel pédagogique moderne et renouvelé",
                "Suivi post-formation pour accompagner l'insertion professionnelle",
                "Tarifs compétitifs et facilités de paiement",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Nos Partenaires */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Handshake className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">Nos Partenaires</h2>
            <p className="mt-4 text-muted-foreground">
              ATC collabore avec des entreprises et institutions pour offrir des stages, des opportunités 
              d'emploi et des formations spécialisées à ses apprenants. Ces partenariats renforcent 
              notre engagement envers l'excellence et l'insertion professionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground">Prêt à Commencer ?</h2>
          <p className="mt-3 text-muted-foreground">Rejoignez des centaines d'apprenants qui ont transformé leur avenir avec ATC.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="/#inscription"
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              S'inscrire maintenant
            </a>
            <Link
              to="/"
              className="rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition-all hover:bg-muted"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
