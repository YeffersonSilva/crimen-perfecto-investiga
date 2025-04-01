
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, FileText, Bell, Menu, X, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name?: string; email: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <header className="bg-detective-medium border-b border-detective-light py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-crimson rounded-full flex items-center justify-center">
            <span className="text-white font-bold">CP</span>
          </div>
          <Link to="/" className="text-2xl font-bold text-white flex items-center">
            Crimen<span className="text-crimson ml-1">Perfecto</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-gray-300 hover:text-white transition-colors ${location.pathname === "/" ? "text-white font-medium" : ""}`}
          >
            Inicio
          </Link>
          <Link 
            to="/casos" 
            className={`text-gray-300 hover:text-white transition-colors ${location.pathname === "/casos" ? "text-white font-medium" : ""}`}
          >
            Casos
          </Link>
          <Link 
            to="/dashboard" 
            className={`text-gray-300 hover:text-white transition-colors ${location.pathname === "/dashboard" ? "text-white font-medium" : ""}`}
          >
            Dashboard
          </Link>
          {isLoggedIn && (
            <Link 
              to="/profile" 
              className={`text-gray-300 hover:text-white transition-colors ${location.pathname === "/profile" ? "text-white font-medium" : ""}`}
            >
              Mi Perfil
            </Link>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
            <Search className="h-5 w-5" />
          </Button>
          
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Bell className="h-5 w-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={user?.name || "Usuario"} />
                      <AvatarFallback className="bg-crimson">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-detective-medium border-detective-light text-white" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.name || "Usuario"}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-detective-light" />
                  <DropdownMenuItem 
                    className="text-gray-300 hover:text-white hover:bg-detective-light focus:bg-detective-light cursor-pointer"
                    asChild
                  >
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-gray-300 hover:text-white hover:bg-detective-light focus:bg-detective-light cursor-pointer"
                    asChild
                  >
                    <Link to="/profile">Mi Perfil</Link>
                  </DropdownMenuItem>
                  {user?.email === "admin@crimenperfecto.com" && (
                    <DropdownMenuItem 
                      className="text-gray-300 hover:text-white hover:bg-detective-light focus:bg-detective-light cursor-pointer"
                      asChild
                    >
                      <Link to="/admin">Panel Admin</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-detective-light" />
                  <DropdownMenuItem 
                    className="text-gray-300 hover:text-white hover:bg-detective-light focus:bg-detective-light cursor-pointer"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex space-x-2">
              <Button asChild variant="ghost" className="text-gray-300 hover:text-white">
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Iniciar Sesión</span>
                </Link>
              </Button>
              <Button asChild className="bg-crimson hover:bg-crimson-dark hidden sm:flex">
                <Link to="/register">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Registrarse
                </Link>
              </Button>
            </div>
          )}
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-detective-dark border-t border-b border-detective-light py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`text-gray-300 hover:text-white transition-colors py-2 ${location.pathname === "/" ? "text-white font-medium" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              to="/casos" 
              className={`text-gray-300 hover:text-white transition-colors py-2 ${location.pathname === "/casos" ? "text-white font-medium" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Casos
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-gray-300 hover:text-white transition-colors py-2 ${location.pathname === "/dashboard" ? "text-white font-medium" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            {isLoggedIn ? (
              <>
                <Link 
                  to="/profile" 
                  className={`text-gray-300 hover:text-white transition-colors py-2 ${location.pathname === "/profile" ? "text-white font-medium" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mi Perfil
                </Link>
                {user?.email === "admin@crimenperfecto.com" && (
                  <Link 
                    to="/admin" 
                    className={`text-gray-300 hover:text-white transition-colors py-2 ${location.pathname === "/admin" ? "text-white font-medium" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Panel Admin
                  </Link>
                )}
                <button 
                  className="text-left text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-detective-light">
                <Button asChild variant="ghost" className="justify-start">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Iniciar Sesión
                  </Link>
                </Button>
                <Button asChild className="bg-crimson hover:bg-crimson-dark">
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Registrarse
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
