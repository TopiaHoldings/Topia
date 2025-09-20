import { useEffect, useState } from "react";
import Container from "../common/Container";
import { site } from "../../content/site";

const logoSrc = "/images/logo_wo.PNG";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mobileNav = [{ label: "Home", href: "/" }, ...site.nav];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled ? "bg-white/80 backdrop-blur" : "bg-white/80 backdrop-blur",
        ].join(" ")}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between">
            {/* <a href="/" className="font-semibold">{site.name}</a> */}
            <a href="/" className="flex items-center gap-2 font-semibold">
              <img
                src={logoSrc}
                alt=""
                aria-hidden="true"
                className={[
                  "h-5 w-5 object-contain transition-all duration-300 ease-out",
                  scrolled ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-90 -translate-x-1",
                ].join(" ")}
              />
              <span className={scrolled ? "text-slate-900" : "text-slate-900"} >{site.name}</span>
            </a>

            <ul className="hidden md:flex items-center gap-6">
              {site.nav.map((i) => (
                <li key={i.href}>
                  <a
                    href={i.href}
                    className={[
                      scrolled ? "text-slate-900" : "text-slate-900",
                      "relative font-semibold transition-colors duration-300 hover:text-yellow-50",
                      "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-yellow-50 after:transition-all after:duration-300 hover:after:w-full"
                    ].join(" ")}
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full backdrop-blur text-slate-700"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Toggle menu</span>
              <div className="relative h-4 w-5">
                <span
                  className={[
                    "absolute left-0 top-0 h-0.5 w-5 bg-current transition",
                    open ? "translate-y-1.5 rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-1.75 h-0.5 w-5 bg-current transition",
                    open ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                  style={{ top: "7px" }}
                />
                <span
                  className={[
                    "absolute left-0 bottom-0 h-0.5 w-5 bg-current transition",
                    open ? "-translate-y-1.5 -rotate-45" : "",
                  ].join(" ")}
                />
              </div>
            </button>
          </nav>
        </Container>
      </header>

      {scrolled && <div aria-hidden className="h-16" />}

      {/* phone  */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setOpen(false)}
      />

      <div
        id="mobile-menu"
        className={[
          "fixed inset-x-0 bottom-0 z-50 md:hidden",
          "transition-transform duration-300 will-change-transform",
          open ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <div className="rounded-t-2xl bg-white/95 backdrop-blur shadow-2xl ring-1 ring-black/5 p-6">
          <nav className="space-y-4">
            {mobileNav.map((i) => (
              <a
                key={i.href}
                href={i.href}
                className="block text-lg text-slate-800 hover:text-yellow-50"
                onClick={() => setOpen(false)}
              >
                {i.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}