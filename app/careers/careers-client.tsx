"use client"

import { useState } from "react"
import { submitCareerApplication } from "@/app/actions/public-actions"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Briefcase, MapPin, ArrowUpRight, CheckCircle2, Send, User, Mail, Phone, FileText } from "lucide-react"

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

export function CareersClient({ jobs }: { jobs: Career[] }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "General Application",
    experience: "2-5 Years",
    resumeUrl: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      await submitCareerApplication(formData);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "General Application",
        experience: "2-5 Years",
        resumeUrl: "",
        message: ""
      });
    } catch (err: any) {
      setError(err.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Flow Case A: Active job openings exist -> Render the openings grid with Google Form redirects (Generic Form is Hidden)
  if (jobs.length > 0) {
    return (
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
              Explore our active career opportunities. Click "Apply Now" to submit your application via our official Google Form.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => {
              // Ensure we have a valid redirect link. If no applyLink exists, default to a Google Form template search or general redirect
              const googleFormLink = job.applyLink && job.applyLink.trim() !== "" 
                ? job.applyLink 
                : "https://docs.google.com/forms/";

              return (
                <div key={job.id} className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-primary/10 p-3 rounded-sm">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                        {job.jobType}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-accent" />
                        {job.location}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {job.description}
                    </p>
                    
                    {job.requirements && (
                      <div className="mb-6">
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Requirements:</h4>
                        <p className="text-gray-600 text-xs line-clamp-2">{job.requirements}</p>
                      </div>
                    )}
                  </div>
                  
                  <a 
                    href={googleFormLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full block mt-auto"
                  >
                    <Button 
                      variant="saffron" 
                      className="w-full"
                    >
                      Apply Now
                      <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    );
  }

  // Flow Case B: No active job openings exist -> Render the generic website intake form directly on the page
  return (
    <div className="bg-white py-24">
      <Container className="max-w-3xl">
        <div className="bg-gray-50 rounded-2xl border border-gray-200/60 p-8 md:p-12 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-3">
              General Application
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Submit a General Application
            </h2>
            <p className="text-gray-600 text-sm">
              We currently do not have specific open listings, but we are always looking for exceptional talent. Fill out the form below to register your profile with our engineering team.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-md mx-auto">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
              <p className="text-gray-600 text-sm">
                Thank you for applying. The Structro recruitment team will review your application and contact you if your credentials match our future vacancies.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-gray-800"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-gray-800"
                      placeholder="johndoe@email.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-gray-800"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Position Applied For
                  </label>
                  <input
                    type="text"
                    name="position"
                    disabled
                    value={formData.position}
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-gray-100 text-gray-500 font-semibold outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Professional Experience *
                  </label>
                  <select
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none bg-white transition-all text-gray-800"
                  >
                    <option value="Fresher / Less than 2 years">Fresher / Less than 2 years</option>
                    <option value="2-5 Years">2-5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Link to Resume / CV *
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      type="url"
                      name="resumeUrl"
                      required
                      value={formData.resumeUrl}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-gray-800"
                      placeholder="Google Drive, Dropbox, or OneDrive link"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Brief Statement / Message (Optional)
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none resize-none transition-all text-gray-800"
                  placeholder="Tell us more about your background and why you want to join Structro..."
                />
              </div>

              {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}

              <div className="text-center pt-2">
                <Button 
                  type="submit" 
                  variant="saffron" 
                  size="lg" 
                  className="w-full sm:w-auto px-10 h-14 text-base font-bold shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Application"}
                  {!isSubmitting && <Send className="ml-2 w-4 h-4" />}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}
