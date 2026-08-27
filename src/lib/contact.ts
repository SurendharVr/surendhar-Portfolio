// Single source of truth for the studio's contact details.
//
// This used to be three independent hardcoded copies -- the wa.me digits here,
// `telephone: "+919655326333"` in the layout's JSON-LD, and `tel:+919655326333`
// in Contact.tsx -- with nothing tying them together. Every CTA on the site
// funnels through waLink(), so a single wrong digit sends 100% of leads to the
// "phone number shared via link is invalid" page, which is a silent failure:
// there is no analytics or click tracking anywhere here that would notice.
// Deriving all three formats from one pair of constants means they can no
// longer drift apart, and a correction only has to be made once.
//
// This file is imported by client components, so it must stay free of
// server-only environment variables.
//
// The email had the same two-copies problem the phone number did -- once in
// the contact row's mailto and link text, once in the layout's JSON-LD -- so
// it lives here now as well. That is also why this module is no longer called
// whatsapp.ts: it holds the phone, the email and the wa.me builder, and only
// one of those is WhatsApp.
const COUNTRY_CODE = "91";
const SUBSCRIBER_NUMBER = "9655326333";

/** Digits only, no punctuation or leading "+" -- the format wa.me requires.
 *  Internal: every consumer wants PHONE_E164, PHONE_DISPLAY or waLink() instead. */
const WHATSAPP_NUMBER = `${COUNTRY_CODE}${SUBSCRIBER_NUMBER}`;

/** E.164, for `tel:` hrefs and the schema.org `telephone` field. */
export const PHONE_E164 = `+${WHATSAPP_NUMBER}`;

/** Human-readable grouping, for link text only -- never for an href. */
export const PHONE_DISPLAY = "+91 96553 26333";

/** Used for the mailto: href, the visible link text, and schema.org email. */
export const EMAIL = "venkateshsurendhar@gmail.com";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
