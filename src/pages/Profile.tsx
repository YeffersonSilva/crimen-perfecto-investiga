
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Check, Save, UserCog, CreditCard, Key, Clock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser 
      ? JSON.parse(storedUser) 
      : { name: "Detective Anónimo", email: "detective@ejemplo.com" };
  });
  
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedUser = { ...userData, name: formData.name, email: formData.email };
      setUserData(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      setLoading(false);
      toast({
        title: "Perfil actualizado",
        description: "Tus cambios han sido guardados correctamente.",
      });
    }, 1000);
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setFormData(prev => ({ 
        ...prev, 
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      
      setLoading(false);
      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada correctamente.",
      });
    }, 1000);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    });
    navigate("/");
  };
  
  return (
    <AppLayout>
      <div className="bg-detective-dark py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile sidebar */}
            <div className="w-full md:w-1/3 xl:w-1/4">
              <Card className="bg-detective-medium border-detective-light text-white">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/placeholder.svg" alt={userData.name} />
                      <AvatarFallback className="bg-crimson text-xl">
                        {userData.name.split(" ").map((n: string) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{userData.name}</CardTitle>
                    <CardDescription className="text-gray-400">{userData.email}</CardDescription>
                    <Badge className="mt-3 bg-crimson">Plan Detective</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Miembro desde</span>
                    <span>Mayo 2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Casos resueltos</span>
                    <span>12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Nivel</span>
                    <span>Investigador Senior</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-detective-light text-white hover:bg-detective-light/20"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Profile content */}
            <div className="w-full md:w-2/3 xl:w-3/4">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full border-b border-detective-light bg-detective-medium mb-6 rounded-t-lg rounded-b-none">
                  <TabsTrigger value="profile" className="data-[state=active]:bg-detective-light/20">
                    <UserCog className="mr-2 h-4 w-4" />
                    Datos Personales
                  </TabsTrigger>
                  <TabsTrigger value="security" className="data-[state=active]:bg-detective-light/20">
                    <Key className="mr-2 h-4 w-4" />
                    Seguridad
                  </TabsTrigger>
                  <TabsTrigger value="subscription" className="data-[state=active]:bg-detective-light/20">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Suscripción
                  </TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-detective-light/20">
                    <Clock className="mr-2 h-4 w-4" />
                    Historial
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card className="bg-detective-medium border-detective-light text-white">
                    <CardHeader>
                      <CardTitle>Información Personal</CardTitle>
                      <CardDescription className="text-gray-400">
                        Actualiza tu información personal y de contacto
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre completo</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-detective-dark border-detective-light text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Correo electrónico</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-detective-dark border-detective-light text-white"
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="bg-crimson hover:bg-crimson-dark"
                          disabled={loading}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Guardar Cambios
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security">
                  <Card className="bg-detective-medium border-detective-light text-white">
                    <CardHeader>
                      <CardTitle>Seguridad de la Cuenta</CardTitle>
                      <CardDescription className="text-gray-400">
                        Actualiza tu contraseña para mantener tu cuenta segura
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Contraseña actual</Label>
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="bg-detective-dark border-detective-light text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">Nueva contraseña</Label>
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="bg-detective-dark border-detective-light text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="bg-detective-dark border-detective-light text-white"
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="bg-crimson hover:bg-crimson-dark"
                          disabled={loading}
                        >
                          <Key className="mr-2 h-4 w-4" />
                          Actualizar Contraseña
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="subscription">
                  <Card className="bg-detective-medium border-detective-light text-white">
                    <CardHeader>
                      <CardTitle>Tu Suscripción</CardTitle>
                      <CardDescription className="text-gray-400">
                        Administra tu plan y detalles de facturación
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-detective-dark p-6 rounded-lg border border-detective-light">
                        <h3 className="text-lg font-medium mb-2 flex items-center">
                          Plan Detective <Badge className="ml-2 bg-crimson">Activo</Badge>
                        </h3>
                        <p className="text-gray-400 mb-4">$9.99 por mes</p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <Check className="text-green-500 mr-2 h-4 w-4" />
                            <span>Casos ilimitados</span>
                          </div>
                          <div className="flex items-center">
                            <Check className="text-green-500 mr-2 h-4 w-4" />
                            <span>Todos los niveles de dificultad</span>
                          </div>
                          <div className="flex items-center">
                            <Check className="text-green-500 mr-2 h-4 w-4" />
                            <span>Estadísticas avanzadas</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                          Tu próxima facturación: <span className="text-white">15 de Junio, 2023</span>
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" className="border-detective-light text-white hover:bg-detective-light/20">
                            Cancelar Suscripción
                          </Button>
                          <Button className="bg-crimson hover:bg-crimson-dark">
                            Cambiar Plan
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Historial de Pagos</h3>
                        <div className="border border-detective-light rounded-md overflow-hidden">
                          <div className="grid grid-cols-3 bg-detective-dark p-3 text-sm font-medium text-gray-300">
                            <div>Fecha</div>
                            <div>Cantidad</div>
                            <div>Estado</div>
                          </div>
                          <div className="divide-y divide-detective-light">
                            <div className="grid grid-cols-3 p-3 text-sm">
                              <div>15 Mayo, 2023</div>
                              <div>$9.99</div>
                              <div><Badge variant="outline" className="border-green-500 text-green-500">Pagado</Badge></div>
                            </div>
                            <div className="grid grid-cols-3 p-3 text-sm">
                              <div>15 Abril, 2023</div>
                              <div>$9.99</div>
                              <div><Badge variant="outline" className="border-green-500 text-green-500">Pagado</Badge></div>
                            </div>
                            <div className="grid grid-cols-3 p-3 text-sm">
                              <div>15 Marzo, 2023</div>
                              <div>$9.99</div>
                              <div><Badge variant="outline" className="border-green-500 text-green-500">Pagado</Badge></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history">
                  <Card className="bg-detective-medium border-detective-light text-white">
                    <CardHeader>
                      <CardTitle>Historial de Casos</CardTitle>
                      <CardDescription className="text-gray-400">
                        Revisa todos los casos que has investigado
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Recent case item */}
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="border border-detective-light rounded-lg p-4 hover:bg-detective-dark/50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">El Misterio de la Mansión Abandonada</h3>
                              <Badge variant={i === 1 ? "default" : "outline"} className={i === 1 ? "bg-blue-500" : "border-green-500 text-green-500"}>
                                {i === 1 ? "En Progreso" : "Resuelto"}
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">
                              Último acceso: Hace {i} día{i > 1 ? "s" : ""}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-400">
                                <span className="mr-4">Dificultad: Fácil</span>
                                <span>Tiempo: 45 min</span>
                              </div>
                              <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-detective-dark">
                                Continuar
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
