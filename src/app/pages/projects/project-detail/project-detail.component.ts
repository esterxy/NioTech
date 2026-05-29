// project-detail.component.ts
import { Component, Input, Output, EventEmitter, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" (click)="dismiss()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <!-- Botão Fechar -->
        <button class="btn-close" (click)="closeModal()" aria-label="Fechar modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="modal-body">
          <!-- Cabeçalho -->
          <div class="detail-header">
            <span class="detail-cat">// {{ project.category }}</span>
            <h2 class="detail-title">{{ project.title }}</h2>
            <p class="detail-client">{{ project.client }} {{ project.location ? '· ' + project.location : '' }}</p>
          </div>

          <!-- Corpo Principal Grid -->
          <div class="detail-grid">
            <!-- Esquerda: Narrativa -->
            <div class="detail-narrative">
              <div class="info-section" *ngIf="project.challenge">
                <h4 class="section-title">O Desafio</h4>
                <p class="section-text">{{ project.challenge }}</p>
              </div>

              <div class="info-section" *ngIf="project.solution">
                <h4 class="section-title">A Solução</h4>
                <p class="section-text">{{ project.solution }}</p>
              </div>

              <!-- Depoimento do Cliente -->
              <div class="testimonial-block" *ngIf="project.testimonial">
                <div class="quote-icon">“</div>
                <p class="quote-text">{{ project.testimonial.text }}</p>
                <div class="quote-author">
                  <strong>{{ project.testimonial.author }}</strong>
                  <span class="quote-role">{{ project.testimonial.role }}</span>
                </div>
              </div>
            </div>

            <!-- Direita: Stack e Resultados -->
            <div class="detail-sidebar">
              <!-- Link do Projeto Online -->
              <div class="sidebar-widget" *ngIf="project.liveUrl">
                <h4 class="widget-title">Link do Projeto</h4>
                <a [href]="project.liveUrl" target="_blank" rel="noopener" class="btn-visit" aria-label="Visitar site do projeto">
                  Visitar Projeto Online ↗
                </a>
              </div>

              <!-- Resultados Métricos -->
              <div class="sidebar-widget" *ngIf="project.results && project.results.length > 0">
                <h4 class="widget-title">Resultados Almejados</h4>
                <div class="results-grid">
                  <div class="result-card" *ngFor="let res of project.results">
                    <div class="result-value">{{ res.value }}</div>
                    <div class="result-label">{{ res.label }}</div>
                  </div>
                </div>
              </div>

              <!-- Stack Tecnológica Completa -->
              <div class="sidebar-widget">
                <h4 class="widget-title">Tecnologias Utilizadas</h4>
                <div class="tech-pills-full">
                  <span class="tech-pill-large" *ngFor="let tech of project.stack">{{ tech }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Rodapé Navegação -->
        <div class="modal-footer">
          <button class="nav-btn nav-prev" (click)="prevProject()">
            <span class="arrow">←</span> Projeto anterior
          </button>
          <button class="nav-btn nav-next" (click)="nextProject()">
            Próximo projeto <span class="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';

    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(12px);
      z-index: 1100;
      @include flex-center;
      padding: 0;
      animation: fadeIn 0.25s ease-out;

      @include tablet {
        padding: 1.5rem;
      }
    }

    .modal-content {
      position: relative;
      width: 100%;
      height: 100%;
      max-width: none;
      max-height: 100%;
      background-color: $color-bg-white;
      border: none;
      border-radius: 0;
      box-shadow: none;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: slideUpScale 0.3s cubic-bezier(0.16, 1, 0.3, 1);

      @include tablet {
        width: 100%;
        max-width: 900px;
        height: auto;
        max-height: 90vh;
        border: 1px solid $color-border;
        border-radius: 16px;
        box-shadow: $shadow-modal;
      }
    }

    .btn-close {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: $color-bg-light;
      color: $color-heading;
      @include flex-center;
      z-index: 20;
      @include transition-smooth;

      svg {
        width: 18px;
        height: 18px;
      }

      &:hover {
        background-color: $color-primary;
        color: white;
        transform: rotate(90deg);
      }
    }

    .modal-body {
      flex-grow: 1;
      padding: clamp(1.5rem, 4vw, 3rem);
      overflow-y: auto;
    }

    .detail-header {
      margin-bottom: 2rem;
      padding-right: 3rem;
    }

    .detail-cat {
      font-family: $font-mono;
      color: $color-primary;
      font-size: 0.85rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: lowercase;
      display: inline-block;
      margin-bottom: 0.5rem;
    }

    .detail-title {
      font-size: clamp(1.5rem, 4vw, 2.2rem);
      margin-bottom: 0.5rem;
    }

    .detail-client {
      font-family: $font-body;
      font-size: 0.95rem;
      color: $color-steel;
    }

    /* Grid Layout */
    .detail-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;

      @include tablet {
        grid-template-columns: 1.5fr 1fr;
      }
    }

    /* Conteudo Esquerda */
    .detail-narrative {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .info-section {
      .section-title {
        font-family: $font-display;
        font-size: 1.25rem;
        font-weight: 700;
        color: $color-heading;
        margin-bottom: 0.75rem;
      }

      .section-text {
        font-size: 0.98rem;
        line-height: 1.7;
        color: $color-text-muted;
      }
    }

    /* Bloco Testemunho */
    .testimonial-block {
      background-color: rgba($color-primary, 0.04);
      border-left: 3px solid $color-primary;
      padding: 1.5rem;
      border-radius: 0 8px 8px 0;
      position: relative;

      .quote-icon {
        position: absolute;
        top: -10px;
        left: 10px;
        font-family: $font-display;
        font-size: 3.5rem;
        font-weight: 800;
        color: rgba($color-primary, 0.1);
        line-height: 1;
      }

      .quote-text {
        font-family: $font-body;
        font-style: italic;
        font-size: 0.98rem;
        color: $color-text;
        line-height: 1.6;
        margin-bottom: 1rem;
        position: relative;
        z-index: 2;
      }

      .quote-author {
        display: flex;
        flex-direction: column;
        font-size: 0.88rem;
        
        strong {
          color: $color-heading;
        }

        .quote-role {
          color: $color-steel;
        }
      }
    }

    /* Sidebar Direita */
    .detail-sidebar {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .btn-visit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      background-color: $color-primary;
      color: $color-white;
      font-family: $font-display;
      font-weight: 700;
      font-size: 0.95rem;
      padding: 0.85rem 1.25rem;
      border-radius: 8px;
      text-decoration: none;
      cursor: pointer;
      text-align: center;
      @include transition-smooth;

      &:hover {
        background-color: $color-primary-hover;
        transform: translateY(-2px);
        box-shadow: 0 4px 14px rgba(37, 211, 102, 0.1);
      }

      &:active {
        transform: translateY(0);
      }
    }

    .sidebar-widget {
      .widget-title {
        font-family: $font-display;
        font-size: 1.05rem;
        font-weight: 700;
        color: $color-heading;
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    .results-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;

      @media (min-width: 480px) and (max-width: 767px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .result-card {
      background-color: $color-bg-light;
      border: 1px solid $color-border;
      border-radius: 8px;
      padding: 1.25rem;
    }

    .result-value {
      font-family: $font-display;
      font-weight: 800;
      font-size: 1.8rem;
      color: $color-primary;
      line-height: 1.1;
      margin-bottom: 2px;
    }

    .result-label {
      font-family: $font-body;
      font-size: 0.85rem;
      color: $color-text-more-muted;
      line-height: 1.4;
    }

    /* Pills */
    .tech-pills-full {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tech-pill-large {
      font-family: $font-mono;
      font-size: 0.82rem;
      font-weight: 500;
      color: $color-text;
      background-color: $color-bg-light;
      border: 1px solid $color-border;
      padding: 6px 12px;
      border-radius: 6px;
    }

    /* Footer Navegação */
    .modal-footer {
      height: 64px;
      border-top: 1px solid $color-border;
      display: flex;
      background-color: $color-bg-light;
    }

    .nav-btn {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: $font-display;
      font-weight: 600;
      font-size: 0.92rem;
      color: $color-heading;
      @include transition-smooth;
      border: none;

      &.nav-prev {
        border-right: 1px solid $color-border;
      }

      &:hover {
        background-color: rgba($color-primary, 0.05);
        color: $color-primary;
        
        .arrow {
          transform: scale(1.15);
        }
      }

      .arrow {
        @include transition-smooth;
      }
    }

    /* Keyframes */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUpScale {
      from { transform: translateY(20px) scale(0.98); opacity: 0; }
      to { transform: translateY(0) scale(1); opacity: 1; }
    }
  `]
})
export class ProjectDetailComponent implements OnInit {
  @Input({ required: true }) project!: Project;
  @Output() close = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public ngOnInit(): void {
    if (this.isBrowser) {
      // Bloquear scroll do body ao abrir o modal
      document.body.style.overflow = 'hidden';
    }
  }

  public closeModal(): void {
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
    this.close.emit();
  }

  public dismiss(): void {
    this.closeModal();
  }

  public prevProject(): void {
    this.prev.emit();
  }

  public nextProject(): void {
    this.next.emit();
  }
}
