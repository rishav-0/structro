import type { Metadata } from 'next';
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getPublicCollectionData } from "@/lib/public-db-server";
import { ArrowUpRight, MapPin, Briefcase, Clock, Users, Award, Shield, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    requirements: "B.E/B.Tech in Civil Engineering, 7+ years experience in construction项目管理",
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
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[350px]">
        <div className="absolute inset-0 bg-primary">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop"
            alt="Team working on steel structure"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50" />
        <Container className="relative h-full flex flex-col justify-center">
          <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4 drop-shadow-sm">
            Join Our Team
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
            Build Your Future<br />
            <span className="drop-shadow-sm">With Structro</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg mt-6 max-w-2xl font-medium">
            Be part of a dynamic team delivering world-class infrastructure 
            projects across Assam and Northeast India.
          </p>
        </Container>
      </div>

      {/* Benefits Bar */}
      <div className="bg-gray-900 py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-sm">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Open Positions */}
      <div className="py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Current Openings
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Join Our Growing Team
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We are always looking for talented individuals. Check our open positions below 
              and apply if you are passionate about infrastructure.
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Open Positions</h3>
              <p className="text-gray-600">
                Check back later for new opportunities.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-primary/10 p-3 rounded-sm">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        {job.jobType}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                      {job.description}
                    </p>
                    
                    {job.applyLink ? (
                      <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                        <Button variant="saffron" className="w-full">
                          Apply Now
                          <ArrowUpRight className="ml-2 w-4 h-4" />
                        </Button>
                      </a>
                    ) : (
                      <Link href="/contact">
                        <Button variant="saffron" className="w-full">
                          Apply Now
                          <ArrowUpRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
          )}
        </Container>
      </div>

      {/* CTA Section */}
      <div className="bg-primary py-24">
        <Container>
          <div className="bg-gray-900 rounded-lg p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don&apos;t See the Right Role?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              We are always looking for talented people. Send us your resume and we will reach out 
              when a suitable position opens up.
            </p>
            <Link href="/contact">
              <Button variant="saffron" size="lg" className="shadow-md">
                Get in Touch
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}