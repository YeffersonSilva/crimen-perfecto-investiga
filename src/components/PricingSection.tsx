
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const PricingSection = () => {
  return (
    <section className="py-16 bg-detective-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Planes de Suscripción</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades de investigación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card className="bg-detective-medium border-detective-light text-white transform transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <CardTitle className="text-xl">Plan Básico</CardTitle>
              <CardDescription className="text-gray-400">Para investigadores aficionados</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">Gratis</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>3 casos por mes</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Casos de dificultad fácil</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Perfil básico</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link to="/register">Registrarse Gratis</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Monthly Plan */}
          <Card className="bg-detective-medium border-crimson text-white transform transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-crimson text-white text-xs px-3 py-1 uppercase font-bold">Popular</div>
            <CardHeader>
              <CardTitle className="text-xl">Plan Detective</CardTitle>
              <CardDescription className="text-gray-400">Para investigadores dedicados</CardDescription>
              <div className="mt-4 flex items-end">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-gray-400 ml-2">/ mes</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Casos ilimitados</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Todos los niveles de dificultad</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Estadísticas avanzadas</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Contenido exclusivo</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-crimson hover:bg-crimson-dark">
                <Link to="/register?plan=monthly">Comenzar Ahora</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Annual Plan */}
          <Card className="bg-detective-medium border-detective-light text-white transform transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <CardTitle className="text-xl">Plan Élite Anual</CardTitle>
              <CardDescription className="text-gray-400">Para investigadores profesionales</CardDescription>
              <div className="mt-4 flex items-end">
                <span className="text-4xl font-bold">$99.99</span>
                <span className="text-gray-400 ml-2">/ año</span>
                <span className="ml-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md">Ahorra 16%</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Todo del plan Detective</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Acceso anticipado a casos nuevos</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Comunidad privada de detectives</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Soporte prioritario</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link to="/register?plan=annual">Suscripción Anual</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
