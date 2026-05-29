// projects.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  // Dados mockados completos
  private readonly projectsList = signal<Project[]>([
    {
      id: 'efestia',
      title: 'EfestIA — Cibersegurança & Análise SaaS com IA',
      client: 'EfestIA SaaS',
      location: 'Nacional',
      category: 'software',
      metric: 'Zero',
      metricLabel: 'vulnerabilidades críticas em prod',
      description: 'Plataforma SaaS Multi-tenant que combina varreduras web automatizadas, controle DNS anti-fraude, IA (Google Gemini) para remediação de falhas e checkout de assinaturas recorrentes.',
      stack: ['Angular', '.NET 9', 'PostgreSQL', 'Google Gemini', 'Mercado Pago', 'Docker'],
      featured: true,
      liveUrl: 'https://efestiaangular1-production.up.railway.app',
      challenge: 'Garantir a proteção de domínios corporativos contra brechas (SSL/TLS, HTTP headers, OWASP Top 10) exige scanners complexos. Além disso, as equipes técnicas têm dificuldade para traduzir relatórios puros de vulnerabilidade em códigos de correção e diretrizes práticas para seus servidores.',
      solution: 'Desenvolvemos a EfestIA, um ecossistema SaaS Multi-tenant robusto. A plataforma valida a propriedade de domínios via registro DNS TXT para evitar abusos, realiza scans de segurança automatizados e aciona o Google Gemini 2.5 Flash para detalhar remediações com código-fonte pronto (Nginx/Apache). Possui chatbot integrado (Assistente Star) e checkout Mercado Pago.',
      results: [
        { value: 'Zero', label: 'Vulnerabilidades críticas remanescentes' },
        { value: '↓90%', label: 'Tempo de triagem e mitigação de falhas' },
        { value: 'Real-time', label: 'Análise automática de brechas e logs' }
      ],
      testimonial: {
        text: 'A EfestIA mudou nossa perspectiva sobre segurança. O painel unifica scans de vulnerabilidade e nos fornece códigos de correção automatizados pelo Gemini, acelerando a blindagem de nossos servidores.',
        author: 'Gabriel Fontes',
        role: 'Lead Security Engineer'
      }
    },
    {
      id: 'gestao-pedidos',
      title: 'Sistema de Gestão de Pedidos',
      client: 'Distribuidora de Alimentos',
      location: 'Feira de Santana, BA',
      category: 'automacao',
      metric: '↓70%',
      metricLabel: 'tempo operacional',
      description: 'Eliminamos o controle manual de pedidos via planilha, integrando ERP ao WhatsApp Business.',
      stack: ['Node.js', 'React', 'PostgreSQL'],
      featured: true,
      challenge: 'A distribuidora controlava centenas de pedidos diários manualmente através de planilhas compartilhadas e conversas soltas no WhatsApp. Isso resultava em erros de digitação, atrasos nas entregas e dificuldade de rastreamento pelos clientes.',
      solution: 'Desenvolvemos uma API robusta integrada a um painel administrativo e um bot de WhatsApp automatizado. O bot recebe os pedidos, valida no estoque em tempo real e emite o status automaticamente, enquanto o painel administrativo consolida as vendas.',
      results: [
        { value: '↓70%', label: 'Redução no tempo de processamento' },
        { value: 'Zero', label: 'Erros de digitação nos pedidos' },
        { value: '+45%', label: 'Aumento na capacidade de entregas' }
      ],
      testimonial: {
        text: 'A Niō Tech transformou nossa logística. O que levava horas de digitação e mensagens manuais agora roda sozinho em segundos.',
        author: 'Marcos Andrade',
        role: 'Diretor de Operações'
      }
    },
    {
      id: 'site-clinica',
      title: 'Site Institucional + SEO',
      client: 'Clínica Sorriso & Saúde',
      location: 'Salvador, BA',
      category: 'site',
      metric: '+340%',
      metricLabel: 'tráfego orgânico',
      description: 'Desenvolvimento de portal institucional de alta performance focado em SEO técnico e conversão.',
      stack: ['Angular', 'SCSS', 'Firebase'],
      featured: false,
      challenge: 'A clínica médica dependia exclusivamente de indicações e anúncios pagos de alto custo para atrair novos pacientes. O site antigo era lento, não otimizado para celulares e não ranqueava nos motores de busca.',
      solution: 'Desenvolvemos um portal institucional veloz utilizando Angular com Server-Side Rendering (SSR) para indexação impecável no Google, carregamento instantâneo e layout focado em conversão de leads.',
      results: [
        { value: '+340%', label: 'Aumento de tráfego orgânico' },
        { value: '-50%', label: 'Custo de aquisição de clientes' },
        { value: '+120', label: 'Novos contatos mensais via site' }
      ],
      testimonial: {
        text: 'Nosso site se tornou nossa maior ferramenta de aquisição de pacientes. Em poucos meses passamos a liderar as buscas na nossa região.',
        author: 'Dra. Aline Rezende',
        role: 'Diretora Clínica'
      }
    },
    {
      id: 'dashboard-financeiro',
      title: 'Dashboard Financeiro de Alta Performance',
      client: 'Diretriz Escritório Contábil',
      location: 'Feira de Santana, BA',
      category: 'dashboard',
      metric: '8h/semana',
      metricLabel: 'economizadas',
      description: 'Painel de Business Intelligence dinâmico conectando dados de faturamento e relatórios automatizados.',
      stack: ['Angular', 'Chart.js', 'Node.js'],
      featured: false,
      challenge: 'O escritório contábil consolidava manualmente dados financeiros de clientes vindos de 5 sistemas diferentes em relatórios de PDF toda semana, gerando sobrecarga operacional e risco de inconsistências.',
      solution: 'Construímos um painel de BI dinâmico em Angular integrado a uma API intermediária em Node.js que sincroniza dados de APIs e bancos legados de forma assíncrona, plotando gráficos interativos.',
      results: [
        { value: '8h/sem', label: 'Economizadas por analista' },
        { value: 'Real-time', label: 'Sincronização de dados financeiros' },
        { value: '100%', label: 'Confiabilidade nos relatórios gerados' }
      ],
      testimonial: {
        text: 'Nossos analistas agora focam em consultoria e inteligência de dados, não mais em copiar e colar planilhas. A mudança de eficiência foi imediata.',
        author: 'Roberto Farias',
        role: 'Sócio Fundador'
      }
    },
    {
      id: 'integracao-erp-whatsapp',
      title: 'Integração ERP + WhatsApp',
      client: 'Lojas Modernas S.A.',
      location: 'São Paulo, SP',
      category: 'integracao',
      metric: '↓90%',
      metricLabel: 'erros de pedido',
      description: 'Automação de fluxos de checkout e alertas em tempo real integrando WhatsApp e ERP.',
      stack: ['Node.js', 'WhatsApp API', 'MySQL'],
      featured: false,
      challenge: 'Erros frequentes na digitação e a demora no envio manual do status de entrega causavam frustração aos clientes de e-commerce e geravam centenas de chamados desnecessários no SAC.',
      solution: 'Desenvolvemos uma integração em tempo real que conecta o banco do ERP diretamente à API oficial do WhatsApp Business, disparando atualizações automáticas e dinâmicas a cada movimentação do pedido.',
      results: [
        { value: '↓90%', label: 'Queda em erros de preenchimento' },
        { value: '-65%', label: 'Chamados abertos sobre entrega' },
        { value: '98%', label: 'Taxa de leitura de mensagens enviadas' }
      ],
      testimonial: {
        text: 'Nossos clientes se sentem muito mais seguros recebendo cada atualização no WhatsApp. O volume de chamados de suporte despencou.',
        author: 'Amanda Costa',
        role: 'Gerente de E-commerce'
      }
    },
    {
      id: 'app-agendamento',
      title: 'App de Agendamento Online',
      client: 'Bella Donna Studio',
      location: 'Feira de Santana, BA',
      category: 'software',
      metric: '+200',
      metricLabel: 'agendamentos/mês',
      description: 'Aplicativo web de agendamento em tempo real com pagamentos integrados e lembretes automáticos.',
      stack: ['Angular', 'Firebase', 'Stripe'],
      featured: false,
      challenge: 'O salão gerenciava reservas apenas por telefone ou mensagens diretas no Instagram, acumulando gargalos em horários de pico e perdendo agendamentos fora do expediente.',
      solution: 'Criamos um Progressive Web App de agendamento online integrado com gateway de pagamentos Stripe e disparos automatizados de lembretes via Firebase Cloud Messaging.',
      results: [
        { value: '+200', label: 'Novos agendamentos por mês' },
        { value: '-80%', label: 'Taxa de cancelamentos e no-shows' },
        { value: '24/7', label: 'Canal de agendamento ativo online' }
      ],
      testimonial: {
        text: 'Nossas clientes adoram a facilidade de agendar e pagar em segundos. O salão passou a faturar mesmo quando está fechado.',
        author: 'Juliana Vasconcelos',
        role: 'Proprietária'
      }
    },
    {
      id: 'automacao-nf',
      title: 'Automação de Emissão de NF',
      client: 'LogisPress Transportadora',
      location: 'Vitória da Conquista, BA',
      category: 'automacao',
      metric: '↓85%',
      metricLabel: 'tempo de faturamento',
      description: 'Robô de RPA (Robotic Process Automation) para preenchimento e homologação de notas fiscais.',
      stack: ['Python', 'Selenium', 'PostgreSQL'],
      featured: false,
      challenge: 'A transportadora gastava horas diárias copiando manualmente dados de frete de seu sistema ERP e inserindo-os no portal municipal de notas fiscais, limitando a velocidade de faturamento.',
      solution: 'Construímos um script de automação RPA resiliente em Python usando Selenium. O sistema lê as faturas pendentes do PostgreSQL local, valida os dados fiscais e emite as notas em lote diretamente no webservice.',
      results: [
        { value: '↓85%', label: 'Tempo gasto com faturamento' },
        { value: '100%', label: 'Conformidade fiscal garantida' },
        { value: 'Zero', label: 'Digitações duplicadas ou erradas' }
      ],
      testimonial: {
        text: 'Nossa emissão de notas fiscais era um gargalo terrível. Hoje, o robô faz em 15 minutos o que nos custava a tarde inteira de trabalho.',
        author: 'Geraldo Silveira',
        role: 'Gerente Financeiro'
      }
    }
  ]);

  // Expor como sinal somente leitura
  public readonly projects = this.projectsList.asReadonly();

  // Obter projeto por ID
  public getProjectById(id: string): Project | undefined {
    return this.projectsList().find(p => p.id === id);
  }

  // Filtrar projetos por categoria
  public getProjectsByCategory(category: string): Project[] {
    if (category === 'todos') {
      return this.projectsList();
    }
    return this.projectsList().filter(p => p.category === category);
  }
}
