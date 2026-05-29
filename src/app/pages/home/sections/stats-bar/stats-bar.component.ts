// stats-bar.component.ts
import { Component, OnInit, OnDestroy, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface MetricItem {
  target: number;
  suffix: string;
  label: string;
  current: number;
}

@Component({
  selector: 'app-stats-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="stats-bar" ref-statsSection>
      <div class="container stats-container">
        <div class="stat-card" *ngFor="let metric of metrics">
          <div class="stat-number">
            <span class="count">{{ metric.current }}</span>{{ metric.suffix }}
          </div>
          <p class="stat-label">{{ metric.label }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';

    .stats-bar {
      background-color: $color-dark;
      color: $color-white;
      padding: clamp(2.5rem, 5vw, 4rem) 0;
      border-top: 1px solid rgba($color-border, 0.05);
      border-bottom: 1px solid rgba($color-border, 0.05);
    }

    .stats-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;

      @media (min-width: 400px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 2.5rem;
      }

      @include tablet {
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
      }
    }

    .stat-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .stat-number {
      font-family: $font-display;
      font-weight: 800;
      font-size: clamp(2rem, 5vw, 3.2rem);
      color: $color-accent;
      line-height: 1;
      margin-bottom: 0.5rem;
      letter-spacing: -0.01em;

      .count {
        color: $color-white;
      }
    }

    .stat-label {
      font-family: $font-body;
      font-weight: 500;
      font-size: 0.95rem;
      color: $color-steel;
      max-width: 160px;
      line-height: 1.4;
    }
  `]
})
export class StatsBarComponent implements OnInit, OnDestroy {
  public readonly metrics: MetricItem[] = [
    { target: 50, suffix: '+', label: 'projetos entregues', current: 0 },
    { target: 98, suffix: '%', label: 'satisfação dos clientes', current: 0 },
    { target: 3, suffix: '×', label: 'aumento em produtividade', current: 0 },
    { target: 24, suffix: '/7', label: 'suporte técnico ágil', current: 0 }
  ];

  private observer: IntersectionObserver | null = null;
  private readonly isBrowser: boolean;

  constructor(
    private readonly el: ElementRef,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public ngOnInit(): void {
    if (this.isBrowser) {
      this.initObserver();
    } else {
      // No SSR, exibe o valor final de uma vez
      this.metrics.forEach(m => m.current = m.target);
    }
  }

  public ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounters();
            this.observer?.disconnect(); // Executa a animacao apenas uma vez
          }
        });
      },
      { threshold: 0.1 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private animateCounters(): void {
    const duration = 1200; // milissegundos
    const steps = 60;
    const intervalTime = duration / steps;

    this.metrics.forEach((metric) => {
      let stepCount = 0;
      const increment = metric.target / steps;

      const timer = setInterval(() => {
        stepCount++;
        if (stepCount >= steps) {
          metric.current = metric.target;
          clearInterval(timer);
        } else {
          metric.current = Math.floor(increment * stepCount);
        }
      }, intervalTime);
    });
  }
}
