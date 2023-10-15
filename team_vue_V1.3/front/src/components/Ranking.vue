<template>
  <div class="Ranking">
    <div>
      <button class="w-btn w-btn-indigo" type="button" @click="viewSudoku">스도쿠 랭킹보기</button>
      <button class="w-btn w-btn-indigo" type="button" @click="viewSnake">스네이크 랭킹보기</button>
    </div>

    <SnakeRank v-if="snake"
    @inputdata="sendsudoku" />
    <SudokuRank v-if="sudoku" />
  </div>
</template>

<script>
import SnakeRank from './SnakeRank.vue';
import SudokuRank from './SudokuRank.vue';

export default {
  name: 'Ranking',
  components: {
    SnakeRank,
    SudokuRank
  },
  methods: {
    viewSudoku() {
      this.sudoku = true;
      this.snake = false;
    },
    viewSnake() {
      this.sudoku = false;
      this.snake = true;
    }
  },
  data() {
    return {
      sudoku: false,
      snake: false
    };
  }
};
</script>

<style>
.w-btn {
  position: relative;
  border: none;
  display: inline-block;
  padding: 15px 30px;
  border-radius: 15px;
  font-family: 'paybooc-Light', sans-serif;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
}

.w-btn-indigo {
  background-color: aliceblue;
  color: #1e6b7b;
}
</style>


