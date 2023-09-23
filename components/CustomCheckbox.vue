<template>
  <label class="checkbox">
    <input
      type="checkbox"
      :checked="value"
      @input="$emit('input', $event.target.checked)"
    />
    <div class="checkbox__checkmark"></div>
    <div class="checkbox__body">
      <slot></slot>
    </div>
  </label>
</template>
  
<script>
export default {
  name: "CustomCheckbox",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
  
<style>
.checkbox {
  display: inline-block;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkbox input:checked ~ .checkbox__checkmark {
  background-color: #f7cb15;
}
.checkbox input:checked ~ .checkbox__checkmark:after {
  opacity: 1;
}
.checkbox:hover input ~ .checkbox__checkmark {
  background-color: #eee;
}
.checkbox:hover input:checked ~ .checkbox__checkmark {
  background-color: #f7cb15;
}

.checkbox .checkbox__checkmark {
  position: absolute;
  top: 1px;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: #eee;
  transition: background-color 0.25s ease;
  border-radius: 11px;
}
.checkbox .checkbox__checkmark:after {
  content: "";
  position: absolute;
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid #333;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  transition: opacity 0.25s ease;
}
.checkbox .checkbox__body {
  color: #333;
  line-height: 1.4;
  font-size: 16px;
  transition: color 0.25s ease;
}
</style>