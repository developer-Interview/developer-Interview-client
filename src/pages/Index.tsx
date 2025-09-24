import { useState, useEffect } from "react";
import { Question } from "@/types";
import QuestionCard from "@/components/QuestionCard";
import EmailSubscription from "@/components/EmailSubscription";
import SearchAndFilter from "@/components/SearchAndFilter";
import { Code2 } from "lucide-react";

const Index = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API call
  const mockQuestions: Question[] = [
    {
      id: 1,
      title: "JVM의 메모리 구조에 대해 설명해주세요.",
      category: "Backend",
      modelAnswer: "JVM의 메모리 영역은 크게 5가지로 나뉩니다. Method Area, Heap, Stack, PC Register, Native Method Stack입니다...",
      deepDive: "JVM 메모리 구조에 대한 상세한 설명...",
      learningResources: []
    },
    {
      id: 2,
      title: "React의 Virtual DOM은 어떻게 동작하나요?",
      category: "Frontend",
      modelAnswer: "Virtual DOM은 실제 DOM의 가상 표현으로, 메모리에 저장됩니다. React는 상태 변경 시 새로운 Virtual DOM 트리를 생성하고...",
      deepDive: "Virtual DOM의 diff 알고리즘과 reconciliation 과정...",
      learningResources: []
    },
    {
      id: 3,
      title: "데이터베이스 인덱스의 종류와 특징을 설명해주세요.",
      category: "Database",
      modelAnswer: "데이터베이스 인덱스는 크게 클러스터드 인덱스와 논클러스터드 인덱스로 나뉩니다...",
      deepDive: "B+ Tree 구조와 인덱스 최적화 전략...",
      learningResources: []
    },
    {
      id: 4,
      title: "마이크로서비스 아키텍처의 장단점은 무엇인가요?",
      category: "System Design",
      modelAnswer: "마이크로서비스는 애플리케이션을 작은 독립적인 서비스들로 분할하는 아키텍처 패턴입니다...",
      deepDive: "서비스 간 통신, 데이터 일관성, 분산 시스템의 복잡성...",
      learningResources: []
    },
    {
      id: 5,
      title: "Binary Search Tree의 시간 복잡도를 분석해주세요.",
      category: "Data Structures",
      modelAnswer: "BST의 시간 복잡도는 트리의 높이에 따라 달라집니다. 균형 잡힌 트리에서는 O(log n)이지만...",
      deepDive: "AVL Tree, Red-Black Tree 등 자가 균형 트리의 필요성...",
      learningResources: []
    }
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/questions');
        // const data = await response.json();
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setQuestions(mockQuestions);
        setFilteredQuestions(mockQuestions);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    let filtered = questions;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.modelAnswer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredQuestions(filtered);
  }, [questions, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <Code2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold">Developer Interview</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            개발자 기술 면접을 위한 완벽한 준비 공간
          </p>
        </header>

        {/* Email Subscription */}
        <div className="mb-16">
          <EmailSubscription />
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <SearchAndFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Questions Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              면접 질문 아카이브
              {searchQuery && (
                <span className="text-lg text-muted-foreground ml-2">
                  "{searchQuery}" 검색 결과
                </span>
              )}
            </h2>
            <span className="text-muted-foreground">
              총 {filteredQuestions.length}개 질문
            </span>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-card border border-border/50 rounded-xl p-6 h-40">
                    <div className="h-4 bg-muted rounded mb-3"></div>
                    <div className="h-4 bg-muted rounded w-2/3 mb-6"></div>
                    <div className="h-3 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredQuestions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mb-4">
                <Code2 className="w-16 h-16 text-muted-foreground mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h3>
              <p className="text-muted-foreground">
                다른 키워드로 검색하거나 카테고리를 변경해보세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
