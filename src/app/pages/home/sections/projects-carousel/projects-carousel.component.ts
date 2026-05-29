// projects-carousel.component.ts
import { Component, OnInit, OnDestroy, inject, signal, viewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectsService } from '../../../../core/services/projects.service';
import { Project } from '../../../../core/models/project.model';
import { ProjectCardComponent } from '../../../projects/project-card/project-card.component';
import { ProjectDetailComponent } from '../../../projects/project-detail/project-detail.component';
import { SectionLabelComponent } from '../../../../shared/components/section-label/section-label.component';
import { BtnGhostComponent } from '../../../../shared/components/btn-ghost/btn-ghost.component';

@Component({
  selector: 'app-projects-carousel',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProjectCardComponent,
    ProjectDetailComponent,
    SectionLabelComponent,
    BtnGhostComponent
  ],
  template: `
    <section class="projects-section section-padding">
      <div class="container">
        <!-- Cabeçalho da Seção -->
        <div class="section-header">
          <div>
            <app-section-label text="cases de sucesso"></app-section-label>
            <h2 class="section-title">Projetos em Destaque</h2>
          </div>
        </div>

        <!-- Container Relativo com Botões do Lado -->
        <div class="carousel-container-relative">
          <!-- Botão Esquerdo -->
          <button 
            class="control-btn side-btn left-btn" 
            (click)="scrollLeft()" 
            (mouseenter)="stopAutoplay()" 
            (mouseleave)="startAutoplay()"
            aria-label="Ver projeto anterior"
          >
            ←
          </button>
          
          <!-- Container do Carrossel -->
          <div 
            class="carousel-wrapper" 
            #carouselContainer
            (mouseenter)="stopAutoplay()"
            (mouseleave)="startAutoplay()"
          >
            <div class="carousel-track">
              <div class="carousel-item" *ngFor="let proj of projects()">
                <app-project-card 
                  [project]="proj" 
                  (viewDetails)="openProjectDetails($event)">
                </app-project-card>
              </div>
            </div>
          </div>

          <!-- Botão Direito -->
          <button 
            class="control-btn side-btn right-btn" 
            (click)="scrollRight()" 
            (mouseenter)="stopAutoplay()" 
            (mouseleave)="startAutoplay()"
            aria-label="Ver próximo projeto"
          >
            →
          </button>
        </div>
        
        <!-- Link para portfólio completo -->
        <div class="view-all-container">
          <app-btn-ghost [routerLink]="['/projetos']" label="Ver todos os projetos →">
          </app-btn-ghost>
        </div>
      </div>

      <!-- Modal de Detalhe do Projeto -->
      @if (activeProject()) {
        <app-project-detail
          [project]="activeProject()!"
          (close)="closeProjectDetails()"
          (prev)="navigateProject(-1)"
          (next)="navigateProject(1)"
        ></app-project-detail>
      }
    </section>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';

    .projects-section {
      background-color: $color-bg-white;
      position: relative;
      overflow: hidden;
      border-top: 1px solid $color-border;
      border-bottom: 1px solid $color-border;
    }

    .section-header {
      margin-bottom: 2.5rem;
    }

    .section-title {
      margin-top: 0.5rem;
      margin-bottom: 0;
    }

    /* Container Relativo do Carrossel */
    .carousel-container-relative {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
    }

    /* Controles Laterais Absolutos */
    .control-btn {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      border: 1px solid $color-border;
      background-color: $color-bg-white;
      color: $color-primary;
      font-family: $font-display;
      font-size: 1.1rem;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba($color-dark, 0.12);
      cursor: pointer;
      @include flex-center;
      @include transition-smooth;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 50;
      display: none; /* Escondido no mobile, pois lá usa-se touch swipe */

      @include tablet {
        display: flex;
      }

      &.left-btn {
        left: -23px;
      }

      &.right-btn {
        right: -23px;
      }

      &:hover {
        background-color: $color-primary;
        color: $color-white;
        border-color: $color-primary;
        transform: translateY(-50%) scale(1.1);
        box-shadow: 0 6px 16px rgba($color-primary, 0.3);
      }

      &:active {
        transform: translateY(-50%) scale(0.95);
      }
    }

    /* Carrossel */
    .carousel-wrapper {
      width: 100%;
      overflow-x: auto;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none;  /* IE and Edge */
      scroll-behavior: smooth;
      scroll-snap-type: x mandatory;
      padding: 0.75rem 0;

      &::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
      }
    }

    .carousel-track {
      display: flex;
      gap: 1.5rem;
      width: max-content;
    }

    .carousel-item {
      width: 85vw;
      max-width: 290px;
      scroll-snap-align: start;
      flex-shrink: 0;

      @include tablet {
        width: 380px;
        max-width: none;
      }

      @include desktop {
        width: 440px;
      }

      /* Sobrescreve classes featured do card para manter proporcoes no carrossel */
      ::ng-deep app-project-card {
        height: 100%;
        box-shadow: 0 4px 16px rgba($color-dark, 0.04);
        border: 1px solid rgba($color-border, 0.8) !important;

        &.featured {
          grid-column: auto !important;
          .card-inner {
            flex-direction: column !important;
          }
          .project-metric-block {
            margin: 0 0 1.5rem 0 !important;
            padding: 0 !important;
            border-top: none !important;
            border-bottom: none !important;
            display: block !important;
          }
          .project-desc {
            -webkit-line-clamp: 2 !important;
            overflow: hidden !important;
          }
        }
      }
    }

    .view-all-container {
      margin-top: 3rem;
      display: flex;
      justify-content: center;
    }
  `]
})
export class ProjectsCarouselComponent implements OnInit, OnDestroy {
  private readonly projectsService = inject(ProjectsService);
  private readonly isBrowser: boolean;
  
  public readonly projects = this.projectsService.projects;
  public readonly activeProject = signal<Project | null>(null);

  // Autoplay
  private autoplayIntervalId: any = null;

  // Selecionando container para scroll
  private readonly carouselContainer = viewChild<ElementRef<HTMLDivElement>>('carouselContainer');

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public ngOnInit(): void {
    if (this.isBrowser) {
      this.startAutoplay();
    }
  }

  public ngOnDestroy(): void {
    this.stopAutoplay();
  }

  public startAutoplay(): void {
    if (!this.isBrowser) return;
    this.stopAutoplay();
    this.autoplayIntervalId = setInterval(() => {
      // Só avança se o modal de detalhes do projeto não estiver ativo
      if (!this.activeProject()) {
        this.scrollRight();
      }
    }, 5000);
  }

  public stopAutoplay(): void {
    if (this.autoplayIntervalId) {
      clearInterval(this.autoplayIntervalId);
      this.autoplayIntervalId = null;
    }
  }

  public openProjectDetails(project: Project): void {
    this.activeProject.set(project);
    this.stopAutoplay();
  }

  public closeProjectDetails(): void {
    this.activeProject.set(null);
    this.startAutoplay();
  }

  public scrollLeft(): void {
    const el = this.carouselContainer()?.nativeElement;
    if (el) {
      const cardWidth = el.querySelector('.carousel-item')?.clientWidth || 300;
      const gap = 24;
      const scrollStep = cardWidth + gap;

      if (el.scrollLeft <= 10) {
        // Se estiver no começo, vai para o fim
        el.scrollLeft = el.scrollWidth;
      } else {
        el.scrollLeft -= scrollStep;
      }
    }
  }

  public scrollRight(): void {
    const el = this.carouselContainer()?.nativeElement;
    if (el) {
      const cardWidth = el.querySelector('.carousel-item')?.clientWidth || 300;
      const gap = 24;
      const scrollStep = cardWidth + gap;

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        // Se chegou ao fim, volta pro começo
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += scrollStep;
      }
    }
  }

  public navigateProject(direction: number): void {
    const current = this.activeProject();
    if (!current) return;

    const list = this.projects();
    const currentIndex = list.findIndex(p => p.id === current.id);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) {
      nextIndex = list.length - 1;
    } else if (nextIndex >= list.length) {
      nextIndex = 0;
    }

    this.activeProject.set(list[nextIndex]);
  }
}
