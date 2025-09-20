// src/components/home/About.tsx
import { useEffect, useRef, useState, type JSX } from "react";
import Container from "../common/Container";
import { FaCogs, FaHandshake, FaUsers, FaLeaf } from "react-icons/fa";

type ValueCard = { id: string; title: string; icon: JSX.Element };

const VALUES: ValueCard[] = [
  {
    id: "local-partnerships",
    title: "Local Partnerships",
    icon: <FaHandshake />,
  },
  {
    id: "expertise-innovation",
    title: "Expertise & Innovation",
    icon: <FaCogs />,
  },
  {
    id: "shared-prosperity",
    title: "Shared Prosperity & Ownership",
    icon: <FaUsers />,
  },
  {
    id: "sustainability",
    title: "Sustainability & Responsibility",
    icon: <FaLeaf />,
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) { setInView(true); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.18 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <Container>
        <div className="grid items-stretch gap-10 md:gap-14 md:grid-cols-12 h-full py-8 md:py-10">
          <div
            className={[
              "md:col-span-6 order-2 md:order-1",
              "transform transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: inView ? "40ms" : "0ms" }}
          >
            <div className="relative h-full">
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                <img
                  src="/images/p/about/L1310833_large.jpeg"
                  alt="Topia facility and recycling operations"
                  className="h-full w-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div
            className={[
              "md:col-span-6 order-1 md:order-2 h-full flex flex-col",
              "transform transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
            style={{ transitionDelay: inView ? "120ms" : "0ms" }}
          >
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                About Us
              </h2>
              <div className="mt-2 h-0.5 w-14 rounded bg-yellow-50" aria-hidden="true" />
            </div>

            <p className="text-slate-600 leading-relaxed">
              <span className="block text-emerald-700 font-semibold">
                We build resilient circular networks through regional partnerships and smart recycling operations.
              </span>
              <span className="block font-semibold mt-2">
                Our mission is simple: turn difficult plastics into reliable, high-value feedstock—at scale and close to where value is created.
              </span>
            </p>

            {/* Values */}
            <ul className="mt-6 grid gap-4 sm:gap-5 sm:grid-cols-2">
              {VALUES.map((v, i) => (
                <li
                  key={v.id}
                  className={[
                    "flex flex-col items-center text-center gap-2",
                    "transform transition-all duration-700 ease-out",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                  ].join(" ")}
                  style={{ transitionDelay: inView ? `${160 + i * 90}ms` : "0ms" }}
                >
                  <span className="text-green-500" aria-hidden>
                    <i className="text-3xl md:text-4xl">{v.icon}</i>
                  </span>
                  <h4 className="font-semibold text-green-500">{v.title}</h4>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}