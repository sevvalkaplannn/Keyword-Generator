<template>
  <div class="ma-keywords-generator">
    <div class="ma-content">
      <div class="ma-left-side">
        <div class="ma-input">
          <label for="input-text">Input Text:</label>
          <a-textarea
            id="input-text"
            v-model="inputText"
            :rows="5"
            :placeholder="'Enter your text'"
          ></a-textarea>
        </div>
        <a-button type="primary" @click="generateKeywords" class="convertButton">
          <font-awesome-icon icon="fa-solid fa-check" />
          Count
        </a-button>
      </div>
      <div class="ma-right-side">
        <div class="ma-select">
          <label>Select n-grams to show:</label>
          <a-select
            mode="multiple"
            v-model="selectedNGrams"
            :options="nGramOptions"
            style="width: 100%"
            placeholder="Select n-grams"
          ></a-select>
        </div>
        <div class="ma-keywords">
          <div
            v-for="(keywords, index) in selectedKeywords"
            :key="index"
            class="ma-keyword-group"
          >
            <h3>{{ selectedNGrams[index] }}-gram Keywords:</h3>
            <a-tag v-for="keyword in keywords" :key="keyword" class="ma-keyword-tag">
              {{ keyword }}
              <a-icon type="close" @click="removeKeyword(keyword)" />
            </a-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Select, Button, Input, Tag, Icon } from "ant-design-vue";

export default {
  name: "ma-keyword-generator",
  components: {
    "a-select": Select,
    "a-button": Button,
    "a-textarea": Input.TextArea,
    "a-tag": Tag,
    "a-icon": Icon,
  },
  data() {
    return {
      inputText: "",
      selectedNGrams: [],
      selectedKeywords: [],
      unwantedWords: ["is", "a", "an", "the"],
      nGramOptions: Array.from({ length: 10 }, (_, i) => ({
        label: `${i + 1}-gram`,
        value: i + 1,
      })),
    };
  },
  computed: {
    cleanedText() {
      return this.inputText.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
    },
    filteredText() {
      return this.cleanedText
        .split(" ")
        .filter((word) => !this.unwantedWords.includes(word))
        .join(" ");
    },
  },
  methods: {
    getNGramKeywords(n, text) {
      const words = text.split(/\s+/);
      const nGrams = [];

      for (let i = 0; i <= words.length - n; i++) {
        const nGram = words.slice(i, i + n).join(" ");
        if (!nGrams.includes(nGram)) {
          nGrams.push(nGram);
        }
      }

      return nGrams;
    },

    generateKeywords() {
      const cleanedText = this.cleanedText;
      const filteredText = cleanedText
        .split(" ")
        .filter((word) => !this.unwantedWords.includes(word))
        .join(" ");

      this.selectedKeywords = this.selectedNGrams.map((n) =>
        this.getNGramKeywords(n, filteredText)
      );
    },
    removeKeyword(keyword, groupIndex, keywordIndex) {
      this.selectedKeywords[groupIndex].splice(keywordIndex, 1);
    },
  },
};
</script>

<style scoped>
.ma-keywords-generator {
  font-family: Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
}

.ma-content {
  display: flex;
}

.ma-left-side {
  flex: 1;
  padding-right: 100px;
}

.ma-right-side {
  flex: 1;
  padding-left: 100px;
}

.ma-header {
  background-color: white;
  text-align: center;
}

.ma-input {
  margin-bottom: 20px;
}

.ma-input label {
  display: block;
  margin-bottom: 15px;
  font-size: 15px;
  font-weight: 200;
  color: black;
}

.ma-input textarea {
  width: 100%;
  resize: vertical;
  background-color: white;
}

.ma-button {
  margin-top: 20px;
}

.convertButton {
  background-color: brown;
  border-color: brown;
  color: white;
  border-radius: 8px;
  height: 30px;
}

.ma-keyword-group {
  margin-bottom: 20px;
}

.ma-keyword-group h3 {
  margin-top: 0;
  font-size: 15px;
  font-weight: 200;
}

.ma-keyword-group a-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
