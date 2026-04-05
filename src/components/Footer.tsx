import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <img src={logo} alt="ATC Logo" className="h-20 w-auto rounded-lg" />
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">Alpha Training Center</h3>
            <p className="mt-1 text-sm text-muted-foreground">Auto École & Centre de Formation Professionnelle</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            <span>Lubumbashi: Kassapa • Bel Air • Katuba</span>
            <span>Kolwezi</span>
            <a href="tel:+243991624845" className="text-primary hover:underline">+243 991 624 845</a>
          </div>
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Alpha Training Center. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
