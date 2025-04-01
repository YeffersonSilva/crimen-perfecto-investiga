
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, FileText, Database } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-detective-dark py-16 md:py-24">
      {/* Background design elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-crimson blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-700 blur-[120px]"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Resuelve el <span className="text-crimson">Crimen Perfecto</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-lg">
              Conviértete en investigador y resuelve casos desafiantes 
              analizando pruebas, interrogando sospechosos y desentrañando la verdad.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="bg-crimson hover:bg-crimson-dark text-white px-6">
                Explorar Casos
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-detective-light/10">
                Cómo Funciona
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-detective-medium p-3 rounded-lg">
                  <Search className="h-6 w-6 text-evidence-blue" />
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-medium">Analiza Evidencias</h3>
                  <p className="mt-1 text-sm text-gray-400">Examina pistas y pruebas para encontrar conexiones.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-detective-medium p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-evidence-yellow" />
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-medium">Revisa Informes</h3>
                  <p className="mt-1 text-sm text-gray-400">Estudia reportes forenses y policiales detallados.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-detective-medium p-3 rounded-lg">
                  <Database className="h-6 w-6 text-evidence-red" />
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-medium">Resuelve Misterios</h3>
                  <p className="mt-1 text-sm text-gray-400">Conecta las piezas y encuentra al responsable.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                alt="Investigación criminal" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-detective-dark to-transparent opacity-90"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-detective-medium/80 backdrop-blur-sm p-4 rounded-lg border border-detective-light">
                  <h3 className="text-lg font-semibold text-white">Caso Destacado</h3>
                  <p className="text-gray-300 mt-2">El misterio de la mansión abandonada</p>
                  <div className="mt-4">
                    <Button size="sm" className="bg-crimson hover:bg-crimson-dark text-white">
                      Ver detalles
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decoration elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-crimson"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-crimson"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
