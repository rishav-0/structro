"use client";
import { Container } from "@/components/ui/container";
import Image from "next/image";

// All client logos from /public/clients/
const allClientLogos = [
  { src: "/clients/indianrailway.png", alt: "Indian Railways" },
  { src: "/clients/nhai.png", alt: "NHAI" },
  { src: "/clients/cpwd.png", alt: "CPWD" },
  { src: "/clients/bro.png", alt: "BRO" },
  { src: "/clients/indianoil.png", alt: "Indian Oil" },
  { src: "/clients/lnt.png", alt: "L&T" },
  { src: "/clients/ongc.png", alt: "ONGC" },
  { src: "/clients/gail.png", alt: "GAIL" },
  { src: "/clients/powergrid.png", alt: "Power Grid Corporation" },
  { src: "/clients/kec.png", alt: "KEC International" },
  { src: "/clients/thyssenkrupp.png", alt: "ThyssenKrupp" },
  { src: "/clients/bluescope.png", alt: "Tata BlueScope Steel" },
  { src: "/clients/nrl.png", alt: "NRL" },
  { src: "/clients/oilindialimited.png", alt: "Oil India Limited" },
  { src: "/clients/bpcl.png", alt: "BPCL" },
  { src: "/clients/rdso.png", alt: "RDSO" },
  { src: "/clients/abci.png", alt: "ABCI Infrastructure" },
  { src: "/clients/aidc.png", alt: "AIDC" },
  { src: "/clients/agcl.png", alt: "Assam Gas Company" },
  { src: "/clients/pwd.png", alt: "PWD Assam" },
  { src: "/clients/bridgeandroofco.png", alt: "Bridge & Roof Co." },
  { src: "/clients/eastcentralrailway.png", alt: "East Central Railway" },
  { src: "/clients/northeastrailway.png", alt: "Northeast Frontier Railway" },
  { src: "/clients/assampolice.png", alt: "Assam Police Housing" },
  { src: "/clients/bcpl.png", alt: "BCPL" },
];

// Split into 3 rows
const row1 = allClientLogos.slice(0, 9);
const row2 = allClientLogos.slice(9, 17);
const row3 = allClientLogos.slice(17);

function LogoCard({ logo }: { logo: { src: string; alt: string } }) {
  return (
    <div className="flex-shrink-0 w-36 h-24 md:w-44 md:h-28 bg-white rounded-lg border border-gray-200/60 shadow-sm flex items-center justify-center p-4 mx-2 hover:shadow-md hover:border-primary/30 transition-all duration-300">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={120}
        height={80}
        className="object-contain w-auto h-auto max-w-full max-h-full transition-all duration-500"
      />
    </div>
  );
}

function MarqueeRow({
  logos,
  duration,
  reverse = false,
}: {
  logos: { src: string; alt: string }[];
  duration: string;
  reverse?: boolean;
}) {
  // Duplicate logos to create seamless loop
  const doubled = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="relative overflow-hidden py-2 group">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee-forward"}`}
        style={{
          animationDuration: duration,
        }}
      >
        {doubled.map((logo, i) => (
          <LogoCard key={`${logo.alt}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <div className="py-20 bg-gray-50 border-y border-gray-200/80 relative overflow-hidden">
      {/* Decorative Blueprint/Grid Background Effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />

      <Container>
        <div className="text-center mb-10 relative z-10">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Registrations & Empanelments
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight uppercase tracking-tight">
            Our Clients & Approvals
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-6" />
          <p className="text-gray-500 mt-4 text-base max-w-xl mx-auto font-medium">
            Registered and approved by India&apos;s leading government bodies and industry partners.
          </p>
        </div>
      </Container>

      {/* 3-Row Parallax Marquee */}
      <div className="relative z-10 space-y-3">
        <MarqueeRow logos={row1} duration="35s" />
        <MarqueeRow logos={row2} duration="45s" reverse />
        <MarqueeRow logos={row3} duration="30s" />
      </div>


    </div>
  );
}
