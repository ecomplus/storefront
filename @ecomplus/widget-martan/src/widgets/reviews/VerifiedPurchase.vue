<template>
  <div>
    <div class="mt-rating__verified">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-discount-check-filled"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
          stroke-width="0"
          fill="currentColor"
        />
      </svg>

      <span>comprador verificado</span>
    </div>
    <div class="collapse multi-collapse" :id="collapseId">
      <div class="card card-body">
        <h5>Como verificamos e processamos avaliações</h5>

        <p>
          Utilizamos o Martan, uma aplicação baseada na web que oferece uma
          solução de avaliações online e marketing, para coletar, originar,
          processar e exibir avaliações em nosso site.
        </p>

        <p>
          Enviamos automaticamente solicitações de avaliações por meio do Martan
          aos clientes para os quais temos registro de que compraram produtos
          diretamente em nosso site. Isso nos permite verificar a confiabilidade
          da avaliação por meio de meios técnicos, como o endereço de e-mail do
          cliente. As avaliações enviadas diretamente por essas solicitações são
          marcadas como "Compra verificada", e a seguinte declaração será
          exibida na interface em que a avaliação for publicada: "Esta avaliação
          foi coletada de um cliente verificado que comprou este item".
        </p>

        <p>
          Os clientes podem escolher como avaliar os produtos avaliados com uma
          pontuação entre 1 e 5. A pontuação média das avaliações é calculada
          usando uma média matemática simples, que é então arredondada para uma
          meia ou uma avaliação de estrela completa usando regras padrão de
          arredondamento. A pontuação média das avaliações inclui avaliações
          para as quais os clientes receberam descontos em compras futuras por
          adicionar uma foto ou um vídeo à sua avaliação.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "../../../../storefront-twbs/src";

export default {
  name: "VerifiedPurchase",

  data() {
    return {
      collapseId: null,
    };
  },

  props: {
    showVerified: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    open: function () {
      $("#" + this.collapseId).collapse("toggle");
    },
  },

  mounted: function () {
    this.collapseId = "mt-verified-" + Date.now();
  },
};
</script>

<style lang="scss">
.mt-rating__verified {
  font-size: 12px;
  color: #6b6d76;
  font-weight: 400;

  svg {
    width: 15px;
    color: var(--success);
  }
}
</style>
