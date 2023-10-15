<template>
  <div>
      <div
        v-for="(streamer, i) in state.rankingData"
        :key="streamer.userID"
        :ref="(el) => {
          state.streamerEl[streamer.userID] = el;
        }"
        class="streamer"
      >
        <div class="ranking-no">{{ i + 1 }}</div>
        <div class="picture">
          <img :src="streamer.picture" />
        </div>
        <div class="display-name">{{ streamer.displayName }}</div>
        <div class="score">{{ streamer.showScore }}</div>
      </div> 
  </div>
</template>
<script>
import { defineComponent, reactive, onBeforeUpdate } from "vue";
import { getData,  bubbleSort,  } from "../helper.js";

// Score refresh duration


export default defineComponent({
  name: "SnakeRank",
  components: {},
  setup() {
    let state = reactive({
      rankingData: [],
      streamerEl: []
    });

    onBeforeUpdate(() => {
      // If update rendering, clear all element ref.
      state.streamerEl = [];
    });

    // Get json file and update ranking data from server
    getData("http://localhost:3001/api/snake").then(
      (responseData) => {
        responseData.forEach((data) => {
          data.showScore = data.score;
        });
        state.rankingData = responseData;
        bubbleSort(state.rankingData).then((sortedData)=> {
          state.rankingData = sortedData;
        })
      }
    );

    

    return {
      state,
    };
  },
});
</script>

<style scoped>

.streamer {
  margin: 0 auto;
  width: 320px;
  height: 48px;
  transition: all 0.3s ease 0s;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.streamer .ranking-no {
  width: 30px;
  text-align: center;
}

.streamer .picture {
  width: 40px;
  text-align: center;
}

.streamer .picture img {
  margin-right: 2em;
  height: 30px;
  width: 30px;
  border-radius: 50%;
}

.streamer .display-name {
  width: 100px;
  text-align: left;
}

.streamer .score {
  width: 150px;
  text-align: right;
}
</style>