
import { useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Camera, Users, MessageSquare, Newspaper, ChevronLeft, ChevronRight, Clock, Calendar, User } from "lucide-react";

// Mock case data
const caseDetails = {
  "caso-1": {
    title: "El Misterio de la Mansión Abandonada",
    description: "Un cuerpo ha sido encontrado en una antigua mansión abandonada a las afueras de la ciudad. La víctima, un hombre de mediana edad, no llevaba identificación. No hay signos evidentes de la causa de muerte. Tu trabajo es investigar qué ocurrió y quién es el responsable.",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    date: "12/05/2023",
    investigator: "Det. García",
    location: "Mansión Blackwood, Carretera Norte Km 21",
    status: "Abierto",
    reports: [
      {
        id: "inf-1",
        title: "Informe Preliminar",
        date: "12/05/2023",
        content: "El cuerpo fue encontrado por un grupo de adolescentes que entraron a la mansión. La víctima es un hombre caucásico de entre 40-50 años. No hay signos visibles de violencia. Se estima que el fallecimiento ocurrió hace aproximadamente 24 horas. La mansión ha estado abandonada por más de 10 años pero se mantiene en buen estado.",
      },
      {
        id: "inf-2",
        title: "Autopsia Preliminar",
        date: "13/05/2023",
        content: "El análisis inicial indica posible envenenamiento. No hay lesiones externas significativas. Se han enviado muestras al laboratorio toxicológico. El hombre presenta signos de buena salud general previa a la muerte.",
      },
    ],
    evidence: [
      {
        id: "ev-1",
        type: "image",
        title: "Escena del crimen",
        description: "El cuerpo fue encontrado en el salón principal de la mansión",
        url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      },
      {
        id: "ev-2",
        type: "image",
        title: "Sustancia desconocida",
        description: "Polvo blanco encontrado cerca de la víctima",
        url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      },
      {
        id: "ev-3",
        type: "text",
        title: "Nota encontrada",
        description: "Mensaje escrito a mano hallado en el bolsillo de la víctima",
        content: "La reunión es a las 21:00. Ven solo. Trae lo acordado. -M",
      },
    ],
    testimonies: [
      {
        id: "test-1",
        name: "Lucas Fernández",
        role: "Testigo",
        statement: "Estaba explorando la mansión con mis amigos cuando encontramos el cuerpo en el salón principal. No tocamos nada y llamamos inmediatamente a la policía. Nunca habíamos visto a esa persona antes.",
        date: "12/05/2023",
      },
      {
        id: "test-2",
        name: "Oficial Ramírez",
        role: "Primer respondiente",
        statement: "Al llegar a la escena encontré a cuatro adolescentes esperando fuera de la propiedad. Me condujeron al interior donde confirmé el fallecimiento. La mansión no mostraba signos de entrada forzada.",
        date: "12/05/2023",
      },
    ],
    news: [
      {
        id: "news-1",
        title: "Cuerpo encontrado en la misteriosa Mansión Blackwood",
        source: "El Diario Local",
        date: "13/05/2023",
        excerpt: "Un cadáver no identificado fue descubierto ayer en la abandonada Mansión Blackwood, propiedad que ha sido objeto de leyendas urbanas durante décadas. La policía investiga las circunstancias...",
        content: "Un cadáver no identificado fue descubierto ayer en la abandonada Mansión Blackwood, propiedad que ha sido objeto de leyendas urbanas durante décadas. La policía investiga las circunstancias de la muerte mientras intenta identificar a la víctima. La mansión, abandonada desde el fallecimiento de su último propietario, el excéntrico empresario Victor Blackwood, ha sido frecuentada por curiosos y cazadores de fantasmas. Fuentes cercanas a la investigación indican que no hay signos evidentes de violencia.",
      },
      {
        id: "news-2",
        title: "La historia olvidada de la Mansión Blackwood",
        source: "Historia Local",
        date: "14/05/2023",
        excerpt: "Tras el descubrimiento de un cuerpo en la legendaria Mansión Blackwood, recordamos la turbulenta historia de esta propiedad y sus misteriosos propietarios...",
        content: "La Mansión Blackwood fue construida en 1887 por el magnate industrial Edward Blackwood. A lo largo de su historia, la propiedad ha sido escenario de numerosos eventos trágicos, incluyendo el supuesto suicidio de Elizabeth Blackwood en 1912 y la misteriosa desaparición del heredero Thomas Blackwood en 1954. La mansión quedó deshabitada tras la muerte de Victor Blackwood en 2010, último descendiente conocido de la familia. Curiosamente, Victor Blackwood fue un reconocido toxicólogo que trabajó para importantes laboratorios farmacéuticos antes de retirarse.",
      },
    ],
  },
  // Otros casos irían aquí
};

const Investigacion = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("expediente");
  
  // Check if case exists
  if (!id || !caseDetails[id as keyof typeof caseDetails]) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Caso no encontrado</h1>
          <p className="text-gray-400 mb-8">El caso que estás buscando no existe o ha sido archivado.</p>
          <Button asChild>
            <a href="/casos">Volver a casos</a>
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  const caseData = caseDetails[id as keyof typeof caseDetails];
  
  return (
    <AppLayout>
      {/* Case header */}
      <div className="bg-detective-medium border-b border-detective-light">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="flex items-center mb-4">
                <Button variant="ghost" size="sm" asChild className="mr-2 p-0 hover:bg-transparent">
                  <a href="/casos" className="text-gray-400 hover:text-gray-200">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Volver a casos
                  </a>
                </Button>
                
                <div className="text-evidence-red font-medium px-2 py-0.5 bg-evidence-red/10 rounded">
                  Caso Abierto
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-2">{caseData.title}</h1>
              
              <div className="flex flex-wrap gap-y-2 text-sm text-gray-400 mb-4">
                <div className="flex items-center mr-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Fecha: {caseData.date}</span>
                </div>
                <div className="flex items-center mr-4">
                  <User className="h-4 w-4 mr-1" />
                  <span>Investigador: {caseData.investigator}</span>
                </div>
                <div className="flex items-center mr-4">
                  <span>Ubicación: {caseData.location}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button className="bg-crimson hover:bg-crimson-dark text-white">
                Presentar Conclusiones
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Investigation tabs */}
      <div className="bg-detective-dark">
        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-detective-medium w-full justify-start overflow-x-auto">
              <TabsTrigger value="expediente" className="data-[state=active]:bg-detective-light">
                <FileText className="h-4 w-4 mr-2" />
                Expediente
              </TabsTrigger>
              <TabsTrigger value="evidencias" className="data-[state=active]:bg-detective-light">
                <Camera className="h-4 w-4 mr-2" />
                Evidencias
              </TabsTrigger>
              <TabsTrigger value="testimonios" className="data-[state=active]:bg-detective-light">
                <Users className="h-4 w-4 mr-2" />
                Testimonios
              </TabsTrigger>
              <TabsTrigger value="noticias" className="data-[state=active]:bg-detective-light">
                <Newspaper className="h-4 w-4 mr-2" />
                Noticias
              </TabsTrigger>
              <TabsTrigger value="interrogatorio" className="data-[state=active]:bg-detective-light">
                <MessageSquare className="h-4 w-4 mr-2" />
                Interrogatorio
              </TabsTrigger>
            </TabsList>
            
            {/* Case File Tab */}
            <TabsContent value="expediente" className="mt-6">
              <div className="bg-detective-medium rounded-lg border border-detective-light p-6 mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Descripción del Caso</h2>
                <p className="text-gray-300">{caseData.description}</p>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-4">Informes Oficiales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseData.reports.map((report) => (
                  <Card key={report.id} className="bg-detective-medium border-detective-light">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-white">{report.title}</h3>
                        <span className="text-sm text-gray-400">{report.date}</span>
                      </div>
                      <p className="text-gray-300">{report.content}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Evidence Tab */}
            <TabsContent value="evidencias" className="mt-6">
              <h2 className="text-xl font-bold text-white mb-4">Evidencias Recolectadas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseData.evidence.map((evidence) => (
                  <div key={evidence.id} className="evidence-item bg-detective-medium">
                    {evidence.type === "image" && (
                      <div className="mb-4 h-48 overflow-hidden rounded">
                        <img
                          src={evidence.url}
                          alt={evidence.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-white mb-2">{evidence.title}</h3>
                    <p className="text-gray-400 mb-3">{evidence.description}</p>
                    {evidence.type === "text" && (
                      <div className="p-3 bg-detective-dark rounded border border-detective-light mt-4">
                        <p className="text-gray-300 italic">"{evidence.content}"</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Testimonies Tab */}
            <TabsContent value="testimonios" className="mt-6">
              <h2 className="text-xl font-bold text-white mb-4">Declaraciones de Testigos</h2>
              <div className="space-y-6">
                {caseData.testimonies.map((testimony) => (
                  <div key={testimony.id} className="bg-detective-medium rounded-lg border border-detective-light p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{testimony.name}</h3>
                        <p className="text-gray-400">{testimony.role}</p>
                      </div>
                      <span className="text-sm text-gray-400 mt-2 md:mt-0">{testimony.date}</span>
                    </div>
                    <blockquote className="border-l-2 border-crimson pl-4 italic text-gray-300">
                      "{testimony.statement}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* News Tab */}
            <TabsContent value="noticias" className="mt-6">
              <h2 className="text-xl font-bold text-white mb-4">Artículos Relacionados</h2>
              <div className="space-y-6">
                {caseData.news.map((article) => (
                  <div key={article.id} className="bg-detective-medium rounded-lg border border-detective-light overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-white">{article.title}</h3>
                        <span className="text-sm text-gray-400">{article.date}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">Fuente: {article.source}</p>
                      <p className="text-gray-300 mb-4">{article.excerpt}</p>
                      <Button variant="outline" className="border-detective-light text-white hover:bg-detective-light/10">
                        Leer artículo completo
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Interrogation Tab (Placeholder for chatbot) */}
            <TabsContent value="interrogatorio" className="mt-6">
              <div className="bg-detective-medium rounded-lg border border-detective-light p-6 text-center">
                <h2 className="text-xl font-bold text-white mb-4">Interrogatorio Virtual</h2>
                <p className="text-gray-300 mb-6">
                  Esta función permite interrogar a sospechosos y testigos mediante un sistema de chatbot inteligente.
                  El chatbot responderá basándose en la personalidad y conocimientos de cada personaje.
                </p>
                <div className="bg-detective-dark rounded-lg border border-detective-light p-8 max-w-2xl mx-auto">
                  <p className="text-gray-400 mb-4">Selecciona un personaje para interrogar:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {caseData.testimonies.map((testimony) => (
                      <Button
                        key={testimony.id}
                        variant="outline"
                        className="border-detective-light text-white hover:bg-detective-light/10"
                      >
                        {testimony.name} ({testimony.role})
                      </Button>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm italic">
                    Esta función estará disponible próximamente.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default Investigacion;
