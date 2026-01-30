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

      <span title="Esta compra foi auditada por Martan.app"> {{ i19verifiedBuyer }} </span>
    </div>
    <div class="collapse multi-collapse" :id="collapseId">
      <div class="card card-body">
        <h5>{{ i19howProcessVerifiedMsg }}</h5>

        <p>
          {{ i19useMartanPrivacyMsg }}
        </p>

        <p>
          {{ i19howWeCollectMsg }}
        </p>

        <p>
          {{ i19howClientsReviewMsg }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { i18n } from "@ecomplus/utils";
import $ from "@ecomplus/storefront-twbs";

export default {
  name: "VerifiedPurchase",

  props: {
    showVerified: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      collapseId: null,
    };
  },

  computed: {
    i19verifiedBuyer: () => "Comprador verificado",
    i19howProcessVerifiedMsg: () =>
      i18n({
        en_us: "How we verify and process reviews",
        pt_br: "Como verificamos e processamos avaliações",
      }),
    i19useMartanPrivacyMsg: () =>
      i18n({
        en_us:
          "We use Martan, a web-based application that provides an online reviews and marketing solution, to collect, source, process and display reviews on our website.",
        pt_br:
          "Utilizamos o Martan, uma aplicação baseada na web que oferece uma solução de avaliações online e marketing, para coletar, originar, processar e exibir avaliações em nosso site.",
      }),
    i19howWeCollectMsg: () =>
      i18n({
        en_us:
          'We automatically send review requests through Martan to customers for whom we have a record of purchasing products directly from our website. This allows us to verify the reliability of the review through technical means such as the customers email address. Reviews submitted directly through these requests are marked as "Verified Purchase", and the following statement will be displayed in the interface where the review is published: "This review was collected from a verified customer who purchased this item."',
        pt_br:
          'Enviamos automaticamente solicitações de avaliações por meio do Martan aos clientes para os quais temos registro de que compraram produtos diretamente em nosso site. Isso nos permite verificar a confiabilidade da avaliação por meio de meios técnicos, como o endereço de e-mail do cliente. As avaliações enviadas diretamente por essas solicitações são marcadas como "Compra verificada", e a seguinte declaração será exibida na interface em que a avaliação for publicada: "Esta avaliação foi coletada de um cliente verificado que comprou este item".',
      }),
    i19howClientsReviewMsg: () =>
      i18n({
        en_us:
          "Customers can choose how to rate reviewed products with a score between 1 and 5. The average review score is calculated using a simple mathematical average, which is then rounded to a half or full star rating using standard rounding rules. The average review score includes reviews for which customers received discounts on future purchases for adding a photo or video to their review.",
        pt_br:
          "Os clientes podem escolher como avaliar os produtos avaliados com uma pontuação entre 1 e 5. A pontuação média das avaliações é calculada usando uma média matemática simples, que é então arredondada para uma meia ou uma avaliação de estrela completa usando regras padrão de arredondamento. A pontuação média das avaliações inclui avaliações para as quais os clientes receberam descontos em compras futuras por adicionar uma foto ou um vídeo à sua avaliação.",
      }),
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
  color: #9e9e9e;
  font-size: 10px;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 3px;
  svg {
    width: 15px;
    color: var(--success);
  }
}
</style>
