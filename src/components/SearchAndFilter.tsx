import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = ['All', 'Backend', 'Frontend'];

const SearchAndFilter = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory 
}: SearchAndFilterProps) => {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="질문 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background/50 border-border/50 focus:border-primary"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Category Filter - Large Tab Style */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-muted/30 rounded-xl">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            size="lg"
            className={`relative h-14 text-base font-semibold transition-all duration-300 ${
              selectedCategory === category 
                ? "bg-primary text-primary-foreground shadow-lg scale-[1.02]" 
                : "hover:bg-primary/10 hover:text-primary"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            <span className="relative z-10">
              {category === 'All' ? '전체' : category}
            </span>
            {selectedCategory === category && (
              <div className="absolute inset-0 bg-gradient-primary rounded-md opacity-90" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;