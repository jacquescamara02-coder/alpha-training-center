import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/243991624845"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[hsl(145,70%,42%)] px-5 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl glow-green animate-float"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
