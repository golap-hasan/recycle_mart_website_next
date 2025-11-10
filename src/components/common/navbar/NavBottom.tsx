"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuIcon, Search, Heart } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function NavBottom() {
  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const categories = [
    {
      title: "Smart / Android Merchants",
      items: ["Smartphones", "Android Tablets", "Wearables"],
    },
    {
      title: "Mobile, Electronics & Gadgets",
      items: ["Laptops", "Headphones", "Smart Home"],
    },
    {
      title: "Vehicles & Accessories",
      items: ["Cars", "Motorcycles", "Parts & Accessories"],
    },
    {
      title: "Home & Living",
      items: ["Furniture", "Kitchen & Dining", "Decor"],
    },
    {
      title: "Property",
      items: ["Apartments", "Commercial Space", "Land"],
    },
    {
      title: "Others",
      items: [
        "Air Conditioners",
        "Refrigerators",
        "Washing Machines",
        "Microwaves",
      ],
    },
  ];
  return (
    <div className="border-t border-primary-foreground/10 text-primary-foreground">
      <div className="custom-width mx-auto flex items-center justify-between py-3 px-6">
        {/* Categories Dropdown (Desktop) */}
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2 rounded-full border border-primary bg-primary px-5 py-5 text-sm font-semibold text-background shadow-sm transition hover:bg-primary/90">
                  <MenuIcon className="h-4 w-4" />
                  <span>All categories</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ScrollArea className="h-[calc(100vh-500px)]">
                    <ul className="grid w-80 gap-3 p-4 text-foreground">
                      {categories.map((category) => (
                        <li
                          key={category.title}
                          className="rounded-lg border border-primary/30 bg-primary/5 p-3 transition hover:border-primary/50"
                        >
                          <Link
                            href={`/categories/${toSlug(category.title)}`}
                            className="text-sm font-semibold text-foreground"
                          >
                            {category.title}
                          </Link>
                          <div className="mt-2 flex flex-wrap gap-2 text-xs leading-snug text-muted-foreground">
                            {category.items.map((item) => (
                              <Link
                                key={item}
                                href={`/categories/${toSlug(item)}`}
                                className="rounded-sm border border-primary/20 bg-background px-2 py-1 transition hover:border-primary/40 hover:text-primary"
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden flex-1 px-8 lg:flex">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search the marketplace"
              className="h-11 rounded-full border-primary-foreground/15 bg-primary-foreground/10 pl-6 pr-14 text-sm font-medium text-foreground placeholder:text-foreground/60"
            />
            <Button
              size="icon"
              className="absolute right-1 top-1 h-9 w-9 rounded-full bg-primary text-background shadow hover:bg-primary/90"
            >
              <Search />
            </Button>
          </div>
        </div>

        {/* Action Icons (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/wishlist">
            <Button className="flex items-center gap-2 rounded-full bg-primary px-5 py-5 text-sm font-semibold text-background shadow-md transition hover:bg-primary/90">
              <Heart />
            </Button>
          </Link>
        </div>

        {/* Mobile & Tablet View */}
        <div className="flex items-center justify-between w-full lg:hidden">
          {/* Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex w/full max-w-xs flex-col gap-4 border-primary-foreground/20 bg-primary/95 p-0 text-primary-foreground"
            >
              <SheetHeader className="space-y-1 border-b border-border px-6 py-4">
                <SheetTitle className="text-base font-semibold uppercase tracking-wide text-primary-foreground/85">
                  Categories
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-full px-6 py-4">
                <nav className="space-y-5 text-sm">
                  {categories.map((category) => (
                    <div key={category.title} className="space-y-3">
                      <Link
                        href={`/categories/${toSlug(category.title)}`}
                        className="block font-semibold text-primary-foreground"
                      >
                        {category.title}
                      </Link>
                      <div className="flex flex-wrap gap-2 text-xs text-primary-foreground/70">
                        {category.items.map((item) => (
                          <Link
                            key={item}
                            href={`/categories/${toSlug(item)}`}
                            className="rounded-full border border-primary-foreground/20 px-3 py-1 transition hover:bg-primary/50"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          {/* Search Bar (Tablet) */}
          <div className="hidden md:flex flex-1 mx-4">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search the marketplace"
                className="h-10 rounded-full border-primary-foreground/15 bg-primary-foreground/10 pr-11 text-sm font-medium text-foreground placeholder:text-foreground/60"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Search />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 md:hidden"
            >
              <Search />
            </Button>
            <Link href="/wishlist">
              <Button size="icon" className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-primary shadow-md transition hover:bg-white">
                <Heart/>
                <span className="hidden sm:inline">Saved</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
