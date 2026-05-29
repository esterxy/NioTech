// projects.component.ts
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../core/services/projects.service';
import { MetaService } from '../../core/services/meta.service';
import { Project } from '../../core/models/project.model';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

interface CategoryFilter {
  id: string;
  label: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, ProjectDetailComponent, AnimateOnScrollDirective],
  template: `
    <main class="projects-page">
      <!-- Cabeçalho da Página -->
      <section class="projects-hero tech-grid section-padding">
        <div class="container hero-container" appAnimateOnScroll>
          <span class="mono-label">// portfólio</span>
          <h1 class="page-title">Projetos que transformaram operações reais</h1>
          <p class="page-subtitle">
            Cada entrega carrega um problema de negócio resolvido, processos manuais eliminados e resultados mensuráveis.
          </p>
        </div>
      </section>

      <!-- Seção do Portfólio (Filtros e Grid) -->
      <section class="portfolio-section container">
        <!-- Barra de Filtros -->
        <div class="filters-bar" appAnimateOnScroll delay="100ms">
          <button 
            *ngFor="let filter of filters"
            (click)="selectCategory(filter.id)"
            [class.active]="selectedCategory() === filter.id"
            class="filter-pill"
            [attr.aria-label]="'Filtrar por ' + filter.label"
          >
            {{ filter.label }} <span class="filter-count">({{ getCategoryCount(filter.id) }})</span>
          </button>
        </div>

        <!-- Grid de Projetos -->
        <div class="projects-grid">
          @for (proj of filteredProjects(); track proj.id; let idx = $index) {
            <app-project-card 
              [project]="proj"
              (viewDetails)="openProjectDetails($event)"
              appAnimateOnScroll
              [delay]="(idx % 4 * 100) + 'ms'"
            ></app-project-card>
          } @empty {
            <div class="empty-state" appAnimateOnScroll>
              <p class="empty-text">// Nenhum projeto encontrado nessa categoria.</p>
            </div>
          }
        </div>
      </section>

      <!-- Modal de Detalhe do Projeto -->
      @if (activeProject()) {
        <app-project-detail
          [project]="activeProject()!"
          (close)="closeProjectDetails()"
          (prev)="navigateProject(-1)"
          (next)="navigateProject(1)"
        ></app-project-detail>
      }
    </main>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';

    .projects-page {
      background-color: $color-bg-light;
      padding-bottom: clamp(4rem, 8vw, 8rem);
    }

    /* Cabeçalho */
    .projects-hero {
      position: relative;
      @include tech-grid-bg;
      text-align: left;
      border-bottom: 1px solid $color-border;
    }

    .hero-container {
      max-width: 780px;
    }

    .mono-label {
      font-family: $font-mono;
      color: $color-primary;
      font-size: 0.85rem;
      font-weight: 500;
      text-transform: lowercase;
      display: inline-block;
      margin-bottom: 0.75rem;
    }

    .page-title {
      margin-bottom: 1rem;
    }

    .page-subtitle {
      font-size: 1.12rem;
      color: $color-text-muted;
      line-height: 1.6;
    }

    /* Filtros */
    .portfolio-section {
      margin-top: clamp(2.5rem, 5vw, 4rem);
    }

    .filters-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 2.5rem;
      justify-content: flex-start;

      @include tablet {
        gap: 12px;
      }
    }

    .filter-pill {
      font-family: $font-display;
      font-weight: 600;
      font-size: 0.9rem;
      padding: 0.55rem 1.25rem;
      border-radius: 20px;
      @include transition-smooth;
      
      // Inativo
      border: 1px solid $color-border;
      background-color: $color-bg-white;
      color: $color-text-more-muted;

      &:hover {
        border-color: $color-border-hover;
        color: $color-primary;
      }

      &.active {
        border-color: $color-primary;
        background-color: $color-primary;
        color: $color-white;
        box-shadow: 0 4px 12px rgba($color-primary, 0.2);
      }
    }

    .filter-count {
      font-family: $font-mono;
      font-size: 0.78rem;
      opacity: 0.85;
      margin-left: 3px;
    }

    /* Grid */
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;

      @include tablet {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }
    }

    /* Empty state */
    .empty-state {
      grid-column: 1 / -1;
      padding: 5rem 2rem;
      text-align: center;
      background-color: $color-bg-white;
      border: 1px dashed $color-border;
      border-radius: 12px;
    }

    .empty-text {
      font-family: $font-mono;
      color: $color-steel;
      font-size: 0.95rem;
    }
  `]
})
export class ProjectsComponent implements OnInit {
  private readonly projectsService = inject(ProjectsService);
  private readonly metaService = inject(MetaService);

  // Filtros disponiveis
  public readonly filters: CategoryFilter[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'software', label: 'Software' },
    { id: 'automacao', label: 'Automação' },
    { id: 'site', label: 'Sites' },
    { id: 'integracao', label: 'Integrações' },
    { id: 'dashboard', label: 'Dashboards' }
  ];

  // Categoria ativa (usando Signal)
  public readonly selectedCategory = signal<string>('todos');

  // Filtragem Reativa baseada no signal
  public readonly filteredProjects = computed<Project[]>(() => {
    const cat = this.selectedCategory();
    if (cat === 'todos') {
      return this.projectsService.projects();
    }
    return this.projectsService.projects().filter(p => p.category === cat);
  });

  // Projeto selecionado para o modal (usando Signal)
  public readonly activeProject = signal<Project | null>(null);

  public ngOnInit(): void {
    this.metaService.updateMeta(
      'Projetos',
      'Veja o portfólio de projetos desenvolvidos pela Niō Tech: softwares corporativos sob medida, integrações de APIs, e automações robustas de processos.',
      '/projetos'
    );
  }

  public getCategoryCount(catId: string): number {
    const list = this.projectsService.projects();
    if (catId === 'todos') {
      return list.length;
    }
    return list.filter(p => p.category === catId).length;
  }

  public selectCategory(catId: string): void {
    this.selectedCategory.set(catId);
  }

  public openProjectDetails(project: Project): void {
    this.activeProject.set(project);
  }

  public closeProjectDetails(): void {
    this.activeProject.set(null);
  }

  /**
   * Navega entre projetos com base na direção (-1 = anterior, 1 = próximo)
   * Apenas percorre a lista atualmente filtrada
   */
  public navigateProject(direction: number): void {
    const current = this.activeProject();
    if (!current) return;

    const list = this.filteredProjects();
    const currentIndex = list.findIndex(p => p.id === current.id);
    if (currentIndex === -1) return;

    // Calcular novo index circular
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) {
      nextIndex = list.length - 1;
    } else if (nextIndex >= list.length) {
      nextIndex = 0;
    }

    this.activeProject.set(list[nextIndex]);
  }
}
