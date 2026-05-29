// animate-on-scroll.directive.ts
import { Directive, ElementRef, Input, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  @Input() delay: string = '0ms';
  @Input() duration: string = '700ms';
  @Input() threshold: number = 0.15;
  @Input() transformValue: string = 'translateY(24px)';

  public ngOnInit(): void {
    const domEl = this.el.nativeElement as HTMLElement;

    if (isPlatformBrowser(this.platformId)) {
      // Configurar estilos base para a animacao de entrada
      domEl.style.opacity = '0';
      domEl.style.transform = this.transformValue;
      domEl.style.transition = `opacity ${this.duration} cubic-bezier(0.16, 1, 0.3, 1), transform ${this.duration} cubic-bezier(0.16, 1, 0.3, 1)`;
      domEl.style.transitionDelay = this.delay;

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              domEl.style.opacity = '1';
              domEl.style.transform = 'translateY(0)';
              domEl.classList.add('is-visible');
              
              // Parar de observar assim que a animacao for engatada
              this.observer?.unobserve(domEl);
            }
          });
        },
        {
          threshold: this.threshold,
          rootMargin: '0px 0px -40px 0px' // Dispara pouco antes de entrar completamente
        }
      );

      this.observer.observe(domEl);
    } else {
      // Se for SSR (crawler/bot), deixar visivel por padrao para fins de SEO
      domEl.style.opacity = '1';
      domEl.style.transform = 'translateY(0)';
    }
  }

  public ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
