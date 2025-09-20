import Container from "../common/Container";
import { site } from "../../content/site";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-green-600 text-gray-50">
      <Container>
        <div className="min-h-[33vh] py-12 md:py-16 flex flex-col md:flex-row md:justify-between gap-12">

          <div className="w-full md:w-1/3 flex flex-col justify-end">
            <div className="flex items-center gap-2">
              <img
                src="/images/logo_wo.PNG"
                alt="Topia Logo"
                className="h-6 w-6 object-contain"
              />
              <span className="text-lg font-medium">{site.name}</span>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col md:items-end">
            <div className="w-full mb-10 md:mb-12">
              <p className="font-papyrus text-xl md:text-3xl textgr-ay-50 font-50 leading-snug text-right">
                Sustain Life on Earth.
              </p>
            </div>

            <div className="w-full">
              <div className="grid grid-cols-3 gap-6 items-end pb-4 border-b border-white/30">
                {/* 左：1/3 */}
                <div className="col-span-1 flex items-end gap-4">
                  {/* <a href="#" className="h-6 w-6 rounded-full bg-white/40 hover:bg-gray-50 text-slate-900 flex items-center justify-center backdrop-blur-sm transition" aria-label="Facebook">
                    <FaFacebook />
                  </a>
                  <a href="#" className="h-6 w-6 rounded-full bg-white/40 hover:bg-gray-50 text-slate-900 flex items-center justify-center backdrop-blur-sm transition" aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="h-6 w-6 rounded-full bg-white/40 hover:bg-gray-50 text-slate-900 flex items-center justify-center backdrop-blur-sm transition" aria-label="Instagram">
                    <FaInstagram />
                  </a> */}
                </div>

                <ul className="col-span-2 space-y-3 text-xs self-end justify-self-end">
                  <li className="flex items-center gap-2">
                    <FaPhone className="text-gray-50" />
                    <span>{site.company.phone}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaEnvelope className="text-gray-50" />
                    <span>{site.company.email}</span>
                  </li>

                  <li className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-50" />
                    <span>{site.company.address}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 flex md:justify-end">
                <p className="text-sm text-gray-50">
                  © 2025 {site.official_name} All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}