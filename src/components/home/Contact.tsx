// src/components/home/ContactTeaser.tsx
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";

import Container from "../common/Container";
import { site } from "../../content/site";
import ContactModal from "../common/ContactModal";

export default function Contact() {
  const [open, setOpen] = useState(false);
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto">

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Contact Us
            </h2>
            <div
              className="mx-auto mt-2 h-0.5 w-14 rounded bg-yellow-50"
              aria-hidden="true"
            />
          </div>

          <ul className="mt-6 space-y-4 text-slate-700 text-base md:text-lg">
            <li className="flex items-center justify-center gap-3">
              <FaPhone className="text-emerald-700" />
              <span>{site.company.phone}</span>
            </li>
            <li className="flex items-center justify-center gap-3">
              <FaEnvelope className="text-emerald-700" />
              <span>{site.company.email}</span>
            </li>
            <li className="flex items-center justify-center gap-3">
              <FaMapMarkerAlt className="text-emerald-700" />
              <span>{site.company.address}</span>
            </li>


          </ul>

          <div className="mt-10">
            <button
              onClick={() => setOpen(true)}
              className="inline-block px-6 py-3 rounded-md bg-emerald-700 text-gray-50 font-medium shadow hover:bg-yellow-50 transition"
            >
              Contact Us
            </button>
          </div>
          <div className="my-12">
            <FullBleedMap caption="" />
          </div>
          <ContactModal open={open} onClose={() => setOpen(false)} />
        </div>
      </Container>
    </section>
  );
}


function FullBleedMap({ caption }: { caption?: string }) {
  const src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.5613479252884!2d-79.44764922408677!3d36.1041796066245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88532a4bcd4d3295%3A0x862db973cc3dfe58!2s220%20Elmira%20St%2C%20Burlington%2C%20NC%2027217!5e0!3m2!1szh-TW!2sus!4v1757900757530!5m2!1szh-TW!2sus";

  return (
    <div
      className="
        relative h-[50vh] w-screen
        left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]
      "
    >
      <iframe
        title="Google Map"
        src={src}
        className="absolute inset-0 h-full w-full"
        loading="lazy"
        allowFullScreen
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #e2e8f0 0 1px, transparent 1px 12px), repeating-linear-gradient(90deg, #e2e8f0 0 1px, transparent 1px 12px)",
        }}
      />
      {caption && (
        <p
          className="
            pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2
            mx-auto w-fit rounded-full bg-white/70 px-3 py-1 text-xs md:text-sm
            text-slate-700 shadow-sm backdrop-blur
          "
        >
          {caption}
        </p>
      )}
    </div>
  );
}