import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/types";
import { useNavigate } from "react-router-dom";

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const navigate = useNavigate();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Backend': return 'bg-primary/20 text-primary hover:bg-primary/30';
      case 'Frontend': return 'bg-accent/20 text-accent hover:bg-accent/30';
      case 'System Design': return 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30';
      case 'Data Structures': return 'bg-green-500/20 text-green-400 hover:bg-green-500/30';
      case 'Database': return 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30';
      default: return 'bg-muted/20 text-muted-foreground hover:bg-muted/30';
    }
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-glow hover:scale-[1.02] border-border/50 hover:border-primary/50"
      onClick={() => navigate(`/question/${question.id}`)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
            {question.title}
          </h3>
          <Badge 
            variant="outline" 
            className={`${getCategoryColor(question.category)} border-0 font-medium shrink-0`}
          >
            {question.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {question.modelAnswer.substring(0, 150)}...
        </p>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;