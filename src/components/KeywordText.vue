<template>
  <div>
    <a-form :form="form" @submit="submitForm" style="margin-bottom: 16px">
      <a-form-item>
        <a-textarea v-model="userInput" placeholder="Enter text" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Form, Input, Button } from "ant-design-vue";


export default {
  components: {
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
    };
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
