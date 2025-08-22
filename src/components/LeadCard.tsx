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
    <Card className="w-full max-w-4xl mx-auto shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-secondary/30">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">{lead.nome}</CardTitle>
              <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary">
                <Target className="h-3 w-3 mr-1" />
                {lead.origem_campanha}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground mb-1">Progresso da Jornada</div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-success to-accent transition-all duration-500"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
              <span className="text-sm font-medium text-success">{getProgressPercentage()}%</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{lead.email}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{lead.telefone}</span>
          </div>
        </div>

        {/* Data de Cadastro */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium">Data do Cadastro</div>
            <div className="text-muted-foreground">{formatDate(lead.DATA || lead.data_cadastro)}</div>
          </div>
        </div>

        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN - UTM Information */}
          <Card className="p-4">
            <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Informações UTM
            </h4>
            {(lead.utm_source || lead.utm_medium || lead.utm_term || lead.utm_content) ? (
              <div className="space-y-3 text-sm">
                {lead.utm_source && (
                  <div className="p-2 bg-accent/10 rounded border-l-2 border-accent">
                    <span className="font-medium">Source:</span> {lead.utm_source}
                  </div>
                )}
                {lead.utm_medium && (
                  <div className="p-2 bg-accent/10 rounded border-l-2 border-accent">
                    <span className="font-medium">Medium:</span> {lead.utm_medium}
                  </div>
                )}
                {lead.utm_term && (
                  <div className="p-2 bg-accent/10 rounded border-l-2 border-accent">
                    <span className="font-medium">Term:</span> {lead.utm_term}
                  </div>
                )}
                {lead.utm_content && (
                  <div className="p-2 bg-accent/10 rounded border-l-2 border-accent">
                    <span className="font-medium">Content:</span> {lead.utm_content}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma informação UTM disponível</p>
            )}
          </Card>

          {/* MIDDLE COLUMN - Journey Status and Lives */}
          <Card className="p-4">
            <h4 className="font-medium text-sm mb-3">Status da Jornada</h4>
            
            {/* Journey Status Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-2 rounded-lg border">
                <div className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center ${
                  lead.cadastro_landing ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <FileText className="h-3 w-3" />
                </div>
                <div className="text-xs font-medium">Landing</div>
                <Badge variant={lead.cadastro_landing ? 'default' : 'destructive'} className="mt-1 text-xs">
                  {lead.cadastro_landing ? 'Sim' : 'Não'}
                </Badge>
              </div>

              <div className="text-center p-2 rounded-lg border">
                <div className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center ${
                  lead.entrada_whatsapp ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <MessageCircle className="h-3 w-3" />
                </div>
                <div className="text-xs font-medium">Grupo</div>
                <Badge variant={lead.entrada_whatsapp ? 'default' : 'destructive'} className="mt-1 text-xs">
                  {lead.entrada_whatsapp ? 'Entrou' : 'Não entrou'}
                </Badge>
              </div>
            </div>

            {/* Live Attendance */}
            <Separator className="my-3" />
            <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Video className="h-4 w-4" />
              Presença nas Lives
            </h5>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(lead.presenca_lives).map(([live, presente], index) => (
                <div key={live} className="text-center">
                  <div className={`w-5 h-5 rounded-full mx-auto mb-1 flex items-center justify-center text-xs ${
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
          <Card className="p-4">
            <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Pesquisa
            </h4>
            
            <div className="text-center mb-3">
              <Badge variant={lead.respondeu_pesquisa ? 'default' : 'destructive'} className="text-xs">
                {lead.respondeu_pesquisa ? 'Respondida' : 'Não respondeu'}
              </Badge>
            </div>

            {lead.respondeu_pesquisa && lead.respostas_pesquisa ? (
              <div className="space-y-2">
                {/* Perguntas principais com destaque */}
                {['cargo', 'renda', 'objetivo', 'pq_decidiu'].map((key) => {
                  const value = lead.respostas_pesquisa[key];
                  if (value) {
                    return (
                      <div key={key} className="text-sm p-2 bg-primary/10 rounded border-l-3 border-primary">
                        <span className="font-semibold capitalize text-primary">
                          {key.replace(/_/g, ' ').replace('pq', 'Por que')}:
                        </span> 
                        <div className="mt-1">{String(value)}</div>
                      </div>
                    );
                  }
                  return null;
                })}
                
                {/* Outras respostas */}
                {Object.entries(lead.respostas_pesquisa)
                  .filter(([key]) => !['cargo', 'renda', 'objetivo', 'pq_decidiu'].includes(key))
                  .map(([key, value], index) => (
                    <div key={index} className="text-sm p-2 bg-accent/10 rounded border-l-2 border-accent">
                      <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span> 
                      <div className="mt-1">{String(value)}</div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Pesquisa não respondida</p>
            )}
          </Card>

        </div>
      </CardContent>
    </Card>
  );
};