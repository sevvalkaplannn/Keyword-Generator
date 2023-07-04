<template>
  <div class="ma-keywords-generator">
    <div class="ma-content">
      <div class="ma-left-side">
        <div class="ma-input">
          <label for="input-text">Input Text:</label>
          <textarea id="input-text" v-model="inputText" rows="5"></textarea>
        </div>
      </div>
      <div class="ma-right-side">
        <div class="ma-keywords">
          <div class="ma-keyword-group">
            <h3>1-gram Keywords:</h3>
            <ul>
              <li v-for="keyword in oneGramKeywords" :key="keyword">{{ keyword }}</li>
            </ul>
          </div>
          <div class="ma-keyword-group">
            <h3>2-gram Keywords:</h3>
            <ul>
              <li v-for="keyword in twoGramKeywords" :key="keyword">{{ keyword }}</li>
            </ul>
          </div>
          <div class="ma-keyword-group">
            <h3>3-gram Keywords:</h3>
            <ul>
              <li v-for="keyword in threeGramKeywords" :key="keyword">{{ keyword }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ma-keyword-generator',
  data() {
    return {
      inputText: '',
    };
  },
  computed: {
    cleanedText() {
      return this.inputText.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase();
    },
    oneGramKeywords() {
      const words = this.cleanedText.split(' ');
      const uniqueKeywords = [...new Set(words)];
      return uniqueKeywords;
    },
    twoGramKeywords() {
      const words = this.cleanedText.split(' ');
      const twoGrams = [];
      for (let i = 0; i < words.length - 1; i++) {
        const twoGram = words[i] + ' ' + words[i + 1];
        twoGrams.push(twoGram);
      }
      return twoGrams;
    },
    threeGramKeywords() {
      const words = this.cleanedText.split(' ');
      const threeGrams = [];
      for (let i = 0; i < words.length - 2; i++) {
        const threeGram = words[i] + ' ' + words[i + 1] + ' ' + words[i + 2];
        threeGrams.push(threeGram);
      }
      return threeGrams;
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
  padding-left: 10px; 
}

.ma-header {
  background-color: #f0f0f0;
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
}

.ma-input textarea {
  width: 100%;
  resize: vertical;
}

.ma-keyword-group {
  margin-bottom: 20px;
}

.ma-keyword-group h3 {
  margin-top: 0;
  font-size: 15px;
  font-weight: 200;
}

.ma-keyword-group ul {
  list-style-type: none;
  padding-left: 0;
}

.ma-keyword-group li {
  margin-bottom: 5px;
}
</style>