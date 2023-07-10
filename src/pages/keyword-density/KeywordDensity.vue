<template>
  <div>
    <a-row>
      <a-col :span="12">
        <keyword-text :initialText="keywordText" @update-text="updateKeywordText" />
      </a-col>
      <a-col :span="12">
        <keyword-table :text="keywordText" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { Row, Col } from "ant-design-vue";
import KeywordText from "../../components/KeywordText.vue";
import KeywordTable from "../../components/KeywordTable.vue";

export default {
  components: {
    "a-row": Row,
    "a-col": Col,
    KeywordText,
    KeywordTable,
  },
  data() {
    return {
      keywordText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ex, volutpat in lacinia vitae, lacinia vitae lorem. Vestibulum orci felis, pharetra non nisi a, tristique accumsan dui.",
    };
  },
  methods: {
    updateKeywordText(newText) {
      this.keywordText = newText;
    },
  },
};
</script>

<style scoped>
</style>