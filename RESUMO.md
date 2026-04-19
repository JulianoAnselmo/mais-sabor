# Resumo — Casa de Carnes Mais Sabor

Handoff para próximas sessões. O que foi feito, como o site está estruturado e o que ainda falta.

## Stack

- **HTML/CSS/JS puro**, single-page — sem build, sem framework
- Deploy-ready para **GitHub Pages** com domínio custom (padrão igual ao `C:\dev\clientes\marieta`)
- Integração com **Firestore** do projeto `cardapio-admin-prod` (slug `casa-de-carnes-mais-sabor`)

## Estrutura do projeto

```
mais-sabor/
├── index.html          ← site principal (single page)
├── style.css           ← estilos (paleta vibrante popular)
├── script.js           ← reveal observer, mobile nav, lightbox, year
├── businessInfo.js     ← fallback local de dados (telefone, endereço, horário)
├── promocoes.js        ← ORPHAN (seção removida) — pode deletar
├── 404.html            ← página de erro estilizada
├── CNAME               ← domínio (placeholder: SEU-DOMINIO.com.br)
├── .nojekyll           ← desativa Jekyll no GitHub Pages
├── .gitignore
├── robots.txt
├── sitemap.xml
├── GUIA-DEPLOY.md      ← passo a passo de deploy
├── RESUMO.md           ← este arquivo
└── imagens/
    ├── logo.png
    ├── promocao.jpeg              ← folheto 1 (hero)
    ├── promocao1.jpeg             ← folheto 2 (hero)
    ├── fachada.png                ← foto da loja (seção Sobre)
    ├── espeto-disk-entrega.png    ← banner Disk Entrega
    ├── kit-economico.jpg          ← seção Kits
    └── kit-mistura.jpg            ← seção Kits
```

## Seções atuais do site (na ordem)

1. **Marquee** preto/amarelo no topo — texto rolante com frases de destaque
2. **Header** sticky — logo + nav + botão "Pedir Agora"
3. **Promo bar** vermelha — "OFERTAS DO DIA: CARNE FRESCA, COMBO DE CHURRASCO..."
4. **Hero de Folhetos** — os 2 folhetos grandes com lightbox, tarja amarela "OFERTAS DA SEMANA", selo circular "QUALIDADE GARANTIDA" girando, CTA "PEDIR NO ZAP"
5. **Nossos Kits** — 2 cards com `kit-economico.jpg` e `kit-mistura.jpg`, overlay escuro com selo + botão "Pedir no Zap", lightbox no clique da imagem
6. **Disk Entrega** — banner amarelo com `espeto-disk-entrega.png`; horário **FIXO** no HTML: "Seg a Sáb 7h às 19h · Domingos 7h às 12h"
7. **Categorias** — 6 cards (bovina, suína, frango, linguiças, espetos, churrasco) com fallback Unsplash em imagens
8. **Depoimentos** — fundo preto, 3 cards placeholder (MS, JP, AC) marcados `<!-- EDITAR DEPOIMENTOS -->`
9. **Sobre** (`#sobre`) — texto + features, imagens `fachada.png` e `espeto-disk-entrega.png`
10. **Contato** — endereço, WhatsApp, Instagram, horário, embed do Google Maps
11. **Footer** preto com logo + links + copyright
12. **Float WhatsApp** — botão verde flutuante pulsando

## Visual / Design System

- **Paleta vibrante popular:**
  - `--primary: #D10F2C` (vermelho sangue)
  - `--primary-dark: #7A0A1C`
  - `--yellow: #FFCB05` (amarelo oferta)
  - `--black: #0F0F0F`
  - `--bg-body: #FFF9F0` (creme quente)
- **Tipografia:**
  - Display: **Bebas Neue**
  - Impacto (preços/selos): **Archivo Black**
  - Body: **Plus Jakarta Sans**
- **Estilo gráfico:** sombras duras (`shadow-hard: 6px 6px 0 black`), bordas duplas preto+amarelo, tarjas diagonais, selos circulares girando, marquee animado, botões com deslocamento on-hover
- Títulos com `-webkit-text-stroke` preto + `text-shadow` em amarelo/preto (estilo folheto impresso)

## Integração Firestore

- **Projeto:** `cardapio-admin-prod`
- **Slug:** `casa-de-carnes-mais-sabor`
- **Padrão:** fetch REST público, sem auth (idêntico ao marieta)
- **Documento lido:** APENAS `data/businessInfo`
- **Fallback:** `businessInfo.js` se fetch falhar ou doc vazio
- **NÃO usa:** `cardapio` (açougue não tem) e `promocoes` (seção foi removida, imagens estáticas bastam)

### Campos de businessInfo preenchidos dinamicamente
- `#bi-name`, `#bi-address`, `#bi-cityState`, `#bi-cep`
- `#bi-phone`, `#bi-hours`, `#bi-instagram-handle`
- `href` de todos `a[href^="https://wa.me/"]` (números atualizam em massa se mudar `whatsappNumber`)
- `#bi-instagram-link`, `#bi-maps-link`, `#bi-maps-iframe`

### Código de integração
Inline em `index.html` antes de `script.js`:
- `parseFirestoreValue()` — desempacota formato REST do Firestore
- `fetchFirestore(docName)` — fetch + unwrap `fields.content`
- `aplicarBusinessInfo(data)` — preenche os elementos do DOM
- Bootstrap: tenta Firestore → fallback para `businessInfoData`

## SEO / Deploy-Ready

- `<head>` completo: canonical, OG, Twitter Card, favicon, geo tags, robots, theme-color
- **JSON-LD** `ButcherShop` expandido: image, logo, url, geo (lat/lng Taquaritinga), `openingHoursSpecification` granular (seg-sáb 7-19h + dom 7-12h), areaServed, hasMap, sameAs
- Marcações: `loading="lazy"`, `decoding="async"`, `width`/`height` em imagens, `preload` do folheto principal + fonte Bebas Neue
- Acentuação correta em tudo visível (Promoções, São, Vila São Sebastião, etc.)
- `404.html` estilizado no mesmo visual (vermelho/amarelo/preto)
- `robots.txt`, `sitemap.xml`, `.nojekyll`, `CNAME`

## Pendências para publicar

### O cliente precisa fazer
- [ ] Comprar o domínio (ou decidir qual usar)
- [ ] Substituir `SEU-DOMINIO.com.br` por busca/substituir em todo o projeto (aparece em: CNAME, robots.txt, sitemap.xml, canonical, OG, Twitter, JSON-LD, 404.html)
- [ ] Comprimir imagens pesadas em https://tinypng.com mantendo os nomes:
  - `fachada.png` (3MB → ideal <400KB)
  - `espeto-disk-entrega.png` (2.8MB → ideal <400KB)
  - `logo.png` (829KB → ideal <200KB)
- [ ] Trocar os 3 depoimentos placeholder por prints reais do Instagram (bloco `<!-- EDITAR DEPOIMENTOS -->` em `index.html`)
- [ ] Cadastrar o cliente no cardapio-admin:
  - Dashboard → Novo Cliente → tipo Restaurante → nome "Casa de Carnes Mais Sabor" → slug `casa-de-carnes-mais-sabor`
  - Popular o doc `data/businessInfo` (estrutura em `GUIA-DEPLOY.md`)
- [ ] Seguir o `GUIA-DEPLOY.md` para: push pro GitHub → ativar GitHub Pages → configurar DNS → Google Search Console → Google Meu Negócio
- [ ] Apagar `promocoes.js` (órfão, não é mais usado)

### Possíveis próximas fases
- **Editor "açougue" no cardapio-admin**: hoje o editor é focado no schema do marieta. Os campos do `businessInfo` do açougue podem precisar do editor JSON bruto até existir um editor específico
- **Fotos reais dos produtos**: os cards de "Categorias" (bovina, suína, frango, linguiças, espetos, churrasco) ainda usam fallback Unsplash. Cliente pode fornecer fotos próprias depois — basta colocar em `imagens/` com nomes `produto-bovina.jpg`, `produto-suina.jpg`, `produto-frango.jpg`, `produto-linguica.jpg`, `produto-espetos.jpg`, `churrasco.jpg`. O script já tem fallback automático
- **Se quiser reativar promoções dinâmicas**: a remoção apagou só o HTML da seção, CSS de `.promo-card` e o fallback `promocoes.js` continuam (vazio). Precisaria restaurar a seção, importar o script, e reimplementar `renderPromocoes` no inline script

## Informações de contato hardcoded (hoje)

- **WhatsApp:** `+55 16 99634-4348` (link: `wa.me/5516996344348`)
- **Endereço:** Rua Felippe Abbud, 244 - Vila São Sebastião, Taquaritinga - SP, 15903-100
- **Instagram:** `@casadecarnes.maissabor`
- **Horário loja:** Seg-Sáb 7h-19h · Dom 7h-12h

Tudo isso pode ser sobrescrito pelo Firestore quando o businessInfo estiver cadastrado no admin.

## Decisões tomadas nas sessões anteriores

- **Estilo escolhido:** "Vibrante popular" (vs rústico premium ou clean moderno escuro)
- **Folhetos:** continuam **estáticos** em `imagens/` — cliente troca os arquivos `promocao.jpeg` / `promocao1.jpeg` mantendo os nomes
- **Disk entrega:** horário **fixo no HTML** (não vem do Firestore)
- **Açougue não tem cardápio** — integração ignora esse doc
- **Seção "Promoções Imperdíveis" removida** — folhetos + kits já cobrem essa função visualmente
- **Depoimentos:** placeholder, cliente troca manualmente por prints do Instagram

## Plano original
Em `C:\Users\julia\.claude\plans\preciso-deixar-mais-esse-lucky-puppy.md`
