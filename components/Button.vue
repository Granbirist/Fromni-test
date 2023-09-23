<template>
  <button
    ref="button"
    :style="buttonStyles"
    :maxURLButtons="maxURLButtons"
    @click="edit()"
    class="button"
  >
    {{ label }}
  </button>
</template>
  
<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    maxLength: {
      type: Number,
    },
    url: {
      type: String,
      default: "",
    },
    allowUrls: {
      type: Boolean,
    },
    maxURLButtons: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      buttonWidth: 50,
    };
  },

  methods: {
    edit() {
      let text =
        this.maxLength == null
          ? "Введите новую надпись (количество символов не ограничено):"
          : "Введите новую надпись (максимальное количество символов " +
            this.maxLength +
            "):";

      let newLabel = prompt(text, this.label);
      if (newLabel != null) {
        if (newLabel.length <= this.maxLength || this.maxLength == null) {
          this.$emit("edit", newLabel);
          if (
            this.allowUrls &&
            (this.keyboard.getLinkButtonsCount() < this.maxURLButtons ||
              this.maxURLButtons == null)
          ) {
            let newUrl = prompt(
              "Введите URL для кнопки (если таковая нужна):",
              this.url
            );
            if (newUrl != null) {
              this.$emit("edit-url", newUrl);
            }
          }
        } else {
          alert("Надпись слишком большая!");
        }
      }
    },
    updateButtonWidth() {
      const context = document.createElement("canvas").getContext("2d");

      context.font = "1.2rem sans-serif";
      const textWidth = context.measureText(this.label).width;

      const padding = 20;
      this.buttonWidth = textWidth + padding;
    },
  },

  computed: {
    buttonStyles() {
      return {
        minWidth: this.buttonWidth + "px",
      };
    },
  },

  inject: ["keyboard"],

  watch: {
    label() {
      this.updateButtonWidth();
    },
  },
  
  mounted() {
    this.updateButtonWidth();
  },
};
</script>