
import { useEffect, useRef, useState } from "react";
import Container from "../common/Container";

type Service = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

const services: Service[] = [
  {
    id: "recycling",
    title: "Plastic Recycling & Processing",
    description:
      "Collecting and processing post-industrial and post-consumer plastics into high-quality recycled feedstock.",
    image: "/images/p/IMG_7382.jpeg",
  },
  {
    id: "closed-loop",
    title: "Closed-Loop & Toll Recycling Programs",
    description:
      "Helping manufacturers close the loop with circular supply chains and toll processing services.",
    image: "/images/p/IMG_4880.jpeg",
  },
  {
    id: "waste-recovery",
    title: "Waste Management & Resource Recovery",
    description:
      "Partnering on waste-to-energy and industrial waste recovery to reduce environmental impact.",
    image: "/images/p/IMG_7315.jpeg",
  },
];

// --- Small utility: in-view reveal ---
function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) { setInView(true); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

type Mode = "light" | "dark";

export default function Services({ mode = "light" }: { mode?: Mode }) {
  const isDark = mode === "dark";

  // theming
  const sectionBg = isDark ? "bg-green-600 text-gray-50" : "bg-white text-slate-900";
  const eyebrow = isDark ? "text-yellow-50" : "text-emerald-700";
  const subtext = isDark ? "text-gray-50/85" : "text-slate-600";
  const cardImgBg = isDark ? "bg-green-800/40" : "bg-gray-100";
  const cardTitle = isDark ? "text-gray-50" : "text-slate-900";
  const cardDesc = isDark ? "text-gray-50/85" : "text-slate-600";
  const ctaColor = isDark ? "text-yellow-50" : "text-emerald-700";

  // header animation
  const headerRef = useRef<HTMLElement | null>(null);
  const [inViewHeader, setInViewHeader] = useState(false);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) { setInViewHeader(true); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInViewHeader(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="services" className={`py-16 md:py-24 ${sectionBg}`}>
      <Container>
        <header
          ref={headerRef as any}
          className={[
            "max-w-3xl mx-auto text-center transform transition-all duration-700 ease-out",
            inViewHeader ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
          style={{ transitionDelay: inViewHeader ? "40ms" : "0ms" }}
        >
          <p className={`${eyebrow} text-sm uppercase tracking-[0.2em]`}>Core Services</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">What We Offer</h2>
          <p className={`mt-3 ${subtext}`}>
            Advanced recycling, closed-loop programs, and resource recovery that align business value with environmental responsibility.
          </p>
        </header>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              cardImgBg={cardImgBg}
              cardTitle={cardTitle}
              cardDesc={cardDesc}
              ctaColor={ctaColor}
              // stagger reveal by index
              delayMs={80 + i * 80}
            />
          ))}
        </div>
      </Container>

      <style>{`
        @keyframes float-soft { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-4px) } }
      `}</style>
    </section>
  );
}

function ServiceCard({
  service,
  cardImgBg,
  cardTitle,
  cardDesc,
  ctaColor,
  delayMs = 80,
}: {
  service: Service;
  cardImgBg: string;
  cardTitle: string;
  cardDesc: string;
  ctaColor: string;
  delayMs?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.14);
  const hasMotionPref = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <article
      ref={ref}
      className={[
        "group space-y-4 transform transition-all duration-700 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        "hover:-translate-y-1",
      ].join(" ")}
      style={{ transitionDelay: inView ? `${delayMs}ms` : undefined }}
    >
      {service.image && (
        <div className={`w-full rounded-2xl overflow-hidden ${cardImgBg}`}>
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.04]"
            loading="lazy"
          />
        </div>
      )}

      <div className="space-y-3">
        <h3 className={`text-lg font-semibold ${cardTitle} text-center`}>{service.title}</h3>
        <p className={`leading-relaxed ${cardDesc}`}>{service.description}</p>

      </div>
    </article>
  );
}


// // src/components/home/Services.tsx
// import { useEffect, useRef, useState } from "react";
// import Container from "../common/Container";
// import { services } from "../../content/services";

// type Mode = "light" | "dark";

// export default function Services({ mode = "light" }: { mode?: Mode }) {
//   const isDark = mode === "dark";

//   // （light/dark）
//   const sectionBg = isDark ? "bg-green-600 text-gray-50" : "bg-white text-slate-900";
//   const eyebrow = isDark ? "text-yellow-50" : "text-slate-500";
//   const subtext = isDark ? "text-gray-50/85" : "text-slate-600";
//   const cardBg = isDark ? "bg-green-700/30 border-green-500/30" : "bg-gray-50 border-slate-200";
//   const cardImgBg = isDark ? "bg-green-800/40" : "bg-gray-100";
//   const cardTitle = isDark ? "text-gray-50" : "text-slate-900";
//   const cardDesc = isDark ? "text-gray-50/85" : "text-slate-600";

//   const headerRef = useRef<HTMLElement | null>(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = headerRef.current;
//     if (!el) return;
//     const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
//     if (mq.matches) {
//       setInView(true);
//       return;
//     }
//     const io = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           io.disconnect();
//         }
//       },
//       { threshold: 0.15 }
//     );
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);

//   return (
//     <section id="services" className={`py-16 md:py-24 ${sectionBg}`}>
//       <Container>
//         {/* Header*/}
//         <header
//           ref={headerRef as any}
//           className={[
//             "max-w-3xl mx-auto text-center transform transition-all duration-700 ease-out",
//             inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
//           ].join(" ")}
//           style={{ transitionDelay: inView ? "40ms" : "0ms" }}
//         >
//           <p className={`${eyebrow} text-sm uppercase tracking-[0.2em]`}>Core Services</p>
//           <h2 className="mt-3 text-3xl md:text-4xl font-semibold">What we offer</h2>
//           <p className={`mt-3 ${subtext}`}>
//             Each card includes a title, short description, image, and a link to more details.
//           </p>
//         </header>

//         {/* Cards */}
//         <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {services.map((s) => (
//             <article
//               key={s.id}
//               className={`rounded-2xl overflow-hidden border shadow-sm ${cardBg}`}
//             >
//               <div className={`aspect-[4/3] ${cardImgBg}`}>
//                 {s.image && (
//                   <img
//                     src={s.image}
//                     alt={s.title}
//                     className="h-full w-full object-cover"
//                     loading="lazy"
//                   />
//                 )}
//               </div>
//               <div className="p-6 space-y-2">
//                 <h3 className={`font-semibold ${cardTitle}`}>{s.title}</h3>
//                 <p className={cardDesc}>{s.description}</p>
//                 {/* {s.href && (
//                   <a href={s.href} className={`inline-flex items-center gap-1 font-medium ${isDark ? "text-yellow-50" : "text-emerald-700"} hover:underline`}>
//                     Learn more →
//                   </a>
//                 )} */}
//               </div>
//             </article>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }