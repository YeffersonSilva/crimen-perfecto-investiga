
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

interface CaseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  difficulty: "easy" | "medium" | "hard";
  investigator: string;
  timeEstimate: string;
}

const CaseCard = ({
  id,
  title,
  description,
  imageUrl,
  date,
  difficulty,
  investigator,
  timeEstimate,
}: CaseCardProps) => {
  // Determine difficulty class and label
  const difficultyClass = {
    easy: "case-difficulty-easy",
    medium: "case-difficulty-medium",
    hard: "case-difficulty-hard",
  }[difficulty];
  
  const difficultyLabel = {
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
  }[difficulty];

  return (
    <div className="case-card group h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-detective-dark to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <span className={`case-difficulty ${difficultyClass}`}>
            {difficultyLabel}
          </span>
        </div>
      </div>
      
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4 flex-1">{description}</p>
        
        <div className="border-t border-detective-light pt-4 mt-auto">
          <div className="flex flex-wrap gap-y-2 text-sm text-gray-400 mb-4">
            <div className="flex items-center mr-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{date}</span>
            </div>
            <div className="flex items-center mr-4">
              <User className="h-4 w-4 mr-1" />
              <span>{investigator}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{timeEstimate}</span>
            </div>
          </div>
          
          <Link to={`/investigacion/${id}`}>
            <Button className="w-full bg-detective-light hover:bg-crimson text-white transition-colors">
              Investigar Caso
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseCard;
