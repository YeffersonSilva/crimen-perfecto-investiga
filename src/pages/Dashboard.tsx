
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Clock, Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

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
    status: "Abierto",
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
    status: "Abierto",
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
    status: "Abierto",
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
    status: "Abierto",
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
    status: "Resuelto",
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
    status: "Resuelto",
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter cases based on search and filters
  const filteredCases = allCases.filter((caseItem: any) => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         caseItem.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === "all" || caseItem.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === "all" || caseItem.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter;
    
    return matchesSearch && matchesDifficulty && matchesCategory && matchesStatus;
  });
  
  // Get unique categories for filter
  const categories = [...new Set(allCases.map((caseItem: any) => caseItem.category))];
  
  // Function to get difficulty label
  const getDifficultyLabel = (difficulty: string) => {
    return {
      easy: "Fácil",
      medium: "Medio",
      hard: "Difícil",
    }[difficulty as keyof typeof { easy: string; medium: string; hard: string }] || difficulty;
  };
  
  // Function to get badge color based on difficulty
  const getDifficultyBadgeColor = (difficulty: string) => {
    return {
      easy: "bg-green-500 hover:bg-green-600",
      medium: "bg-yellow-500 hover:bg-yellow-600",
      hard: "bg-crimson hover:bg-crimson-dark",
    }[difficulty as keyof typeof { easy: string; medium: string; hard: string }] || "bg-blue-500";
  };
  
  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    return status === "Abierto" 
      ? "bg-blue-500 hover:bg-blue-600" 
      : "bg-gray-500 hover:bg-gray-600";
  };
  
  return (
    <AppLayout>
      <div className="bg-detective-dark py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard de Casos</h1>
              <p className="text-gray-400 mt-2">
                Visualiza y gestiona todos los casos de investigación
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button asChild className="bg-crimson hover:bg-crimson-dark text-white">
                <Link to="/casos">Ver todos los casos</Link>
              </Button>
            </div>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-detective-medium border-detective-light text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Total de Casos</CardDescription>
                <CardTitle className="text-3xl">{allCases.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">Casos disponibles</div>
              </CardContent>
            </Card>
            
            <Card className="bg-detective-medium border-detective-light text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Casos Abiertos</CardDescription>
                <CardTitle className="text-3xl">
                  {allCases.filter(c => c.status === "Abierto").length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">En investigación</div>
              </CardContent>
            </Card>
            
            <Card className="bg-detective-medium border-detective-light text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Casos Resueltos</CardDescription>
                <CardTitle className="text-3xl">
                  {allCases.filter(c => c.status === "Resuelto").length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">Completados</div>
              </CardContent>
            </Card>
            
            <Card className="bg-detective-medium border-detective-light text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Tiempo Promedio</CardDescription>
                <CardTitle className="text-3xl">65 min</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">De resolución</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Search and filters */}
          <Card className="bg-detective-medium border-detective-light mb-8">
            <CardHeader>
              <CardTitle className="text-white">Filtrar Casos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                
                <Select
                  value={difficultyFilter}
                  onValueChange={setDifficultyFilter}
                >
                  <SelectTrigger className="bg-detective-dark border-detective-light text-white">
                    <SelectValue placeholder="Dificultad" />
                  </SelectTrigger>
                  <SelectContent className="bg-detective-medium border-detective-light">
                    <SelectItem value="all">Todas las dificultades</SelectItem>
                    <SelectItem value="easy">Fácil</SelectItem>
                    <SelectItem value="medium">Medio</SelectItem>
                    <SelectItem value="hard">Difícil</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="bg-detective-dark border-detective-light text-white">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-detective-medium border-detective-light">
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="bg-detective-dark border-detective-light text-white">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-detective-medium border-detective-light">
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="Abierto">Abierto</SelectItem>
                    <SelectItem value="Resuelto">Resuelto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          {/* Cases Table */}
          <Card className="bg-detective-medium border-detective-light text-white">
            <CardHeader>
              <CardTitle>Listado de Casos</CardTitle>
              <CardDescription className="text-gray-400">
                {filteredCases.length} casos encontrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredCases.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-detective-dark">
                      <TableRow>
                        <TableHead className="text-gray-300">Título</TableHead>
                        <TableHead className="text-gray-300">Categoría</TableHead>
                        <TableHead className="text-gray-300">Dificultad</TableHead>
                        <TableHead className="text-gray-300">Fecha</TableHead>
                        <TableHead className="text-gray-300">Investigador</TableHead>
                        <TableHead className="text-gray-300">Tiempo Est.</TableHead>
                        <TableHead className="text-gray-300">Estado</TableHead>
                        <TableHead className="text-gray-300 text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCases.map((caseItem: any) => (
                        <TableRow key={caseItem.id} className="border-detective-light hover:bg-detective-dark/50">
                          <TableCell className="font-medium text-white">
                            {caseItem.title}
                          </TableCell>
                          <TableCell>{caseItem.category}</TableCell>
                          <TableCell>
                            <Badge className={`${getDifficultyBadgeColor(caseItem.difficulty)}`}>
                              {getDifficultyLabel(caseItem.difficulty)}
                            </Badge>
                          </TableCell>
                          <TableCell className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                            {caseItem.date}
                          </TableCell>
                          <TableCell>{caseItem.investigator}</TableCell>
                          <TableCell className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-gray-400" />
                            {caseItem.timeEstimate}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeColor(caseItem.status)}>
                              {caseItem.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button asChild size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-detective-dark">
                              <Link to={`/investigacion/${caseItem.id}`}>
                                Ver detalles
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-6">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg mb-4">No se encontraron casos que coincidan con los criterios de búsqueda.</p>
                  <Button 
                    variant="outline" 
                    className="border-detective-light text-white hover:bg-detective-light/10"
                    onClick={() => {
                      setSearchTerm("");
                      setDifficultyFilter("all");
                      setCategoryFilter("all");
                      setStatusFilter("all");
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
