import logo from "@/assets/logo.jpeg";

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.13z"/>
  </svg>
);

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
          <div className="flex items-center gap-4">
            <a
              href="https://vt.tiktok.com/ZSH5Maxso/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-foreground/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <TikTokIcon />
              <span>TikTok</span>
            </a>
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
