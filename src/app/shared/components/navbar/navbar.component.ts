// navbar.component.ts
import { Component, HostListener, OnInit, Inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, BtnPrimaryComponent],
  template: `
    <header class="navbar" [class.scrolled]="isScrolled" [class.hidden]="isHidden">
      <div class="container navbar-container">
        <!-- Logo -->
        <a routerLink="/" class="logo-link" aria-label="Nio Tech Home" (click)="closeMenu()">
          <img [src]="isDarkMode() ? '/logo/niotech - branco.png' : '/logo/niotech - Editado (1).png'" alt="Nio Tech Logo" class="logo-img" />
        </a>

        <!-- Navegação Desktop -->
        <nav class="nav-desktop">
          <a [routerLink]="['/']" fragment="servicos" (click)="navigateToFragment('servicos', $event)" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Serviços</a>
          <a routerLink="/projetos" routerLinkActive="active" class="nav-link">Projetos</a>
          <a [routerLink]="['/']" fragment="processo" (click)="navigateToFragment('processo', $event)" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Processo</a>
          <a [routerLink]="['/']" fragment="contato" (click)="navigateToFragment('contato', $event)" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Contato</a>
        </nav>

        <!-- Botão CTA Desktop & Theme Toggle -->
        <div class="nav-actions-desktop">
          <button class="theme-toggle-btn" (click)="toggleTheme()" [attr.aria-label]="isDarkMode() ? 'Ativar modo claro' : 'Ativar modo escuro'">
            <!-- Sun Icon (visible in dark mode, toggles to light mode) -->
            <svg *ngIf="isDarkMode()" class="theme-icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <!-- Moon Icon (visible in light mode, toggles to dark mode) -->
            <svg *ngIf="!isDarkMode()" class="theme-icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          <div class="nav-cta-desktop">
            <app-btn-primary href="https://wa.me/5571992061607?text=Olá,%20vim%20pelo%20site%20da%20Niō%20Tech%20e%20gostaria%20de%20saber%20mais!" target="_blank" label="Falar com especialista">
            </app-btn-primary>
          </div>
        </div>

        <!-- Botões Mobile (Theme + Hamburger) -->
        <div class="nav-actions-mobile">
          <button class="theme-toggle-btn" (click)="toggleTheme()" [attr.aria-label]="isDarkMode() ? 'Ativar modo claro' : 'Ativar modo escuro'">
            <!-- Sun Icon -->
            <svg *ngIf="isDarkMode()" class="theme-icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <!-- Moon Icon -->
            <svg *ngIf="!isDarkMode()" class="theme-icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          <button class="menu-toggle" (click)="toggleMenu()" [attr.aria-expanded]="isMenuOpen" aria-label="Abrir menu">
            <div class="hamburger-lines" [class.open]="isMenuOpen">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
    </header>

    <!-- Overlay e Drawer para Mobile -->
    <div class="mobile-drawer-overlay" [class.open]="isMenuOpen" (click)="closeMenu()"></div>

    <div class="mobile-drawer" [class.open]="isMenuOpen">
      <div class="drawer-header">
        <a routerLink="/" class="logo-link" (click)="closeMenu()">
          <img [src]="isDarkMode() ? '/logo/niotech - branco.png' : '/logo/niotech - Editado (1).png'" alt="Nio Tech Logo" class="logo-img" />
        </a>
      </div>
      <nav class="drawer-nav">
        <a [routerLink]="['/']" fragment="servicos" class="drawer-link" (click)="navigateToFragment('servicos', $event); closeMenu()">Serviços</a>
        <a routerLink="/projetos" class="drawer-link" (click)="closeMenu()">Projetos</a>
        <a [routerLink]="['/']" fragment="processo" class="drawer-link" (click)="navigateToFragment('processo', $event); closeMenu()">Processo</a>
        <a [routerLink]="['/']" fragment="contato" class="drawer-link" (click)="navigateToFragment('contato', $event); closeMenu()">Contato</a>
      </nav>
      <div class="drawer-footer">
        <app-btn-primary href="https://wa.me/5571992061607?text=Olá,%20vim%20pelo%20site%20da%20Niō%20Tech%20e%20gostaria%20de%20saber%20mais!" target="_blank" (clicked)="closeMenu()" label="Falar com especialista">
        </app-btn-primary>
      </div>
    </div>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';

    .navbar {
      position: sticky;
      top: 0;
      width: 100%;
      height: 90px;
      background-color: $color-bg-white;
      border-bottom: 1px solid $color-border;
      display: flex;
      align-items: center;
      z-index: 1000;
      @include transition-smooth;

       &.scrolled {
        height: 72px;
        box-shadow: $shadow-primary;
        border-bottom-color: rgba($color-border, 0.5);

        .logo-img {
          max-height: 58px;
        }
      }

      &.hidden {
        transform: translateY(-100%);
      }
    }

    .navbar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    .logo-link {
      display: flex;
      align-items: center;
      
      .logo-img {
        max-height: 74px;
        width: auto;
        object-fit: contain;
        display: block;
        @include transition-smooth;
      }
    }

    .nav-desktop {
      display: none;
      align-items: center;
      gap: 2rem;

      @include desktop {
        display: flex;
      }
    }

    .nav-link {
      font-family: $font-display;
      font-weight: 500;
      font-size: 0.95rem;
      color: $color-text-more-muted;
      @include transition-smooth;
      position: relative;
      padding: 0.25rem 0;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: $color-primary;
        @include transition-smooth;
      }

      &:hover {
        color: $color-primary;
        &::after {
          width: 100%;
        }
      }

      &.active {
        color: $color-primary;
        font-weight: 600;
        &::after {
          width: 100%;
        }
      }
    }

    .nav-actions-desktop {
      display: none;
      align-items: center;
      gap: 1.25rem;

      @include desktop {
        display: flex;
      }
    }

    .nav-cta-desktop {
      display: block;
    }

    .nav-actions-mobile {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      @include desktop {
        display: none;
      }
    }

    .theme-toggle-btn {
      background: none;
      border: 1px solid $color-border;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: $color-text-muted;
      @include transition-smooth;

      &:hover {
        background-color: var(--color-ghost-hover-bg);
        border-color: $color-primary;
        color: $color-primary;
        transform: scale(1.05);
      }

      .theme-icon {
        width: 20px;
        height: 20px;
        @include transition-smooth;
      }
    }

    /* Botão Hamburger */
    .menu-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      z-index: 1001;

      @include desktop {
        display: none;
      }
    }

    .hamburger-lines {
      width: 24px;
      height: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;

      span {
        display: block;
        height: 2.5px;
        width: 100%;
        border-radius: 4px;
        background-color: $color-heading;
        @include transition-smooth;
      }

      &.open {
        span:nth-child(1) {
          transform: translateY(7.5px) rotate(45deg);
          background-color: $color-primary;
        }
        span:nth-child(2) {
          opacity: 0;
          transform: scale(0);
        }
        span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
          background-color: $color-primary;
        }
      }
    }

    /* Mobile Drawer */
    .mobile-drawer-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(4px);
      z-index: 998;
      opacity: 0;
      pointer-events: none;
      @include transition-smooth;

      &.open {
        opacity: 1;
        pointer-events: auto;
      }
    }

    .mobile-drawer {
      position: fixed;
      top: 0;
      right: -300px;
      width: 280px;
      height: 100%;
      background-color: $color-bg-white;
      box-shadow: -4px 0 30px rgba(0, 0, 0, 0.15);
      z-index: 999;
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
      @include transition-smooth;

      &.open {
        right: 0;
      }
    }

    .drawer-header {
      height: 56px;
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      border-bottom: 1px solid $color-border;
    }

    .drawer-nav {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: auto;
    }

    .drawer-link {
      font-family: $font-display;
      font-weight: 600;
      font-size: 1.1rem;
      color: $color-heading;
      padding: 0.5rem 0;
      border-bottom: 1.5px solid transparent;
      @include transition-smooth;

      &:hover {
        color: $color-primary;
        padding-left: 6px;
      }
    }

    .drawer-footer {
      padding-top: 1.5rem;
      border-top: 1px solid $color-border;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class NavbarComponent implements OnInit {
  public isMenuOpen = false;
  public isScrolled = false;
  public isHidden = false;
  public isDarkMode = signal<boolean>(false);
  private readonly isBrowser: boolean;
  private lastScrollY = 0;

  constructor(
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public ngOnInit(): void {
    if (this.isBrowser) {
      this.checkScroll();
      this.initTheme();
    }
  }

  private initTheme(): void {
    if (this.isBrowser) {
      const savedTheme = localStorage.getItem('theme');
      const dark = savedTheme !== 'light';
      this.isDarkMode.set(dark);
      this.applyTheme(dark);
    }
  }

  public toggleTheme(): void {
    const newVal = !this.isDarkMode();
    this.isDarkMode.set(newVal);
    if (this.isBrowser) {
      localStorage.setItem('theme', newVal ? 'dark' : 'light');
      this.applyTheme(newVal);
    }
  }

  private applyTheme(dark: boolean): void {
    if (this.isBrowser) {
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    }
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

  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
    if (this.isBrowser) {
      this.checkScroll();
    }
  }

  private checkScroll(): void {
    const currentScrollY = window.scrollY;
    
    // Determina se passou do topo
    this.isScrolled = currentScrollY > 15;

    // Se o menu mobile estiver aberto, não esconde a navbar
    if (this.isMenuOpen) {
      this.lastScrollY = currentScrollY;
      return;
    }

    // Esconde ao rolar para baixo (após 100px), mostra ao rolar para cima
    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      this.isHidden = true;
    } else if (currentScrollY < this.lastScrollY) {
      this.isHidden = false;
    }

    // Garante que mostre no topo absoluto
    if (currentScrollY <= 15) {
      this.isHidden = false;
    }

    this.lastScrollY = currentScrollY;
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public closeMenu(): void {
    this.isMenuOpen = false;
  }
}
