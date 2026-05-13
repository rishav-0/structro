"use client";
import { Container } from "@/components/ui/container";

export default function TestimonialsSection() {
  const testimonials = [
    { text: "Structro delivered our warehouse facility ahead of schedule. Their attention to detail and safety standards are unmatched in the region.", author: "Rajiv Sharma", role: "Director, XYZ Logistics" },
    { text: "The engineering precision shown in our recent factory expansion project was commendable. Highly recommended for heavy engineering works.", author: "Amit Das", role: "Project Head, ABC Industries" }
  ];

  return (
    <div className="py-20 bg-white relative">
      <Container>
        <div className="text-center mb-16 relative z-10">
          <p className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
            Proven Partnerships
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">Client Testimonials</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-gray-50 p-10 rounded-md border border-gray-100 hover:shadow-lg transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
              <div className="text-primary/20 text-6xl mb-4 font-serif absolute top-4 right-8 group-hover:text-primary/30 transition-colors">&ldquo;</div>
              <p className="text-gray-700 text-lg mb-8 italic relative z-10 font-medium leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="relative z-10">
                <h4 className="font-bold text-gray-900 text-lg">{t.author}</h4>
                <p className="text-sm text-primary font-semibold">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
