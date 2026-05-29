// meta.service.ts
import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  /**
   * Atualiza as meta tags e o título da página para otimização SEO.
   * @param pageTitle Título da página específica (ex: 'Projetos')
   * @param description Descrição curta para SEO (até 160 caracteres)
   * @param relativeUrl URL relativa da página (ex: '/projetos')
   */
  public updateMeta(pageTitle: string, description: string, relativeUrl: string = ''): void {
    const fullTitle = `${pageTitle} | Niō Tech — Desenvolvimento de Software & Automação`;
    const siteUrl = `https://niotech.com.br${relativeUrl}`;
    const logoUrl = 'https://niotech.com.br/assets/logo/niotech-logo.png';

    // 1. Atualizar Título no Navegador
    this.title.setTitle(fullTitle);

    // 2. Meta Tags Padrão
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    // 3. Open Graph (Facebook / LinkedIn)
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: siteUrl });
    this.meta.updateTag({ property: 'og:image', content: logoUrl });

    // 4. Twitter Cards
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: logoUrl });
  }
}
