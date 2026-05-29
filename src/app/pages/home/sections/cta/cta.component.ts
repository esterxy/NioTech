// cta.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  template: `
    <section class="cta-section section-padding">
      <!-- Circuit board line vectors in background -->
      <div class="cta-vector-bg">
        <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50 150H150L220 220V350H450L500 400" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M850 100H650L580 170V300H350L300 350" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
          
          <circle cx="150" cy="150" r="5" fill="white"/>
          <circle cx="220" cy="220" r="5" fill="white"/>
          <circle cx="350" cy="300" r="5" fill="white"/>
          <circle cx="580" cy="170" r="5" fill="white"/>
          <circle cx="650" cy="100" r="5" fill="white"/>
        </svg>
      </div>

      <div class="container cta-container" appAnimateOnScroll>
        <h2 class="cta-title">Pronto para simplificar sua operação?</h2>
        <p class="cta-desc">
          Agende uma conversa rápida e sem compromisso para analisarmos os gargalos operacionais da sua empresa e como podemos automatizá-los.
        </p>
        
        <a 
          href="https://wa.me/5571992061607?text=Olá,%20vim%20pelo%20site%20da%20Niō%20Tech%20e%20gostaria%20de%20saber%20mais!" 
          target="_blank" 
          rel="noopener" 
          class="btn-white"
          aria-label="Agendar conversa no WhatsApp"
        >
          Agendar conversa →
        </a>
      </div>
    </section>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';

    .cta-section {
      background-color: $color-primary;
      position: relative;
      overflow: hidden;
      text-align: center;
      color: $color-white;
    }

    .cta-vector-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
      opacity: 0.08;

      svg {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .cta-container {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 640px;
    }

    .cta-title {
      color: $color-white;
      margin-bottom: 1.25rem;
    }

    .cta-desc {
      color: rgba($color-white, 0.85);
      font-size: 1.08rem;
      line-height: 1.6;
      margin-bottom: 2.5rem;
    }

    .btn-white {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background-color: $color-white;
      color: $color-primary;
      font-family: $font-display;
      font-weight: 700;
      font-size: 1rem;
      padding: 0.95rem 2.25rem;
      border-radius: 8px;
      text-decoration: none;
      cursor: pointer;
      box-shadow: $shadow-primary;
      @include transition-smooth;

      &:hover {
        background-color: #F5F6F8;
        color: $color-primary-hover;
        transform: translateY(-2px);
        box-shadow: $shadow-large;
      }

      &:active {
        transform: translateY(0);
      }
    }
  `]
})
export class CtaComponent {}
