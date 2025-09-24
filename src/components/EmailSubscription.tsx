import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";

const EmailSubscription = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "이메일을 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement API call
      // await subscribeEmail(email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "구독 완료!",
        description: "매일 아침 새로운 면접 질문을 받아보세요.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "구독 실패",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-hero border border-border/50 rounded-xl p-8 text-center">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">매일 새로운 면접 질문</h2>
        <p className="text-muted-foreground">
          개발자 기술 면접 질문을 매일 아침 메일로 받아보세요
        </p>
      </div>
      
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-background/50 border-border/50 focus:border-primary"
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          {isLoading ? (
            "구독 중..."
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              구독하기
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default EmailSubscription;