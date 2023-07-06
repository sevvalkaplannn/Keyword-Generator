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

    };
  },
  computed: {
    cleanedText() {
      return this.inputText.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
    },
    nGramOptions() {
      const options = [];
      for (let n = 1; n <= 10; n++) {
        options.push({ label: `${n}-gram`, value: n });
      }
      return options;
    },
  },
  methods: {
    getNGramKeywords(n) {
  const words = this.cleanedText.split(/\s+/);
  const nGrams = [];

  for (let i = 0; i <= words.length - n; i++) {
    const nGram = words.slice(i, i + n).join(" ");
    nGrams.push(nGram);
  }

  return nGrams;
},

    unwantedWord(word) {
    const unwantedWords = ["is", "a", "an", "the"];
    return unwantedWords.includes(word.toLowerCase());
  },

  generateKeywords() {
    this.selectedKeywords = this.selectedNGrams.map((n) =>
      this.getNGramKeywords(n)
    );
  },
    removeKeyword(keyword) {
      for (let i = 0; i < this.selectedKeywords.length; i++) {
        const index = this.selectedKeywords[i].indexOf(keyword);
        if (index !== -1) {
          this.selectedKeywords[i].splice(index, 1);
          break;
        }
      }
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
