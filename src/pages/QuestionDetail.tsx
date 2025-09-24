import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Question } from "@/types";
import { ArrowLeft, ExternalLink, BookOpen, Lightbulb } from "lucide-react";

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/questions/${id}`);
        // const data = await response.json();
        
        // Mock data for now
        const mockQuestion: Question = {
          id: parseInt(id || "1"),
          title: "JVM의 메모리 구조에 대해 설명해주세요.",
          category: "Backend",
          modelAnswer: "JVM의 메모리 영역은 크게 5가지로 나뉩니다.\n\n1. **Method Area (메서드 영역)**: 클래스 수준의 정보를 저장합니다. 클래스 메타데이터, 상수 풀, static 변수 등이 저장됩니다.\n\n2. **Heap (힙 영역)**: 객체 인스턴스와 배열이 저장되는 영역입니다. Garbage Collection의 주요 대상이며, Young Generation과 Old Generation으로 나뉩니다.\n\n3. **Stack (스택 영역)**: 각 스레드마다 독립적으로 할당되며, 메서드 호출 시 지역변수, 매개변수, 리턴 주소 등이 저장됩니다.\n\n4. **PC Register**: 현재 실행 중인 JVM 명령어의 주소를 저장합니다.\n\n5. **Native Method Stack**: JNI(Java Native Interface)를 통해 호출되는 네이티브 메서드들을 위한 스택입니다.",
          deepDive: "## JVM 메모리 구조 심화 분석\n\n### Method Area 상세\nMethod Area는 JVM이 시작될 때 생성되며, 모든 스레드가 공유하는 영역입니다.\n\n- **Runtime Constant Pool**: 클래스 파일의 상수 풀이 로드되는 곳\n- **Method Code**: 메서드의 바이트코드가 저장되는 곳\n- **Field Information**: 클래스의 필드 정보\n\n### Heap 영역의 세부 구조\n\n#### Young Generation\n- **Eden Space**: 새로 생성된 객체들이 위치\n- **Survivor Space (S0, S1)**: Eden에서 살아남은 객체들이 이동\n\n#### Old Generation\n- **Tenured Space**: 여러 번의 GC에서 살아남은 객체들이 위치\n\n### Garbage Collection과의 관계\n각 영역별로 다른 GC 알고리즘이 적용됩니다:\n- Young Generation: Minor GC (빠른 수집)\n- Old Generation: Major GC (전체 수집, 시간 소요)\n\n### Stack Frame 구조\n각 메서드 호출마다 새로운 Stack Frame이 생성되며, 다음을 포함합니다:\n- Local Variable Array\n- Operand Stack\n- Frame Data (상수 풀 참조, 예외 처리 정보)",
          learningResources: [
            {
              title: "Oracle JVM Specification",
              url: "https://docs.oracle.com/javase/specs/jvms/se11/html/",
              description: "JVM의 공식 명세서"
            },
            {
              title: "[블로그] JVM 메모리 구조 완벽 분석",
              url: "https://d2.naver.com/helloworld/1329",
              description: "네이버 D2에서 제공하는 상세한 JVM 메모리 분석"
            },
            {
              title: "Baeldung - JVM Memory Model",
              url: "https://www.baeldung.com/java-jvm-memory-model",
              description: "실전 예제와 함께하는 JVM 메모리 모델 설명"
            }
          ]
        };
        
        setQuestion(mockQuestion);
      } catch (error) {
        console.error("Failed to fetch question:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">질문을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">질문을 찾을 수 없습니다</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Backend': return 'bg-primary/20 text-primary';
      case 'Frontend': return 'bg-accent/20 text-accent';
      case 'System Design': return 'bg-orange-500/20 text-orange-400';
      case 'Data Structures': return 'bg-green-500/20 text-green-400';
      case 'Database': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로
          </Button>
          
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-3xl font-bold leading-tight">{question.title}</h1>
            <Badge className={`${getCategoryColor(question.category)} border-0 font-medium shrink-0`}>
              {question.category}
            </Badge>
          </div>
        </div>

        <div className="space-y-8">
          {/* Model Answer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                모범 답안
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {question.modelAnswer}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deep Dive */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                심층 탐구
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {question.deepDive}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Resources */}
          {question.learningResources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-green-400" />
                  추가 학습 자료
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {question.learningResources.map((resource, index) => (
                    <div key={index} className="p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-colors">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <h4 className="font-semibold text-primary group-hover:text-primary-glow transition-colors flex items-center gap-2">
                          {resource.title}
                          <ExternalLink className="w-4 h-4" />
                        </h4>
                        {resource.description && (
                          <p className="text-muted-foreground text-sm mt-1">{resource.description}</p>
                        )}
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;