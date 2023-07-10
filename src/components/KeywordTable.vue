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
    ATable: Table,
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
      return ((count / totalCount) * 100).toFixed(1);
    },
    mergeKeywords(keywordCountMap) {
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
      const words = text.toLowerCase().split(" ");
      this.totalCount = words.length;

      const keywordCountMap = this.countKeywords(words);
      const mergedKeywords = this.mergeKeywords(keywordCountMap);

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
