"use client";

import { Home, Search, Clock, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileBottomNav() {
  const pathname = usePathname();

  // Trigger search
  const handleSearchClick = () => {
    // Dispatch custom event for search
    window.dispatchEvent(new CustomEvent("mobile-nav-search"));
  };

  // Trigger favorites filter
  const handleFavoritesClick = () => {
    window.dispatchEvent(new CustomEvent("mobile-nav-favorites"));
  };

  // Trigger recent tools
  const handleRecentClick = () => {
    window.dispatchEvent(new CustomEvent("mobile-nav-recent"));
  };

  const navItems = [
    {
      name: "Home",
      icon: Home,
      href: "/",
      action: null,
      active: pathname === "/"},
    {
      name: "Search",
      icon: Search,
      href: null,
      action: handleSearchClick,
      active: false},
    {
      name: "Recent",
      icon: Clock,
      href: null,
      action: handleRecentClick,
      active: false},
    {
      name: "Favorites",
      icon: Star,
      href: null,
      action: handleFavoritesClick,
      active: false},
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border"
      aria-label="Mobile bottom navigation"
    >
      {/* Background gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-50 pointer-events-none" />

      <div className="relative grid grid-cols-4 h-16 max-w-screen-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.active;

          if (item.href) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                  isActive
                    ? "text-blue-400"
                    : "text-muted-foreground active:text-foreground/70 hover:text-foreground/70"
                }`}
              >
                <div
                  className={`transition-all duration-200 ${
                    isActive ? "scale-110" : "scale-100 active:scale-95"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isActive ? "stroke-[2.5]" : "stroke-[2]"
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "font-semibold" : ""
                  }`}
                >
                  {item.name}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-400 rounded-full" />
                )}
              </Link>
            );
          }

          return (
            <button
              key={item.name}
              onClick={item.action || undefined}
              className="flex flex-col items-center justify-center gap-1 text-muted-foreground active:text-foreground/70 hover:text-foreground/70 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset rounded-md"
              aria-label={item.name}
            >
              <div className="transition-all duration-200 active:scale-95">
                <Icon className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Safe area padding for notched devices */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
