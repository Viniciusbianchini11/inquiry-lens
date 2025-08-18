import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchType } from '@/types/lead';

interface SearchBoxProps {
  onSearch: (value: string, type: SearchType) => void;
  loading?: boolean;
}

export const SearchBox = ({ onSearch, loading = false }: SearchBoxProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('nome');

  const handleSearch = () => {
    if (searchValue.trim()) {
      onSearch(searchValue.trim(), searchType);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm p-6 mb-6">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Buscar Lead
          </label>
          <Input
            placeholder="Digite o nome, email ou telefone..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-12"
            disabled={loading}
          />
        </div>
        
        <div className="min-w-[140px]">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Tipo de Busca
          </label>
          <Select value={searchType} onValueChange={(value: SearchType) => setSearchType(value)}>
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nome">Nome</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="telefone">Telefone</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={handleSearch}
          disabled={loading || !searchValue.trim()}
          variant="gradient"
          className="h-12 px-8"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Search className="h-4 w-4 mr-2" />
          )}
          Buscar
        </Button>
      </div>
    </div>
  );
};