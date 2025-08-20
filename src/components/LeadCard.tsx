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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{lead.email}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{lead.telefone}</span>
          </div>
        </div>

        {/* UTM Info */}
        {(lead.utm_source || lead.utm_medium || lead.utm_term || lead.utm_content) && (
          <>
            <Separator />
            <div>
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Informações UTM
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
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
            </div>
          </>
        )}

        <Separator />

        {/* Journey Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg border">
            <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
              lead.cadastro_landing ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <FileText className="h-4 w-4" />
            </div>
            <div className="text-xs font-medium">Landing Page</div>
            <Badge variant={lead.cadastro_landing ? 'default' : 'destructive'} className="mt-1 text-xs">
              {lead.cadastro_landing ? 'Cadastrado' : 'Não cadastrado'}
            </Badge>
          </div>

          <div className="text-center p-3 rounded-lg border">
            <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
              lead.entrada_whatsapp ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <MessageCircle className="h-4 w-4" />
            </div>
            <div className="text-xs font-medium">WhatsApp</div>
            <Badge variant={lead.entrada_whatsapp ? 'default' : 'destructive'} className="mt-1 text-xs">
              {lead.entrada_whatsapp ? 'Participando' : 'Não entrou'}
            </Badge>
          </div>

          <div className="text-center p-3 rounded-lg border">
            <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
              lead.respondeu_pesquisa ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <FileText className="h-4 w-4" />
            </div>
            <div className="text-xs font-medium">Pesquisa</div>
            <Badge variant={lead.respondeu_pesquisa ? 'default' : 'destructive'} className="mt-1 text-xs">
              {lead.respondeu_pesquisa ? 'Respondida' : 'Não respondeu'}
            </Badge>
          </div>

          <div className="text-center p-3 rounded-lg border">
            <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
              getTotalLives() > 0 ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <Video className="h-4 w-4" />
            </div>
            <div className="text-xs font-medium">Lives</div>
            <Badge variant={getTotalLives() > 0 ? 'default' : 'secondary'} className="mt-1 text-xs">
              {getTotalLives()}/4
            </Badge>
          </div>
        </div>

        {/* Survey Responses */}
        {lead.respondeu_pesquisa && lead.respostas_pesquisa && (
          <>
            <Separator />
            <div>
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Respostas da Pesquisa
              </h4>
              <div className="space-y-2">
                {Object.entries(lead.respostas_pesquisa).map(([key, value], index) => (
                  <div key={index} className="text-sm p-2 bg-accent/10 rounded border-l-2 border-accent">
                    <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span> {String(value)}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Live Attendance Details */}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Video className="h-4 w-4" />
            Presença nas Lives
          </h4>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(lead.presenca_lives).map(([live, presente], index) => (
              <div key={live} className="text-center">
                <div className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-xs ${
                  presente ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                <div className="text-xs">{presente ? 'Presente' : 'Ausente'}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dates */}
        <Separator />
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium">Data do Cadastro</div>
            <div className="text-muted-foreground">{formatDate(lead.data_cadastro)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};