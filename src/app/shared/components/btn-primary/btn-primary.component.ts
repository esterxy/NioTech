// btn-primary.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-btn-primary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <ng-container [ngSwitch]="true">
      <a *ngSwitchCase="!!routerLink"
         [routerLink]="routerLink"
         class="btn-primary"
         [attr.aria-label]="ariaLabel">
        {{ label }}
      </a>
      
      <a *ngSwitchCase="!!href"
         [href]="href"
         [target]="target"
         [rel]="rel"
         class="btn-primary"
         [attr.aria-label]="ariaLabel">
        {{ label }}
      </a>
      
      <button *ngSwitchDefault
              (click)="btnClick($event)"
              class="btn-primary"
              [type]="type"
              [attr.aria-label]="ariaLabel">
        {{ label }}
      </button>
    </ng-container>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';

    .btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background-color: $color-primary;
      color: $color-white;
      font-family: $font-display;
      font-weight: 600;
      font-size: 0.95rem;
      padding: 0.85rem 1.6rem;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      @include transition-smooth;

      &:hover {
        background-color: $color-primary-hover;
        transform: translateY(-2px);
        box-shadow: 0 4px 14px rgba($color-primary, 0.3);
      }

      &:active {
        transform: translateY(0);
      }
    }
  `]
})
export class BtnPrimaryComponent {
  @Input() label: string = '';
  @Input() routerLink?: string | any[];
  @Input() href?: string;
  @Input() target: string = '_self';
  @Input() rel: string = 'noopener';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel?: string;
  @Output() clicked = new EventEmitter<MouseEvent>();

  public btnClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
