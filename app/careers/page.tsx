import type { Metadata } from 'next';
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { getPublicCollectionData } from "@/lib/public-db-server";
import { Award, Shield, GraduationCap, Users } from "lucide-react";
import { CareersClient } from "./careers-client";

export const metadata: Metadata = {
  title: 'Careers | Structro Infratech - Join Our Team of Engineers',
  description: 'Build your career with Structro Infratech. We are hiring skilled engineers, project managers, and technicians for bridge and steel structure projects across Northeast India.',
  keywords: ['Jobs', 'Careers', 'Hiring', 'Engineer Jobs', 'Construction Jobs', 'Steel Structure Jobs', 'Guwahati'],
}

interface Career {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  jobType: "full-time" | "part-time" | "contract";
  applyLink: string;
  status: "open" | "closed";
  createdAt: number;
}

async function getCareers() {
  try {
    const careers = await getPublicCollectionData<Career>("careers");
    return careers.filter(c => c.status === "open");
  } catch {
    return sampleCareers;
  }
}

const sampleCareers: Career[] = [
  {
    id: "1",
    title: "Senior Structural Engineer",
    description: "We are looking for an experienced Structural Engineer to lead our bridge engineering projects. The ideal candidate will have experience in railway bridge design and steel structures.",
    requirements: "B.E/B.Tech in Civil Engineering, 5+ years experience, knowledge of bridge design codes",
    location: "Guwahati, Assam",
    jobType: "full-time",
    applyLink: "",
    status: "open",
    createdAt: Date.now()
  },
  {
    id: "2",
    title: "Project Manager",
    description: "Manage infrastructure projects from planning to execution. Coordinate with clients, contractors and team members.",
    requirements: "B.E/B.Tech in Civil Engineering, 7+ years experience in construction project management",
    location: "Guwahati, Assam",
    jobType: "full-time",
    applyLink: "",
    status: "open",
    createdAt: Date.now()
  },
  {
    id: "3",
    title: "Site Engineer",
    description: "Oversee construction activities at project sites. Ensure quality and safety standards are maintained.",
    requirements: "Diploma/B.E in Civil Engineering, 3+ years site experience",
    location: "Various sites in Northeast India",
    jobType: "full-time",
    applyLink: "",
    status: "open",
    createdAt: Date.now()
  }
];

const benefits = [
  {
    icon: <Award className="w-8 h-8 text-accent" />,
    title: "Industry Leader",
    description: "Work on landmark projects across Northeast India"
  },
  {
    icon: <Shield className="w-8 h-8 text-accent" />,
    title: "Safety First",
    description: "ISO 9001:2015 certified work environment"
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-accent" />,
    title: "Growth Opportunity",
    description: "Continuous learning and skill development"
  },
  {
    icon: <Users className="w-8 h-8 text-accent" />,
    title: "Great Team",
    description: "Collaborate with experienced professionals"
  }
];

export default async function CareersPage() {
  const jobs = await getCareers();

  return (
    <div className="">
      <PageHero
        eyebrow="Join Our Team"
        title={<>Build Your Future<br />With Structro</>}
        description="Be part of a team delivering infrastructure projects across Assam and the wider Northeast region."
      />

      {/* Benefits Bar */}
      <div className="border-y border-gray-200 bg-gray-50 py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="rounded-sm bg-white p-3 shadow-sm">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Interactive positions & application form */}
      <CareersClient jobs={jobs} />
    </div>
  );
}