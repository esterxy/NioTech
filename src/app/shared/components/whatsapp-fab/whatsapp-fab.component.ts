// whatsapp-fab.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  template: `
    <a
      href="https://wa.me/5571992061607?text=Olá,%20vim%20pelo%20site%20da%20Niō%20Tech!"
      target="_blank"
      rel="noopener"
      class="whatsapp-fab"
      aria-label="Falar no WhatsApp"
    >
      <!-- ícone WhatsApp SVG -->
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.51 2 2.02 6.5 2 12.03c0 2.05.62 4.02 1.79 5.72L2 22l4.41-1.16c1.64.9 3.48 1.37 5.35 1.37h.01c5.53 0 10.01-4.5 10.02-10.03C21.8 6.5 17.56 2 12.04 2zm5.72 13.62c-.24.68-1.2.19-2-.08-.57-.19-1.26-.49-2.39-1.47-1.13-.98-1.9-2.2-2.07-2.5-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/>
      </svg>
    </a>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';

    .whatsapp-fab {
      position: fixed;
      bottom: 16px;
      right: 16px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: #25D366;
      color: $color-white;
      box-shadow: 0 4px 16px rgba(#25D366, 0.4);
      z-index: 999;
      @include flex-center;
      @include transition-smooth;

      svg {
        width: 24px;
        height: 24px;
      }

      @include tablet {
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;

        svg {
          width: 28px;
          height: 28px;
        }
      }

      &:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 20px rgba(#25D366, 0.6);
        background-color: #22bf5c;
      }

      &:active {
        transform: scale(0.95);
      }
    }
  `]
})
export class WhatsAppFabComponent {}
