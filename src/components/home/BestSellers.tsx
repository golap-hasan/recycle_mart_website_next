import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import PageLayout from "@/tools/PageLayout";

const mockProducts = [
  {
    id: "b1",
    name: "Refrigerator 240L",
    price: "৳ 27,500",
    image:
      "https://images.pexels.com/photos/373548/pexels-photo-373548.jpeg",
    href: "/ads/home-appliances/fridge-240l",
  },
  {
    id: "b2",
    name: "Washing Machine 7kg",
    price: "৳ 21,900",
    image:
      "https://images.pexels.com/photos/3967642/pexels-photo-3967642.jpeg",
    href: "/ads/home-appliances/wm-7kg",
  },
  {
    id: "b3",
    name: "DSLR Camera Kit",
    price: "৳ 38,000",
    image:
      "https://images.pexels.com/photos/51383/camera-lens-lens-reflection-51383.jpeg",
    href: "/ads/electronics/dslr-kit",
  },
  {
    id: "b4",
    name: "AC 1 Ton Inverter",
    price: "৳ 46,500",
    image:
      "https://images.pexels.com/photos/3968081/pexels-photo-3968081.jpeg",
    href: "/ads/home-appliances/ac-1ton",
  },
] as const;

export default function BestSellers() {
  return (
    <PageLayout className="bg-linear-to-b from-background to-muted/40">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Latest Ads</h2>
            <p className="text-sm text-muted-foreground">Freshly posted across categories</p>
          </div>
          <Link
            href="/ads/latest"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mockProducts.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="group relative rounded-xl border bg-card shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute left-2 top-2 inline-flex items-center rounded-full bg-emerald-600/90 px-2.5 py-1 text-xs font-medium text-white shadow">NEW</span>
                <button
                  aria-label="save ad"
                  className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/70 backdrop-blur border shadow-sm text-foreground/70 hover:text-foreground transition"
                >
                  <Heart className="h-4 w-4" />
                </button>
                <span className="absolute left-2 bottom-2 rounded-md bg-background/80 px-2.5 py-1 text-sm font-semibold shadow">
                  {p.price}
                </span>
              </div>
              <div className="p-3">
                <div className="line-clamp-1 font-medium group-hover:text-primary transition-colors">
                  {p.name}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Chattogram • 10 minutes ago</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
