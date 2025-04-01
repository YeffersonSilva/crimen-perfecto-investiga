
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import CaseCard from "@/components/CaseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

// Mock data for cases
const allCases = [
  {
    id: "caso-1",
    title: "El Misterio de la Mansión Abandonada",
    description: "Un cuerpo ha sido encontrado en una antigua mansión. Descubre quién es el responsable siguiendo las pistas en la escena del crimen.",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    date: "12/05/2023",
    difficulty: "easy",
    investigator: "Det. García",
    timeEstimate: "45-60 min",
    category: "Homicidio",
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
    category: "Personas Desaparecidas",
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
    category: "Asesino en Serie",
  },
  {
    id: "caso-4",
    title: "Robo en el Museo Nacional",
    description: "Una valiosa obra de arte ha sido robada del Museo Nacional. Encuentra al ladrón y recupera la pieza antes de que desaparezca.",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    date: "17/10/2023",
    difficulty: "medium",
    investigator: "Det. Vargas",
    timeEstimate: "60-75 min",
    category: "Robo",
  },
  {
    id: "caso-5",
    title: "El Incendio Sospechoso",
    description: "Un incendio en un edificio de apartamentos ha causado varias víctimas. Investiga si fue un accidente o un acto deliberado.",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    date: "05/11/2023",
    difficulty: "hard",
    investigator: "Det. Torres",
    timeEstimate: "75-90 min",
    category: "Incendio Provocado",
  },
  {
    id: "caso-6",
    title: "Amenazas Anónimas",
    description: "Una figura pública está recibiendo amenazas anónimas. Rastrea el origen de los mensajes antes de que sea demasiado tarde.",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    date: "22/11/2023",
    difficulty: "easy",
    investigator: "Det. Salazar",
    timeEstimate: "45-60 min",
    category: "Amenazas",
  },
];

const Casos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  
  // Filter cases based on search and filters
  const filteredCases = allCases.filter((caseItem: any) => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         caseItem.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === "" || caseItem.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === "" || caseItem.category === categoryFilter;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });
  
  // Get unique categories for filter
  const categories = [...new Set(allCases.map((caseItem: any) => caseItem.category))];
  
  return (
    <AppLayout>
      <section className="py-12 bg-detective-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Explora Nuestros Casos</h1>
            <p className="text-gray-300">
              Descubre una variedad de casos de investigación criminal que pondrán a prueba tus habilidades.
              Desde homicidios hasta robos misteriosos, hay un caso para cada tipo de detective.
            </p>
          </div>
          
          {/* Search and filters */}
          <div className="bg-detective-medium p-6 rounded-lg border border-detective-light mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar casos..."
                  className="pl-10 bg-detective-dark border-detective-light text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <Select
                  value={difficultyFilter}
                  onValueChange={setDifficultyFilter}
                >
                  <SelectTrigger className="bg-detective-dark border-detective-light text-white">
                    <SelectValue placeholder="Dificultad" />
                  </SelectTrigger>
                  <SelectContent className="bg-detective-medium border-detective-light">
                    <SelectItem value="">Todas las dificultades</SelectItem>
                    <SelectItem value="easy">Fácil</SelectItem>
                    <SelectItem value="medium">Medio</SelectItem>
                    <SelectItem value="hard">Difícil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="bg-detective-dark border-detective-light text-white">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-detective-medium border-detective-light">
                    <SelectItem value="">Todas las categorías</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Cases grid */}
          {filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((caseItem: any) => (
                <CaseCard 
                  key={caseItem.id} 
                  {...caseItem}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No se encontraron casos que coincidan con los criterios de búsqueda.</p>
              <Button 
                variant="outline" 
                className="mt-4 border-detective-light text-white hover:bg-detective-light/10"
                onClick={() => {
                  setSearchTerm("");
                  setDifficultyFilter("");
                  setCategoryFilter("");
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default Casos;
