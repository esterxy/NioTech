// btn-ghost.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-btn-ghost',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <ng-container [ngSwitch]="true">
      <a *ngSwitchCase="!!routerLink"
         [routerLink]="routerLink"
         class="btn-ghost"
         [attr.aria-label]="ariaLabel">
        {{ label }}
      </a>
      
      <a *ngSwitchCase="!!href"
         [href]="href"
         [target]="target"
         [rel]="rel"
         class="btn-ghost"
         [attr.aria-label]="ariaLabel">
        {{ label }}
      </a>
      
      <button *ngSwitchDefault
              (click)="btnClick($event)"
              class="btn-ghost"
              [type]="type"
              [attr.aria-label]="ariaLabel">
        {{ label }}
      </button>
    </ng-container>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';

    .btn-ghost {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background-color: transparent;
      color: $color-primary;
      font-family: $font-display;
      font-weight: 600;
      font-size: 0.95rem;
      padding: 0.85rem 1.6rem;
      border-radius: 8px;
      border: 1.5px solid $color-primary;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      @include transition-smooth;

      &:hover {
        background-color: var(--color-ghost-hover-bg);
        border-color: $color-primary-hover;
        color: $color-primary-hover;
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }
    }
  `]
})
export class BtnGhostComponent {
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
