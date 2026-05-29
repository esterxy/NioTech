// project-card.component.ts
import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models/project.model';
import { AnimateOnScrollDirective } from '../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  template: `
    <div class="card-inner">
      <!-- Info principal do projeto -->
      <div class="card-content">
        <span class="project-cat">// {{ project.category }}</span>
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="project-client">{{ project.client }} {{ project.location ? '· ' + project.location : '' }}</p>
        
        <!-- Métrica de impacto -->
        <div class="project-metric-block">
          <div class="metric-value">{{ project.metric }}</div>
          <div class="metric-label">{{ project.metricLabel }}</div>
        </div>

        <p class="project-desc">{{ project.description }}</p>
        
        <!-- Link de ação sempre visível para acessibilidade e mobile -->
        <div class="project-action-link" (click)="selectProject()">
          Ver detalhes do projeto <span class="arrow">→</span>
        </div>
        
        <!-- Stack tecnológico -->
        <div class="tech-pills">
          <span class="tech-pill" *ngFor="let tech of project.stack">{{ tech }}</span>
        </div>
      </div>

      <!-- Overlay semitransparente ao passar o mouse -->
      <div class="card-overlay">
        <button 
          class="btn-overlay" 
          (click)="selectProject()"
          [attr.aria-label]="'Ver detalhes de ' + project.title"
        >
          Ver detalhes →
        </button>
      </div>
    </div>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';

    :host {
      display: block;
      background-color: $color-bg-white;
      border: 1px solid $color-border;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      @include transition-smooth;

      // Se for destacado, ocupa 2 colunas no grid desktop
      &.featured {
        @include desktop {
          grid-column: span 2;
          
          .card-inner {
            flex-direction: row;
          }

          .project-metric-block {
            margin: 1.5rem 0;
            padding: 1rem 0;
            border-top: 1px solid rgba($color-border, 0.6);
            border-bottom: 1px solid rgba($color-border, 0.6);
            display: flex;
            align-items: baseline;
            gap: 12px;

            .metric-label {
              margin-top: 0;
            }
          }
        }
      }

      @media (hover: hover) {
        &:hover {
          border-color: $color-primary;
          transform: translateY(-4px);
          box-shadow: $shadow-primary;

          .card-overlay {
            opacity: 1;
          }
        }
      }
    }

    .card-inner {
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
    }

    .card-content {
      padding: 2.25rem;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    .project-cat {
      font-family: $font-mono;
      color: $color-primary;
      font-size: 0.8rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: lowercase;
      margin-bottom: 0.75rem;
      display: inline-block;
    }

    .project-title {
      font-family: $font-display;
      font-size: clamp(1.2rem, 3.5vw, 1.5rem);
      font-weight: 800;
      color: $color-heading;
      margin-bottom: 0.35rem;
    }

    .project-client {
      font-family: $font-body;
      font-size: 0.88rem;
      color: $color-steel;
      margin-bottom: 1.5rem;
    }

    /* Bloco de Métrica */
    .project-metric-block {
      margin-bottom: 1.5rem;
    }

    .metric-value {
      font-family: $font-display;
      font-weight: 800;
      font-size: clamp(2rem, 4vw, 2.5rem);
      color: $color-primary;
      line-height: 1;
    }

    .metric-label {
      font-family: $font-mono;
      font-size: 0.78rem;
      color: $color-steel;
      text-transform: lowercase;
      margin-top: 4px;
    }

    .project-desc {
      font-family: $font-body;
      font-size: 0.95rem;
      color: $color-text-more-muted;
      line-height: 1.6;
      margin-bottom: 1.75rem;
      flex-grow: 1;
      
      // Limitar a no maximo 2 linhas em cards comuns
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    :host.featured .project-desc {
      -webkit-line-clamp: unset; // Permite texto completo em card destacado
      overflow: visible;
    }

    /* Link de Ação Visível */
    .project-action-link {
      font-family: $font-display;
      font-weight: 700;
      font-size: 0.92rem;
      color: $color-primary;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: auto;
      margin-bottom: 1.5rem;
      cursor: pointer;
      width: fit-content;
      @include transition-smooth;

      .arrow {
        @include transition-smooth;
      }

      &:hover {
        color: $color-primary-hover;
        
        .arrow {
          transform: translateX(4px);
        }
      }
    }

    /* Tech Pills */
    .tech-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .tech-pill {
      font-family: $font-mono;
      font-size: 0.75rem;
      font-weight: 500;
      color: $color-text-more-muted;
      background-color: $color-bg-light;
      padding: 4px 10px;
      border-radius: 4px;
      border: 1px solid rgba($color-border, 0.8);
    }

    /* Hover Overlay */
    .card-overlay {
      display: none;

      @media (hover: hover) {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(13, 31, 92, 0.95);
        backdrop-filter: blur(4px);
        z-index: 10;
        opacity: 0;
        @include flex-center;
        @include transition-smooth;
      }
    }

    .btn-overlay {
      background-color: $color-primary;
      color: $color-white;
      font-family: $font-display;
      font-weight: 600;
      font-size: 0.95rem;
      padding: 0.85rem 1.75rem;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba($color-primary, 0.3);
      @include transition-smooth;

      &:hover {
        background-color: $color-primary-hover;
        transform: translateY(-2px);
      }
    }
  `]
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Output() viewDetails = new EventEmitter<Project>();

  @HostBinding('class.featured')
  get isFeatured(): boolean {
    return this.project.featured;
  }

  public selectProject(): void {
    this.viewDetails.emit(this.project);
  }
}
