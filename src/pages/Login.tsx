
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import AppLayout from "@/components/AppLayout";
import { Eye, EyeOff, LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate login API call
    setTimeout(() => {
      setLoading(false);
      // Mock successful login
      if (email && password) {
        // Store user in session/localStorage
        localStorage.setItem("user", JSON.stringify({ email }));
        
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido a CrimenPerfecto",
        });
        navigate("/dashboard");
      } else {
        setError("Por favor, introduce tu correo electrónico y contraseña");
      }
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-detective-dark py-12">
        <div className="w-full max-w-md px-4">
          <Card className="bg-detective-medium border-detective-light text-white">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
              <CardDescription className="text-center text-gray-400">
                Ingresa tus credenciales para acceder a tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="detective@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-detective-dark border-detective-light text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-detective-dark border-detective-light text-white pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-crimson hover:bg-crimson-dark"
                  disabled={loading}
                >
                  {loading ? "Iniciando sesión..." : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-detective-light" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-detective-medium px-2 text-gray-400">o</span>
                </div>
              </div>
              <p className="text-center text-sm text-gray-400">
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                  Regístrate
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;
