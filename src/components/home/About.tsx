// src/components/home/About.tsx
import { useEffect, useRef, useState, type JSX } from "react";
import Container from "../common/Container";
import { FaCogs, FaHandshake, FaUsers, FaLeaf, FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const userPausedRef = useRef(false);

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      userPausedRef.current = false;
      vid.play().catch(() => { });
    } else {
      userPausedRef.current = true;
      vid.pause();
    }
  };

  useEffect(() => {
    const el = sectionRef.current;
    const vid = videoRef.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const animIo = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); animIo.disconnect(); }
    }, { threshold: 0.18 });
    animIo.observe(el);

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    vid?.addEventListener("play", onPlay);
    vid?.addEventListener("pause", onPause);

    if (!mq.matches && vid) {
      const vidIo = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          if (!userPausedRef.current) vid.play().catch(() => { });
        } else {
          vid.pause();
        }
      }, { threshold: 0.3 });
      vidIo.observe(vid);
      return () => {
        animIo.disconnect();
        vidIo.disconnect();
        vid.removeEventListener("play", onPlay);
        vid.removeEventListener("pause", onPause);
      };
    }

    return () => {
      animIo.disconnect();
      vid?.removeEventListener("play", onPlay);
      vid?.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden">
      {/* Section background photo */}
      <img
        src="/images/p/about/L1310833_large.jpeg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Semi-transparent scrim over the whole section */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-xs" aria-hidden="true" />
      <Container>
        <div className="grid items-center gap-10 md:gap-14 md:grid-cols-12 h-full py-8 md:py-10">
          {/* Left: vertical video (was the photo) */}
          <div
            className={[
              "md:col-span-5 order-2 md:order-1",
              "transform transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: inView ? "40ms" : "0ms" }}
          >
            <div className="relative">
              <div className="mx-auto mb-3 flex w-full max-w-sm items-center gap-3">
                <span
                  className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald-600/40"
                  aria-hidden="true"
                />
                <h3 className="flex items-center gap-2 text-sm md:text-base font-semibold text-slate-800">
                  <FaPlay className="text-[10px] text-emerald-600" aria-hidden="true" />
                  Redefining Waste as Opportunity
                </h3>
                <span
                  className="h-px flex-1 bg-gradient-to-r from-emerald-600/40 to-transparent"
                  aria-hidden="true"
                />
              </div>
              <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-slate-900 shadow-sm aspect-[9/16]">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  src="/images/videos/clip1.mp4"
                  poster="/images/p/video-cover.png"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Topia facility and recycling operations"
                />
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {isPlaying ? <FaPause className="text-sm" /> : <FaPlay className="ml-0.5 text-sm" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {isMuted ? <FaVolumeMute className="text-sm" /> : <FaVolumeUp className="text-sm" />}
                </button>
              </div>
              <p className="mt-2 text-center text-xs text-slate-400">
                {/* with Beyond the Bulldog ·{" "} */}
                <a
                  href="https://youtu.be/uAIJNFlWgiU?si=Zc5vPiDZKnSdzC20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-slate-600 transition-colors"
                >
                  click to watch full version
                </a>
              </p>
            </div>
          </div>

          {/* Right: text block with the building photo as a light translucent background */}
          <div
            className={[
              "md:col-span-7 order-1 md:order-2",
              "transform transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
            style={{ transitionDelay: inView ? "120ms" : "0ms" }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-sm bg-white/70 backdrop-blur-sm">
              <div className="flex flex-col justify-center p-6 md:p-10">
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
                  <span className="block font-semibold mt-2 text-slate-800">
                    Our mission is simple: turn difficult plastics into reliable, high-value feedstock—at scale and close to where value is created.
                  </span>
                </p>

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
                      <span className="text-green-600" aria-hidden>
                        <i className="text-3xl md:text-4xl">{v.icon}</i>
                      </span>
                      <h4 className="font-semibold text-green-700">{v.title}</h4>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
