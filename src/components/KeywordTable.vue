<template>
  <div class="ma-table">
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :rowClassName="getRowClassName"
    />
    <a-button
      @click="copyToClipboard"
      type="primary"
      html-type="submit"
      >Copy to Clipboard</a-button
    >
  </div>
</template>

<script>
import { Button, Table } from "ant-design-vue";
import { regex, splitRegex, filterArr } from "../pages/cleanupResources";

export default {
  components: {
    "a-table": Table,
    "a-button": Button,
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
        if (!keywordCountMap[word] && !filterArr.includes(word)) {
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
      const cleanedText = text
        .toLowerCase()
        .replace(regex, "")
        .split(splitRegex)
        .map((word) => word.trim())
        .filter((word) => word.length > 0)
        .filter((word) => !filterArr.includes(word))
        .join(" ");

      const words = cleanedText.split(" ");
      this.totalCount = words.length;

      const keywordCountMap = this.countKeywords(words);
      const mergedKeywords = this.mergeKeywords(keywordCountMap);

      //it will hold the final data
      const keywordData = [];

      for (const key in mergedKeywords) {
        const [count, density] = key.split("-");
        const keywords = mergedKeywords[key].filter(
          (keyword) => !filterArr.includes(keyword)
        );

        if (keywords.length > 0 && !isNaN(count) && !isNaN(density)) {
          const densityValue =
            keywords.length === 1
              ? density
              : this.calculateDensity(parseInt(count), this.totalCount);
          keywordData.push({
            key: keywords.join(" - "),
            keyword: keywords.join(" - "),
            count: parseInt(count),
            density: densityValue,
          });
        }
      }

      this.dataSource = keywordData;
    },
    getRowClassName(_, index) {
      //I didn't use record so I add _ as placeholder because there is no specific data that I want to keep
      return index % 2 === 0 ? "default-row" : "gray-row";
    },
    copyToClipboard() {
      const csvData =
        "Keywords,Count,Density\n" +
        this.dataSource
          .map((row) => {
            const keywords = row.key.split(", ").join(" - ");
            return `${keywords},${row.count},${row.density}`;
          })
          .join("\n");
      navigator.clipboard.writeText(csvData);
    },
  },
};
</script>

<style scoped>
:deep .ant-table-thead > tr > th {
  @apply bg-blue-700 text-white;
}
:deep .ant-btn-primary {
  @apply bg-blue-700 border-blue-700 md:absolute md:bottom-4;
}
:deep .default-row {
  @apply bg-white;
}

:deep .gray-row {
  @apply bg-gray-100;
}

.ma-table {
  @apply absolute top-72 -left-full lg:w-11/12 sm:top-0 md:absolute md:w-9/12 md:left-14 sm:absolute sm:w-7/12 sm:left-16;
}
</style>
