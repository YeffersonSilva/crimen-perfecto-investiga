import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, Calendar, ChevronRight, ThumbsUp, Eye, BookOpen, Filter, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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

// Define types for difficulty labels
type DifficultyMapping = {
  easy: string;
  medium: string;
  hard: string;
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  
  const casesPerPage = 4;
  
  // Function to handle case interaction
  const handleCaseInteraction = (caseId: string, interactionType: string) => {
    // Simulate interaction tracking
    console.log(`Case ${caseId} - ${interactionType}`);
    toast({
      title: "¡Acción registrada!",
      description: interactionType === "like" 
        ? "Has marcado este caso como favorito" 
        : "Este caso ha sido añadido a tu lista de vistos",
      variant: "default",
    });
  };
  
  // Filter cases based on search and filters
  const filteredCases = allCases.filter((caseItem: any) => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         caseItem.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === "all" || caseItem.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === "all" || caseItem.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter;
    
    return matchesSearch && matchesDifficulty && matchesCategory && matchesStatus;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredCases.length / casesPerPage);
  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = filteredCases.slice(indexOfFirstCase, indexOfLastCase);
  
  // Get unique categories for filter
  const categories = [...new Set(allCases.map((caseItem: any) => caseItem.category))];
  
  // Function to get difficulty label
  const getDifficultyLabel = (difficulty: string) => {
    const difficultyLabels: DifficultyMapping = {
      easy: "Fácil",
      medium: "Medio",
      hard: "Difícil",
    };
    return difficultyLabels[difficulty as keyof DifficultyMapping] || difficulty;
  };
  
  // Function to get badge color based on difficulty
  const getDifficultyBadgeColor = (difficulty: string) => {
    const difficultyColors: DifficultyMapping = {
      easy: "bg-green-500 hover:bg-green-600",
      medium: "bg-yellow-500 hover:bg-yellow-600",
      hard: "bg-crimson hover:bg-crimson-dark",
    };
    return difficultyColors[difficulty as keyof DifficultyMapping] || "bg-blue-500";
  };
  
  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    return status === "Abierto" 
      ? "bg-blue-500 hover:bg-blue-600" 
      : "bg-gray-500 hover:bg-gray-600";
  };
  
  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setDifficultyFilter("all");
    setCategoryFilter("all");
    setStatusFilter("all");
    setCurrentPage(1);
    toast({
      title: "Filtros restablecidos",
      description: "Se han eliminado todos los filtros aplicados",
      variant: "default",
    });
  };
  
  useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchTerm, difficultyFilter, categoryFilter, statusFilter]);
  
  return (
    <AppLayout>
      <div className="bg-detective-dark py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Mi Dashboard</h1>
              <p className="text-gray-400 mt-2">
                Explora y gestiona tus casos de investigación favoritos
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button asChild className="bg-crimson hover:bg-crimson-dark text-white">
                <Link to="/casos">Ver todos los casos</Link>
              </Button>
            </div>
          </div>
          
          {/* Interactive Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-detective-medium border-detective-light text-white hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Total de Casos</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  {allCases.length}
                  <Badge className="ml-2 bg-blue-500">+2 nuevos</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">Casos disponibles para resolver</div>
              </CardContent>
            </Card>
            
            <Card className="bg-detective-medium border-detective-light text-white hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Casos Abiertos</CardDescription>
                <CardTitle className="text-3xl flex items-center">
                  {allCases.filter(c => c.status === "Abierto").length}
                  <Badge className="ml-2 bg-green-500">Activos</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">Esperando tu resolución</div>
              </CardContent>
            </Card>
            
            <Card className="bg-detective-medium border-detective-light text-white hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Casos Resueltos</CardDescription>
                <CardTitle className="text-3xl flex items-center">
                  {allCases.filter(c => c.status === "Resuelto").length}
                  <Badge className="ml-2 bg-gray-500">Completados</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">Casos resueltos con éxito</div>
              </CardContent>
            </Card>
            
            <Card className="bg-detective-medium border-detective-light text-white hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Nivel de Detective</CardDescription>
                <CardTitle className="text-3xl">Principiante</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">Resuelve más casos para subir</div>
                <div className="w-full bg-detective-dark rounded-full h-2 mt-2">
                  <div className="bg-crimson h-2 rounded-full" style={{width: "25%"}}></div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Search and filters */}
          <Card className="bg-detective-medium border-detective-light mb-8 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Filtrar Casos</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className={`border-detective-light text-white ${viewMode === "card" ? "bg-detective-dark" : ""}`}
                    onClick={() => setViewMode("card")}
                  >
                    <BookOpen className="h-4 w-4 mr-1" /> Tarjetas
                  </Button>
                  <Button
                    variant="outline"
                    className={`border-detective-light text-white ${viewMode === "table" ? "bg-detective-dark" : ""}`}
                    onClick={() => setViewMode("table")}
                  >
                    <Filter className="h-4 w-4 mr-1" /> Tabla
                  </Button>
                </div>
              </div>
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
              
              {filteredCases.length === 0 && (
                <Button 
                  className="mt-4 bg-detective-dark text-white border-detective-light hover:bg-detective-light/20"
                  onClick={handleResetFilters}
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Restablecer filtros
                </Button>
              )}
            </CardContent>
          </Card>
          
          {/* Cases Display (Card or Table view) */}
          {viewMode === "card" ? (
            <div className="mb-8">
              {currentCases.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentCases.map((caseItem: any) => (
                      <Card key={caseItem.id} className="bg-detective-medium border-detective-light text-white hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <div 
                          className="h-40 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${caseItem.imageUrl})` }}
                        />
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <Badge className={getDifficultyBadgeColor(caseItem.difficulty)}>
                              {getDifficultyLabel(caseItem.difficulty)}
                            </Badge>
                            <Badge className={getStatusBadgeColor(caseItem.status)}>
                              {caseItem.status}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl mt-2">{caseItem.title}</CardTitle>
                          <CardDescription className="text-gray-400">
                            {caseItem.category}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-300 line-clamp-2">
                            {caseItem.description}
                          </p>
                          <div className="flex items-center mt-4 text-sm text-gray-400">
                            <Calendar className="mr-1 h-4 w-4" />
                            <span>{caseItem.date}</span>
                            <Clock className="ml-4 mr-1 h-4 w-4" />
                            <span>{caseItem.timeEstimate}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-gray-300 hover:text-white hover:bg-detective-dark/50"
                              onClick={() => handleCaseInteraction(caseItem.id, "like")}
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-gray-300 hover:text-white hover:bg-detective-dark/50"
                              onClick={() => handleCaseInteraction(caseItem.id, "view")}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button asChild size="sm" className="bg-crimson hover:bg-crimson-dark text-white">
                            <Link to={`/investigacion/${caseItem.id}`}>
                              Investigar
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Pagination for card view */}
                  {totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <PaginationItem key={page}>
                              <PaginationLink 
                                onClick={() => setCurrentPage(page)}
                                isActive={currentPage === page}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 bg-detective-medium rounded-lg border border-detective-light">
                  <p className="text-gray-400 text-lg mb-4">No se encontraron casos que coincidan con los criterios de búsqueda.</p>
                  <Button 
                    variant="outline" 
                    className="border-detective-light text-white hover:bg-detective-light/10"
                    onClick={handleResetFilters}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Card className="bg-detective-medium border-detective-light text-white">
              <CardHeader>
                <CardTitle>Listado de Casos</CardTitle>
                <CardDescription className="text-gray-400">
                  {filteredCases.length} casos encontrados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentCases.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-detective-dark">
                        <TableRow>
                          <TableHead className="text-gray-300">Título</TableHead>
                          <TableHead className="text-gray-300">Categoría</TableHead>
                          <TableHead className="text-gray-300">Dificultad</TableHead>
                          <TableHead className="text-gray-300">Fecha</TableHead>
                          <TableHead className="text-gray-300">Tiempo Est.</TableHead>
                          <TableHead className="text-gray-300">Estado</TableHead>
                          <TableHead className="text-gray-300 text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentCases.map((caseItem: any) => (
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
                              <div className="flex justify-end gap-2">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-gray-300 hover:text-white"
                                  onClick={() => handleCaseInteraction(caseItem.id, "like")}
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                </Button>
                                <Button asChild size="sm" className="bg-crimson hover:bg-crimson-dark text-white">
                                  <Link to={`/investigacion/${caseItem.id}`}>
                                    Investigar
                                  </Link>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    {/* Pagination for table view */}
                    {totalPages > 1 && (
                      <div className="mt-6">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious 
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                              />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                              <PaginationItem key={page}>
                                <PaginationLink 
                                  onClick={() => setCurrentPage(page)}
                                  isActive={currentPage === page}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            <PaginationItem>
                              <PaginationNext 
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg mb-4">No se encontraron casos que coincidan con los criterios de búsqueda.</p>
                    <Button 
                      variant="outline" 
                      className="border-detective-light text-white hover:bg-detective-light/10"
                      onClick={handleResetFilters}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Limpiar filtros
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
