
import AppLayout from "@/components/AppLayout";
import HeroSection from "@/components/HeroSection";
import FeaturedCases from "@/components/FeaturedCases";
import TestimonialSection from "@/components/TestimonialSection";
import { Button } from "@/components/ui/button";
import { Shield, Database, Search, FileText } from "lucide-react";

const Index = () => {
  return (
    <AppLayout>
      <HeroSection />
      
      <FeaturedCases />
      
      {/* How it works section */}
      <section className="py-16 bg-detective-dark">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white">Cómo Funciona</h2>
            <p className="mt-4 text-gray-400">
              Crimen Perfecto te ofrece una experiencia inmersiva de investigación criminal.
              Analiza pruebas, interroga sospechosos y resuelve casos como un detective profesional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-detective-medium p-6 rounded-lg border border-detective-light">
              <div className="w-14 h-14 bg-detective-dark rounded-full flex items-center justify-center mb-6 mx-auto">
                <Search className="h-7 w-7 text-evidence-blue" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">1. Selecciona un Caso</h3>
              <p className="text-gray-400 text-center">
                Explora nuestra biblioteca de casos y elige el que más te intrigue según su dificultad y temática.
              </p>
            </div>
            
            <div className="bg-detective-medium p-6 rounded-lg border border-detective-light">
              <div className="w-14 h-14 bg-detective-dark rounded-full flex items-center justify-center mb-6 mx-auto">
                <FileText className="h-7 w-7 text-evidence-yellow" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">2. Investiga las Pruebas</h3>
              <p className="text-gray-400 text-center">
                Analiza informes policiales, testimonios, fotos y otras evidencias para encontrar pistas importantes.
              </p>
            </div>
            
            <div className="bg-detective-medium p-6 rounded-lg border border-detective-light">
              <div className="w-14 h-14 bg-detective-dark rounded-full flex items-center justify-center mb-6 mx-auto">
                <Database className="h-7 w-7 text-evidence-red" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">3. Resuelve el Misterio</h3>
              <p className="text-gray-400 text-center">
                Conecta todas las pistas, determina qué sucedió realmente y descubre al culpable del crimen.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-crimson hover:bg-crimson-dark text-white px-6">
              Comenzar Ahora
            </Button>
          </div>
        </div>
      </section>
      
      <TestimonialSection />
      
      {/* Call to action section */}
      <section className="py-16 bg-gradient-to-r from-detective-dark to-detective-medium">
        <div className="container mx-auto px-4">
          <div className="bg-detective-medium p-8 md:p-12 rounded-xl border border-detective-light max-w-5xl mx-auto relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-crimson/20 blur-[30px]"></div>
            <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-blue-700/20 blur-[30px]"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-4">
                  ¿Listo para resolver tu primer caso?
                </h2>
                <p className="text-gray-300">
                  Únete a nuestra comunidad de investigadores y pon a prueba tus habilidades de detective.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-crimson hover:bg-crimson-dark text-white px-6">
                  Explorar Casos
                </Button>
                <Button size="lg" variant="outline" className="border-detective-light text-white hover:bg-detective-light/10">
                  Saber Más
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
