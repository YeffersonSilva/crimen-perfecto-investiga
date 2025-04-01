
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "Esta plataforma ha cambiado mi forma de ver las series policíacas. Ahora, en lugar de solo mirar, puedo experimentar lo que significa ser un detective real.",
    author: "Ana Martínez",
    role: "Aficionada al misterio",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    id: 2,
    content: "Increíble atención al detalle en cada caso. Los informes forenses y las pruebas son sorprendentemente realistas. ¡Me siento como un verdadero investigador!",
    author: "Carlos Jiménez",
    role: "Estudiante de Criminología",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    content: "Lo uso como herramienta educativa para mis estudiantes. Aprenden sobre investigación criminal de manera práctica y entretenida.",
    author: "Dra. Laura Robles",
    role: "Profesora universitaria",
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
  },
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-16 bg-detective-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-crimson blur-[80px]"></div>
        <div className="absolute bottom-1/2 right-1/3 w-56 h-56 rounded-full bg-blue-700 blur-[100px]"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Quote className="h-12 w-12 mx-auto text-crimson mb-6" />
          <h2 className="text-3xl font-bold text-white">Experiencias de Investigadores</h2>
          <p className="mt-4 text-gray-400">
            Descubre lo que otros usuarios opinan sobre su experiencia resolviendo casos en Crimen Perfecto.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-detective-medium p-8 rounded-xl border border-detective-light">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-crimson">
                  <img 
                    src={testimonials[activeIndex].avatar} 
                    alt={testimonials[activeIndex].author}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div>
                <p className="text-lg text-gray-300 italic mb-6">
                  "{testimonials[activeIndex].content}"
                </p>
                
                <div>
                  <h4 className="text-white font-bold">{testimonials[activeIndex].author}</h4>
                  <p className="text-gray-400">{testimonials[activeIndex].role}</p>
                </div>
              </div>
            </div>
            
            {/* Navigation controls */}
            <div className="mt-8 flex justify-center gap-4">
              <Button variant="outline" size="icon" onClick={prevTestimonial} className="border-detective-light text-white hover:bg-detective-light/10">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === activeIndex ? "bg-crimson" : "bg-detective-light"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  ></button>
                ))}
              </div>
              
              <Button variant="outline" size="icon" onClick={nextTestimonial} className="border-detective-light text-white hover:bg-detective-light/10">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
