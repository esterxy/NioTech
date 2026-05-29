// hero.component.ts
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { BtnPrimaryComponent } from '../../../../shared/components/btn-primary/btn-primary.component';
import { BtnGhostComponent } from '../../../../shared/components/btn-ghost/btn-ghost.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, BtnPrimaryComponent, BtnGhostComponent],
  template: `
    <section class="hero tech-grid">
      <div class="container hero-container">
        <!-- Coluna Esquerda: Textos e CTAs -->
        <div class="hero-left" [@fadeUp]>
          <div class="pill-label">
            <span class="pulse-dot"></span>
            <span class="mono-text">// tecnologia sob medida</span>
          </div>
          <h1 class="hero-title">
            Tecnologia que trabalha enquanto você <span class="highlight">escala</span>
          </h1>
          <p class="hero-desc">
            Softwares sob medida, sites de alta performance e automações inteligentes que eliminam o trabalho manual da sua equipe e impulsionam seu faturamento.
          </p>
          <div class="hero-actions">
            <app-btn-primary href="https://wa.me/5571992061607?text=Olá,%20vim%20pelo%20site%20da%20Niō%20Tech%20e%20gostaria%20de%20saber%20mais!" target="_blank" label="Iniciar projeto →">
            </app-btn-primary>
            <app-btn-ghost [routerLink]="['/']" fragment="processo" label="Ver como funciona">
            </app-btn-ghost>
          </div>
        </div>

        <!-- Coluna Direita: Terminal Interativo Animado -->
        <div class="hero-right" [@scaleIn]>
          <div class="terminal">
            <div class="terminal-header">
              <div class="terminal-dots">
                <span class="dot dot-red"></span>
                <span class="dot dot-yellow"></span>
                <span class="dot dot-green"></span>
              </div>
              <div class="terminal-title">bash - niotech-bot.js</div>
              <div class="terminal-lang">javascript</div>
            </div>
            <div class="terminal-body">
              <div class="code-line" *ngFor="let line of typedLines; let i = index">
                <span class="line-number">{{ i + 1 }}</span>
                <span class="line-text" [innerHTML]="line"></span>
              </div>
              <!-- Cursor piscando no final da digitação ativa -->
              <div class="code-line" *ngIf="isTyping">
                <span class="line-number">{{ typedLines.length + 1 }}</span>
                <span class="line-text typing-cursor">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';

    .hero {
      position: relative;
      @include tech-grid-bg;
      padding-top: clamp(6rem, 10vw, 9rem);
      padding-bottom: clamp(5rem, 8vw, 7rem);
      overflow: hidden;
    }

    .hero-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3.5rem;
      align-items: center;

      @include desktop {
        grid-template-columns: 1.2fr 1fr;
        gap: 4rem;
      }
    }

    /* Coluna Esquerda */
    .hero-left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .pill-label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      background-color: rgba($color-primary, 0.08);
      border: 1px solid rgba($color-primary, 0.15);
      border-radius: 20px;
      margin-bottom: 1.5rem;
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: $color-success;
      animation: pulse 1.8s infinite;
    }

    .mono-text {
      font-family: $font-mono;
      color: $color-primary;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .hero-title {
      margin-bottom: 1.5rem;
      
      .highlight {
        color: $color-primary;
        position: relative;
        display: inline-block;
        
        &::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          width: 100%;
          height: 8px;
          background-color: rgba($color-accent, 0.2);
          z-index: -1;
        }
      }
    }

    .hero-desc {
      font-size: 1.15rem;
      color: $color-text-muted;
      margin-bottom: 2.5rem;
      max-width: 540px;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      width: 100%;
      
      @include mobile {
        flex-direction: column;
        
        app-btn-primary, app-btn-ghost {
          width: 100%;
          ::ng-deep .btn-primary, ::ng-deep .btn-ghost {
            width: 100%;
          }
        }
      }
    }

    /* Coluna Direita - Terminal */
    .hero-right {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .terminal {
      width: 100%;
      max-width: 500px;
      background-color: #0A0F24;
      border: 1px solid rgba($color-steel, 0.15);
      border-radius: 12px;
      box-shadow: $shadow-large;
      overflow: hidden;
      font-family: $font-mono;
    }

    .terminal-header {
      height: 38px;
      background-color: #121833;
      border-bottom: 1px solid rgba($color-steel, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
    }

    .terminal-dots {
      display: flex;
      gap: 6px;
      
      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      .dot-red { background-color: #FF5F56; }
      .dot-yellow { background-color: #FFBD2E; }
      .dot-green { background-color: #27C93F; }
    }

    .terminal-title {
      font-size: 0.75rem;
      color: $color-steel;
    }

    .terminal-lang {
      font-size: 0.7rem;
      color: rgba($color-accent, 0.6);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .terminal-body {
      padding: 16px;
      min-height: 280px;
      font-size: 0.85rem;
      line-height: 1.6;
      color: #E2E8F0;
      overflow-y: auto;
    }

    .code-line {
      display: flex;
      margin-bottom: 4px;
    }

    .line-number {
      width: 24px;
      color: rgba($color-steel, 0.4);
      user-select: none;
      flex-shrink: 0;
    }

    .line-text {
      white-space: pre-wrap;
      word-break: break-all;
    }

    .typing-cursor {
      color: $color-accent;
      animation: blink 1s step-end infinite;
    }

    /* Animacoes */
    @keyframes pulse {
      0% { transform: scale(0.9); opacity: 0.6; }
      50% { transform: scale(1.15); opacity: 1; box-shadow: 0 0 8px rgba($color-success, 0.5); }
      100% { transform: scale(0.9); opacity: 0.6; }
    }

    @keyframes blink {
      from, to { opacity: 1; }
      50% { opacity: 0; }
    }
  `],
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('900ms 150ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class HeroComponent implements OnInit, OnDestroy {
  public typedLines: string[] = [];
  public isTyping = true;
  private readonly isBrowser: boolean;

  private readonly codeLines: string[] = [
    '<span style="color: #64748B">// Inicializando automação Niō...</span>',
    '<span style="color: #F43F5E">const</span> nio = <span style="color: #06B6D4">require</span>(<span style="color: #10B981">"niotech"</span>);',
    '<span style="color: #F43F5E">const</span> app = <span style="color: #06B6D4">nio.connect</span>(<span style="color: #10B981">"gestao-vendas"</span>);',
    '',
    '<span style="color: #64748B">// Monitorar e otimizar processos</span>',
    '<span style="color: #3B82F6">app.on</span>(<span style="color: #10B981">"manual_task"</span>, <span style="color: #F43F5E">async</span> (task) => {',
    '  <span style="color: #06B6D4">console.log</span>(<span style="color: #10B981">\`[RPA] Otimizando: \${task.name}\`</span>);',
    '  <span style="color: #F43F5E">await</span> <span style="color: #06B6D4">nio.automate</span>(task);',
    '  <span style="color: #64748B">// faturamento reduzido em 85%!</span>',
    '  <span style="color: #06B6D4">console.log</span>(<span style="color: #10B981">"✓ Processo integrado com sucesso."</span>);',
    '});',
    '',
    '<span style="color: #10B981">// Status: Rodando em produção 24/7</span>'
  ];

  private currentLineIndex = 0;
  private currentCharIndex = 0;
  private timerId: any = null;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public ngOnInit(): void {
    if (this.isBrowser) {
      this.startTypingAnimation();
    } else {
      // No SSR, exibe o código inteiro de uma vez
      this.typedLines = [...this.codeLines];
      this.isTyping = false;
    }
  }

  public ngOnDestroy(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  private startTypingAnimation(): void {
    const typeNextChar = () => {
      // Se já digitou todas as linhas
      if (this.currentLineIndex >= this.codeLines.length) {
        this.isTyping = false;
        // Reiniciar após um delay longo
        this.timerId = setTimeout(() => {
          this.typedLines = [];
          this.currentLineIndex = 0;
          this.currentCharIndex = 0;
          this.isTyping = true;
          this.startTypingAnimation();
        }, 8000);
        return;
      }

      const fullLineText = this.codeLines[this.currentLineIndex];

      // Se a linha for vazia ou comentário curto, digitar mais rápido
      if (fullLineText === '') {
        this.typedLines.push('');
        this.currentLineIndex++;
        this.currentCharIndex = 0;
        this.timerId = setTimeout(typeNextChar, 100);
        return;
      }

      // Se a linha contiver HTML (tags de cores), tratamos como HTML seguro
      // Para simular a digitação, pegamos a fatia base de caracteres textuais
      // Mas para simplificar e garantir precisão de renderização de tags coloridas,
      // nós podemos digitar a linha de forma incremental pelo tamanho real ou apenas escrevê-la rapidamente.
      // Vamos simular escrevendo a linha inteira com um delay curto por linha,
      // ou fazendo digitação caracter a caracter se não tiver tags HTML, ou apenas fatiando o conteúdo.
      // Uma solução elegante: revelamos a linha caractere por caractere lidando com tags HTML ou
      // apenas digitando em pequenos blocos. Vamos digitar a linha completa em velocidade dinâmica!
      
      const lineHtml = this.codeLines[this.currentLineIndex];
      this.typedLines.push(lineHtml);
      this.currentLineIndex++;
      
      // Delay dinâmico baseado na linha
      const delay = lineHtml.includes('//') ? 400 : 150;
      this.timerId = setTimeout(typeNextChar, delay);
    };

    this.timerId = setTimeout(typeNextChar, 500);
  }
}
