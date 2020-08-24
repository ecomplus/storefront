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

+ Inserir as cores da identidade da loja:

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
mais importantes do template.

- Se você quer apenas adicionar poucos trechos de CSS,
faça isto no CMS em _Layout > Inserir código > CSS customizado_;
- Se você planeja fazer alterações maiores nós recomendamos
editar os arquivos SCSS
(você pode utilizar o [Sass](https://sass-lang.com/) ou apenas CSS padrão)
diretamente no GitHub ou usando seu editor de código preferido:
    1. Adicione ou sobrescreva estilos em
    `/template/scss/custom-css/_styles.scss`;
    2. Para substituir os estilos padrão do template você pode tentar usar
    [variáveis SCSS do Bootstrap](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss)
    em `/template/scss/_variables.scss`;
    3. Finalmente, você também pode editar _from scratch_ em
    `/template/scss/_main.scss` se não quiser importar todos os
    [estilos do Storefront Template](https://github.com/ecomplus/storefront/tree/master/%40ecomplus/storefront-template/template/scss),
    e optar por criar do zero por exemplo os estilos do rodapé, também é possível. Inclusive indicamos isso para evitar duplicidade, caso saiba o que esteja fazendo.
    (perf optim :rocket:, não tão fácil quanto as opções anteriores);

::: tip
Encorajamos a utilização de
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
editar as views padrão você deve editar os arquivos
[EJS](https://ejs.co/) na pasta `/template/pages/`:

+ `/template/pages/@/meta.ejs` para customizar meta tags
(especialmente para SEO):

<img src="/storefront/assets/img/doc_customization8.png" alt="CMS" width="400">

+ `/template/pages/@/sections/` para editar vários componentes reutilizáveis :pushpin:,
estes renderizam o conteúdo principal das páginas e são
configurados no arraste e solte do CMS:

<img src="/storefront/assets/img/doc_customization7.png" alt="CMS" width="400">

+ `/template/pages/@/layout/` para editar organismos comuns do
layout (rodapé, cabeçalho e menu);
+ `/template/pages/app/` para customizar carrinho e checkout,
de forma superficial como contadores, banners e vitrines por exemplo;

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

Alguns elementos HTML pré-renderizados são sobrescritos por JS no cliente pelos respectivos componentes Vue, isso acontece especialmente nos cards de produto pré-renderizados por `/template/pages/@/sections/inc/product-item.ejs`.

Nesses casos, é sugerido que utilize o atributo `data-slot` para preservar a sua customização após a hidratação realizada pelo Storefront, veja um exemplo a seguir:

```html
<div data-slot="buy-button-content">
  <i class="fas fa-shopping-bag mr-1"></i>
  Buy now
</div>
```

O valor do atributo `data-slot` deve corresponder ao nome do [slot](https://vuejs.org/v2/guide/components-slots.html) respectivo no componente Vue, por favor
cheque os [slots do `<ProductCard>` aqui](../@ecomplus/storefront-components/docs/ProductCard.md#slots).

::: tip Dica PRO
Se você necessita de uma customização mais profunda no componente, considere criar Webpack alias para 
`./html/ProductCard.html` (veja [substituindo componente Vue](#replace-vue-components)).
:::

> **Você não precisa saber Vue.js para customizar o Storefront**,
Vue incrível e bem simples de aprender, para customizações avançadas te entregaria muita produtividade,
mas não é um requisito :v:

## Scripts adicionais

Por padrão, você pode utilizar jQuery 3 (slim), Vue.js 2 e algumas pequenas bibliotecas que estão disponíveis globalmente.
Para mais detalhes, por favor verifique a
[UI base](../@ecomplus/storefront-twbs/docs/06-javascript.md) e
[globais do JS](../@ecomplus/storefront-template/docs/05-javascript.md).

- Se você precisa adicionar apenas scripts pequenos, faça diretamente no CMS em _Layout > Inserir Código_
adicionando as tags `<script>` antes de `/body` ou `/head` (se necessário). Além disso,
você consegue adicionar scripts em páginas específicas utilizando blocos de _Código HTML_;

- Se está planejando inserir bastante JS (ou ES), sugerimos fortemente que insira diretamente na pasta `/template/js/custom-js/` no Github ou em seu editor de código preferido. Você também pode criar um novo arquivo e
[importar](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import) devidamente.

::: tip
Quando editar arquivos em `/template/js/`, você pode utilizar ES6 sem se preocupar com suporte do navegador,
os códigos inseridos serão parseados e minificados.
:::

## Substituir componentes Vue

::: warning
Use-o com moderação e apenas quando realmente necessário,
evite utilizar para implementações diferentes das citados abaixo, especialmente se não conhecer muito bem Webpack.
:::

Quando métodos mais fáceis não são suficientes para o nível de personalização desejável,
tente [Webpack 4 aliases](https://webpack.js.org/configuration/resolve/#resolvealias).

Geralmente, recomendamos que seja utilizado apenas para substituir HTML de um componente Vue :triangular_ruler:,
apesar de também funcionar para scripts e estilos.

Você deve começar buscando o arquivo original no
[repositório do GitHub](https://github.com/ecomplus/storefront/tree/master/%40ecomplus/storefront-components/src/html),
copiar o arquivo que deseja substituir e colar dentro de
`/template/js/custom-js/`, edite o arquivo conforme desejar e crie um arquivo
`storefront.webpack.js` no root do seu repositório, como por exemplo:

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

> Note que todos componentes do [Storefront components](../@ecomplus/storefront-components/) são
compostos por 4 arquivos (Vue/HTML/JS/SCSS), o arquivo Vue sempre importa HTML correspondente
com `./html/{ComponentName}.html`.
