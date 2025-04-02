
import { useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  MapPin,
  Search,
  Coffee,
  AlertTriangle,
  Bookmark,
  Paperclip,
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
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

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
    characters: [
      {
        id: "char-1",
        name: "Victor Blackwood",
        role: "Ex-propietario fallecido",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        status: "Fallecido",
        background: "Último miembro conocido de la familia Blackwood. Toxicólogo retirado que trabajó para importantes laboratorios farmacéuticos. Falleció en 2010.",
        details: [
          { label: "Edad al fallecer", value: "78 años" },
          { label: "Profesión", value: "Toxicólogo" },
          { label: "Conexión con el caso", value: "Propietario original de la mansión" },
          { label: "Estado", value: "Fallecido (2010)" },
          { label: "Relaciones conocidas", value: "Sin descendientes conocidos" }
        ],
        notes: "Victor Blackwood vivió en solitario durante sus últimos años. Sus investigaciones en toxicología le valieron reconocimiento internacional, aunque también generaron controversias por sus métodos poco ortodoxos."
      },
      {
        id: "char-2",
        name: "Margaret Winters",
        role: "Ama de llaves retirada",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        status: "Viva",
        background: "Trabajó para la familia Blackwood durante más de 40 años. Se retiró tras la muerte de Victor Blackwood. Conoce todos los secretos de la mansión y de la familia.",
        details: [
          { label: "Edad", value: "82 años" },
          { label: "Profesión", value: "Ama de llaves (retirada)" },
          { label: "Años de servicio", value: "1965-2010" },
          { label: "Residencia actual", value: "Villa Serenidad, Calle Roble 45" },
          { label: "Relación con la víctima", value: "Desconocida" }
        ],
        notes: "Winters fue extremadamente leal a la familia Blackwood. Tiene una memoria excepcional y conoce cada rincón de la mansión."
      },
      {
        id: "char-3",
        name: "Lucas Fernández",
        role: "Adolescente testigo",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
        status: "Vivo",
        background: "Estudiante de secundaria aficionado a explorar lugares abandonados. Encontró el cadáver junto con sus amigos y llamó a la policía.",
        details: [
          { label: "Edad", value: "17 años" },
          { label: "Ocupación", value: "Estudiante" },
          { label: "Conexión con el caso", value: "Descubridor del cuerpo" },
          { label: "Teléfono", value: "555-1234" },
          { label: "Dirección", value: "Av. Principal 234, Ciudad" }
        ],
        notes: "Lucas ha visitado la mansión en múltiples ocasiones con anterioridad. Afirma que nunca había visto nada extraño hasta el día del descubrimiento."
      },
      {
        id: "char-4",
        name: "Dr. Elena Ruiz",
        role: "Médico forense",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
        status: "Viva",
        background: "Responsable de la autopsia preliminar. Especialista en toxicología forense con 15 años de experiencia.",
        details: [
          { label: "Edad", value: "42 años" },
          { label: "Especialidad", value: "Toxicología forense" },
          { label: "Años de experiencia", value: "15" },
          { label: "Institución", value: "Instituto Forense Municipal" },
          { label: "Credenciales", value: "Doctorado en Medicina Forense" }
        ],
        notes: "La Dra. Ruiz ha mostrado un interés particular en este caso debido a las extrañas sustancias encontradas en el cuerpo de la víctima."
      }
    ]
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
            <div className="relative group cursor-pointer rounded-md overflow-hidden h-48 border border-detective-light/50 shadow-md">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end opacity-100 p-3">
                <h4 className="text-white font-medium text-sm">{item.title}</h4>
              </div>
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                  <ExternalLink className="text-white h-6 w-6" />
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{item.title}</DialogTitle>
              <DialogDescription>{item.description}</DialogDescription>
            </DialogHeader>
            <div className="mt-4 max-h-[70vh] overflow-auto rounded-md overflow-hidden shadow-xl">
              <img src={item.url} alt={item.title} className="w-full h-auto" />
            </div>
          </DialogContent>
        </Dialog>
      );

    case "pdf":
      return (
        <div className="flex items-center p-4 border border-detective-light/80 rounded-md bg-detective-dark/80 hover:bg-detective-dark transition-colors shadow-md group">
          <div className="bg-crimson/10 rounded-full p-2 mr-3">
            <FileText className="h-6 w-6 text-crimson" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-medium">{item.title}</h4>
            <p className="text-gray-400 text-sm">
              {item.description || "Documento PDF"}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="opacity-80 group-hover:opacity-100" asChild>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" /> Ver
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="opacity-80 group-hover:opacity-100" asChild>
              <a href={item.url} download>
                <Download className="h-4 w-4 mr-2" /> Descargar
              </a>
            </Button>
          </div>
        </div>
      );

    case "video":
      return (
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative group cursor-pointer rounded-md overflow-hidden h-48 border border-detective-light/50 shadow-md">
              <img
                src={
                  item.thumbnail ||
                  "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
                }
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end opacity-100 p-3">
                <h4 className="text-white font-medium text-sm">{item.title}</h4>
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm border border-white/30 animate-pulse-slow shadow-lg">
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
            <div className="mt-4 aspect-video rounded-md overflow-hidden shadow-xl">
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
        <Collapsible className="w-full border border-detective-light/80 rounded-md overflow-hidden shadow-md">
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-detective-medium/80 text-left hover:bg-detective-medium">
            <div>
              <h4 className="text-white font-medium">{item.title}</h4>
              {item.date && (
                <div className="flex items-center text-gray-400 text-sm mt-1">
                  <Calendar className="h-3 w-3 mr-1 inline" />
                  <span>{item.date}</span>
                </div>
              )}
            </div>
            <div className="text-gray-400">
              <ChevronLeft className="transform transition-transform duration-200 collapsible-rotate" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="bg-detective-dark/80 p-5 border-t border-detective-light/40">
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
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

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

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // Add user message
    const newMessages = [
      ...chatMessages,
      { sender: "user", text: messageInput }
    ];
    
    // Add automated response based on character
    setTimeout(() => {
      const characterResponse = `Soy ${selectedCharacter.name}. ${
        selectedCharacter.status === "Fallecido" 
          ? "No puedo proporcionar información directa, pero se podría investigar más sobre mí."
          : "Gracias por contactarme en relación al caso."
      }`;
      
      setChatMessages([
        ...newMessages,
        { sender: "character", text: characterResponse }
      ]);
    }, 1000);
    
    setChatMessages(newMessages);
    setMessageInput("");
  };

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  const handleStartChat = (character) => {
    setSelectedCharacter(character);
    setChatMessages([
      { 
        sender: "system", 
        text: `Iniciando conversación con ${character.name}. ${character.status === "Fallecido" 
          ? "Nota: Esta es una recreación basada en registros históricos." 
          : "Por favor, mantenga las preguntas relacionadas con el caso."}`
      }
    ]);
    setShowChatDialog(true);
  };

  return (
    <AppLayout>
      {/* Case header with stylish gradient background */}
      <div className="bg-gradient-to-r from-detective-dark via-detective-medium to-detective-dark border-b border-detective-light">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="animate-fade-in">
              <div className="flex items-center mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="mr-2 p-0 hover:bg-transparent"
                >
                  <a
                    href="/casos"
                    className="text-gray-400 hover:text-gray-200 flex items-center"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Volver a casos
                  </a>
                </Button>

                <div className="text-evidence-red font-medium px-2 py-0.5 bg-evidence-red/10 rounded-full border border-evidence-red/20 text-sm ml-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-evidence-red animate-pulse mr-1"></span>
                  Caso Abierto
                </div>
              </div>

              <h1 className="text-4xl font-bold text-white mb-3 text-gradient">
                {caseData.title}
              </h1>
              
              <p className="text-gray-300 mb-4 max-w-3xl opacity-90">
                {caseData.description}
              </p>

              <div className="flex flex-wrap gap-y-2 text-sm text-gray-400 mb-4">
                <div className="flex items-center mr-6 bg-detective-dark/50 px-3 py-1 rounded-full">
                  <Calendar className="h-4 w-4 mr-2 text-crimson" />
                  <span>Fecha: {caseData.date}</span>
                </div>
                <div className="flex items-center mr-6 bg-detective-dark/50 px-3 py-1 rounded-full">
                  <User className="h-4 w-4 mr-2 text-crimson" />
                  <span>Investigador: {caseData.investigator}</span>
                </div>
                <div className="flex items-center mr-6 bg-detective-dark/50 px-3 py-1 rounded-full">
                  <MapPin className="h-4 w-4 mr-2 text-crimson" />
                  <span>Ubicación: {caseData.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              <Button className="bg-crimson hover:bg-crimson-dark text-white shadow-md shadow-crimson/20 hover:shadow-lg hover:shadow-crimson/30 transition-all">
                Presentar Conclusiones
              </Button>
              <div className="mt-2 text-xs text-gray-400 text-right">
                Caso #ID-{id.replace('caso-', '')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investigation tabs with improved styling */}
      <div className="bg-detective-dark min-h-[calc(100vh-12rem)]">
        <div className="container mx-auto px-4 py-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="sticky top-0 z-10 bg-detective-dark pb-2">
              <TabsList className="bg-detective-medium/80 w-full justify-start overflow-x-auto backdrop-blur-sm rounded-lg border border-detective-light/30 shadow-md">
                <TabsTrigger
                  value="expediente"
                  className="data-[state=active]:bg-crimson data-[state=active]:text-white"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Expediente
                </TabsTrigger>
                <TabsTrigger
                  value="evidencias"
                  className="data-[state=active]:bg-crimson data-[state=active]:text-white"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Evidencias
                </TabsTrigger>
                <TabsTrigger
                  value="testimonios"
                  className="data-[state=active]:bg-crimson data-[state=active]:text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Testimonios
                </TabsTrigger>
                <TabsTrigger
                  value="personajes"
                  className="data-[state=active]:bg-crimson data-[state=active]:text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Personajes
                </TabsTrigger>
                <TabsTrigger
                  value="noticias"
                  className="data-[state=active]:bg-crimson data-[state=active]:text-white"
                >
                  <Newspaper className="h-4 w-4 mr-2" />
                  Noticias
                </TabsTrigger>
                <TabsTrigger
                  value="interrogatorio"
                  className="data-[state=active]:bg-crimson data-[state=active]:text-white"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Interrogatorio
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Case File Tab */}
            <TabsContent value="expediente" className="mt-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-crimson" />
                  Informes Oficiales
                </h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-detective-medium/70 border-detective-light/50 hover:bg-detective-medium">
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
            <TabsContent value="evidencias" className="mt-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-crimson" />
                  Evidencias Recolectadas
                </h2>
                <Dialog
                  open={showAddEvidence}
                  onOpenChange={setShowAddEvidence}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" className="bg-detective-medium/70 border-detective-light/50 hover:bg-detective-medium">
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
                    className="bg-detective-medium/70 p-5 rounded-lg border border-detective-light/50 shadow-md hover:shadow-lg transition-all hover:bg-detective-medium/90"
                  >
                    <div className="mb-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-white">
                          {evidence.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        {evidence.description}
                      </p>
                    </div>
                    <RenderMedia item={evidence} />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Testimonies Tab */}
            <TabsContent value="testimonios" className="mt-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-crimson" />
                  Declaraciones y Testimonios
                </h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="bg-detective-medium/70 border-detective-light/50 hover:bg-detective-medium">
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir Testimonio
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Añadir nuevo testimonio</DialogTitle>
                      <DialogDescription>
                        Complete los detalles del nuevo testimonio para el caso.
                      </DialogDescription>
                    </DialogHeader>
                    <AddEvidenceForm onClose={() => {}} />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-6">
                {caseData.testimonies.map((testimony) => (
                  <div
                    key={testimony.id}
                    className="bg-detective-medium/70 rounded-lg border border-detective-light/50 p-6 shadow-md hover:shadow-lg transition-all hover:bg-detective-medium/90"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-5">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-crimson/60 to-detective-dark rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-inner">
                          {testimony.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {testimony.name}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400">
                          <div className="flex items-center bg-detective-dark/50 px-2 py-0.5 rounded-full mt-1">
                            <span>{testimony.role}</span>
                          </div>
                          <div className="flex items-center bg-detective-dark/50 px-2 py-0.5 rounded-full mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{testimony.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="prose prose-invert max-w-none mb-4 p-4 bg-detective-dark/50 rounded-md border border-detective-light/30">
                      <p className="text-gray-300 whitespace-pre-line">
                        "{testimony.statement}"
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {testimony.audioUrl && (
                        <Button variant="outline" size="sm" className="bg-detective-dark/30 hover:bg-detective-dark/60" asChild>
                          <a
                            href={testimony.audioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
                              className="h-4 w-4 mr-2"
                            >
                              <path d="M18 8c2.2 0 4 1.8 4 4s-1.8 4-4 4"></path>
                              <path d="M16 12V4c0-1.1-.9-2-2-2s-2 .9-2 2v8"></path>
                              <rect
                                x="4"
                                y="6"
                                width="5"
                                height="12"
                                rx="1"
                              ></rect>
                            </svg>
                            Audio
                          </a>
                        </Button>
                      )}
                      {testimony.videoUrl && (
                        <Button variant="outline" size="sm" className="bg-detective-dark/30 hover:bg-detective-dark/60" asChild>
                          <a
                            href={testimony.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FileVideo className="h-4 w-4 mr-2" />
                            Video
                          </a>
                        </Button>
                      )}
                      {testimony.transcriptUrl && (
                        <Button variant="outline" size="sm" className="bg-detective-dark/30 hover:bg-detective-dark/60" asChild>
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
                ))}
              </div>
            </TabsContent>

            {/* Characters Tab */}
            <TabsContent value="personajes" className="mt-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <User className="h-5 w-5 mr-2 text-crimson" />
                  Personajes del Caso
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {caseData.characters.map((character) => (
                  <Card key={character.id} className="bg-detective-medium/70 border-detective-light/50 overflow-hidden flex flex-col hover:shadow-xl hover:translate-y-[-5px] group">
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={character.image} 
                        alt={character.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          character.status === "Fallecido" 
                            ? "bg-red-900/60 text-red-200 border border-red-900/40" 
                            : "bg-green-900/60 text-green-200 border border-green-900/40"
                        }`}>
                          {character.status}
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 flex-grow bg-gradient-to-t from-detective-medium to-detective-medium/80">
                      <h3 className="text-lg font-bold text-white mb-1">{character.name}</h3>
                      <p className="text-sm text-gray-400 mb-3">{character.role}</p>
                      <p className="text-gray-300 text-sm line-clamp-3 mb-4">{character.background}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="bg-detective-dark/40 hover:bg-detective-dark/80">
                              <User className="h-4 w-4 mr-2" />
                              Ver Detalles
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-3xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center">
                                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                                  character.status === "Fallecido" ? "bg-red-500" : "bg-green-500"
                                }`}></span>
                                {character.name}
                              </DialogTitle>
                              <DialogDescription>{character.role}</DialogDescription>
                            </DialogHeader>
                            
                            <div className="grid md:grid-cols-3 gap-6 mt-4">
                              <div className="md:col-span-1">
                                <div className="relative rounded-lg overflow-hidden shadow-lg mb-4">
                                  <img 
                                    src={character.image} 
                                    alt={character.name} 
                                    className="w-full h-auto" 
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                  <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <div className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                      character.status === "Fallecido" 
                                        ? "bg-red-900/60 text-red-200 border border-red-900/40" 
                                        : "bg-green-900/60 text-green-200 border border-green-900/40"
                                    }`}>
                                      {character.status}
                                    </div>
                                  </div>
                                </div>
                                
                                <Button 
                                  className="w-full mb-2"
                                  onClick={() => handleStartChat(character)}
                                  disabled={character.status === "Fallecido"}
                                >
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  {character.status === "Fallecido" 
                                    ? "No disponible" 
                                    : "Iniciar conversación"}
                                </Button>
                                
                                {character.status === "Fallecido" && (
                                  <p className="text-xs text-gray-400 text-center">
                                    Este personaje no está disponible para interrogatorio
                                  </p>
                                )}
                              </div>
                              
                              <div className="md:col-span-2">
                                <div className="p-4 bg-detective-dark/30 rounded-lg border border-detective-light/30 mb-4">
                                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                                    <Paperclip className="h-4 w-4 mr-2 text-crimson" />
                                    Antecedentes
                                  </h3>
                                  <p className="text-gray-300">{character.background}</p>
                                </div>
                                
                                <div className="p-4 bg-detective-dark/30 rounded-lg border border-detective-light/30 mb-4">
                                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                                    <FileText className="h-4 w-4 mr-2 text-crimson" />
                                    Detalles
                                  </h3>
                                  <div className="space-y-2">
                                    {character.details.map((detail, idx) => (
                                      <div key={idx} className="flex justify-between border-b border-detective-light/30 pb-2">
                                        <span className="text-gray-400">{detail.label}:</span>
                                        <span className="text-white font-medium">{detail.value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="p-4 bg-detective-dark/30 rounded-lg border border-detective-light/30">
                                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                                    <Bookmark className="h-4 w-4 mr-2 text-crimson" />
                                    Notas
                                  </h3>
                                  <p className="text-gray-300 italic">{character.notes}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-detective-dark/40 hover:bg-detective-dark/80"
                          onClick={() => handleStartChat(character)}
                          disabled={character.status === "Fallecido"}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Hablar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Chat dialog for character conversations */}
              <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
                <DialogContent className="sm:max-w-lg bg-gradient-to-b from-detective-dark to-detective-medium border-detective-light/50">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedCharacter && (
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-crimson/60 to-detective-dark rounded-full flex items-center justify-center text-sm font-bold text-white mr-2 shadow-inner">
                            {selectedCharacter.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span>{selectedCharacter?.name}</span>
                        </div>
                      )}
                    </DialogTitle>
                    <DialogDescription>
                      {selectedCharacter?.role}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="flex flex-col h-[400px]">
                    <div className="flex-grow overflow-auto p-4 space-y-4 bg-detective-dark/50 rounded-md mb-4 border border-detective-light/30">
                      {chatMessages.map((msg, idx) => {
                        if (msg.sender === "system") {
                          return (
                            <div key={idx} className="text-center text-sm text-gray-400 bg-detective-medium/50 py-2 px-4 rounded-md">
                              {msg.text}
                            </div>
                          );
                        } else if (msg.sender === "user") {
                          return (
                            <div key={idx} className="flex justify-end">
                              <div className="bg-crimson/70 py-2 px-4 rounded-lg text-white max-w-[80%] shadow-md">
                                {msg.text}
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div key={idx} className="flex justify-start">
                              <div className="bg-detective-medium/90 py-2 px-4 rounded-lg text-white max-w-[80%] shadow-md">
                                {msg.text}
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                    
                    <div className="flex items-center">
                      <Input
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-grow mr-2 bg-detective-dark/50 border-detective-light/30"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button onClick={handleSendMessage} className="bg-crimson hover:bg-crimson-dark">
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
                          className="h-4 w-4"
                        >
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>

            {/* News Tab */}
            <TabsContent value="noticias" className="mt-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Newspaper className="h-5 w-5 mr-2 text-crimson" />
                  Cobertura Mediática
                </h2>
              </div>

              <div className="space-y-6">
                {caseData.news.map((article) => (
                  <div
                    key={article.id}
                    className="bg-detective-medium/70 rounded-lg border border-detective-light/50 overflow-hidden shadow-md hover:shadow-xl transition-all group"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 relative overflow-hidden">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover md:h-64 transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent md:bg-gradient-to-t"></div>
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {article.title}
                            </h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400 mt-1">
                              <div className="flex items-center bg-detective-dark/50 px-2 py-0.5 rounded-full">
                                <span>{article.source}</span>
                              </div>
                              <div className="flex items-center bg-detective-dark/50 px-2 py-0.5 rounded-full">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{article.date}</span>
                              </div>
                            </div>
                          </div>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="bg-detective-dark/40 hover:bg-detective-dark/80">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Leer
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>{article.title}</DialogTitle>
                                <DialogDescription>
                                  {article.source} | {article.date}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="mt-4">
                                <div className="relative rounded-lg overflow-hidden mb-6 shadow-lg">
                                  <img
                                    src={article.imageUrl}
                                    alt={article.title}
                                    className="w-full h-auto"
                                  />
                                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="text-white text-sm font-medium">
                                      {article.source} | Fotografía
                                    </div>
                                  </div>
                                </div>
                                <div className="prose prose-invert max-w-none p-4 bg-detective-dark/30 rounded-lg border border-detective-light/30">
                                  <p className="text-gray-300 whitespace-pre-line">
                                    {article.content}
                                  </p>
                                </div>
                                {article.pdfUrl && (
                                  <div className="mt-6">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="bg-detective-dark/40 hover:bg-detective-dark/80"
                                      asChild
                                    >
                                      <a
                                        href={article.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <FileText className="h-4 w-4 mr-2" />
                                        Ver PDF original
                                      </a>
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>

                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Interrogation Tab */}
            <TabsContent value="interrogatorio" className="mt-6 animate-fade-in">
              <div className="bg-detective-medium/70 rounded-lg border border-detective-light/50 p-6 mb-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-crimson/10 rounded-full p-2">
                    <AlertTriangle className="h-6 w-6 text-crimson" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Módulo de Interrogatorio Inteligente
                    </h2>
                    <p className="text-gray-300">
                      Esta herramienta analiza patrones, comportamiento y evidencias para generar preguntas estratégicas que ayuden a revelar información crucial. Seleccione un personaje para comenzar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-detective-medium/70 rounded-lg border border-detective-light/50 p-6 shadow-md">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <User className="h-4 w-4 mr-2 text-crimson" />
                    Seleccionar Personaje
                  </h3>
                  <div className="space-y-4">
                    {caseData.characters.map((character) => (
                      <div
                        key={character.id}
                        className={`p-4 rounded-lg cursor-pointer transition-all ${
                          selectedCharacter?.id === character.id
                            ? "bg-gradient-to-r from-crimson/20 to-detective-dark border border-crimson/40 shadow-md"
                            : "bg-detective-dark hover:bg-detective-dark/70"
                        }`}
                        onClick={() => handleCharacterSelect(character)}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-crimson/60 to-detective-dark rounded-full flex items-center justify-center text-sm font-bold text-white mr-3 shadow-inner">
                            {character.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h4 className="font-medium text-white flex items-center">
                              {character.name}
                              {character.status === "Fallecido" && (
                                <span className="ml-2 bg-red-900/40 text-red-200 text-xs px-1.5 py-0.5 rounded-full">
                                  Fallecido
                                </span>
                              )}
                            </h4>
                            <p className="text-sm text-gray-400">
                              {character.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-detective-medium/70 rounded-lg border border-detective-light/50 p-6 shadow-md">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Coffee className="h-4 w-4 mr-2 text-crimson" />
                    Preguntas Sugeridas
                  </h3>
                  {selectedCharacter ? (
                    <div className="space-y-3">
                      <p className="text-gray-300 mb-4">
                        Basado en evidencias, perfiles psicológicos y patrones de caso, considere las siguientes preguntas para {selectedCharacter.name}:
                      </p>
                      <div className="p-3 bg-detective-dark rounded-md hover:bg-detective-dark/80 cursor-pointer border border-detective-light/30 transition-all">
                        <p className="text-white">¿Cuál es su relación con la mansión Blackwood?</p>
                      </div>
                      <div className="p-3 bg-detective-dark rounded-md hover:bg-detective-dark/80 cursor-pointer border border-detective-light/30 transition-all">
                        <p className="text-white">¿Conocía a la víctima? ¿Cómo describiría su relación?</p>
                      </div>
                      <div className="p-3 bg-detective-dark rounded-md hover:bg-detective-dark/80 cursor-pointer border border-detective-light/30 transition-all">
                        <p className="text-white">¿Dónde estaba usted la noche del incidente?</p>
                      </div>
                      <div className="p-3 bg-detective-dark rounded-md hover:bg-detective-dark/80 cursor-pointer border border-detective-light/30 transition-all">
                        <p className="text-white">¿Hay algo inusual que haya notado recientemente?</p>
                      </div>
                      <Button 
                        className="w-full mt-4 bg-gradient-to-r from-crimson to-crimson-dark shadow-md hover:shadow-lg transition-all"
                        onClick={() => {
                          if (selectedCharacter) {
                            handleStartChat(selectedCharacter);
                          }
                        }}
                        disabled={selectedCharacter.status === "Fallecido"}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {selectedCharacter.status === "Fallecido" 
                          ? "Personaje no disponible" 
                          : "Iniciar Interrogatorio"}
                      </Button>
                      {selectedCharacter.status === "Fallecido" && (
                        <p className="text-xs text-gray-400 text-center mt-2">
                          Este personaje no está disponible para interrogatorio
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-48 bg-detective-dark rounded-lg">
                      <div className="text-center">
                        <Search className="h-10 w-10 text-gray-500 mx-auto mb-3 opacity-50" />
                        <p className="text-gray-500">
                          Seleccione un personaje para ver preguntas sugeridas
                        </p>
                      </div>
                    </div>
                  )}
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
