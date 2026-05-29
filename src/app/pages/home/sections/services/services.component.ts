// services.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionLabelComponent } from '../../../../shared/components/section-label/section-label.component';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

interface ServiceItem {
  title: string;
  description: string;
  iconSvg: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, SectionLabelComponent, AnimateOnScrollDirective],
  template: `
    <section class="services section-padding" id="servicos">
      <div class="container">
        <!-- Cabeçalho da Seção -->
        <div class="section-header" appAnimateOnScroll>
          <app-section-label text="o que fazemos"></app-section-label>
          <h2 class="section-title">Soluções que simplificam, otimizam e escalam negócios</h2>
          <p class="section-subtitle">
            Construímos o motor tecnológico por trás da sua eficiência operacional, focando em resultados que você consegue medir.
          </p>
        </div>

        <!-- Grid de Serviços -->
        <div class="services-grid">
          <div 
            class="service-card" 
            *ngFor="let service of services; let idx = index"
            appAnimateOnScroll
            [delay]="(idx * 100) + 'ms'">
            <div class="card-icon" [innerHTML]="service.iconSvg"></div>
            <h3 class="card-title">{{ service.title }}</h3>
            <p class="card-desc">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';

    .services {
      background-color: $color-bg-white;
    }

    .section-header {
      margin-bottom: clamp(3rem, 6vw, 4.5rem);
      max-width: 680px;
    }

    .section-title {
      margin-top: 0.5rem;
      margin-bottom: 1.25rem;
    }

    .section-subtitle {
      color: $color-text-more-muted;
      font-size: 1.05rem;
    }

    .services-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;

      @include tablet {
        grid-template-columns: repeat(2, 1fr);
      }

      @include desktop {
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
      }
    }

    .service-card {
      background-color: $color-bg-light;
      border: 1px solid $color-border;
      border-radius: 12px;
      padding: 2.25rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      @include transition-smooth;

      &:hover {
        background-color: $color-bg-white;
        border-color: $color-primary;
        transform: translateY(-4px);
        box-shadow: $shadow-primary;

        .card-icon {
          background-color: $color-primary;
          color: $color-white;
          border-color: $color-primary;
          transform: scale(1.05);
        }
      }
    }

    .card-icon {
      width: 52px;
      height: 52px;
      border-radius: 10px;
      background-color: $color-icon-bg;
      color: $color-icon-color;
      @include flex-center;
      margin-bottom: 1.5rem;
      border: 1px solid $color-icon-border;
      @include transition-smooth;

      ::ng-deep svg {
        width: 24px;
        height: 24px;
      }
    }

    .card-title {
      font-family: $font-display;
      font-size: 1.2rem;
      font-weight: 700;
      color: $color-heading;
      margin-bottom: 0.85rem;
    }

    .card-desc {
      font-family: $font-body;
      font-size: 0.95rem;
      color: $color-text-more-muted;
      line-height: 1.6;
    }
  `]
})
export class ServicesComponent {
  public readonly services: ServiceItem[] = [
    {
      title: 'Software Sob Medida',
      description: 'Sistemas web robustos construídos sob medida para a sua operação. Do desenho da arquitetura à entrega final de APIs e painéis seguros.',
      iconSvg: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
          <line x1="14" y1="4" x2="10" y2="20"></line>
        </svg>
      `
    },
    {
      title: 'Sites de Alta Performance',
      description: 'Lançamos sites rápidos estruturados para SEO técnico que convertem visitantes em clientes e carregam em milissegundos no celular.',
      iconSvg: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5h20c0-2.31-1-4.24-2.5-5.5"></path>
          <path d="M12 2C7.58 2 4 5.58 4 10c0 4.25 4.3 7.8 7.37 10.33a1 1 0 0 0 1.26 0C15.7 17.8 20 14.25 20 10c0-4.42-3.58-8-8-8z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      `
    },
    {
      title: 'Automação de Processos',
      description: 'Elimine tarefas repetitivas, digitação manual e planilhas confusas com robôs de RPA e integrações de rotina automáticas.',
      iconSvg: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      `
    },
    {
      title: 'Integrações de Sistemas',
      description: 'Conectamos seus sistemas de faturamento, CRM, gateways de pagamento e a API do WhatsApp Business para centralizar e agilizar a informação.',
      iconSvg: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      `
    },
    {
      title: 'Dashboards e Relatórios',
      description: 'Centralize dados contábeis, logs operacionais e históricos financeiros em painéis de BI interativos atualizados em tempo real.',
      iconSvg: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      `
    },
    {
      title: 'Suporte Técnico Ágil',
      description: 'Time de desenvolvedores focado em resolver problemas rapidamente, prestando suporte preventivo contínuo de forma parceira.',
      iconSvg: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      `
    }
  ];
}
