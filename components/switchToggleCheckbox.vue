<template>
  <div class="container">
    <span class="display-text">Нормальное отображение</span>
    <label class="checkbox switchToggleCheckbox">
      <input
        type="checkbox"
        @input="$emit('input', $event.target.checked)"
        :checked="value"
      />
      <div class="checkbox__checkmark"></div>
      <div class="checkbox__body">inline-отображение</div>
    </label>
  </div>
</template>
    
<script>
export default {
  name: "switchToggleCheckbox",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
    
    
<style>
.display-text {
  margin-right: 5px;
}

.checkbox.switchToggleCheckbox {
  display: inline-block;
  position: relative;
  padding-left: 50px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkbox.switchToggleCheckbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkbox.switchToggleCheckbox input:checked ~ .checkbox__checkmark {
  background-color: #f7cb15;
}
.checkbox.switchToggleCheckbox input:checked ~ .checkbox__checkmark:after {
  left: 21px;
}
.checkbox.switchToggleCheckbox:hover input ~ .checkbox__checkmark {
  background-color: #f7cb15;
}
.checkbox.switchToggleCheckbox:hover input:checked ~ .checkbox__checkmark {
  background-color: #f7cb15;
}
.checkbox.switchToggleCheckbox .checkbox__checkmark {
  position: absolute;
  top: 1px;
  left: 0;
  height: 22px;
  width: 40px;
  background-color: #f7cb15;
  transition: background-color 0.25s ease;
  border-radius: 11px;
}
.checkbox.switchToggleCheckbox .checkbox__checkmark:after {
  content: "";
  position: absolute;
  left: 3px;
  top: 3px;
  width: 16px;
  height: 16px;
  display: block;
  background-color: #eee;
  border-radius: 50%;
  transition: left 0.25s ease;
}
.checkbox.switchToggleCheckbox .checkbox__body {
  color: #333;
  line-height: 1.4;
  font-size: 16px;
  transition: color 0.25s ease;
}

.checkbox.switchToggleCheckbox .checkbox__left-label {
  margin-right: 10px;
  line-height: 1.4;
  font-size: 16px;
  color: #333;
}
</style>