import { User, Mail, Phone, Target, MessageCircle, FileText, Video, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Lead } from '@/types/lead';

interface LeadCardProps {
  lead: Lead;
}

export const LeadCard = ({ lead }: LeadCardProps) => {
  const getTotalLives = () => {
    const lives = Object.values(lead.presenca_lives);
    return lives.filter(Boolean).length;
  };

  const getProgressPercentage = () => {
    let progress = 0;
    if (lead.cadastro_landing) progress += 20;
    if (lead.entrada_whatsapp) progress += 20;
    if (lead.respondeu_pesquisa) progress += 20;
    progress += getTotalLives() * 10; // 10% per live
    return Math.min(progress, 100);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    // Se vier no formato DD/MM/YYYY, converter para Date
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return `${day}/${month}/${year}`;
    }
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="w-full max-w-7xl mx-auto shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-secondary/30">
      <CardHeader className="pb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-semibold">{lead.nome}</CardTitle>
              <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary text-sm">
                <Target className="h-4 w-4 mr-2" />
                {lead.origem_campanha}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground mb-2">Progresso da Jornada</div>
            <div className="flex items-center gap-3">
              <div className="w-20 h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-success to-accent transition-all duration-500"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
              <span className="text-lg font-semibold text-success">{getProgressPercentage()}%</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl border">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span className="text-base font-medium">{lead.email}</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl border">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <span className="text-base font-medium">{lead.telefone}</span>
          </div>
        </div>

        {/* Data de Cadastro */}
        <div className="flex items-center gap-3 text-base mb-8 p-4 bg-background/30 rounded-xl border">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="font-semibold text-lg">Data do Cadastro</div>
            <div className="text-muted-foreground text-base">{formatDate(lead.DATA || lead.data_cadastro)}</div>
          </div>
        </div>

        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN - UTM Information */}
          <Card className="p-6 border-2">
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-3">
              <Target className="h-5 w-5" />
              Informações UTM
            </h4>
            {(lead.utm_source || lead.utm_medium || lead.utm_term || lead.utm_content) ? (
              <div className="space-y-4 text-sm">
                {lead.utm_source && (
                  <div className="p-3 bg-accent/10 rounded-lg border-l-4 border-accent">
                    <span className="font-semibold text-base">Source:</span> 
                    <div className="text-base mt-1">{lead.utm_source}</div>
                  </div>
                )}
                {lead.utm_medium && (
                  <div className="p-3 bg-accent/10 rounded-lg border-l-4 border-accent">
                    <span className="font-semibold text-base">Medium:</span> 
                    <div className="text-base mt-1">{lead.utm_medium}</div>
                  </div>
                )}
                {lead.utm_term && (
                  <div className="p-3 bg-accent/10 rounded-lg border-l-4 border-accent">
                    <span className="font-semibold text-base">Term:</span> 
                    <div className="text-base mt-1">{lead.utm_term}</div>
                  </div>
                )}
                {lead.utm_content && (
                  <div className="p-3 bg-accent/10 rounded-lg border-l-4 border-accent">
                    <span className="font-semibold text-base">Content:</span> 
                    <div className="text-base mt-1 break-all">{lead.utm_content}</div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-base text-muted-foreground">Nenhuma informação UTM disponível</p>
            )}
          </Card>

          {/* MIDDLE COLUMN - Journey Status and Lives */}
          <Card className="p-6 border-2">
            <h4 className="font-semibold text-lg mb-4">Status da Jornada</h4>
            
            {/* Journey Status Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 rounded-xl border-2">
                <div className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center ${
                  lead.cadastro_landing ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <FileText className="h-5 w-5" />
                </div>
                <div className="text-sm font-medium mb-2">Landing</div>
                <Badge variant={lead.cadastro_landing ? 'default' : 'destructive'} className="text-sm">
                  {lead.cadastro_landing ? 'Sim' : 'Não'}
                </Badge>
              </div>

              <div className="text-center p-4 rounded-xl border-2">
                <div className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center ${
                  lead.entrada_whatsapp ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="text-sm font-medium mb-2">Grupo</div>
                <Badge variant={lead.entrada_whatsapp ? 'default' : 'destructive'} className="text-sm">
                  {lead.entrada_whatsapp ? 'Entrou' : 'Não entrou'}
                </Badge>
              </div>
            </div>

            {/* Live Attendance */}
            <Separator className="my-4" />
            <h5 className="font-semibold text-base mb-3 flex items-center gap-2">
              <Video className="h-5 w-5" />
              Presença nas Lives
            </h5>
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(lead.presenca_lives).map(([live, presente], index) => (
                <div key={live} className="text-center">
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-semibold ${
                    presente ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="text-xs">{presente ? 'Presente' : 'Ausente'}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* RIGHT COLUMN - Survey Responses */}
          <Card className="p-6 border-2">
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-3">
              <FileText className="h-5 w-5" />
              Pesquisa
            </h4>
            
            <div className="text-center mb-4">
              <Badge variant={lead.respondeu_pesquisa ? 'default' : 'destructive'} className="text-sm">
                {lead.respondeu_pesquisa ? 'Respondida' : 'Não respondeu'}
              </Badge>
            </div>

            {lead.respondeu_pesquisa && lead.respostas_pesquisa ? (
              <div className="max-h-96 overflow-y-auto pr-2 space-y-3">
                {/* Perguntas principais com destaque */}
                {['cargo', 'renda', 'objetivo', 'pq_decidiu'].map((key) => {
                  const value = lead.respostas_pesquisa[key];
                  if (value) {
                    return (
                      <div key={key} className="p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                        <span className="font-semibold text-base text-primary block">
                          {key === 'pq_decidiu' ? 'Por que decidiu:' : 
                           key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ') + ':'}
                        </span> 
                        <div className="mt-2 text-sm leading-relaxed">{String(value)}</div>
                      </div>
                    );
                  }
                  return null;
                })}
                
                {/* Outras respostas */}
                {Object.entries(lead.respostas_pesquisa)
                  .filter(([key]) => !['cargo', 'renda', 'objetivo', 'pq_decidiu'].includes(key))
                  .map(([key, value], index) => (
                    <div key={index} className="p-3 bg-accent/10 rounded-lg border-l-2 border-accent">
                      <span className="font-medium text-sm capitalize block">{key.replace(/_/g, ' ')}:</span> 
                      <div className="mt-1 text-sm leading-relaxed">{String(value)}</div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <p className="text-base text-muted-foreground">Pesquisa não respondida</p>
            )}
          </Card>

        </div>
      </CardContent>
    </Card>
  );
};