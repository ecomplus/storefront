<template>
  <div class="media">
    <ul v-if="pictures.length || video" class="media__list">
      <li
        v-if="pictures.length"
        class="mt-lazy-image"
        v-for="(picture, index) in pictures"
        :key="picture.thumb"
        @click="onClick(index)"
      >
        <img
          :alt="title"
          :data-src="picture.thumb"
          data-loaded="false"
          class="media__preview"
        />
      </li>

      <li
        v-if="video"
        class="lazy-image"
        @click="onClick(pictures.length)"
        :key="video"
        title="Abrir vídeo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="#ffffff"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M7 4v16l13 -8z"></path>
        </svg>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ThumbsPictures",

  props: {
    review: Object,
  },

  computed: {
    pictures: function () {
      return this.review.pictures || [];
    },

    video: function () {
      return this.review.video_url || null;
    },

    title: function () {
      return this.review.title || null;
    },
  },

  mounted() {
    const images = Array.from(document.querySelectorAll(".mt-lazy-image img"));
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.dataset.loaded === "false") {
          const image = entry.target;
          image.dataset.loaded = true;
          image.src = image.dataset.src;
          imageObserver.unobserve(image);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  },

  methods: {
    onClick(slide) {
      const { review } = this;
      this.$emit("onClick", { review, slide });
    },
  },
};
</script>

<style lang="css">
.media--open {
  width: 500px;
}

.media__preview {
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: block;
}

.media__list {
  list-style: none;
  padding: 0;
  display: flex;
  padding-top: 0.75rem;
}

.media__list li {
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  position: relative;
  user-select: none;
  overflow: hidden;
  border-radius: 5px;
  text-decoration: none;
  border: 0.125rem solid #383a3e;
  background-color: #383a3e;
  padding: 0;
  width: 2.375rem;
  min-width: 2.375rem;
  height: 2.375rem;
  margin-right: 0.25rem;
  transition: all ease 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
