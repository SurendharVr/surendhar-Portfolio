import { waLink } from "@/lib/contact";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function WhatsAppFab() {
  return (
    <a
      className="whatsapp-fab"
      href={waLink("Hi, I'd like to get in touch.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon size={56} />
    </a>
  );
}
