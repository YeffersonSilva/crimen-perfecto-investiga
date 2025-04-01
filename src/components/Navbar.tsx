
import { Link } from "react-router-dom";
import { Search, FileText, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
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
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">
            Inicio
          </Link>
          <Link to="/casos" className="text-gray-300 hover:text-white transition-colors">
            Casos
          </Link>
          <Link to="/perfil" className="text-gray-300 hover:text-white transition-colors">
            Mi Perfil
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
