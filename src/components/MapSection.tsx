import { MapPin, Phone, Clock } from "lucide-react";

const locations = [
  { name: "Lubumbashi - Kassapa", address: "Quartier Kassapa, Lubumbashi" },
  { name: "Lubumbashi - Bel Air", address: "Quartier Bel Air, Lubumbashi" },
  { name: "Lubumbashi - Katuba", address: "Commune de Katuba, Lubumbashi" },
  { name: "Kolwezi", address: "Ville de Kolwezi" },
];

const MapSection = () => {
  return (
    <section id="contact" className="relative py-24 overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_60%)]" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Nos Emplacements
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Où nous trouver
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {locations.map((l, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">{l.name}</h3>
                  <p className="text-xs text-muted-foreground">{l.address}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground">Téléphone</h3>
                <a href="tel:+243991624845" className="text-xs text-primary hover:underline">+243 991 624 845</a>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground">Horaires</h3>
                <p className="text-xs text-muted-foreground">Lun - Sam: 7h00 - 18h00</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title="Alpha Training Center - Lubumbashi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125193.51747471038!2d27.41609!3d-11.6647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19723e2b1e5a2b2f%3A0x43be3e5b6b4d8b1a!2sLubumbashi%2C%20Democratic%20Republic%20of%20the%20Congo!5e0!3m2!1sfr!2s!4v1710000000000!5m2!1sfr!2s"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
