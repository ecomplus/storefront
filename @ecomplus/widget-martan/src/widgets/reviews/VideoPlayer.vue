<template>
  <div class="mt-player">
    <video preload="metadata" ref="videoPlayer">
      <source :src="video" type="video/mp4" />
    </video>

    <div class="mt-player__controls">
      <button ref="playButton" class="playPauseBtn" title="tocar vídeo">
        <svg
          v-if="this.isPlaying"
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-player-play"
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
          <path d="M7 4v16l13 -8z" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-player-pause"
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
            d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"
          />
          <path
            d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoPlayer",

  props: {
    video: {
      type: String,
      required: true
    },
  },

  data() {
    return {
      isPlaying: true,
    };
  },

  methods: {
    play() {
      if (this.$refs.videoPlayer.paused || this.$refs.videoPlayer.ended) {
        this.$refs.videoPlayer.play();
      } else {
        this.$refs.videoPlayer.pause();
      }
    },
    updateBtn() {
      this.isPlaying = this.$refs.videoPlayer.paused;
    },
  },
  mounted: function () {
    this.$refs.playButton.addEventListener("click", this.play);
    this.$refs.videoPlayer.addEventListener("click", this.play);
    this.$refs.videoPlayer.addEventListener("play", this.updateBtn);
    this.$refs.videoPlayer.addEventListener("pause", this.updateBtn);
  },
};
</script>

<style lang="scss">
.mt-player {
  video {
    display: block;
    width: 100%;
    height: 100%;
    max-height: 380px;
  }

  .playPauseBtn {
    background: none;
    border: 0;
    line-height: 1;
    color: #212529;
    text-align: center;
    outline: 0;
    padding: 0;
    cursor: pointer;
    max-width: 50px;
  }

  &__controls {
    display: flex;
    position: absolute;
    width: 100%;
    transform: translateY(0);
    padding: 5px;
    align-items: baseline;
  }

  &__controls > * {
    flex: 1;
  }

  &__progress {
    flex: 10;
    position: relative;
    display: flex;
    flex-basis: 100%;
    height: 5px;
    /* background: rgba(0,0,0,0.5); */
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    height: 15px;
    max-width: 430px;
    width: 100%;
    &--filled {
      width: 50%;
      background: #aa5500;
      flex: 0;
      flex-basis: 0%;
    }
  }
}
</style>
