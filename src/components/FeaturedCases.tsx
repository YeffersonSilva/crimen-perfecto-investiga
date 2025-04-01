
import { useState } from "react";
import CaseCard from "./CaseCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data for featured cases
const featuredCases = [
  {
    id: "caso-1",
    title: "El Misterio de la Mansión Abandonada",
    description: "Un cuerpo ha sido encontrado en una antigua mansión. Descubre quién es el responsable siguiendo las pistas en la escena del crimen.",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    date: "12/05/2023",
    difficulty: "easy",
    investigator: "Det. García",
    timeEstimate: "45-60 min",
  },
  {
    id: "caso-2",
    title: "Desaparición en el Lago Azul",
    description: "Una joven desapareció durante un fin de semana en un complejo turístico. Investiga qué ocurrió realmente aquella noche.",
    imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    date: "28/07/2023",
    difficulty: "medium",
    investigator: "Det. Martínez",
    timeEstimate: "60-90 min",
  },
  {
    id: "caso-3",
    title: "El Código del Asesino",
    description: "Un asesino en serie deja mensajes codificados en cada escena del crimen. Descifra el código para predecir su próximo movimiento.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    date: "03/09/2023",
    difficulty: "hard",
    investigator: "Det. Romero",
    timeEstimate: "90-120 min",
  },
];

const FeaturedCases = () => {
  return (
    <section className="py-16 bg-detective-medium">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white">Casos Destacados</h2>
            <p className="mt-2 text-gray-400 max-w-2xl">
              Explora nuestros casos más desafiantes y pon a prueba tus habilidades como investigador.
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-crimson hover:bg-crimson-dark text-white">
            Ver todos los casos
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCases.map((caseItem) => (
            <CaseCard 
              key={caseItem.id} 
              {...caseItem as any}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCases;
