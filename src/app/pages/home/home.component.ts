// home.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaService } from '../../core/services/meta.service';
import { HeroComponent } from './sections/hero/hero.component';
import { StatsBarComponent } from './sections/stats-bar/stats-bar.component';
import { ServicesComponent } from './sections/services/services.component';
import { ProcessComponent } from './sections/process/process.component';
import { ProjectsCarouselComponent } from './sections/projects-carousel/projects-carousel.component';
import { CtaComponent } from './sections/cta/cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    StatsBarComponent,
    ServicesComponent,
    ProcessComponent,
    ProjectsCarouselComponent,
    CtaComponent
  ],
  template: `
    <main class="home-page-layout">
      <!-- Seções Principais -->
      <app-hero></app-hero>
      <app-stats-bar></app-stats-bar>
      <app-services></app-services>
      <app-process></app-process>
      <app-projects-carousel></app-projects-carousel>
      <app-cta></app-cta>
    </main>
  `
})
export class HomeComponent implements OnInit {
  private readonly metaService = inject(MetaService);

  public ngOnInit(): void {
    this.metaService.updateMeta(
      'Home',
      'Softwares sob medida, sites de alta performance e automações de processos para simplificar sua rotina de negócios, reduzir custos e escalar seus resultados.',
      '/'
    );
  }
}
