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
  @apply left-20 relative bg-yellow-500 border-yellow-500 text-white rounded-lg h-8;
}
:deep .ant-btn-primary:hover {
  @apply bg-yellow-400 border-yellow-400;
}
:deep textarea.ant-input {
  @apply relative h-56 min-h-0 w-10/12 left-20;
}
.characterCount {
  @apply absolute text-sm text-gray-500;
}
</style>
