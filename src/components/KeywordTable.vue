<template>
  <div>
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="(record) => record.keyword"
    />
  </div>
</template>

<script>
import { Table } from "ant-design-vue";

export default {
  components: {
    "a-table": Table,
  },
  props: ["text"],
  data() {
    return {
      columns: [
        {
          title: "Keyword",
          dataIndex: "keyword",
          key: "keyword",
        },
        {
          title: "Count",
          dataIndex: "count",
          key: "count",
        },
        {
          title: "Density",
          dataIndex: "density",
          key: "density",
        },
      ],
      dataSource: [],
    };
  },
  watch: {
    text(newText) {
      this.updateTable(newText);
    },
  },
  mounted() {
    this.updateTable(this.text);
  },
  methods: {
    countKeywords(words) {
      //this method takes an array as inputs (words) and it stores each keyword in keywordCountMap if the word exist it increments the count of that keyword by one
      const keywordCountMap = {};

      words.forEach((word) => {
        if (!keywordCountMap[word]) {
          keywordCountMap[word] = 0;
        }
        keywordCountMap[word]++;
      });

      return keywordCountMap;
    },
    calculateDensity(count, totalCount) {
      //toFixed(1) is used for rounding the result to one decimal place
      return ((count / totalCount) * 100).toFixed(1);
    },
    mergeKeywords(keywordCountMap) {
      //it combines keywords with the same count and density values into a single row.
      const mergedKeywords = {};

      for (const keyword in keywordCountMap) {
        const count = keywordCountMap[keyword];
        const density = this.calculateDensity(count, this.totalCount);

        const key = `${count}-${density}`;

        if (!mergedKeywords[key]) {
          mergedKeywords[key] = [];
        }

        mergedKeywords[key].push(keyword);
      }

      return mergedKeywords;
    },
    updateTable(text) {
      //it works for updating the table for new inputs and all methods are collecting together in this method
      const words = text.toLowerCase().split(" ");
      this.totalCount = words.length;

      const keywordCountMap = this.countKeywords(words);
      const mergedKeywords = this.mergeKeywords(keywordCountMap);

      //it will hold the final data
      const keywordData = [];

      for (const key in mergedKeywords) {
        const [count, density] = key.split("-");
        const keywords = mergedKeywords[key];

        keywordData.push({
          key: keywords.join(", "),
          keyword: keywords.join(", "),
          count: parseInt(count),
          density: density,
        });
      }

      this.dataSource = keywordData;
    },
  },
};
</script>

<style scoped>
:deep .ant-table-thead > tr > th {
  @apply bg-blue-700 text-white;
}
</style>
