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

export default function VendorRegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    gstNumber: "",
    category: "",
    productCategories: "",
    description: "",
    service: "vendor-registration",
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
        type: "vendor",
        additionalFields: {
          address: formData.address,
          gstNumber: formData.gstNumber,
          productCategories: formData.productCategories,
          description: formData.description,
        },
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting registration:", error);
      setSubmitError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHero title="Vendor Registration" compact />
        <Container>
          <div className="py-16 max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Submitted!</h2>
              <p className="text-gray-600 mb-8">
                Thank you for registering as a vendor. Our procurement team will review your 
                application and contact you within 2-3 business days.
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
        title="Vendor Registration"
        description="Register your company to become part of our supply chain network."
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
                  <label className="text-sm font-medium text-gray-700">Company Name *</label>
                  <Input
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company name"
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">GST Number</label>
                  <Input
                    value={formData.gstNumber}
                    onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                    placeholder="18AABCU9603R1ZM"
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Business Category *</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="materials">Raw Materials</SelectItem>
                      <SelectItem value="equipment">Equipment & Machinery</SelectItem>
                      <SelectItem value="services">Services & Contractors</SelectItem>
                      <SelectItem value="logistics">Logistics & Transportation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Business Address</label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Full business address"
                  rows={2}
                  className="bg-gray-50 border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Product/Service Categories</label>
                <Input
                  value={formData.productCategories}
                  onChange={(e) => setFormData({ ...formData, productCategories: e.target.value })}
                  placeholder="e.g., Steel plates, Cement, Welding services"
                  className="bg-gray-50 border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Company Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of your business and capabilities..."
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
                    "Submit Registration"
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