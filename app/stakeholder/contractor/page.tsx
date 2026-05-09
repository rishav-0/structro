"use client";

import { useState } from "react";
import { submitEnquiry } from "@/app/actions/public-actions";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Container } from "@/components/ui/container";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ContractorIntakePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    yearsInBusiness: "",
    teamSize: "",
    specialization: "",
    description: "",
    pastProjects: "",
    service: "contractor-intake",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      await submitEnquiry({
        ...formData,
        type: "contractor",
        additionalFields: {
          yearsInBusiness: formData.yearsInBusiness,
          teamSize: formData.teamSize,
          specialization: formData.specialization,
          description: formData.description,
          pastProjects: formData.pastProjects,
        },
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting intake:", error);
      setSubmitError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHero title="Contractor Intake" compact />
        <Container>
          <div className="py-16 max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intake Form Submitted!</h2>
              <p className="text-gray-600 mb-8">
                Thank you for your interest in working with us. Our project team will review 
                your profile and contact you when suitable opportunities arise.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/">
                  <Button variant="outline">Back to Home</Button>
                </Link>
                <Link href="/contact">
                  <Button>Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        eyebrow="Stakeholder Portal"
        title="Contractor Intake"
        description="Submit your company profile for project tenders and site management opportunities."
        backHref="/"
        backLabel="Back to home"
        compact
      />

      <Container>
        <div className="py-12 -mt-8 relative z-10">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Contact Person Name *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address *</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@company.com"
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                  <Input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Company/Individual Name *</label>
                  <Input
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company name or individual"
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Years in Business</label>
                  <Input
                    value={formData.yearsInBusiness}
                    onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                    placeholder="e.g., 5 years"
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Team Size</label>
                  <Input
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    placeholder="e.g., 20-50 workers"
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Specialization *</label>
                <Select
                  value={formData.specialization}
                  onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                  required
                >
                  <SelectTrigger className="bg-gray-50 border-gray-200">
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="structural-steel">Structural Steel Fabrication</SelectItem>
                    <SelectItem value="peb">Pre-Engineered Buildings (PEB)</SelectItem>
                    <SelectItem value="bridges">Bridge Construction</SelectItem>
                    <SelectItem value="industrial">Industrial Sheds</SelectItem>
                    <SelectItem value="civil">Civil Construction</SelectItem>
                    <SelectItem value="electrical">Electrical & Plumbing</SelectItem>
                    <SelectItem value="painting">Painting & Finishing</SelectItem>
                    <SelectItem value="logistics">Logistics & Transportation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Company/Project Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your company capabilities, equipment, certifications..."
                  rows={4}
                  className="bg-gray-50 border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Past Projects</label>
                <Textarea
                  value={formData.pastProjects}
                  onChange={(e) => setFormData({ ...formData, pastProjects: e.target.value })}
                  placeholder="List notable projects you've completed with location and value..."
                  rows={4}
                  className="bg-gray-50 border-gray-200"
                />
              </div>

              {submitError && (
                <p className="text-red-600 text-sm">{submitError}</p>
              )}

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Intake Form"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}