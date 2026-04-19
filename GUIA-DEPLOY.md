# Guia de Deploy — Casa de Carnes Mais Sabor

Deploy recomendado: **GitHub Pages** (grátis, HTTPS automático, CDN global) com domínio personalizado.

---

## Integração com cardapio-admin (Firestore)

O site consome dados de **`cardapio-admin-prod`** (mesmo projeto Firestore do marieta) via REST pública — sem autenticação, só leitura.

**Slug do cliente:** `casa-de-carnes-mais-sabor`

**Documento lido:**
- `restaurants/casa-de-carnes-mais-sabor/data/businessInfo` — telefone, endereço, horário, WhatsApp, Instagram, Maps

> **Nota:** o açougue NÃO usa `cardapio` nem `promocoes` — as ofertas vêm direto das imagens estáticas (folhetos e kits em `imagens/`). Mesmo que o admin crie esses documentos automaticamente, o site ignora. O horário do disk entrega é fixo no HTML.

Se o fetch falhar ou o documento estiver vazio, o site usa os fallbacks locais em `promocoes.js` e `businessInfo.js`.

### Cadastrar o cliente no cardapio-admin

1. Acesse o painel admin (`C:\dev\cardapio-admin`, ou em produção)
2. Faça login como administrador
3. Dashboard → **Novo Cliente**
4. Preencha:
   - **Tipo:** Restaurante
   - **Nome:** Casa de Carnes Mais Sabor
   - **Slug:** `casa-de-carnes-mais-sabor` (gerado automaticamente ao digitar o nome)
5. Clique **Criar Cliente** — isso cria automaticamente os documentos `cardapio`, `promocoes` e `businessInfo` vazios no Firestore
6. Crie um usuário editor em `/admin/usuarios` com `restaurantSlug: casa-de-carnes-mais-sabor` para que o cliente possa editar

### Estrutura dos dados no Firestore

**`data/businessInfo`** — campo `content` é um objeto:

```json
{
  "name": "Casa de Carnes Mais Sabor",
  "phone": "(16) 99634-4348",
  "whatsappNumber": "5516996344348",
  "whatsappMensagemPadrao": "Ola, vim pelo site.",
  "address": "Rua Felippe Abbud, 244",
  "neighborhood": "Vila São Sebastião",
  "cityState": "Taquaritinga - SP",
  "cep": "15903-100",
  "hours": { "texto": "Seg a Sáb 7h-19h · Dom 7h-12h" },
  "instagram": "https://www.instagram.com/casadecarnes.maissabor/",
  "instagramHandle": "@casadecarnes.maissabor",
  "googleMapsLink": "https://...",
  "googleMapsEmbed": "https://..."
}
```

Veja `businessInfo.js` para o exemplo completo.

> **Observação:** se o editor atual do cardapio-admin não aceitar os campos específicos (`whatsappMensagemPadrao`, `googleMapsEmbed`), pode ser necessário usar o editor JSON bruto do admin. O fallback em `businessInfo.js` garante que o site sempre funcione.

### Testar a integração localmente

Abra o DevTools → aba **Network** → procure requisição para `firestore.googleapis.com/.../businessInfo`:
- Status 200 + `fields.content` populado → dados vêm do Firestore
- Status 404 ou `content: null` → usa fallback local (normal antes do cadastro no admin)

---

## Checklist antes de publicar

- [ ] Substituir `SEU-DOMINIO.com.br` pelo domínio real em todos os arquivos (busca global no editor)
- [ ] Comprimir imagens pesadas em https://tinypng.com (manter os mesmos nomes de arquivo):
  - `imagens/fachada.png` (3MB → ideal <400KB)
  - `imagens/espeto-disk-entrega.png` (2.8MB → ideal <400KB)
  - `imagens/logo.png` (1.6MB → ideal <200KB)
- [ ] Trocar os 3 depoimentos placeholder por prints reais do Instagram (bloco marcado com `<!-- EDITAR DEPOIMENTOS -->` em `index.html`)
- [ ] Validar links do WhatsApp (número atual: `5516996344348`)

---

## Arquivos de deploy (já inclusos)

| Arquivo | Para que serve |
|---|---|
| `.nojekyll` | Desativa Jekyll no GitHub Pages |
| `CNAME` | Domínio personalizado |
| `robots.txt` | Liberação para buscadores |
| `sitemap.xml` | Mapa do site para o Google |
| `404.html` | Página de erro customizada |
| `.gitignore` | Arquivos a não versionar |

---

## Passo 1 — Subir o projeto para o GitHub

```bash
cd C:\dev\clientes\mais-sabor
git init
git add .
git commit -m "feat: site casa de carnes mais sabor"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/mais-sabor.git
git push -u origin main
```

---

## Passo 2 — Ativar GitHub Pages

1. Acesse o repositório no GitHub
2. **Settings → Pages** (menu lateral)
3. Em **Source**, selecione **Deploy from a branch**
4. Em **Branch**, escolha **main** e pasta **/ (root)**
5. Clique **Save**
6. Aguarde ~1 minuto

Site disponível em: `https://SEU-USUARIO.github.io/mais-sabor/`

---

## Passo 3 — Configurar domínio personalizado

### 3.1 — Registrar um domínio
Compre um domínio em:
- Registro.br (`.com.br`) — ~R$ 40/ano
- GoDaddy, HostGator, Hostinger, etc.

Sugestão de nomes:
- `casadecarnesmaissabor.com.br`
- `maissabortaquaritinga.com.br`

### 3.2 — Atualizar o CNAME no projeto
Editar o arquivo `CNAME` na raiz e trocar `SEU-DOMINIO.com.br` pelo domínio real.

Também substituir `SEU-DOMINIO.com.br` nos arquivos:
- `index.html` (meta tags canonical, OG, Twitter, JSON-LD)
- `404.html` (canonical)
- `robots.txt`
- `sitemap.xml`

Fazer busca/substituição global no editor (Ctrl+Shift+F no VS Code).

Commitar e subir:
```bash
git add .
git commit -m "chore: configura domínio"
git push
```

### 3.3 — Apontar DNS no registrador

**Registros A** (para o domínio raiz):

| Tipo | Nome | Valor            |
|------|------|------------------|
| A    | `@`  | 185.199.108.153  |
| A    | `@`  | 185.199.109.153  |
| A    | `@`  | 185.199.110.153  |
| A    | `@`  | 185.199.111.153  |

**Registro CNAME** (para `www`):

| Tipo  | Nome  | Valor                       |
|-------|-------|-----------------------------|
| CNAME | `www` | `SEU-USUARIO.github.io`     |

Propagação leva de 15 min a 24h.

### 3.4 — Configurar no GitHub
1. **Settings → Pages → Custom domain** → digite o domínio e clique **Save**
2. Aguarde o certificado SSL ser emitido (alguns minutos)
3. Marque **Enforce HTTPS**

Site no ar em `https://SEU-DOMINIO.com.br` ✅

---

## Passo 4 — Google Search Console

Para o site aparecer no Google.

1. Acesse https://search.google.com/search-console
2. **Adicionar propriedade** → tipo **Domínio**
3. Digite o domínio
4. Adicione o registro TXT no DNS:

| Tipo | Nome | Valor                        |
|------|------|------------------------------|
| TXT  | `@`  | `google-site-verification=…` |

5. Aguarde e clique **Verificar**
6. Em **Sitemaps**, submeta: `sitemap.xml`

---

## Passo 5 — Google Meu Negócio

Essencial para açougue local aparecer no Maps e buscas locais.

1. Acesse https://www.google.com/business
2. Cadastre a Casa de Carnes com endereço, horário, fotos, WhatsApp
3. Link para o site (o novo domínio)
4. Peça para clientes avaliarem com estrelas

---

## Passo 6 — Analytics (opcional, sem cookies)

GoatCounter é gratuito, leve e respeita LGPD.

1. https://www.goatcounter.com/signup — escolha um código, ex: `maissabor`
2. Antes do `</body>` em `index.html`, adicione:

```html
<script data-goatcounter="https://maissabor.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

---

## Deploy contínuo

Qualquer `git push` para `main` atualiza o site em ~1 min:

```bash
git add .
git commit -m "atualiza folheto da semana"
git push
```

**Para atualizar folhetos semanalmente:** apenas substitua `imagens/promocao.jpeg` e `imagens/promocao1.jpeg` pelos novos (mantenha os mesmos nomes) e faça commit.

---

## Validações pós-deploy

| Ferramenta | URL | Verifica |
|---|---|---|
| PageSpeed Insights | https://pagespeed.web.dev | Performance mobile/desktop |
| Mobile-Friendly | https://search.google.com/test/mobile-friendly | Responsividade |
| Schema Validator | https://validator.schema.org | Dados estruturados (JSON-LD) |
| Rich Results | https://search.google.com/test/rich-results | Como aparece no Google |

**Meta de performance (após comprimir imagens):**
- Desktop: 95+
- Mobile: 85+

---

## Problemas comuns

**Site não carrega após push:**
- Aguarde 1-2 min
- Confirme branch `main` e `/ (root)` em Settings → Pages

**Imagens não aparecem em produção:**
- Nomes são case-sensitive no Linux (servidor do GitHub)
- `Fachada.png` ≠ `fachada.png` — sempre minúsculas

**SSL não emitido:**
- Aguarde até 24h após DNS apontar
- Se persistir: remover e re-adicionar o domínio em Settings → Pages

**Folheto não atualiza depois de trocar:**
- Ctrl+Shift+R no navegador (limpa cache)
- Ou adicionar `?v=2` no final da URL da imagem
