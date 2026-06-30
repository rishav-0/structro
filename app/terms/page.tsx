import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck, ShieldAlert, Award, FileSpreadsheet, Map } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Structro Infra Tech",
  description:
    "Terms of Service for Structro Infra Tech (Structro Infratech). Legal terms governing structural fabrication, heavy engineering, site erection, billing milestones, and regional project conditions.",
  keywords: [
    "Structro Terms of Service",
    "Construction Contract Terms",
    "Steel Fabrication Guwahati",
    "Guwahati Legal Jurisdiction",
  ],
};

export default function TermsOfServicePage() {
  const sections = [
    {
      id: "scope-of-contract",
      title: "1. Scope of Engineering Contracts",
      icon: <FileSpreadsheet className="w-5 h-5 text-accent shrink-0 mt-1" />,
      content: (
        <div className="space-y-4">
          <p>
            All contractual works, whether under turnkey EPC mandates or individual structural steel fabrication orders, are strictly defined by our technical work orders:
          </p>
          <ul className="space-y-2 pl-4 list-disc list-outside">
            <li>
              <strong>Fabrication Specifications:</strong> Manufacturing is performed strictly based on structural drawings vetted and approved by certified structural engineers. Any post-approval drawing alterations requested by the client will incur additional design and material costs.
            </li>
            <li>
              <strong>Site Tolerances:</strong> Civil foundations prepared by the client or external civil contractors must adhere to the millimetric center-line grids specified by our engineering team. Structro is not liable for structural misalignments stemming from deficient foundation execution by third parties.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "site-readiness-logistics",
      title: "2. Site Readiness and Logistics",
      icon: <Map className="w-5 h-5 text-accent shrink-0 mt-1" />,
      content: (
        <div className="space-y-4">
          <p>
            For erection, site access, crane accessibility, and basic utility routing are the sole responsibility of the client:
          </p>
          <ul className="space-y-2 pl-4 list-disc list-outside">
            <li>
              <strong>Access Rights:</strong> The site must support heavy trailers (up to 40 feet) carrying built-up columns, rafters, and purlins. 
            </li>
            <li>
              <strong>Safe Work Area:</strong> The erection zone must be cleared of overhead electrical lines, mud, or water logging. Crane stabilization pads must be adequately prepared to assure the safety of heavy-duty lifters and erection crews.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "billing-milestones",
      title: "3. Billing, Payments & Retention",
      icon: <FileCheck className="w-5 h-5 text-accent shrink-0 mt-1" />,
      content: (
        <div className="space-y-4">
          <p>
            Payments follow structured engineering milestone invoices unless negotiated differently in writing:
          </p>
          <ul className="space-y-2 pl-4 list-disc list-outside">
            <li>
              <strong>Standard Milestones:</strong> Typically involve booking advances (for raw material procurement), factory fabrication dispatch milestones, and final structural assembly completion.
            </li>
            <li>
              <strong>Interest on Delays:</strong> Overdue payments beyond the grace period specified in the work order are subject to commercial interest.
            </li>
            <li>
              <strong>Retention Release:</strong> Retention amounts held for structural stability assessment must be released strictly according to the period stipulated in the final contract.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "force-majeure-regional",
      title: "4. Force Majeure & Regional Exclusions",
      icon: <ShieldAlert className="w-5 h-5 text-accent shrink-0 mt-1" />,
      content: (
        <div className="space-y-4">
          <p>
            Operating in Northeast India presents distinct geological and climate conditions. Under this agreement, Force Majeure events include:
          </p>
          <ul className="space-y-2 pl-4 list-disc list-outside">
            <li>
              Severe weather disturbances, heavy regional rainfall, regional floods, landslides, and road blockages along major highways (e.g., GS Road, National Highways).
            </li>
            <li>
              Material supply chain blockages, regulatory changes in mining permissions (affecting aggregates/sand), and labor migrations due to regional festivals or state events.
            </li>
            <li>
              In case of a force majeure event, Structro’s project delivery timeline is extended proportionally to the duration of the delay.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "jurisdiction-arbitration",
      title: "5. Jurisdiction & Dispute Resolution",
      icon: <Award className="w-5 h-5 text-accent shrink-0 mt-1" />,
      content: (
        <div className="space-y-4">
          <p>
            This agreement, operations, and contracts are governed by state and federal guidelines:
          </p>
          <ul className="space-y-2 pl-4 list-disc list-outside">
            <li>
              <strong>Arbitration:</strong> Any legal dispute, claim, or difference will first be referred to mutual arbitration, to be held in Guwahati, Assam, in accordance with the Indian Arbitration and Conciliation Act.
            </li>
            <li>
              <strong>Guwahati Jurisdiction:</strong> Both parties irrevocably agree that the courts in Guwahati, Assam, have exclusive jurisdiction to settle any disputes arising out of the contract.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        eyebrow="TERMS & CONDITIONS"
        title={
          <>
            Terms of
            <br />
            Service
          </>
        }
        description="Last updated: June 30, 2026. Legal terms, commercial milestone definitions, structural engineering guidelines, and liability clauses governing our projects."
      />

      <Container className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Left Navigation bar (Sticky) */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 h-fit space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">
                Terms Sections
              </h3>
              <ul className="space-y-3 text-sm text-slate-500 font-medium">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block hover:text-primary transition-colors cursor-pointer"
                    >
                      {section.title.split(".")[1].trim()}
                    </a>
                  </li>
                ))}
                <li className="pt-3 border-t border-slate-100">
                  <Link href="/privacy" className="text-primary hover:underline">
                    ← Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-primary text-white rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-md mb-2">Technical Vetting Division</h4>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                For structural drawing validations, calculations, or engineering work orders, contact our Guwahati office.
              </p>
              <a
                href="mailto:structro.infratech@gmail.com"
                className="text-xs  font-bold hover:underline"
              >
                structro.infratech@gmail.com
              </a>
            </div>
          </div>

          {/* Policy content */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">
                General Construction Conditions
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                Welcome to Structro Infra Tech (Structro Infratech). The following terms set out the rights, obligations, and commercial milestones governing our engineering, structural steel fabrication, PEB construction, and heavy infrastructure services in Northeast India. By issuing a work order, approving a quote, or contracting our services, you agree to comply with these terms.
              </p>
            </div>

            <div className="space-y-12">
              {sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="pt-8 border-t border-slate-100 first:border-t-0 first:pt-0 scroll-mt-28"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 shrink-0">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 pt-1">
                      {section.title}
                    </h3>
                  </div>
                  <div className="text-slate-600 leading-relaxed text-base pl-14">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-200 text-center">
              <p className="text-xs text-slate-400">
                This document is a formal terms framework published by Structro Infra Tech, Registered Office: Christianity Basti, GS Road, Guwahati, Assam.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
