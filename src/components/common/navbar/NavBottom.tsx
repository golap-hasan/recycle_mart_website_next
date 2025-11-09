"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, Heart, GitCompare, ShoppingBag, Logs } from "lucide-react";
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
      items: ["Air Conditioners", "Refrigerators", "Washing Machines", "Microwaves"],
    },
  ];

  return (
    <div>
      <div className="custom-width mx-auto flex items-center justify-between py-3 px-6">
        {/* Categories Dropdown (Desktop) */}
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-primary">
                  <Logs className="mr-2 w-4 h-4" />
                  All Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-80 gap-3 p-4">
                    {categories.map((category) => (
                      <li key={category.title}>
                        <div className="select-none space-y-1 rounded-md p-3 leading-none transition-colors hover:bg-accent focus:bg-accent">
                          <Link
                            href={`/categories/${toSlug(category.title)}`}
                            className="text-sm font-medium leading-none"
                          >
                            {category.title}
                          </Link>
                          <div className="mt-2 flex flex-wrap gap-2 text-xs leading-snug text-muted-foreground">
                            {category.items.map((item) => (
                              <Link
                                key={item}
                                href={`/categories/${toSlug(item)}`}
                                className="rounded-sm bg-muted px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground"
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:flex flex-1 mx-8">
          <div className="relative w-full">
            <Input type="search" placeholder="Search the store" />
            <Button size="icon" className="absolute right-0 top-0 rounded-l-none">
              <Search />
            </Button>
          </div>
        </div>

        {/* Action Icons (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/compare">
            <Button size="icon">
              <GitCompare />
            </Button>
          </Link>
          <Link href="/wishlist">
            <Button size="icon">
              <Heart />
            </Button>
          </Link>
          <Link href="/cart">
            <Button size="icon">
              <ShoppingBag />
            </Button>
          </Link>
        </div>

        {/* Mobile & Tablet View */}
        <div className="flex items-center justify-between w-full lg:hidden">
          {/* Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              {/* ... mobile nav content ... */}
            </SheetContent>
          </Sheet>

          {/* Search Bar (Tablet) */}
          <div className="hidden md:flex flex-1 mx-4">
            <div className="relative w-full">
              <Input type="search" placeholder="Search the store" />
              <Button size="icon" className="absolute right-0 top-0 rounded-l-none">
                <Search />
              </Button>
            </div>
          </div>

          {/* Search Icon (Mobile) */}
          <div className="md:hidden">
            <Button variant="outline" size="icon">
              <Search />
            </Button>
          </div>

          {/* Cart Icon */}
          <Link href="/cart">
            <Button size="icon">
              <ShoppingBag />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
