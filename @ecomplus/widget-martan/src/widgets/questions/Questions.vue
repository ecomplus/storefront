<template>
  <div class="martan-questions container" v-if="config.widget_questions.is_enabled">
    <p class="lead" v-if="title">
      <a href="#questions" :name="title || 'Perguntas e respostas'">#</a>
      {{ title }}
    </p>

    <div class="questions-search">
      <div class="search-input-group">
        <input type="text" v-model="searchQuery" placeholder="Busque uma pergunta ou palavra-chave..."
          class="form-control" />

        <div class="questions-footer" v-if="config.widget_questions.enable_new_questions">
          <button type="button" class="view-more-link" @click="askQuestion" :aria-expanded="showIframe"
            aria-controls="question-iframe" aria-label="Abrir formulário para fazer uma nova pergunta">
            Não encontrou a resposta para sua pergunta? Faça uma pergunta.
          </button>
        </div>

        <div v-if="showIframe" class="iframe-container">
          <iframe id="question-iframe" :src="iframeUrl" width="580" :height="iframeHeight" frameborder="0"
            class="question-iframe" title="Formulário para fazer nova pergunta" @error="handleIframeError">
          </iframe>
        </div>
      </div>
    </div>

    <div class="questions-list" v-if="list.length > 0">
      <div v-for="question in list" :key="question._id" class="question-item">
        <div class="question-text">
          {{ question.body }}
        </div>
        <div class="answer-container" v-if="question.reply">
          <div class="subtle-hook">
            <div class="hook-l-shape"></div>
          </div>
          <div class="answer-text">
            {{ question.reply.body }}
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!loading && list.length === 0" class="no-questions">
      Nenhuma pergunta encontrada para este produto.
    </div>

    <div v-if="loading" class="loading">
      Carregando perguntas...
    </div>

    <div class="actions" v-if="list.length < total">
      <div class="pagination">
        <button class="btn btn-primary" @click="loadMoreQuestions" :disabled="loading">
          {{ loading ? "Carregando.." : "Mostrar mais perguntas" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { MARTAN_API, MARTAN_QUESTIONS_WEBUI } from "../..";

import { configProp } from "../../utils/configProps";

export default {
  name: "Questions",

  props: {
    ...configProp,
    product: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      list: [],
      total: 0,
      limit: 4,
      offset: 0,
      searchQuery: '',
      loading: false,
      searchTimeout: null,
      showIframe: false,
      iframeError: null,
      iframeHeight: 215,
    };
  },

  computed: {
    title() {
      const config = this.config || {};
      if (!config.widget_questions || !config.widget_questions.title) {
        return null;
      }
      return config.widget_questions.title;
    },
    iframeUrl() {
      let domain = null;
      let stylesheet = null;
      if (window.storefront && window.storefront.settings) {
        stylesheet = encodeURIComponent(`https://${window.storefront.settings.domain}/storefront.css`)
        domain = window.storefront.settings.domain;
      }
      if (!window.storefront || !window.storefront.context || !window.storefront.context.body) {
        return '';
      }
      const productID = window.storefront.context.body._id;
      const productSKU = window.storefront.context.body.sku;
      const webId = this.config.web_id;
      const storeId = this.config.store_id;
      const origin = window.location.origin || domain;
      return `${MARTAN_QUESTIONS_WEBUI}/?product=${productID}&sku=${productSKU}&web_id=${webId}&store_id=${storeId}&origin=${encodeURIComponent(origin)}&stylesheet=${stylesheet}`;
    }
  },

  watch: {
    searchQuery(newValue) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      if (!newValue.trim()) {
        this.offset = 0;
        this.fetchQuestions();
        return;
      }

      this.searchTimeout = setTimeout(() => {
        this.offset = 0;
        this.fetchQuestions();
      }, 500);
    }
  },

  mounted() {
    this.fetchQuestions();
    this.setupIframeMessageListener();
  },

  beforeDestroy() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.removeIframeMessageListener();
  },

  methods: {
    fetchQuestions() {
      const params = {
        limit: this.limit,
        offset: this.offset,
        sku: this.product,
        expand: 'reply',
      };

      if (this.searchQuery.trim()) {
        params.terms = this.searchQuery.trim();
      }

      this.loading = true;
      axios({
        url: MARTAN_API + "/api/v1/questions.json",
        headers: {
          "X-Store-Id": this.config.store_id,
          "X-Api-Key": this.config.web_id,
        },
        params,
      })
        .then(({ data }) => {
          const { result, meta } = data;
          if (this.offset === 0) {
            this.list = result;
          } else {
            this.list = [...this.list, ...result];
          }

          this.total = meta.count;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    loadMoreQuestions() {
      this.offset += this.limit;
      this.fetchQuestions();
    },

    askQuestion() {
      this.showIframe = !this.showIframe;
      if (this.showIframe) {
        this.iframeError = null;
      }
    },

    handleIframeError() {
      this.iframeError = 'Erro ao carregar o iframe. Verifique se o servidor está rodando e se não há restrições de X-Frame-Options.';
    },

    clearSearch() {
      this.searchQuery = '';
      this.offset = 0;
      this.fetchQuestions();
    },

    setupIframeMessageListener() {
      this.messageHandler = (event) => {
        if (event.data.type === 'iframe_height_change') {
          this.iframeHeight = event.data.height;
        }
      };
      window.addEventListener('message', this.messageHandler);
    },

    removeIframeMessageListener() {
      if (this.messageHandler) {
        window.removeEventListener('message', this.messageHandler);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.martan-questions {
  margin-bottom: 3rem;

  .questions-search {
    margin-bottom: 20px;

    .search-input-group {
      max-width: 500px;

      .search-input {
        flex: 1;
        padding: 12px 16px;
        border: 1px solid #e0e0e0;
        border-radius: 8px 0 0 8px;
        border-right: none;
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s;

        &:focus {
          border-color: #6699ff;
        }

        &::placeholder {
          color: #999;
        }
      }

      .search-button {
        padding: 12px 16px;
        background-color: #6699ff;
        border: 1px solid #6699ff;
        border-radius: 0 8px 8px 0;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;

        &:hover:not(:disabled) {
          background-color: #5588ee;
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }

  .questions-list {
    .question-item {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      .question-text {
        color: #333;
        font-weight: 500;
        line-height: 1.4;
        margin-bottom: 12px;
        font-size: .9375rem;
      }

      .answer-container {
        position: relative;
        display: flex;
        align-items: flex-start;
        margin-top: 8px;

        .subtle-hook {
          position: relative;
          margin-right: 16px;
          margin-top: 6px;
          flex-shrink: 0;
          width: 12px;
          height: 12px;

          .hook-l-shape {
            position: relative;
            width: 12px;
            height: 12px;

            &::before {
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              width: 1px;
              height: 8px;
              background-color: #d0d0d0;
            }

            &::after {
              content: '';
              position: absolute;
              left: 0;
              top: 7px;
              width: 6px;
              height: 1px;
              background-color: #d0d0d0;
            }
          }
        }

        .answer-text {
          color: #666;
          line-height: 1.4;
          flex: 1;
          font-weight: 300;
        }
      }
    }
  }

  .no-questions {
    text-align: center;
    color: #999;
    padding: 40px 20px;
    font-style: italic;
  }

  .loading {
    text-align: center;
    color: #666;
    padding: 20px;
  }

  .questions-footer {
    .view-more-link {
      background: none;
      border: none;
      color: #6699ff;
      text-decoration: none;
      font-size: 14px;
      cursor: pointer;
      padding: 0;
      font-family: inherit;

      &:hover {
        text-decoration: underline;
      }

      &:focus {
        outline: 2px solid #6699ff;
        outline-offset: 2px;
        border-radius: 2px;
      }
    }
  }

  .iframe-container {
    margin-top: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    max-width: 580px;

    .question-iframe {
      width: 100%;
      border: none;
      display: block;
    }
  }

  .ask-question-section {
    margin-top: 30px;

    .ask-question-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      background-color: #e6f2ff;
      border: 1px solid #b3d9ff;
      border-radius: 8px;
      color: #6699ff;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: #d1e7ff;
        border-color: #99ccff;
      }

      svg {
        flex-shrink: 0;
      }
    }
  }

  .actions {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
