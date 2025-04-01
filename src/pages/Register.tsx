
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import AppLayout from "@/components/AppLayout";
import { Eye, EyeOff, UserPlus, Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  plan: z.enum(["free", "monthly", "annual"]),
});

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get plan from URL query parameter
  const searchParams = new URLSearchParams(location.search);
  const initialPlan = searchParams.get("plan") || "free";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      plan: initialPlan === "annual" ? "annual" : initialPlan === "monthly" ? "monthly" : "free",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Mock successful registration
      localStorage.setItem("user", JSON.stringify({ email: values.email, name: values.name }));
      
      toast({
        title: "Registro exitoso",
        description: "¡Bienvenido a CrimenPerfecto!",
      });
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-detective-dark py-12">
        <div className="w-full max-w-md px-4">
          <Card className="bg-detective-medium border-detective-light text-white">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Crear una cuenta</CardTitle>
              <CardDescription className="text-center text-gray-400">
                Ingresa tus datos para registrarte en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Nombre completo</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="John Doe"
                            className="bg-detective-dark border-detective-light text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="detective@ejemplo.com"
                            className="bg-detective-dark border-detective-light text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="bg-detective-dark border-detective-light text-white pr-10"
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="plan"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Selecciona tu plan</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-3 gap-4"
                          >
                            <FormItem>
                              <FormLabel className="cursor-pointer [&:has([data-state=checked])>div]:border-crimson">
                                <FormControl>
                                  <RadioGroupItem
                                    value="free"
                                    className="sr-only"
                                  />
                                </FormControl>
                                <div className="border rounded-md p-4 border-detective-light hover:border-gray-400 transition-colors">
                                  <span className="block font-medium">Básico</span>
                                  <span className="block text-gray-400 text-sm">Gratis</span>
                                </div>
                              </FormLabel>
                            </FormItem>
                            <FormItem>
                              <FormLabel className="cursor-pointer [&:has([data-state=checked])>div]:border-crimson">
                                <FormControl>
                                  <RadioGroupItem
                                    value="monthly"
                                    className="sr-only"
                                  />
                                </FormControl>
                                <div className="border rounded-md p-4 border-detective-light hover:border-gray-400 transition-colors">
                                  <span className="block font-medium">Detective</span>
                                  <span className="block text-gray-400 text-sm">$9.99/mes</span>
                                </div>
                              </FormLabel>
                            </FormItem>
                            <FormItem>
                              <FormLabel className="cursor-pointer [&:has([data-state=checked])>div]:border-crimson">
                                <FormControl>
                                  <RadioGroupItem
                                    value="annual"
                                    className="sr-only"
                                  />
                                </FormControl>
                                <div className="border rounded-md p-4 border-detective-light hover:border-gray-400 transition-colors">
                                  <span className="block font-medium">Élite</span>
                                  <span className="block text-gray-400 text-sm">$99.99/año</span>
                                </div>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-crimson hover:bg-crimson-dark"
                    disabled={loading}
                  >
                    {loading ? "Registrando..." : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" /> Crear Cuenta
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <p className="text-center w-full text-sm text-gray-400">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                  Inicia sesión
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Register;
