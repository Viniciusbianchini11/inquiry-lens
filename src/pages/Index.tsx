import { useState } from 'react';
import { AlertCircle, BarChart3, Users } from 'lucide-react';
import logo from '@/assets/logo.png';
import { SearchBox } from '@/components/SearchBox';
import { LeadCard } from '@/components/LeadCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useWebhook } from '@/hooks/useWebhook';
import { Lead, SearchType } from '@/types/lead';

const Index = () => {
  const [lead, setLead] = useState<Lead | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const { searchLead, loading, error } = useWebhook();

  const handleSearch = async (searchValue: string, searchType: SearchType) => {
    setSearchPerformed(true);
    const result = await searchLead(searchValue, searchType);
    setLead(result);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="LeadTracker Pro" className="h-10 w-10 rounded-lg" />
              <div>
                <h1 className="text-xl font-bold">LeadTracker Pro</h1>
                <p className="text-sm text-muted-foreground">Gestão de Jornada de Leads</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                Time Comercial
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Acompanhe a Jornada dos Seus Leads
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Busque informações completas sobre cada lead: origem da campanha, participação em grupos, 
            respostas de pesquisas e presença nas lives.
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-4xl mx-auto">
          <SearchBox onSearch={handleSearch} loading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Results */}
        <div className="max-w-4xl mx-auto">
          {lead && (
            <div className="space-y-6">
              <LeadCard lead={lead} />
            </div>
          )}

          {searchPerformed && !lead && !loading && !error && (
            <div className="text-center py-12">
              <div className="p-4 bg-muted/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Nenhum lead encontrado</h3>
              <p className="text-muted-foreground mb-4">
                Não foi possível encontrar um lead com os dados informados.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchPerformed(false);
                  setLead(null);
                }}
              >
                Nova Busca
              </Button>
            </div>
          )}

          {!searchPerformed && !loading && (
            <div className="text-center py-12">
              <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Pronto para Buscar</h3>
              <p className="text-muted-foreground mb-6">
                Digite o nome, email ou telefone do lead que você deseja consultar.
              </p>
              
              {/* Demo Suggestion */}
              <div className="bg-muted/30 p-4 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-muted-foreground mb-2">💡 Para testar, experimente buscar:</p>
                <div className="space-y-1 text-sm">
                  <div className="font-medium">Nome: João Silva</div>
                  <div className="font-medium">Email: joao.silva@email.com</div>
                  <div className="font-medium">Telefone: 99999-9999</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;