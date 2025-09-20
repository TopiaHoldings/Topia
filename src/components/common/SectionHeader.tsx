type Props = { eyebrow?: string; title: string; subtitle?: string; align?: "left" | "center" };
export default function SectionHeader({ eyebrow, title, subtitle, align = "center" }: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <header className={`max-w-3xl ${alignCls} space-y-3`}>
      {eyebrow && <p className="text-sm uppercase tracking-widest text-slate-500">{eyebrow}</p>}
      <h2 className="text-3xl md:text-4xl font-semibold">{title}</h2>
      {subtitle && <p className="text-slate-600">{subtitle}</p>}
    </header>
  );
}