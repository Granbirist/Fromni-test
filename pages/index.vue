<template>
  <section>
    <CustomCheckbox v-model="vkEnabled" :value="vkEnabled">
      Вконтакте
    </CustomCheckbox>

    <fieldset class="framed-fieldset" v-show="vkEnabled">
      <CustomCheckbox v-model="textVkEnabled" :value="textVkEnabled">
        Добавить текстовое сообщение
      </CustomCheckbox>

      <br />

      <TextAreaWithLimit
        ref="textVk"
        v-show="textVkEnabled"
        :maxlength="4096"
      />

      <CustomCheckbox v-model="keyboardVkEnabled" :value="keyboardVkEnabled">
        Добавить клавиатуру
      </CustomCheckbox>

      <br />
      <fieldset v-show="keyboardVkEnabled">
        <switchToggleCheckbox
          v-model="keyboardVkInline"
          :value="keyboardVkInline"
        />

        <fieldset class="framed-fieldset">
          <div>
            <Keyboard
              :initialRows="rowsVkKeyboardNormal"
              :initialButtonUrls="buttonUrlsVkKeyboardNormal"
              v-show="!keyboardVkInline"
              :maxRows="vkKeyboards[0].maxRows"
              :maxButtons="vkKeyboards[0].maxButtons"
            />

            <Keyboard
              :initialRows="rowsVkKeyboardInline"
              :initialButtonUrls="buttonUrlsVkKeyboardInline"
              v-show="keyboardVkInline"
              :maxRows="vkKeyboards[1].maxRows"
              :maxButtons="vkKeyboards[1].maxButtons"
            />
          </div>
        </fieldset>
      </fieldset>
    </fieldset>

    <br />

    <CustomCheckbox v-model="tgEnabled" :value="tgEnabled"
      >Telegram</CustomCheckbox
    >

    <fieldset class="framed-fieldset" v-show="tgEnabled">
      <CustomCheckbox v-model="textTgEnabled" :value="textTgEnabled">
        Добавить текстовое сообщение
      </CustomCheckbox>

      <br />

      <TextAreaWithLimit
        ref="textTg"
        v-show="textTgEnabled"
        :maxlength="4096"
      />

      <CustomCheckbox v-model="keyboardTgEnabled" :value="keyboardTgEnabled">
        Добавить клавиатуру
      </CustomCheckbox>

      <fieldset v-show="keyboardTgEnabled">
        <switchToggleCheckbox
          v-model="keyboardTgInline"
          :value="keyboardTgInline"
        />

        <fieldset class="framed-fieldset">
          <div>
            <Keyboard
              v-show="!keyboardTgInline"
              :initialRows="rowsTgKeyboardNormal"
              :initialButtonUrls="buttonUrlsTgKeyboardNormal"
              :maxRows="tgKeyboards[0].maxRows"
              :maxButtons="tgKeyboards[0].maxButtons"
              :allowUrls="false"
            />

            <Keyboard
              v-show="keyboardTgInline"
              :initialRows="rowsTgKeyboardInline"
              :initialButtonUrls="buttonUrlsTgKeyboardInline"
              :maxRows="tgKeyboards[1].maxRows"
              :maxButtons="tgKeyboards[1].maxButtons"
              :buttonMaxLength="64"
            />
          </div>
        </fieldset>
      </fieldset>
    </fieldset>

    <br />

    <CustomCheckbox v-model="whatsAppEnabled" :value="whatsAppEnabled">
      WhatsApp
    </CustomCheckbox>
    <fieldset class="framed-fieldset" v-show="whatsAppEnabled">
      <CustomCheckbox
        v-model="textWhatsAppEnabled"
        :value="textWhatsAppEnabled"
      >
        Добавить текстовое сообщение
      </CustomCheckbox>

      <br />

      <TextAreaWithLimit
        ref="textWhatsApp"
        v-show="textWhatsAppEnabled"
        :maxlength="1000"
      />

      <CustomCheckbox
        v-model="keyboardWhatsAppEnabled"
        :value="keyboardWhatsAppEnabled"
      >
        Добавить клавиатуру
      </CustomCheckbox>

      <fieldset v-show="keyboardWhatsAppEnabled">
        <switchToggleCheckbox
          v-model="keyboardWhatsAppInline"
          :value="keyboardWhatsAppInline"
        />

        <fieldset class="framed-fieldset">
          <div>
            <Keyboard
              v-show="!keyboardWhatsAppInline"
              :initialRows="rowsWhatsAppKeyboardNormal"
              :initialButtonUrls="buttonUrlsWhatsAppKeyboardNormal"
              :maxRows="whatsAppKeyboards[0].maxRows"
              :maxButtons="whatsAppKeyboards[0].maxButtons"
              :allowUrls="false"
              :buttonMaxLength="20"
            />

            <Keyboard
              v-show="keyboardWhatsAppInline"
              :initialRows="rowsWhatsAppKeyboardInline"
              :initialButtonUrls="buttonUrlsWhatsAppKeyboardInline"
              :maxRows="whatsAppKeyboards[1].maxRows"
              :maxButtons="whatsAppKeyboards[1].maxButtons"
              :buttonMaxLength="20"
              :maxURLButtons="1"
            />
          </div>
        </fieldset>
      </fieldset>
    </fieldset>
    <br />

    <CustomCheckbox v-model="smsEnabled" :value="smsEnabled">
      SMS
    </CustomCheckbox>
    <fieldset class="framed-fieldset" v-show="smsEnabled">
      <CustomCheckbox v-model="textSmsEnabled" :value="textSmsEnabled">
        Добавить текстовое сообщение
      </CustomCheckbox>

      <br />

      <TextAreaWithLimit
        ref="textSms"
        v-show="textSmsEnabled"
        :maxlength="null"
      />
    </fieldset>

    <br />

    <button
      class="button buttonexit"
      v-show="isSaveSettingsButtonDisabled"
      @click="saveSettings"
    >
      Сохранить настройки
    </button>
  </section>
</template>

<script>
import Keyboard from "@/components/Keyboard.vue";
import CustomCheckbox from "@/components/CustomCheckbox.vue";
import switchToggleCheckbox from "@/components/switchToggleCheckbox.vue";
import TextAreaWithLimit from "@/components/TextAreaWithLimit.vue";
import { app, firestore } from "@/plugins/firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default {
  async created() {
    await this.loadSettings();
  },

  components: {
    Keyboard,
    CustomCheckbox,
    switchToggleCheckbox,
    TextAreaWithLimit,
  },

  data() {
    return {
      vkEnabled: false,
      tgEnabled: false,
      whatsAppEnabled: false,
      smsEnabled: false,

      textVkEnabled: false,
      textTgEnabled: false,
      textWhatsAppEnabled: false,
      textSmsEnabled: false,

      keyboardVkEnabled: false,
      keyboardTgEnabled: false,
      keyboardWhatsAppEnabled: false,

      keyboardVkInline: false,
      keyboardTgInline: false,
      keyboardWhatsAppInline: false,

      rowsVkKeyboardNormal: [[]],
      buttonUrlsVkKeyboardNormal: [[]],
      rowsVkKeyboardInline: [[]],
      buttonUrlsVkKeyboardInline: [[]],

      rowsTgKeyboardNormal: [[]],
      buttonUrlsTgKeyboardNormal: [[]],
      rowsTgKeyboardInline: [[]],
      buttonUrlsTgKeyboardInline: [[]],

      rowsWhatsAppKeyboardNormal: [[]],
      buttonUrlsWhatsAppKeyboardNormal: [[]],
      rowsWhatsAppKeyboardInline: [[]],
      buttonUrlsWhatsAppKeyboardInline: [[]],

      vkKeyboards: [
        { maxRows: 10, maxButtons: 5 },
        { maxRows: 2, maxButtons: 5 },
      ],

      tgKeyboards: [
        { maxRows: null, maxButtons: null },
        { maxRows: null, maxButtons: null },
      ],

      whatsAppKeyboards: [
        { maxRows: 2, maxButtons: 5 },
        { maxRows: 1, maxButtons: 3 },
      ],
    };
  },

  methods: {
    async saveSettings() {
      const settingsData = {
        vkEnabled: this.vkEnabled,
        tgEnabled: this.tgEnabled,
        whatsAppEnabled: this.whatsAppEnabled,
        smsEnabled: this.smsEnabled,

        textVkEnabled: this.textVkEnabled,
        textTgEnabled: this.textTgEnabled,
        textWhatsAppEnabled: this.textWhatsAppEnabled,
        textSmsEnabled: this.textSmsEnabled,

        keyboardVkEnabled: this.keyboardVkEnabled,
        keyboardTgEnabled: this.keyboardTgEnabled,
        keyboardWhatsAppEnabled: this.keyboardWhatsAppEnabled,

        keyboardVkInline: this.keyboardVkInline,
        keyboardTgInline: this.keyboardTgInline,
        keyboardWhatsAppInline: this.keyboardWhatsAppInline,

        textVkValue: this.$refs.textVk.textareaValue,
        textTgValue: this.$refs.textTg.textareaValue,
        textWhatsAppValue: this.$refs.textWhatsApp.textareaValue,
        textSmsValue: this.$refs.textSms.textareaValue,

        rowsVkKeyboardNormal: this.serializeArray(this.rowsVkKeyboardNormal),
        buttonUrlsVkKeyboardNormal: this.serializeArray(
          this.buttonUrlsVkKeyboardNormal
        ),
        rowsVkKeyboardInline: this.serializeArray(this.rowsVkKeyboardInline),
        buttonUrlsVkKeyboardInline: this.serializeArray(
          this.buttonUrlsVkKeyboardInline
        ),

        rowsTgKeyboardNormal: this.serializeArray(this.rowsTgKeyboardNormal),
        buttonUrlsTgKeyboardNormal: this.serializeArray(
          this.buttonUrlsTgKeyboardNormal
        ),
        rowsTgKeyboardInline: this.serializeArray(this.rowsTgKeyboardInline),
        buttonUrlsTgKeyboardInline: this.serializeArray(
          this.buttonUrlsTgKeyboardInline
        ),

        rowsWhatsAppKeyboardNormal: this.serializeArray(this.rowsWhatsAppKeyboardNormal),
        buttonUrlsWhatsAppKeyboardNormal: this.serializeArray(
          this.buttonUrlsWhatsAppKeyboardNormal
        ),
        rowsWhatsAppKeyboardInline: this.serializeArray(this.rowsWhatsAppKeyboardInline),
        buttonUrlsWhatsAppKeyboardInline: this.serializeArray(
          this.buttonUrlsWhatsAppKeyboardInline
        ),
      };

      try {
        await setDoc(doc(firestore, "settings", "settings"), settingsData);
        alert("Settings saved successfully!");
      } catch (error) {
        console.error("Error saving settings: ", error);
        alert("Failed to save settings.");
      }
    },

    async loadSettings() {
      try {
        const settingsSnapshot = await getDoc(
          doc(firestore, "settings", "settings")
        );
        if (settingsSnapshot.exists()) {
          const data = settingsSnapshot.data();

          this.vkEnabled = data.vkEnabled;
          this.tgEnabled = data.tgEnabled;
          this.whatsAppEnabled = data.whatsAppEnabled;
          this.smsEnabled = data.smsEnabled;

          this.textVkEnabled = data.textVkEnabled;
          this.textTgEnabled = data.textTgEnabled;
          this.textWhatsAppEnabled = data.textWhatsAppEnabled;
          this.textSmsEnabled = data.textSmsEnabled;

          this.keyboardVkEnabled = data.keyboardVkEnabled;
          this.keyboardTgEnabled = data.keyboardTgEnabled;
          this.keyboardWhatsAppEnabled = data.keyboardWhatsAppEnabled;

          this.keyboardVkInline = data.keyboardVkInline;
          this.keyboardTgInline = data.keyboardTgInline;
          this.keyboardWhatsAppInline = data.keyboardWhatsAppInline;

          this.$refs.textVk.setTextareaValue(data.textVkValue);
          this.$refs.textTg.setTextareaValue(data.textTgValue);
          this.$refs.textWhatsApp.setTextareaValue(data.textWhatsAppValue);
          this.$refs.textSms.setTextareaValue(data.textSmsValue);

          this.rowsVkKeyboardNormal = this.deserializeArray(data.rowsVkKeyboardNormal);
          this.buttonUrlsVkKeyboardNormal = this.deserializeArray(
            data.buttonUrlsVkKeyboardNormal
          );
          this.rowsVkKeyboardInline = this.deserializeArray(data.rowsVkKeyboardInline);
          this.buttonUrlsVkKeyboardInline = this.deserializeArray(
            data.buttonUrlsVkKeyboardInline
          );

          this.rowsTgKeyboardNormal = this.deserializeArray(data.rowsTgKeyboardNormal);
          this.buttonUrlsTgKeyboardNormal = this.deserializeArray(
            data.buttonUrlsTgKeyboardNormal
          );
          this.rowsTgKeyboardInline = this.deserializeArray(data.rowsTgKeyboardInline);
          this.buttonUrlsTgKeyboardInline = this.deserializeArray(
            data.buttonUrlsTgKeyboardInline
          );

          this.rowsWhatsAppKeyboardNormal = this.deserializeArray(data.rowsWhatsAppKeyboardNormal);
          this.buttonUrlsWhatsAppKeyboardNormal = this.deserializeArray(
            data.buttonUrlsWhatsAppKeyboardNormal
          );
          this.rowsWhatsAppKeyboardInline = this.deserializeArray(data.rowsWhatsAppKeyboardInline);
          this.buttonUrlsWhatsAppKeyboardInline = this.deserializeArray(
            data.buttonUrlsWhatsAppKeyboardInline
          );
        } else {
          console.log("No such settings document!");
        }
      } catch (error) {
        console.error("Error loading settings: ", error);
        alert("Failed to load settings.");
      }
    },

    serializeArray(array) {
      const serializedArray = JSON.stringify(array);
      console.log(serializedArray);
      return serializedArray;
    },

    deserializeArray(array) {
      const deserializedArray = JSON.parse(array);
      console.log(deserializedArray);
      return deserializedArray;
    },
  },

  computed: {
    isSaveSettingsButtonDisabled() {
      return (
        this.vkEnabled ||
        this.tgEnabled ||
        this.whatsAppEnabled ||
        this.smsEnabled
      );
    },
  },
};
</script>

<style>
.button {
  background-color: #f7cb15;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  cursor: pointer;
  margin-left: 19px;
  border-radius: 20px;
}

.buttonexit {
  background-color: white;
  color: black;
  border: 2px solid #f7cb15;
}

.buttonexit:hover {
  background-color: #f7cb15;
  color: white;
}

.framed-fieldset {
  border: 2px solid #333;
  border-radius: 8px;
  padding: 1rem;
}
</style>

