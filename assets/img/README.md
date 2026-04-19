# Como trocar imagens do site

Para atualizar qualquer imagem, **substitua o arquivo mantendo o mesmo nome**. Não mexa no HTML.

## Estrutura

```
assets/img/
├── logo.png                    → Logo do açougue (header, footer, favicon)
│
├── folhetos/                   → Folhetos grandes da semana (topo do site)
│   ├── folheto-1.jpeg          → Folheto principal
│   └── folheto-2.jpeg          → Folheto secundário
│
├── kits/                       → Cards dos kits
│   ├── economico.jpg           → Kit Econômico
│   └── mistura.jpg             → Kit Mistura
│
├── ofertas/                    → Grid de ofertas especiais
│   ├── kafta.jfif
│   ├── hamburguer.jfif
│   ├── pao-queijo.jpeg
│   ├── espetos.jfif
│   ├── kibe-500g.jfif
│   └── kibe-almondegas.jfif
│
└── sobre/                      → Imagens institucionais
    ├── fachada.png             → Foto da fachada (seção "Sobre")
    └── espeto-disk-entrega.png → Ilustração disk entrega
```

## Trocar um folheto semanal

1. Renomeie o novo folheto para `folheto-1.jpeg` (ou `folheto-2.jpeg`)
2. Substitua o arquivo em `assets/img/folhetos/`
3. Commit + push → site atualizado

## Trocar oferta especial

Mesma lógica: coloque o novo arquivo com o mesmo nome em `assets/img/ofertas/`.

Se quiser **adicionar** uma nova oferta (não substituir), edite `index.html`
na seção `ofertas-grid` e duplique um `<figure class="oferta-card">` ajustando o `src`.

## Imagem de compartilhamento (WhatsApp/Facebook)

Quando alguém compartilhar o link do site, aparece a `og-image.png` (1200×630).

O arquivo fonte é [og-image.svg](og-image.svg). Para atualizar:

1. Edite o SVG em qualquer editor (Inkscape, Figma, VS Code).
2. Exporte para PNG 1200×630 e salve como `og-image.png` nesta pasta.
3. **Alternativa rápida online:** abra o SVG no navegador → tire print 1200×630 OU use `https://cloudconvert.com/svg-to-png`.

Sem o `og-image.png` no ar, o compartilhamento fica sem imagem.

## Formatos aceitos

- `.jpg`, `.jpeg`, `.png`, `.jfif`, `.webp`
- Prefira `.webp` ou `.jpg` otimizado (menor que 400 KB para folhetos)
