/**
 * GEO Content Layout System
 * Professional, readable, visually appealing structure for tool guide content
 * Reusable across all 100+ tools
 */

import { ReactNode } from "react";

interface GeoContentLayoutProps {
  children: ReactNode;
}

export function GeoContentLayout({ children }: GeoContentLayoutProps) {
  return (
    <div className="geo-content-wrapper mt-16 mb-20">
      {/* Visual separator before guide content */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16" />

      <div className="max-w-4xl mx-auto space-y-16">
        {children}
      </div>
    </div>
  );
}

interface GeoSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  variant?: "default" | "highlight" | "minimal";
}

export function GeoSection({
  id,
  title,
  subtitle,
  icon,
  children,
  variant = "default"
}: GeoSectionProps) {
  const variantStyles = {
    default: "bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-10",
    highlight: "bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-2xl p-8 md:p-10",
    minimal: "border-l-2 border-blue-500/30 pl-6 md:pl-8"
  };

  return (
    <section id={id} className={variantStyles[variant]}>
      {/* Section Header */}
      <div className="mb-6">
        {icon && (
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 mb-4">
            {icon}
          </div>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-muted-foreground font-light">
            {subtitle}
          </p>
        )}
      </div>

      {/* Section Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {children}
      </div>
    </section>
  );
}

interface FeatureGridProps {
  features: Array<{
    icon?: ReactNode;
    title: string;
    description: string;
  }>;
  columns?: 2 | 3 | 4;
}

export function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className={`grid gap-6 not-prose ${gridCols[columns]}`}>
      {features.map((feature, index) => (
        <div
          key={index}
          className="group relative bg-card/30 border border-border/50 rounded-xl p-6 hover:bg-card/50 hover:border-border transition-all duration-300"
        >
          {feature.icon && (
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 mb-3 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
          )}
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}

interface StatsBarProps {
  stats: Array<{
    label: string;
    value: string;
    icon?: ReactNode;
  }>;
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 not-prose">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-card/50 to-card/30 border border-border/50 rounded-xl p-5 text-center hover:border-blue-500/30 transition-colors"
        >
          {stat.icon && (
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 mb-2 mx-auto">
              {stat.icon}
            </div>
          )}
          <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            {stat.value}
          </div>
          <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

interface CalloutBoxProps {
  variant?: "info" | "warning" | "success" | "tip";
  title?: string;
  children: ReactNode;
}

export function CalloutBox({ variant = "info", title, children }: CalloutBoxProps) {
  const variants = {
    info: {
      bg: "bg-blue-500/5 border-blue-500/30",
      icon: "ℹ️",
      titleColor: "text-blue-400"
    },
    warning: {
      bg: "bg-orange-500/5 border-orange-500/30",
      icon: "⚠️",
      titleColor: "text-orange-400"
    },
    success: {
      bg: "bg-green-500/5 border-green-500/30",
      icon: "✅",
      titleColor: "text-green-400"
    },
    tip: {
      bg: "bg-purple-500/5 border-purple-500/30",
      icon: "💡",
      titleColor: "text-purple-400"
    }
  };

  const style = variants[variant];

  return (
    <div className={`${style.bg} border rounded-xl p-6 my-6 not-prose`}>
      {title && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{style.icon}</span>
          <h4 className={`font-semibold ${style.titleColor}`}>{title}</h4>
        </div>
      )}
      <div className="text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}
