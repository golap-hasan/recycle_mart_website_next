import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageLayout from "@/tools/PageLayout";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Globe,
} from "lucide-react";

const infoColumns = [
  {
    title: "আরও জানুন",
    links: [
      { label: "ফ্রি বিজ্ঞাপন দিন", href: "/sell" },
      { label: "মেম্বারশিপ", href: "/membership" },
      { label: "ব্যবসা সমাধান", href: "/business" },
      { label: "অ্যাড গাইড", href: "/guides" },
    ],
  },
  {
    title: "হেল্প ও সাপোর্ট",
    links: [
      { label: "প্রশ্নোত্তর", href: "/help" },
      { label: "নিরাপদ থাকুন", href: "/safety" },
      { label: "যোগাযোগ", href: "/contact" },
    ],
  },
  {
    title: "আমাদের কথা",
    links: [
      { label: "কোম্পানি", href: "/about" },
      { label: "প্রেস", href: "/press" },
      { label: "শর্তাবলি", href: "/terms" },
      { label: "গোপনীয়তা", href: "/privacy" },
    ],
  },
  {
    title: "গাইড এবং ব্লগ",
    links: [
      { label: "MotorGuide BD", href: "/guides/motor" },
      { label: "PropertyGuide BD", href: "/guides/property" },
      { label: "অফিশিয়াল ব্লগ", href: "/blog" },
    ],
  },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-muted/20 text-sm">
      <PageLayout>
        <div className="grid gap-10 lg:grid-cols-5 max-w-7xl mx-auto">
          {infoColumns.map(({ title, links }) => (
            <div key={title} className="space-y-3">
              <p className="text-base font-semibold text-foreground">{title}</p>
              <ul className="space-y-2 text-muted-foreground">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="transition hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-base font-semibold text-foreground">
                আমাদের অ্যাপ
              </p>
              <p className="text-xs text-muted-foreground">
                ডাউনলোড করুন এবং দ্রুত কিনুন-বেচুন।
              </p>
            </div>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl border-border/60 px-4 py-3 text-left text-xs font-semibold"
              >
                Get it on Google Play
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl border-border/60 px-4 py-3 text-left text-xs font-semibold"
              >
                Download on the App Store
              </Button>
            </div>
            <div className="space-y-2 pt-2">
              <p className="text-base font-semibold text-foreground">
                অন্য দেশ
              </p>
              <Link
                href="https://srilanka.example.com"
                className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
              >
                <span role="img" aria-hidden className="text-lg">
                  🇱🇰
                </span>
                Sri Lanka
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 flex flex-col gap-6 border-t border-border/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} All Price BD. All rights reserved.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-semibold text-foreground"
            >
              <Globe className="h-4 w-4" /> All Price BD
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </PageLayout>
    </footer>
  );
};

export default Footer;
