// footer.component.ts
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer" id="contato">
      <div class="container footer-grid">
        <!-- Coluna 1: Logo e Descrição -->
        <div class="footer-col brand-col">
          <a routerLink="/" class="footer-logo" aria-label="Nio Tech Home">
            <img src="/logo/niotech - branco.png" alt="Nio Tech Logo" class="logo-img" />
          </a>
          <p class="brand-desc">
            Simplificamos a rotina de negócios, reduzindo custos e escalando resultados através de tecnologia de alto desempenho.
          </p>
        </div>

        <!-- Coluna 2: Links de Navegação -->
        <div class="footer-col links-col">
          <h4 class="col-title">Navegação</h4>
          <ul class="footer-links">
            <li><a [routerLink]="['/']" fragment="servicos" (click)="navigateToFragment('servicos', $event)" class="footer-link">Serviços</a></li>
            <li><a routerLink="/projetos" class="footer-link">Projetos</a></li>
            <li><a [routerLink]="['/']" fragment="processo" (click)="navigateToFragment('processo', $event)" class="footer-link">Processo</a></li>
            <li><a [routerLink]="['/']" fragment="contato" (click)="navigateToFragment('contato', $event)" class="footer-link">Contato</a></li>
          </ul>
        </div>

        <!-- Coluna 3: Redes Sociais e Contatos -->
        <div class="footer-col contact-col">
          <h4 class="col-title">Contato</h4>
          
          <div class="contact-info">
            <a href="https://wa.me/5571992061607?text=Olá,%20vim%20pelo%20site%20da%20Niō%20Tech%20e%20gostaria%20de%20saber%20mais!" 
               target="_blank" 
               rel="noopener" 
               class="contact-item" 
               aria-label="Falar no WhatsApp">
              <span class="icon-wrapper wa-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.51 2 2.02 6.5 2 12.03c0 2.05.62 4.02 1.79 5.72L2 22l4.41-1.16c1.64.9 3.48 1.37 5.35 1.37h.01c5.53 0 10.01-4.5 10.02-10.03C21.8 6.5 17.56 2 12.04 2zm5.72 13.62c-.24.68-1.2.19-2-.08-.57-.19-1.26-.49-2.39-1.47-1.13-.98-1.9-2.2-2.07-2.5-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/>
                </svg>
              </span>
              <span class="contact-text">WhatsApp: (71) 99206-1607</span>
            </a>

            <a href="https://www.instagram.com/niotechbr/" 
               target="_blank" 
               rel="noopener" 
               class="contact-item" 
               aria-label="Seguir no Instagram">
              <span class="icon-wrapper ig-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </span>
              <span class="contact-text">Instagram: &#64;niotechbr</span>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container bottom-container">
          <p class="copyright">© 2026 <a href="https://www.instagram.com/niotechbr/" target="_blank" rel="noopener" class="copyright-link">Niō Tech</a> — Todos os direitos reservados</p>
          <p class="tech-tag">// clean.code.scalable.systems</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';

    .footer {
      background-color: $color-dark;
      color: $color-white;
      padding-top: clamp(3rem, 6vw, 5rem);
      border-top: 1px solid rgba($color-border, 0.1);
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
      padding-bottom: clamp(3rem, 6vw, 5rem);

      @include tablet {
        grid-template-columns: 2fr 1fr 1fr;
      }
    }

    .footer-col {
      display: flex;
      flex-direction: column;
    }

    .brand-col {
      .footer-logo {
        display: inline-block;
        margin-bottom: 1.5rem;

        .logo-img {
          max-height: 90px;
          width: auto;
          object-fit: contain;
          display: block;
        }
      }

      .brand-desc {
        color: $color-steel;
        font-size: 0.95rem;
        line-height: 1.6;
        max-width: 380px;
      }
    }

    .col-title {
      font-family: $font-display;
      font-size: 1.1rem;
      font-weight: 700;
      color: $color-white;
      margin-bottom: 1.5rem;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 24px;
        height: 2px;
        background-color: $color-primary;
      }
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      li {
        display: block;
      }
    }

    .footer-link {
      color: $color-steel;
      font-size: 0.95rem;
      @include transition-smooth;

      &:hover {
        color: $color-accent;
        padding-left: 4px;
      }
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: $color-steel;
      text-decoration: none;
      @include transition-smooth;

      &:hover {
        color: $color-white;
        
        .icon-wrapper.wa-icon {
          background-color: #25D366;
          color: white;
        }

        .icon-wrapper.ig-icon {
          background-color: #E1306C;
          color: white;
        }
      }
    }

    .icon-wrapper {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: rgba($color-steel, 0.1);
      color: $color-steel;
      @include flex-center;
      @include transition-smooth;

      svg {
        width: 18px;
        height: 18px;
      }
    }

    .contact-text {
      font-family: $font-body;
      font-size: 0.95rem;
    }

    .footer-bottom {
      background-color: $color-dark-hover;
      padding: 1.5rem 0;
      border-top: 1px solid rgba($color-border, 0.05);
    }

    .bottom-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      text-align: center;
    }

    .copyright {
      color: $color-steel-muted;
      font-size: 0.85rem;
      text-align: center;
    }

    .copyright-link {
      color: inherit;
      font-weight: 600;
      text-decoration: none;
      @include transition-smooth;

      &:hover {
        color: $color-accent;
      }
    }

    .tech-tag {
      font-family: $font-mono;
      color: rgba($color-accent, 0.5);
      font-size: 0.8rem;
    }
  `]
})
export class FooterComponent {
  private readonly isBrowser: boolean;

  constructor(
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public navigateToFragment(fragment: string, event: Event): void {
    if (this.isBrowser) {
      const currentUrl = this.router.url.split('#')[0];
      if (currentUrl === '/' || currentUrl === '') {
        event.preventDefault();
        const el = document.getElementById(fragment);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }
}
