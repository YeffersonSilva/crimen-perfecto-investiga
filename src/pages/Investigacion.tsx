import { useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Camera,
  Users,
  MessageSquare,
  Newspaper,
  ChevronLeft,
  Clock,
  Calendar,
  User,
  Download,
  ExternalLink,
  File,
  FileVideo,
  FileImage,
  Plus,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Mock case data
const caseDetails = {
  "caso-1": {
    title: "El Misterio de la Mansión Abandonada",
    description:
      "Un cuerpo ha sido encontrado en una antigua mansión abandonada a las afueras de la ciudad. La víctima, un hombre de mediana edad, no llevaba identificación. No hay signos evidentes de la causa de muerte. Tu trabajo es investigar qué ocurrió y quién es el responsable.",
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
        content:
          "El cuerpo fue encontrado por un grupo de adolescentes que entraron a la mansión. La víctima es un hombre caucásico de entre 40-50 años. No hay signos visibles de violencia. Se estima que el fallecimiento ocurrió hace aproximadamente 24 horas. La mansión ha estado abandonada por más de 10 años pero se mantiene en buen estado.",
        type: "text",
      },
      {
        id: "inf-2",
        title: "Autopsia Preliminar",
        date: "13/05/2023",
        content:
          "El análisis inicial indica posible envenenamiento. No hay lesiones externas significativas. Se han enviado muestras al laboratorio toxicológico. El hombre presenta signos de buena salud general previa a la muerte.",
        type: "text",
      },
      {
        id: "inf-3",
        title: "Informe Toxicológico",
        date: "15/05/2023",
        content:
          "Las pruebas han detectado trazas de sustancias no identificadas en el organismo de la víctima. Se requiere un análisis más profundo.",
        type: "pdf",
        url: "https://example.com/informe.pdf",
      },
    ],
    evidence: [
      {
        id: "ev-1",
        type: "image",
        title: "Escena del crimen",
        description:
          "El cuerpo fue encontrado en el salón principal de la mansión",
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
        description:
          "Mensaje escrito a mano hallado en el bolsillo de la víctima",
        content: "La reunión es a las 21:00. Ven solo. Trae lo acordado. -M",
      },
      {
        id: "ev-4",
        type: "pdf",
        title: "Planos de la mansión",
        description: "Documentos arquitectónicos originales de la propiedad",
        url: "https://example.com/planos.pdf",
      },
      {
        id: "ev-5",
        type: "video",
        title: "Grabación de seguridad",
        description: "Cámara de la entrada principal, horas antes del suceso",
        url: "https://example.com/video.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      },
    ],
    testimonies: [
      {
        id: "test-1",
        name: "Lucas Fernández",
        role: "Testigo",
        statement:
          "Estaba explorando la mansión con mis amigos cuando encontramos el cuerpo en el salón principal. No tocamos nada y llamamos inmediatamente a la policía. Nunca habíamos visto a esa persona antes.",
        date: "12/05/2023",
        audioUrl: "https://example.com/audio1.mp3",
        transcriptUrl: "https://example.com/transcript1.pdf",
      },
      {
        id: "test-2",
        name: "Oficial Ramírez",
        role: "Primer respondiente",
        statement:
          "Al llegar a la escena encontré a cuatro adolescentes esperando fuera de la propiedad. Me condujeron al interior donde confirmé el fallecimiento. La mansión no mostraba signos de entrada forzada.",
        date: "12/05/2023",
        videoUrl: "https://example.com/interview.mp4",
        transcriptUrl: "https://example.com/transcript2.pdf",
      },
    ],
    news: [
      {
        id: "news-1",
        title: "Cuerpo encontrado en la misteriosa Mansión Blackwood",
        source: "El Diario Local",
        date: "13/05/2023",
        excerpt:
          "Un cadáver no identificado fue descubierto ayer en la abandonada Mansión Blackwood, propiedad que ha sido objeto de leyendas urbanas durante décadas. La policía investiga las circunstancias...",
        content:
          "Un cadáver no identificado fue descubierto ayer en la abandonada Mansión Blackwood, propiedad que ha sido objeto de leyendas urbanas durante décadas. La policía investiga las circunstancias de la muerte mientras intenta identificar a la víctima. La mansión, abandonada desde el fallecimiento de su último propietario, el excéntrico empresario Victor Blackwood, ha sido frecuentada por curiosos y cazadores de fantasmas. Fuentes cercanas a la investigación indican que no hay signos evidentes de violencia.",
        pdfUrl: "https://example.com/news1.pdf",
        imageUrl:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      },
      {
        id: "news-2",
        title: "La historia olvidada de la Mansión Blackwood",
        source: "Historia Local",
        date: "14/05/2023",
        excerpt:
          "Tras el descubrimiento de un cuerpo en la legendaria Mansión Blackwood, recordamos la turbulenta historia de esta propiedad y sus misteriosos propietarios...",
        content:
          "La Mansión Blackwood fue construida en 1887 por el magnate industrial Edward Blackwood. A lo largo de su historia, la propiedad ha sido escenario de numerosos eventos trágicos, incluyendo el supuesto suicidio de Elizabeth Blackwood en 1912 y la misteriosa desaparición del heredero Thomas Blackwood en 1954. La mansión quedó deshabitada tras la muerte de Victor Blackwood en 2010, último descendiente conocido de la familia. Curiosamente, Victor Blackwood fue un reconocido toxicólogo que trabajó para importantes laboratorios farmacéuticos antes de retirarse.",
        pdfUrl: "https://example.com/news2.pdf",
        imageUrl:
          "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      },
    ],
  },
  // Otros casos irían aquí
};

// Helper function to render content based on type
const RenderMedia = ({ item }) => {
  const { type } = item;

  switch (type) {
    case "image":
      return (
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative group cursor-pointer rounded overflow-hidden h-48">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="text-white h-6 w-6" />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{item.title}</DialogTitle>
              <DialogDescription>{item.description}</DialogDescription>
            </DialogHeader>
            <div className="mt-4 max-h-[70vh] overflow-auto">
              <img src={item.url} alt={item.title} className="w-full h-auto" />
            </div>
          </DialogContent>
        </Dialog>
      );

    case "pdf":
      return (
        <div className="flex items-center p-4 border border-detective-light rounded-md bg-detective-dark">
          <FileText className="h-8 w-8 text-crimson mr-4" />
          <div className="flex-1">
            <h4 className="text-white font-medium">{item.title}</h4>
            <p className="text-gray-400 text-sm">
              {item.description || "Documento PDF"}
            </p>
          </div>
          <Button variant="outline" size="sm" className="ml-2" asChild>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" /> Ver
            </a>
          </Button>
          <Button variant="outline" size="sm" className="ml-2" asChild>
            <a href={item.url} download>
              <Download className="h-4 w-4 mr-2" /> Descargar
            </a>
          </Button>
        </div>
      );

    case "video":
      return (
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative group cursor-pointer rounded overflow-hidden h-48">
              <img
                src={
                  item.thumbnail ||
                  "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
                }
                alt={item.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="rounded-full bg-white bg-opacity-25 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>{item.title}</DialogTitle>
              <DialogDescription>{item.description}</DialogDescription>
            </DialogHeader>
            <div className="mt-4 aspect-video">
              <video
                src={item.url}
                controls
                className="w-full h-full"
                poster={item.thumbnail}
              ></video>
            </div>
          </DialogContent>
        </Dialog>
      );

    case "text":
    default:
      return (
        <Collapsible className="w-full border border-detective-light rounded-md overflow-hidden">
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-detective-medium text-left">
            <div>
              <h4 className="text-white font-medium">{item.title}</h4>
              {item.date && (
                <p className="text-gray-400 text-sm">{item.date}</p>
              )}
            </div>
            <div className="text-gray-400">
              <ChevronLeft className="transform transition-transform duration-200 collapsible-rotate" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="bg-detective-dark p-4">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 whitespace-pre-line">
                {item.content}
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      );
  }
};

const AddEvidenceForm = ({ onClose }) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "text",
      content: "",
    },
  });

  const onSubmit = (data) => {
    toast({
      title: "Evidencia añadida",
      description: "La evidencia ha sido añadida al caso.",
    });
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título de la evidencia" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Descripción breve" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Tipo de evidencia</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text" />
                    <FormLabel htmlFor="text" className="cursor-pointer">
                      Texto
                    </FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="image" id="image" />
                    <FormLabel htmlFor="image" className="cursor-pointer">
                      Imagen
                    </FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pdf" id="pdf" />
                    <FormLabel htmlFor="pdf" className="cursor-pointer">
                      PDF
                    </FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="video" />
                    <FormLabel htmlFor="video" className="cursor-pointer">
                      Video
                    </FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("type") === "text" && (
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenido</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escriba el contenido de la evidencia"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        {form.watch("type") === "image" && (
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <FormLabel htmlFor="imageUrl">URL de la imagen</FormLabel>
              <Input
                id="imageUrl"
                placeholder="https://ejemplo.com/imagen.jpg"
                onChange={(e) => form.setValue("content", e.target.value)}
              />
            </div>
          </div>
        )}

        {form.watch("type") === "pdf" && (
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <FormLabel htmlFor="pdfUrl">URL del PDF</FormLabel>
              <Input
                id="pdfUrl"
                placeholder="https://ejemplo.com/documento.pdf"
                onChange={(e) => form.setValue("content", e.target.value)}
              />
            </div>
          </div>
        )}

        {form.watch("type") === "video" && (
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <FormLabel htmlFor="videoUrl">URL del video</FormLabel>
              <Input
                id="videoUrl"
                placeholder="https://ejemplo.com/video.mp4"
                onChange={(e) => form.setValue("content", e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <FormLabel htmlFor="thumbnailUrl">URL de la miniatura</FormLabel>
              <Input
                id="thumbnailUrl"
                placeholder="https://ejemplo.com/thumbnail.jpg"
                onChange={(e) => form.setValue("description", e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Añadir Evidencia</Button>
        </div>
      </form>
    </Form>
  );
};

const Investigacion = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("expediente");
  const [showAddEvidence, setShowAddEvidence] = useState(false);

  // Check if case exists
  if (!id || !caseDetails[id as keyof typeof caseDetails]) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Caso no encontrado
          </h1>
          <p className="text-gray-400 mb-8">
            El caso que estás buscando no existe o ha sido archivado.
          </p>
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
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="mr-2 p-0 hover:bg-transparent"
                >
                  <a
                    href="/casos"
                    className="text-gray-400 hover:text-gray-200"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Volver a casos
                  </a>
                </Button>

                <div className="text-evidence-red font-medium px-2 py-0.5 bg-evidence-red/10 rounded">
                  Caso Abierto
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white mb-2">
                {caseData.title}
              </h1>

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
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="bg-detective-medium w-full justify-start overflow-x-auto">
              <TabsTrigger
                value="expediente"
                className="data-[state=active]:bg-detective-light"
              >
                <FileText className="h-4 w-4 mr-2" />
                Expediente
              </TabsTrigger>
              <TabsTrigger
                value="evidencias"
                className="data-[state=active]:bg-detective-light"
              >
                <Camera className="h-4 w-4 mr-2" />
                Evidencias
              </TabsTrigger>
              <TabsTrigger
                value="testimonios"
                className="data-[state=active]:bg-detective-light"
              >
                <Users className="h-4 w-4 mr-2" />
                Testimonios
              </TabsTrigger>
              <TabsTrigger
                value="noticias"
                className="data-[state=active]:bg-detective-light"
              >
                <Newspaper className="h-4 w-4 mr-2" />
                Noticias
              </TabsTrigger>
              <TabsTrigger
                value="interrogatorio"
                className="data-[state=active]:bg-detective-light"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Interrogatorio
              </TabsTrigger>
            </TabsList>

            {/* Case File Tab */}
            <TabsContent value="expediente" className="mt-6">
              <div className="bg-detective-medium rounded-lg border border-detective-light p-6 mb-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Descripción del Caso
                </h2>
                <p className="text-gray-300">{caseData.description}</p>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">
                  Informes Oficiales
                </h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir Informe
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Añadir nuevo informe</DialogTitle>
                      <DialogDescription>
                        Complete los detalles del nuevo informe para el caso.
                      </DialogDescription>
                    </DialogHeader>
                    <AddEvidenceForm onClose={() => {}} />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {caseData.reports.map((report) => (
                  <RenderMedia key={report.id} item={report} />
                ))}
              </div>
            </TabsContent>

            {/* Evidence Tab */}
            <TabsContent value="evidencias" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  Evidencias Recolectadas
                </h2>
                <Dialog
                  open={showAddEvidence}
                  onOpenChange={setShowAddEvidence}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir Evidencia
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Añadir nueva evidencia</DialogTitle>
                      <DialogDescription>
                        Complete los detalles de la nueva evidencia para el
                        caso.
                      </DialogDescription>
                    </DialogHeader>
                    <AddEvidenceForm
                      onClose={() => setShowAddEvidence(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseData.evidence.map((evidence) => (
                  <div
                    key={evidence.id}
                    className="bg-detective-medium p-4 rounded-lg border border-detective-light"
                  >
                    <div className="mb-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-white">
                          {evidence.title}
                        </h3>
                        <div className="flex">
                          {evidence.type === "text" && (
                            <File className="h-4 w-4 text-gray-400" />
                          )}
                          {evidence.type === "image" && (
                            <FileImage className="h-4 w-4 text-blue-400" />
                          )}
                          {evidence.type === "video" && (
                            <FileVideo className="h-4 w-4 text-green-400" />
                          )}
                          {evidence.type === "pdf" && (
                            <FileText className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {evidence.description}
                      </p>
                    </div>

                    <RenderMedia item={evidence} />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Testimonies Tab */}
            <TabsContent value="testimonios" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  Declaraciones de Testigos
                </h2>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir Testimonio
                </Button>
              </div>

              <div className="space-y-6">
                {caseData.testimonies.map((testimony) => (
                  <div
                    key={testimony.id}
                    className="bg-detective-medium rounded-lg border border-detective-light overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {testimony.name}
                          </h3>
                          <p className="text-gray-400">{testimony.role}</p>
                        </div>
                        <span className="text-sm text-gray-400 mt-2 md:mt-0">
                          {testimony.date}
                        </span>
                      </div>

                      <blockquote className="border-l-2 border-crimson pl-4 italic text-gray-300 mb-4">
                        "{testimony.statement}"
                      </blockquote>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {testimony.audioUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={testimony.audioUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2"
                              >
                                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                                <line x1="12" y1="2" x2="12" y2="12"></line>
                              </svg>
                              Escuchar Audio
                            </a>
                          </Button>
                        )}

                        {testimony.videoUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={testimony.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FileVideo className="h-4 w-4 mr-2" />
                              Ver Video
                            </a>
                          </Button>
                        )}

                        {testimony.transcriptUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={testimony.transcriptUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Transcripción
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* News Tab */}
            <TabsContent value="noticias" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  Artículos Relacionados
                </h2>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir Artículo
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseData.news.map((article) => (
                  <div
                    key={article.id}
                    className="bg-detective-medium rounded-lg border border-detective-light overflow-hidden"
                  >
                    {article.imageUrl && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {article.title}
                        </h3>
                        <span className="text-sm text-gray-400">
                          {article.date}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        Fuente: {article.source}
                      </p>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between mt-4"
                          >
                            <span>Leer artículo completo</span>
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{article.title}</DialogTitle>
                            <DialogDescription>
                              {article.source} • {article.date}
                            </DialogDescription>
                          </DialogHeader>

                          {article.imageUrl && (
                            <div
