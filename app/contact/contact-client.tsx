"use client"

import { useState, useEffect } from "react"
import { submitEnquiry } from "@/app/actions/public-actions";
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";

interface Service {
  id: string;
  title: string;
}

export function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/public-data/services")
      .then((res) => res.json())
      .then((data: Service[]) => setServices(data))
      .catch(() => setServices([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      await submitEnquiry(formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      setSubmitError("Failed to submit. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px]">
        <div className="absolute inset-0 bg-primary">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Contact Structro Infratech"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50" />
        <Container className="relative h-full flex flex-col justify-center">
          <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4 drop-shadow-sm">
            Contact Us
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
            Let&apos;s Build Something<br/>
            <span className="drop-shadow-sm">Great Together</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg mt-6 max-w-2xl font-medium">
            Get in touch with our team for a technical consultation on your next project.
          </p>
        </Container>
      </div>

      {/* Contact Info Cards */}
      <div className="bg-white py-16 -mt-8 relative z-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Phone className="w-6 h-6 text-primary" />,
                title: "Phone",
                details: ["+91-9678027684"],
                link: "tel:+919678027684"
              },
              {
                icon: <Mail className="w-6 h-6 text-primary" />,
                title: "Email",
                details: ["structro.infratech@gmail.com"],
                link: "mailto:structro.infratech@gmail.com"
              },
              {
                icon: <MapPin className="w-6 h-6 text-primary" />,
                title: "Head Office",
                details: ["1st Floor, Silver Square", "Christian Basti, G.S Road", "Guwahati, Assam - 781005"],
                link: "#"
              },
              {
                icon: <Clock className="w-6 h-6 text-primary" />,
                title: "Working Hours",
                details: ["Mon - Sat: 9AM - 6PM", "Sun: Closed"],
                link: "#"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="bg-primary/10 w-12 h-12 rounded-sm flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>
                <div className="space-y-1">
                  {item.details.map((detail, dIndex) => (
                    <a 
                      key={dIndex} 
                      href={item.link} 
                      className="text-gray-600 text-sm hover:text-primary block"
                    >
                      {detail}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Contact Form Section */}
      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Get In Touch
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Request a Technical Consultation
            </h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and our team will get back to you within 24 hours 
              with a tailored solution for your project.
            </p>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  Your consultation request has been submitted. Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Service Interested In *
                  </label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>

                {submitError && (
                  <p className="text-red-600 text-sm">{submitError}</p>
                )}
                <Button 
                  type="submit" 
                  variant="saffron"
                  size="lg"
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                  {!isSubmitting && <Send className="ml-2 w-4 h-4" />}
                </Button>
              </form>
            )}
          </div>

          {/* Additional Info */}
          <div className="space-y-8">
            {/* Workshop Location */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="font-bold text-gray-900 text-xl mb-4">Workshop Location</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 font-medium">Guwahati-Accoland-Rani Rd</p>
                  <p className="text-gray-600">South Rani, Guwahati-31</p>
                </div>
              </div>
            </div>

            {/* Why Work With Us */}
            <div>
              <h3 className="font-bold text-gray-900 text-xl mb-4">Why Work With Us?</h3>
              <div className="space-y-4">
                {[
                  "25+ years of industry experience",
                  "ISO 9001:2015 certified",
                  "500+ successful projects delivered",
                  "Expert team of 400+ professionals",
                  "Serving all of Northeast India"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact CTA */}
            <div className="bg-primary rounded-lg p-8 text-primary-foreground">
              <h3 className="font-bold text-xl mb-4">Prefer to Talk Directly?</h3>
              <p className="text-primary-foreground/80 mb-6 font-medium">
                Call us now to discuss your project requirements with our technical team.
              </p>
              <a href="tel:+919678027684">
                <Button variant="red" size="lg" className="w-full">
                  <Phone className="mr-2 w-4 h-4" />
                  Call +91-9678027684
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Map Section */}
      <div className="bg-gray-100 py-16">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Find Us</h2>
            <p className="text-gray-600 mt-2">Visit our head office in Guwahati, Assam</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="bg-gray-200 rounded-lg h-[400px] overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4509.166628943781!2d91.7755516!3d26.1569559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a59003ad2c8c3%3A0x45df74d231f0e84c!2sStructro%20Infra%20Tech!5e1!3m2!1sen!2sin!4v1776015415897!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
