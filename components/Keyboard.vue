<template>
  <div>
    <div v-for="(row, rowIndex) in initialRows" :key="rowIndex" class="row">
      <div
        v-for="(button, buttonIndex) in row"
        :key="`wrapper-${buttonIndex}`"
        class="button-wrapper"
      >
        <Button
          :label="button"
          :maxLength="buttonMaxLength"
          :allowUrls="allowUrls"
          @edit="editLabel(rowIndex, buttonIndex, $event)"
          @edit-url="editUrl(rowIndex, buttonIndex, $event)"
        />
        <button
          v-if="initialButtonUrls[rowIndex][buttonIndex]"
          @click="openUrl(rowIndex, buttonIndex)"
          class="link-button"
        >
          Link
        </button>
        <button
          @click="deleteButton(rowIndex, buttonIndex)"
          class="delete-button"
        >
          X
        </button>
      </div>
      <button
        v-if="row.length < maxButtons || maxButtons == null"
        @click="addButton(rowIndex)"
        class="add-button"
      >
        +
      </button>
      <button
        v-if="initialRows.length > 1"
        @click="deleteRow(rowIndex)"
        class="delete-row-button"
      >
        Удалить ряд
      </button>
    </div>
    <button
      v-if="initialRows.length < maxRows || maxRows == null"
      @click="addRow"
      class="add-row-button"
    >
      Добавить ряд
    </button>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  components: {
    Button,
  },

  props: {
    maxButtons: {
      type: Number,
    },
    maxRows: {
      type: Number,
    },
    buttonMaxLength: {
      type: Number,
      default: null,
    },
    allowUrls: {
      type: Boolean,
      default: true,
    },
    maxURLButtons: {
      type: Number,
      default: null,
    },
    initialRows: {
     type: Array,
     default: () => [[]],
   },
   initialButtonUrls: {
     type: Array,
     default: () => [[]],
   },
  },

  methods: {
    addButton(rowIndex) {
      if (
        this.initialRows[rowIndex].length < this.maxButtons ||
        this.maxButtons == null
      ) {
        this.initialRows[rowIndex].push("");
        this.initialButtonUrls[rowIndex].push("");
      }
    },

    deleteButton(rowIndex, buttonIndex) {
      this.initialRows[rowIndex].splice(buttonIndex, 1);
      this.initialButtonUrls[rowIndex].splice(buttonIndex, 1);
      if (this.initialRows[rowIndex].length == 0 && this.initialRows.length > 1) {
        this.deleteRow(rowIndex);
      }
    },

    addRow() {
      const lastRowIndex = this.initialRows.length - 1;
      if (
        (this.initialRows.length < this.maxRows || this.maxRows == null) &&
        this.initialRows[lastRowIndex].length > 0
      ) {
        this.initialRows.push([]);
        this.initialButtonUrls.push([]);
      }
    },

    deleteRow(rowIndex) {
      this.initialButtonUrls.splice(rowIndex, 1);
      this.initialRows.splice(rowIndex, 1);
    },

    editLabel(rowIndex, buttonIndex, newLabel) {
      this.$set(this.initialRows[rowIndex], buttonIndex, newLabel);
    },

    editUrl(rowIndex, buttonIndex, newUrl) {
      this.$set(this.initialButtonUrls[rowIndex], buttonIndex, newUrl);
    },

    openUrl(rowIndex, buttonIndex) {
      const url = this.initialButtonUrls[rowIndex][buttonIndex];
      window.open(url, "_blank");
    },

    getLinkButtonsCount() {
      let linkButtonsCount = 0;
      if (this.initialButtonUrls.length != 0) {
        for (let i = 0; i < this.initialButtonUrls.length; i++) {
          for (let j = 0; j < this.initialButtonUrls[i].length; j++) {
            if (this.initialButtonUrls[i][j] != "") {
              linkButtonsCount++;
            }
          }
        }
      }
      return linkButtonsCount;
    },
  },

  provide() {
    return {
      keyboard: this, 
    };
  },

  created() {
    this.initialButtonUrls = this.initialRows.map((row) => row.map(() => ""));
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
}
.add-button {
  font-size: 1.2rem;
  width: 50px;
  height: 50px;
  margin: 4px;
  margin-left: 19px;
  border-radius: 20px;
}
.add-row-button {
  font-size: 1rem;
  margin: 4px;
  background-color: #b61f14;
  color: white;
  border: none;
  cursor: pointer;
}
.button-wrapper {
  position: relative;
  display: inline-flex;
}
.delete-button {
  position: absolute;
  top: 2px;
  right: -8px;
  font-size: 12px;
  width: 20px;
  height: 20px;
  line-height: 16px;
  text-align: center;
  background-color: #b61f14;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
.delete-row-button {
  font-size: 1rem;
  margin: 4px;
  background-color: #b61f14;
  color: white;
  cursor: pointer;
}
.link-button {
  position: absolute;
  top: 48px;
  right: -8px;
  font-size: 12px;
  width: 40px;
  height: 20px;
  line-height: 16px;
  text-align: center;
  color: white;
  border: none;
  border-radius: 25%;
  cursor: pointer;
  background-color: #5cb85c;
}
</style>