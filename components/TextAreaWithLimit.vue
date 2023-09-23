<template>
  <fieldset>
    <b>Введите текстовое сообщение:</b>
    <br />
    <textarea
      ref="textarea"
      name="text_vk"
      class="custom-textarea"
      :maxlength="maxlength"
    ></textarea>
  </fieldset>
</template>

<script>
export default {
  name: "TextAreaWithLimit",
  props: {
    maxlength: {
      type: Number,
    },
  },
  data() {
    return {
      textareaValue: "",
    };
  },
  methods: {
    setTextareaValue(value) {
      this.textareaValue = value || "";
      this.$refs.textarea.value = this.textareaValue;
    },
  },
  mounted() {
    this.$refs.textarea.addEventListener("input", () => {
      this.textareaValue = this.$refs.textarea.value;
    });
  },
};
</script>

  
<style>
.custom-textarea {
  width: 100%;
  box-sizing: border-box;
}
</style>