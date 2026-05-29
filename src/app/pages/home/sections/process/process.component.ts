// process.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionLabelComponent } from '../../../../shared/components/section-label/section-label.component';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule, SectionLabelComponent, AnimateOnScrollDirective],
  template: `
    <section class="process section-padding" id="processo">
      <div class="container">
        <!-- Cabeçalho -->
        <div class="section-header" appAnimateOnScroll>
          <app-section-label text="como trabalhamos"></app-section-label>
          <h2 class="section-title">Um processo transparente desenhado para mitigar riscos</h2>
          <p class="section-subtitle">
            Evitamos surpresas. Nosso fluxo garante alinhamento total desde o primeiro contato até o pós-lançamento.
          </p>
        </div>

        <!-- Linha do Tempo -->
        <div class="timeline-container" appAnimateOnScroll [threshold]="0.1">
          <div class="timeline-line"></div>
          
          <div class="steps-grid">
            <div class="step-item" *ngFor="let step of steps">
              <div class="step-marker">
                <span class="step-num">{{ step.num }}</span>
              </div>
              <div class="step-content">
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-desc">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';

    .process {
      background-color: $color-bg-light;
      overflow: hidden;
    }

    .section-header {
      margin-bottom: clamp(3rem, 7vw, 5rem);
      max-width: 680px;
    }

    .section-title {
      margin-top: 0.5rem;
      margin-bottom: 1.25rem;
    }

    .section-subtitle {
      color: $color-text-more-muted;
    }

    .timeline-container {
      position: relative;
      width: 100%;
      padding: 1rem 0;
    }

    /* Linha conectora */
    .timeline-line {
      position: absolute;
      background-color: rgba($color-primary, 0.1);
      z-index: 1;
      @include transition-smooth;

      // Layout Mobile: Linha vertical
      top: 30px;
      left: 20px;
      width: 2px;
      height: calc(100% - 60px);

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0%;
        background-color: $color-primary;
        transition: height 1.2s cubic-bezier(0.4, 0, 0.2, 1);
      }

      // Layout Desktop: Linha horizontal
      @include tablet {
        top: 24px;
        left: 10%;
        width: 80%;
        height: 1px;

        &::after {
          width: 0%;
          height: 100%;
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }
    }

    // Gatilho da animacao quando a classe is-visible e injetada pela diretiva
    .is-visible {
      .timeline-line::after {
        height: 100%;
        
        @include tablet {
          width: 100%;
          height: 100%;
        }
      }

      .step-marker {
        border-color: $color-primary;
        background-color: $color-bg-white;
        color: $color-primary;
        transform: scale(1);
        box-shadow: 0 0 14px rgba($color-primary, 0.15);
      }
    }

    .steps-grid {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;

      @include tablet {
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
      }
    }

    .step-item {
      display: flex;
      flex-direction: row;
      gap: 1.5rem;
      align-items: flex-start;

      @include tablet {
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 1.25rem;
      }
    }

    .step-content {
      display: flex;
      flex-direction: column;
      flex: 1;

      @include tablet {
        align-items: center;
      }
    }

    .step-marker {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 1px solid $color-border;
      background-color: $color-bg-light;
      color: $color-steel;
      font-family: $font-mono;
      font-weight: 600;
      font-size: 0.9rem;
      @include flex-center;
      flex-shrink: 0;
      transform: scale(0.9);
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      
      @include tablet {
        width: 48px;
        height: 48px;
        font-size: 1rem;
      }
    }

    // Adicionar atrasos individuais para ativação visual dos markers
    .step-item:nth-child(1) .step-marker { transition-delay: 0.1s; }
    .step-item:nth-child(2) .step-marker { transition-delay: 0.4s; }
    .step-item:nth-child(3) .step-marker { transition-delay: 0.7s; }
    .step-item:nth-child(4) .step-marker { transition-delay: 1.0s; }

    .step-title {
      font-family: $font-display;
      font-size: 1.15rem;
      font-weight: 700;
      color: $color-heading;
      margin-top: 0.25rem;
      margin-bottom: 0.5rem;
      
      @include tablet {
        margin-top: 0;
      }
    }

    .step-desc {
      font-family: $font-body;
      font-size: 0.92rem;
      color: $color-text-more-muted;
      line-height: 1.55;
    }
  `]
})
export class ProcessComponent {
  public readonly steps: ProcessStep[] = [
    {
      num: '01',
      title: 'Diagnóstico',
      description: 'Mapeamos suas dores, gargalos operacionais e oportunidades de otimização através de reuniões dinâmicas.'
    },
    {
      num: '02',
      title: 'Proposta',
      description: 'Estruturamos o escopo técnico exato, prazos e custos transparentes com foco em retorno sobre investimento.'
    },
    {
      num: '03',
      title: 'Desenvolvimento',
      description: 'Construção ágil com feedbacks semanais. Código documentado, modularizado e testado a cada nova entrega.'
    },
    {
      num: '04',
      title: 'Escala',
      description: 'Lançamento com monitoramento ativo, treinamento de equipe e suporte parceiro constante para evoluir a solução.'
    }
  ];
}
