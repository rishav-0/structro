import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Eye, Lock, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Structro Infra Tech",
  description:
    "Privacy Policy for Structro Infra Tech (Structro Infratech). Learn how we handle client drawings, business communications, vendor onboarding, and project metadata.",
  keywords: [
    "Structro Privacy Policy",
    "Data Protection",
    "Client Confidentiality",
    "Steel Engineering Data",
  ],
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "information-collection",
      title: "1. Information We Collect",
      icon: <Eye className="w-5 h-5 text-accent shrink-0 mt-1" />,
      content: (
        <div className="space-y-4">
          <p>
            At Structro Infra Tech, we collect information necessary to deliver high-quality steel engineering, fabrication, and EPC services. This includes:
          </p>
          <ul className="space-y-3 pl-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>
                <strong>Corporate Identity:</strong> Company names, GSTIN/Tax ID registration, business registry details, and corporate structure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>
                <strong>Contact Information:</strong> Names of representatives, business email addresses, direct phone numbers, and physical office/site addresses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>
                <strong>Project Documentation:</strong> Structural blueprints, AutoCAD/Tekla design files, site survey coordinates, geological reports, and bills of materials (BOMs).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>
                <strong>Financial Data:</strong> Bank account numbers, billing details, credit references, and transaction records for processing project milestone invoices.
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "information-usage",
      title: "2. How We Use Your Information",
      icon: <FileText className="w-5 h-5 text-accent shrink-0 mt-1" />,
      content: (
        <div className="space-y-4">
          <p>
            We process collected information in accordance with legitimate business purposes under global data protection frameworks:
          </p>
          <ul className="space-y-3 pl-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>
                <strong>Project Execution:</strong> Preparing precise technical design schemes, managing fabrication in our Guwahati hub, and directing site erection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>
                <strong>Vendor & Stakeholder Onboarding:</strong> Reviewing applications submitted through our Contractor and Vendor portal to establish commercial partnerships.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>
                <strong>Safety & Regulation Compliance:</strong> Documenting employee and contractor credentials for heavy machinery operations, crane licensing, and ISO auditing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>
                <strong>Legal Obligations:</strong> Meeting tax reporting mandates, resolving contractual disputes, and satisfying local regional regulatory filings.
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "data-security",
      title: "3. Data Security and Confidentiality",
      icon: <Lock className="w-5 h-5 text-accent shrink-0 mt-1" />,
      content: (
        <div className="space-y-4">
          <p>
            We treat proprietary engineering files and structural designs with the highest grade of security. Our security infrastructure includes:
          </p>
          <ul className="space-y-3 pl-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>
                <strong>Access Controls:</strong> Project engineering drawings and structural estimations are restricted on a need-to-know basis. Only design leads and authorized engineers have access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>
                <strong>Network Integrity:</strong> Firewalls, secure network paths, and regular malware sweeps protect our design stations and administrative systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>
                <strong>Non-Disclosure Agreements (NDAs):</strong> Every engineer, site manager, and contractor signs a binding NDA regarding customer site specifics, industrial secrets, and structural parameters.
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "information-sharing",
      title: "4. Information Sharing & Transfers",
      icon: <Shield className="w-5 h-5 text-accent shrink-0 mt-1" />,
      content: (
        <div className="space-y-4">
          <p>
            Structro Infra Tech does not sell or lease company or contact database records. Your project metadata and structural profiles are shared only under the following situations:
          </p>
          <ul className="space-y-3 pl-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>
                <strong>Government & Municipal Approvals:</strong> Submission to railway bodies, highway boards (NHAI), PWD departments, and local municipal corporations for project design clearance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>
                <strong>Consulting Partners:</strong> Share with certified third-party testing labs for ultrasonic/radiographic weld assessments, soil boring analysis, and structural audits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>
                <strong>Financial Institutions:</strong> Shared under strict banking protocols to facilitate commercial project lines of credit or contract guarantees.
              </span>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        eyebrow="LEGAL STANDARDS"
        title={
          <>
            Privacy
            <br />
            Policy
          </>
        }
        description="Last updated: June 30, 2026. Review our official guidelines on how Structro Infra Tech handles project data, client specifications, and digital assets."
      />

      <Container className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Left Navigation bar (Sticky) */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 h-fit space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">
                Policy Sections
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
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service →
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="bg-primary text-white rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-md mb-2">Legal Compliance Office</h4>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                For queries regarding intellectual design rights, NDAs, and corporate data, reach our compliance team.
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
                Corporate Data Stewardship
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                Structro Infra Tech (operating as Structro Infratech) values client trust, particularly concerning proprietary engineering drawings, intellectual design properties, and operational parameters. This Privacy Policy clarifies how we protect both digital records collected on our platform and engineering documents processed offline.
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
                This document is a formal declaration of privacy standards by Structro Infra Tech, Guwahati, Assam. Updates will be posted directly to this URL.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
