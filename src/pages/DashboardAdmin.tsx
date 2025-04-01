
import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, Edit, Trash2, BarChart2, Download, Calendar, Clock, Filter, RefreshCw, Users, FileText, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data for cases (same as user dashboard)
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
    views: 325,
    completions: 76,
    rating: 4.5
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
    views: 512,
    completions: 124,
    rating: 4.2
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
    views: 275,
    completions: 42,
    rating: 4.8
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
    views: 430,
    completions: 89,
    rating: 3.9
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
    views: 198,
    completions: 32,
    rating: 4.1
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
    views: 314,
    completions: 87,
    rating: 4.3
  },
];

// Datos de usuarios para el panel de administrador
const users = [
  { id: 1, name: "Ana García", email: "ana@example.com", role: "detective", casesResolved: 15, dateJoined: "12/01/2023" },
  { id: 2, name: "Carlos Martínez", email: "carlos@example.com", role: "detective", casesResolved: 8, dateJoined: "24/02/2023" },
  { id: 3, name: "Sofía López", email: "sofia@example.com", role: "admin", casesResolved: 22, dateJoined: "05/09/2022" },
  { id: 4, name: "Miguel Torres", email: "miguel@example.com", role: "detective", casesResolved: 3, dateJoined: "18/04/2023" },
];

// Define types for difficulty labels
type DifficultyMapping = {
  easy: string;
  medium: string;
  hard: string;
};

const DashboardAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"cases" | "users" | "analytics">("cases");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  
  const itemsPerPage = 5;
  
  // Handle case deletion (simulated)
  const handleDeleteCase = (caseId: string) => {
    console.log(`Delete case: ${caseId}`);
    toast({
      title: "Caso eliminado",
      description: `El caso #${caseId} ha sido eliminado correctamente`,
      variant: "destructive",
    });
  };
  
  // Handle case edit (simulated)
  const handleEditCase = (caseId: string) => {
    console.log(`Edit case: ${caseId}`);
    toast({
      title: "Editando caso",
      description: `Has comenzado a editar el caso #${caseId}`,
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
  
  // Filter users based on search
  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Pagination
  const currentItems = activeTab === "cases" 
    ? filteredCases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) 
    : filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  const totalPages = Math.ceil(
    (activeTab === "cases" ? filteredCases.length : filteredUsers.length) / itemsPerPage
  );
  
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
  
  // Function to get role badge color
  const getRoleBadgeColor = (role: string) => {
    return role === "admin" 
      ? "bg-crimson hover:bg-crimson-dark" 
      : "bg-blue-500 hover:bg-blue-600";
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
    });
  };
  
  // Handle export data (simulated)
  const handleExportData = () => {
    toast({
      title: "Exportando datos",
      description: "Los datos se están exportando en formato CSV",
    });
  };
  
  useEffect(() => {
    // Reset to first page when filters or tab change
    setCurrentPage(1);
  }, [searchTerm, difficultyFilter, categoryFilter, statusFilter, activeTab]);
  
  return (
    <AppLayout>
      <div className="bg-detective-dark py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Panel de Administración</h1>
              <p className="text-gray-400 mt-2">
                Gestiona todos los aspectos de la plataforma de casos
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button 
                className="bg-detective-medium border-detective-light text-white hover:bg-detective-light/20"
                onClick={handleExportData}
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar datos
              </Button>
              <Button asChild className="bg-crimson hover:bg-crimson-dark text-white">
                <Link to="/casos/nuevo">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Crear nuevo caso
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Statistics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-detective-medium border-detective-light text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Total de Casos</CardDescription>
                <CardTitle className="text-3xl">{allCases.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">Publicados en la plataforma</div>
                <div className="flex items-center mt-2">
                  <Badge className="bg-green-500">+2 últimos 7 días</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-detective-medium border-detective-light text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Usuarios Registrados</CardDescription>
                <CardTitle className="text-3xl">{users.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">Activos en la plataforma</div>
                <div className="flex items-center mt-2">
                  <Badge className="bg-blue-500">3 hoy</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-detective-medium border-detective-light text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Casos Completados</CardDescription>
                <CardTitle className="text-3xl">450</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">Total de resoluciones</div>
                <div className="flex items-center mt-2">
                  <Badge className="bg-yellow-500">+34 esta semana</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-detective-medium border-detective-light text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Valoración Media</CardDescription>
                <CardTitle className="text-3xl">4.3/5</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">De todos los casos</div>
                <div className="w-full bg-detective-dark rounded-full h-2 mt-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: "86%"}}></div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Admin Navigation Tabs */}
          <div className="flex border-b border-detective-light mb-6">
            <Button
              variant="ghost"
              className={`text-white rounded-none border-b-2 px-6 ${
                activeTab === "cases" 
                  ? "border-crimson" 
                  : "border-transparent hover:border-gray-500"
              }`}
              onClick={() => setActiveTab("cases")}
            >
              <FileText className="mr-2 h-5 w-5" />
              Casos
            </Button>
            <Button
              variant="ghost"
              className={`text-white rounded-none border-b-2 px-6 ${
                activeTab === "users" 
                  ? "border-crimson" 
                  : "border-transparent hover:border-gray-500"
              }`}
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-2 h-5 w-5" />
              Usuarios
            </Button>
            <Button
              variant="ghost"
              className={`text-white rounded-none border-b-2 px-6 ${
                activeTab === "analytics" 
                  ? "border-crimson" 
                  : "border-transparent hover:border-gray-500"
              }`}
              onClick={() => setActiveTab("analytics")}
            >
              <Activity className="mr-2 h-5 w-5" />
              Analíticas
            </Button>
          </div>
          
          {/* Search and filters */}
          <Card className="bg-detective-medium border-detective-light mb-8">
            <CardHeader>
              <CardTitle className="text-white">
                {activeTab === "cases" && "Gestión de Casos"}
                {activeTab === "users" && "Gestión de Usuarios"}
                {activeTab === "analytics" && "Analíticas de la Plataforma"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder={activeTab === "users" ? "Buscar usuarios..." : "Buscar casos..."}
                    className="pl-10 bg-detective-dark border-detective-light text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {activeTab === "cases" && (
                  <>
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
                  </>
                )}
                
                {(activeTab === "users" || activeTab === "analytics") && (
                  <div className="md:col-span-3 flex justify-end">
                    <Button 
                      className="bg-detective-dark border-detective-light text-white hover:bg-detective-light/20"
                      onClick={handleResetFilters}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Actualizar datos
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Content based on active tab */}
          {activeTab === "cases" && (
            <Card className="bg-detective-medium border-detective-light text-white">
              <CardHeader>
                <CardTitle>Listado de Casos</CardTitle>
                <CardDescription className="text-gray-400">
                  {filteredCases.length} casos en la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentItems.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-detective-dark">
                        <TableRow>
                          <TableHead className="text-gray-300">ID</TableHead>
                          <TableHead className="text-gray-300">Título</TableHead>
                          <TableHead className="text-gray-300">Categoría</TableHead>
                          <TableHead className="text-gray-300">Dificultad</TableHead>
                          <TableHead className="text-gray-300">Estado</TableHead>
                          <TableHead className="text-gray-300">Visualizaciones</TableHead>
                          <TableHead className="text-gray-300">Completados</TableHead>
                          <TableHead className="text-gray-300">Valoración</TableHead>
                          <TableHead className="text-gray-300 text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentItems.map((caseItem: any) => (
                          <TableRow key={caseItem.id} className="border-detective-light hover:bg-detective-dark/50">
                            <TableCell className="font-medium text-white">
                              #{caseItem.id}
                            </TableCell>
                            <TableCell>{caseItem.title}</TableCell>
                            <TableCell>{caseItem.category}</TableCell>
                            <TableCell>
                              <Badge className={`${getDifficultyBadgeColor(caseItem.difficulty)}`}>
                                {getDifficultyLabel(caseItem.difficulty)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadgeColor(caseItem.status)}>
                                {caseItem.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{caseItem.views || 0}</TableCell>
                            <TableCell>{caseItem.completions || 0}</TableCell>
                            <TableCell>{caseItem.rating || 0}/5</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-blue-400 hover:text-blue-300 hover:bg-detective-dark"
                                  onClick={() => handleEditCase(caseItem.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-400 hover:text-red-300 hover:bg-detective-dark"
                                  onClick={() => handleDeleteCase(caseItem.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                <Button asChild size="sm" variant="ghost" className="text-gray-300 hover:text-white hover:bg-detective-dark">
                                  <Link to={`/investigacion/${caseItem.id}`}>
                                    <BarChart2 className="h-4 w-4" />
                                  </Link>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    {/* Pagination */}
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
          
          {activeTab === "users" && (
            <Card className="bg-detective-medium border-detective-light text-white">
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription className="text-gray-400">
                  {filteredUsers.length} usuarios registrados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredUsers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-detective-dark">
                        <TableRow>
                          <TableHead className="text-gray-300">ID</TableHead>
                          <TableHead className="text-gray-300">Nombre</TableHead>
                          <TableHead className="text-gray-300">Email</TableHead>
                          <TableHead className="text-gray-300">Rol</TableHead>
                          <TableHead className="text-gray-300">Casos resueltos</TableHead>
                          <TableHead className="text-gray-300">Fecha registro</TableHead>
                          <TableHead className="text-gray-300 text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentItems.map((user: any) => (
                          <TableRow key={user.id} className="border-detective-light hover:bg-detective-dark/50">
                            <TableCell className="font-medium text-white">
                              #{user.id}
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge className={getRoleBadgeColor(user.role)}>
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.casesResolved}</TableCell>
                            <TableCell>{user.dateJoined}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-blue-400 hover:text-blue-300 hover:bg-detective-dark"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-400 hover:text-red-300 hover:bg-detective-dark"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-gray-300 hover:text-white hover:bg-detective-dark"
                                >
                                  <BarChart2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    {/* Pagination */}
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
                    <p className="text-gray-400 text-lg mb-4">No se encontraron usuarios que coincidan con los criterios de búsqueda.</p>
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
          
          {activeTab === "analytics" && (
            <Card className="bg-detective-medium border-detective-light text-white">
              <CardHeader>
                <CardTitle>Analíticas de la Plataforma</CardTitle>
                <CardDescription className="text-gray-400">
                  Datos de rendimiento y actividad de usuarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg mb-4">Próximamente: Gráficos y visualizaciones de datos</p>
                  <p className="text-gray-500 mb-8">Se mostrará información detallada sobre el uso de la plataforma, resolución de casos, y actividad de usuarios</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-8">
                    <Card className="bg-detective-dark border-detective-light">
                      <CardHeader>
                        <CardTitle className="text-lg">Casos más populares</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span>El Código del Asesino</span>
                            <Badge>578 vistas</Badge>
                          </li>
                          <li className="flex justify-between">
                            <span>Desaparición en el Lago Azul</span>
                            <Badge>512 vistas</Badge>
                          </li>
                          <li className="flex justify-between">
                            <span>Robo en el Museo Nacional</span>
                            <Badge>430 vistas</Badge>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-detective-dark border-detective-light">
                      <CardHeader>
                        <CardTitle className="text-lg">Detectives destacados</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span>Sofía López</span>
                            <Badge>22 casos</Badge>
                          </li>
                          <li className="flex justify-between">
                            <span>Ana García</span>
                            <Badge>15 casos</Badge>
                          </li>
                          <li className="flex justify-between">
                            <span>Carlos Martínez</span>
                            <Badge>8 casos</Badge>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-detective-dark border-detective-light">
                      <CardHeader>
                        <CardTitle className="text-lg">Categorías populares</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span>Homicidio</span>
                            <Badge>42%</Badge>
                          </li>
                          <li className="flex justify-between">
                            <span>Personas Desaparecidas</span>
                            <Badge>28%</Badge>
                          </li>
                          <li className="flex justify-between">
                            <span>Robo</span>
                            <Badge>18%</Badge>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Button 
                    className="bg-crimson hover:bg-crimson-dark text-white"
                    onClick={handleExportData}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Exportar informe completo
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardAdmin;
