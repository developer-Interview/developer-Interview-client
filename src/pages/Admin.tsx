import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Question, LearningResource } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Save, X, ExternalLink } from "lucide-react";

const Admin = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Backend" as Question['category'],
    modelAnswer: "",
    deepDive: "",
    learningResources: [] as LearningResource[]
  });
  const [newResource, setNewResource] = useState({ title: "", url: "", description: "" });
  const { toast } = useToast();

  useEffect(() => {
    // Mock data for admin - in real app, fetch from API
    const mockQuestions: Question[] = [
      {
        id: 1,
        title: "JVM의 메모리 구조에 대해 설명해주세요.",
        category: "Backend",
        modelAnswer: "JVM의 메모리 영역은 크게 5가지로 나뉩니다...",
        deepDive: "JVM 메모리 구조에 대한 상세한 설명...",
        learningResources: [
          { title: "Oracle JVM Specification", url: "https://docs.oracle.com/javase/specs/", description: "공식 문서" }
        ]
      }
    ];
    setQuestions(mockQuestions);
  }, []);

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      title: question.title,
      category: question.category,
      modelAnswer: question.modelAnswer,
      deepDive: question.deepDive,
      learningResources: [...question.learningResources]
    });
    setIsEditing(true);
  };

  const handleCreate = () => {
    setEditingQuestion(null);
    setFormData({
      title: "",
      category: "Backend",
      modelAnswer: "",
      deepDive: "",
      learningResources: []
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.modelAnswer) {
      toast({
        title: "필수 항목을 입력해주세요",
        description: "제목과 모범 답안은 필수입니다.",
        variant: "destructive"
      });
      return;
    }

    try {
      // TODO: Implement API call
      const questionData = {
        ...formData,
        id: editingQuestion?.id || Date.now()
      };

      if (editingQuestion) {
        // Update existing question
        setQuestions(prev => prev.map(q => q.id === editingQuestion.id ? questionData : q));
        toast({ title: "질문이 수정되었습니다." });
      } else {
        // Create new question
        setQuestions(prev => [...prev, questionData]);
        toast({ title: "새 질문이 생성되었습니다." });
      }

      setIsEditing(false);
    } catch (error) {
      toast({
        title: "저장 실패",
        description: "다시 시도해주세요.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        // TODO: Implement API call
        setQuestions(prev => prev.filter(q => q.id !== id));
        toast({ title: "질문이 삭제되었습니다." });
      } catch (error) {
        toast({
          title: "삭제 실패",
          description: "다시 시도해주세요.",
          variant: "destructive"
        });
      }
    }
  };

  const addLearningResource = () => {
    if (!newResource.title || !newResource.url) {
      toast({
        title: "제목과 URL을 입력해주세요",
        variant: "destructive"
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      learningResources: [...prev.learningResources, newResource]
    }));
    setNewResource({ title: "", url: "", description: "" });
  };

  const removeLearningResource = (index: number) => {
    setFormData(prev => ({
      ...prev,
      learningResources: prev.learningResources.filter((_, i) => i !== index)
    }));
  };

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

  if (isEditing) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">
              {editingQuestion ? "질문 수정" : "새 질문 생성"}
            </h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4 mr-2" />
                취소
              </Button>
              <Button onClick={handleSave} className="bg-gradient-primary">
                <Save className="w-4 h-4 mr-2" />
                저장
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">질문 제목</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="면접 질문을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">카테고리</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as Question['category'] }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="System Design">System Design</SelectItem>
                      <SelectItem value="Data Structures">Data Structures</SelectItem>
                      <SelectItem value="Database">Database</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Model Answer */}
            <Card>
              <CardHeader>
                <CardTitle>모범 답안</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.modelAnswer}
                  onChange={(e) => setFormData(prev => ({ ...prev, modelAnswer: e.target.value }))}
                  placeholder="면접에서 제시할 수 있는 간결하고 핵심적인 답변을 작성하세요"
                  className="min-h-32"
                />
              </CardContent>
            </Card>

            {/* Deep Dive */}
            <Card>
              <CardHeader>
                <CardTitle>심층 탐구</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.deepDive}
                  onChange={(e) => setFormData(prev => ({ ...prev, deepDive: e.target.value }))}
                  placeholder="기술적 원리, 배경, 상세한 설명을 마크다운 형식으로 작성하세요"
                  className="min-h-48"
                />
              </CardContent>
            </Card>

            {/* Learning Resources */}
            <Card>
              <CardHeader>
                <CardTitle>추가 학습 자료</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.learningResources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">{resource.url}</p>
                      {resource.description && (
                        <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLearningResource(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                <div className="space-y-3 p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-medium">새 자료 추가</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="자료 제목"
                      value={newResource.title}
                      onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                    />
                    <Input
                      placeholder="URL"
                      value={newResource.url}
                      onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                    />
                  </div>
                  <Input
                    placeholder="설명 (선택사항)"
                    value={newResource.description}
                    onChange={(e) => setNewResource(prev => ({ ...prev, description: e.target.value }))}
                  />
                  <Button onClick={addLearningResource} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    자료 추가
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">질문 관리</h1>
          <Button onClick={handleCreate} className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            새 질문 생성
          </Button>
        </div>

        <div className="grid gap-6">
          {questions.map((question) => (
            <Card key={question.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{question.title}</h3>
                    <Badge className={`${getCategoryColor(question.category)} border-0`}>
                      {question.category}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(question)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(question.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">모범 답안</h4>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {question.modelAnswer}
                    </p>
                  </div>
                  {question.learningResources.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">학습 자료 ({question.learningResources.length}개)</h4>
                      <div className="flex flex-wrap gap-2">
                        {question.learningResources.map((resource, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {resource.title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;