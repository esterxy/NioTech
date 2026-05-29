// section-label.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-label',
  standalone: true,
  template: `
    <p class="section-label">// {{ text }}</p>
  `,
  styles: [`
    @import 'variables';

    .section-label {
      font-family: $font-mono;
      color: $color-primary;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: lowercase;
      display: inline-block;
      margin-bottom: 1rem;
    }
  `]
})
export class SectionLabelComponent {
  @Input({ required: true }) text: string = '';
}
