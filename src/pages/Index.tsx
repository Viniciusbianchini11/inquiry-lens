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
    <div className="min-h-screen" style={{ background: 'var(--gradient-hero)' }}>
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">
                T
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TetraLeads</h1>
                <p className="text-sm text-green-200">Gestão de Jornada de Leads</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-green-200">
                <Users className="h-4 w-4" />
                Acesso Antecipado
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            O que você quer 
            <br />
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              encontrar?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Encontre sua ideia e deixe a IA cuidar do resto
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBox onSearch={handleSearch} loading={loading} />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
              Buscar por email
            </button>
            <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
              Buscar por telefone
            </button>
            <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
              Buscar por nome
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6">
            <Alert variant="destructive" className="bg-red-900/20 border-red-400/30 text-red-200">
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
              <div className="p-4 bg-white/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-white">Nenhum lead encontrado</h3>
              <p className="text-gray-300 mb-4">
                Não foi possível encontrar um lead com os dados informados.
              </p>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
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
              <div className="p-4 bg-primary/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-white">Pronto para Buscar</h3>
              <p className="text-gray-300 mb-6">
                Digite o nome, email ou telefone do lead que você deseja consultar.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;