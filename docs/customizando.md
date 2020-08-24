# Customizando :pencil:

[:us: English version](./customization.md)

> Aqui estamos considerando que você já tem um deploy criado a partir do
[Storefront Starter](https://github.com/ecomplus/storefront-starter) e usando nosso template padrão
`@ecomplus/storefront-template`. Se você é um lojista E-Com Plus nós já fizemos isto por você :wink:

Há várias formas de customizar o Storefront:

- [Compor as páginas no CMS](#construir-paginas-no-cms) (o jeito mais fácil);
- [Criar/sobrescrever tema](#criar-sobrescrever-tema);
- [Editar parte do código EJS (HTML) do template padrão](#editar-views-pre-renderizadas);
- [Adicionar/importar JavaScript customizado](#scripts-adicionais);
- [Substituir scripts e componentes Vue com Webpack aliases](#substituir-componentes-vue) (PRO :metal:);

Antes de começar, pode ser útil rodar o seu deploy do Storefront
em _localhost_
([vídeo tutorial](https://www.youtube.com/watch?v=r-YudHVLJS8)):
  1. Certifique-se que o [Node.js](https://nodejs.org/en/) está instalado;
  2. Clone seu repositório no GitHub;
  3. Instale as dependências do npm;
  4. Rode o script `serve`;

```bash
git clone https://github.com/ecomplus-stores/my-store
cd my-store
npm i
npm run serve
```

## Construir páginas no CMS

Acesse a parte administrativa (powered by [Netlify CMS](https://www.netlifycms.org/) :heart:)
do seu deploy do Storefront em `https://www.seudominio.com.br/admin/`, depois do login você poderá:

+ Editar informações e configurações gerais como contatos, endereço e logo:

<div class="demo">
  <div class="container">
    <div class="row">
      <div class="col">
        <img src="/storefront/assets/img/doc_customization1.png" alt="CMS">
      </div>
      <div class="col">
        <img src="/assets/img/doc_customization2.png" alt="CMS">
      </div>
    </div>
  </div>
</div>

+ Setar as cores da identidade da loja:

<img src="/storefront/assets/img/doc_customization3.png" alt="CMS" style="max-height: 180px">

+ Organizar todas as páginas adicionando, movendo ou removendo seções (arraste e solte):

<img src="/storefront/assets/img/doc_customization.gif" alt="CMS" style="max-height: 240px">

+ Adicionar código HTML, JS ou CSS extra para cada página ou todo o site:

<div class="demo">
  <div class="container">
    <div class="row">
      <div class="col">
        <img src="/storefront/assets/img/doc_customization4.png" alt="CMS">
      </div>
      <div class="col">
        <img src="/storefront/assets/img/doc_customization5.png" alt="CMS">
      </div>
    </div>
  </div>
</div>

+ Criar ou editar páginas extra e posts de blog;
+ Plugar e customizar widgets adicionais;

## Criar/sobrescrever tema

Estamos usando o `@ecomplus/storefront-twbs`
(baseado em [Bootstrap 4](https://getbootstrap.com/docs/4.5/)) como base CSS/JS,
para detalhes cheque a [referência da UI base](../@ecomplus/storefront-twbs/).
Você também pode querer checar os
[seletores de elementos](../@ecomplus/storefront-template/docs/01-elements.md)
mais importantes to template.

- Se você quer apenas adicionar poucos trechos de CSS,
faça isto no CMS em _Layout > Inserir código > CSS customizado_;
- Se você planeja fazer alterações maiores nós recomendamos
editar os arquivos SCSS
(você pode usar [Sass](https://sass-lang.com/) ou apenas CSS padrão)
diretamente do GitHub ou usando seu editor de código preferido:
    1. Adicione ou sobrescreva estilos em
    `/template/scss/custom-css/_styles.scss`;
    2. Para substituir os estilos padrão do template você pode tentar usar
    [variáveis SCSS do Bootstrap](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss)
    em `/template/scss/_variables.scss`;
    3. Finalmente, você também pode editar _from scratch_ em
    `/template/scss/_main.scss` se você não quiser importar todos os
    [estilos do Storefront Template](https://github.com/ecomplus/storefront/tree/master/%40ecomplus/storefront-template/template/scss),
    por exemplo se quiser criar do zero os estilos do rodapé e
    não quiser importar o padrão do template
    (perf optim :rocket:, não tão fácil quanto as opções anteriores);

::: tip
Também encorajamos a utilização de
[CSS vars](../@ecomplus/storefront-twbs/docs/05-vars.md)
sempre que possível, para tornar seu código adicional
facilmente customizável e extensível.
:::

::: details Exemplo usando CSS vars
```css
.top-bar {
  background-color: var(--secondary);
}
```
<img src="/storefront/assets/img/doc_customization9.png" alt="CMS" style="max-height: 180px">
:::

Como exemplo você também pode analisar o SCSS aplicado por
alguns dos nossos temas adicionais, como
[Clean Gray](https://github.com/ecomplus/storefront/tree/master/%40ecomplus/storefront-template/template/scss/themes/clean-gray)
e [Niche Baby](https://github.com/ecomplus/storefront/blob/master/%40ecomplus/storefront-template/template/scss/themes/niche-baby/_variables.scss).

## Editar views pré-renderizadas

No CMS é possível incluir snippets HTML adicionais, mas para
editr as views padrão você deve editar os arquivos
[EJS](https://ejs.co/) na pasta `/template/pages/`:

+ `/template/pages/@/meta.ejs` para customizar meta tags
(especialmente para SEO):

<img src="/storefront/assets/img/doc_customization8.png" alt="CMS" width="400">

+ `/template/pages/@/sections/` para editar vários componentes reutilizáveis :pushpin:,
estes renderizam o conteúdo principal das páginas e são
configurados no arraste e solte do CMS:

<img src="/storefront/assets/img/doc_customization7.png" alt="CMS" width="400">

+ `/template/pages/@/layout/` para editar organismos comuns do
layout (rodapé, cabeçalho, menu);
+ `/template/pages/@/app/` para customizar a view específica
do carrinho e checkout;

Antes de começar a editar HTML, deve ser útil checar os
[componentes](../@ecomplus/storefront-twbs/docs/01-components.md) e
classes CSS utilitárias disponíveis por padrão.

::: tip
EJS é uma linguaguem de template simples baseada em JS
para gerar markup HTML programaticamente,
claro que você pode apenas escrever HTML padrão,
mas para customizações avançadas recomendamos que
verifique como funciona a
[renderização](../@ecomplus/storefront-framework/docs/01-renderization.md)
do Storefront com EJS.
:::

> Para manter as lojas customizadas atualizadas nós
continuamos tentando atualizar os arquivos EJS editados após
cada release do Storefront, preservando os snippets editados
mas atualizando as partes não alteradas via Git diff :sunglasses:

### Nota para cards de produtos

Some pre-rendered HTML elements are overwritten with JS on client by the
respective Vue components, it happens specially with product cards pre-rendered by
`/template/pages/@/sections/inc/product-item.ejs`.

In those cases you should use `data-slot` attribute to preserve your custom code
after hydration, for example:

```html
<div data-slot="buy-button-content">
  <i class="fas fa-shopping-bag mr-1"></i>
  Buy now
</div>
```

The `data-slot` value must correspond to a
[slot](https://vuejs.org/v2/guide/components-slots.html) name
of the Vue component, check
[`<ProductCard>` slots here](../@ecomplus/storefront-components/docs/ProductCard.md#slots).

::: tip PRO TIP
If you need deeper customization, consider creating an Webpack alias to
`./html/ProductCard.html` (check [replacing Vue components](#replace-vue-components)).
:::

> **You don't need to know Vue.js to customize Storefront**,
Vue is awesome and really easy to learn, for advanced customization it'll give you
lot of productivity, but it's not required at all :v:

## Scripts adicionais

By default you can use jQuery 3 (slim), Vue.js 2 and some other
small libraries globally available, for details check
[base UI included JS](../@ecomplus/storefront-twbs/docs/06-javascript.md) and
[template JS globals](../@ecomplus/storefront-template/docs/05-javascript.md).

- If you just want to add few JS, do it in the CMS at _Layout > Insert code_
adding `<script>` tags before `/body` or (when really needed) `/head`,
you can also add scripts to specific pages using _HTML code_ section;
- If you're planning to add lot of JS (or ES) code, it's strongly recommended to
edit JS files at `/template/js/custom-js/` folder directly from GitHub or locally using your preferred code editor. You can also create new files and
[import](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import) properly;

::: tip
When editing `/template/js/` files you can use ES6 features without worrying about
browser support, code there will be parsed and minified.
:::

## Substituir componentes Vue

::: warning
Use it with moderation and only when really needed, skip using for things other
then explained below, specially if you don't know Webpack very well.
:::

When easier ways aren't sufficient to make your wanted customization,
you can give a try with
[Webpack 4 aliases](https://webpack.js.org/configuration/resolve/#resolvealias).

Generally we recommend to use it only for replacing Vue components
HTML template :triangular_ruler:, although it would work also for scripts and styles.

You should start getting the original source from
[GitHub repo](https://github.com/ecomplus/storefront/tree/master/%40ecomplus/storefront-components/src/html),
copy the file you want to replace and paste it inside
`/template/js/custom-js/` folder, edit the new file as needed and then create
a `storefront.webpack.js` file at the root of your repository, as example:

```js
// storefront.webpack.js

const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      './html/ProductCard.html': path.resolve(__dirname, '/template/js/custom-js/html/ProductCard.html')
    }
  }
})
```

> Note that all [Storefront components](../@ecomplus/storefront-components/) are
composed by 4 files (Vue/HTML/JS/SCSS), the Vue file always imports the
HTML one with `./html/{ComponentName}.html`.
