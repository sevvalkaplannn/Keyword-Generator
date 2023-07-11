<template>
  <div>
    <a-form :form="form" @submit="submitForm" style="margin-bottom: 16px">
      <a-form-item>
        <a-textarea v-model="userInput" placeholder="Enter text" />
      </a-form-item>
      <a-form-item>
        <a-row>
          <a-col :span="18">
            <a-button type="primary" html-type="submit" class="convertButton"
              >Count</a-button
            >
          </a-col>
          <a-col :span="6">
            <span class="characterCount">Total Characters: {{ userInput.length }}</span>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Form, Input, Button, Row, Col } from "ant-design-vue";

export default {
  components: {
    "a-row": Row,
    "a-col": Col,
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-textarea": Input.TextArea,
    "a-button": Button,
  },
  props: ["initialText"],

  data() {
    return {
      form: {},
      userInput: "",
      characterCount: 0,
    };
  },
  watch: {
    userInput: function (newVal) {
      this.characterCount = newVal.length;
    },
  },
  mounted() {
    this.userInput = this.initialText;
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      this.$emit("update-text", this.userInput);
    },
  },
};
</script>

<style scoped>
.convertButton {
  @apply absolute left-4 lg:left-20 lg:relative bg-yellow-500 border-yellow-500 text-white rounded-lg lg:h-8 md:absolute md:left-10 sm:left-10;
}
:deep .ant-btn-primary:hover {
  @apply bg-yellow-400 border-yellow-400;
}
:deep textarea.ant-input {
  @apply w-96 left-24 lg:relative lg:h-56 lg:min-h-0 lg:w-10/12 lg:left-20 md:left-8 md:h-44 sm:left-8 h-44;
}
.characterCount {
  @apply absolute left-28 lg:absolute text-sm text-gray-500 md:text-xs md:absolute md:left-3 sm:absolute sm:text-xs;
}
</style>
