<template>
  <div class="app">
    <div v-if="state.account.nickname" id="iyyoo_logined">
      <p>환영합니다! {{ state.account.nickname }}님</p>
      <!-- <button @click="logout()">로그아웃</button> -->
      <!-- <button @click="sudokustart=true;">스도쿠 게임하기</button>
      <button @click="snakestart=true;">스네이크 게임하기</button>
      <button @click="rank=true;">랭킹보기</button> -->
      <div id="menu_bar">
        <button class="w-btn w-btn-indigo" type="button" @click="logout()">로그아웃</button>
      <button class="w-btn w-btn-indigo" type="button" @click="startSudokuGame">스도쿠 게임하기</button>
      <button class="w-btn w-btn-indigo" type="button" @click="startSnakeGame">스네이크 게임하기</button>
      <button class="w-btn w-btn-indigo" type="button" @click="viewRank">랭킹보기</button>
      <button class="w-btn w-btn-indigo" type="button" @click="viewChat">채팅보기</button>
      </div>
      <MyTestGameView 
        v-if="sudokustart"
        @inputdata="sendsudoku"
        @endsudokus="sudokustart=false;"
      />
      <Ranking v-if="rank" />
      <Chatting v-if="chat"/>
    </div>
    <div v-if="state.account.nickname" class="my_chat">
      <footer>
        
      </footer>
    </div>


    <div v-else id="iyyoo_login">
    <label for="nickname">
        <h2>
          <span class="entypo-login">
            <i class="fa fa-sign-in">
            </i>
          </span> 
          Login
        </h2>
        <button @click="submit()">
          <span class="entypo-lock">
            <i class="fa fa-lock">
            </i>
          </span>
        </button>
        <span class="entypo-user inputUserIcon">
          <i class="fa fa-user"></i>
        </span>
        <input type="text" class="user" id="nickname" v-model="state.form.nickname" placeholder="username"/>
    </label>
   
  
  </div>
 <!-- snake -->

 <v-button
      v-if="snakestarted" 
      @click="openPopup"
      title="How to play"
      class="button"
    />
    <v-button
      v-if="snakestarted"
      @click="onStartGame(gameRuleWithoutBorders)"
      title="Play without borders"
      class="button button-play"
    />
    <v-button
      v-if="snakestarted"
      @click="onStartGame(gameRuleWithBorders)"
      title="Play with borders"
      class="button button-play"
    />
    <v-button
      v-if="snakestarted"
      @click="onStopGame"
      :style="{
        marginBottom: '20px',
      }"
      title="Stop"
    />
    <v-how-to-play-popup v-if="isShowingHowToPlayPopup" @closed="closePopup" />
    <v-playground :score="score" v-if="snakestarted" />
 
    <!-- <VGrid v-bind:childVaule=snakestarted /> -->

<!-- snake end-->
  
  </div>
</template>

<!--  lang="ts" 추가 snake -->
<script  lang="ts">
import { inject } from "vue";
import { reactive } from "vue";
import MyTestGameView from "./components/MyTestGameView.vue"
import Chatting from './components/Chat.vue'
import Ranking from './components/Ranking.vue'

// snake
import {
  computed,
  onMounted,
  onBeforeUnmount,
  type ComputedRef,
  ref,
} from "vue";
import { useStore } from "vuex";
import { areSameCoordinates, isSnake } from "./components/utils/index";
import { Direction, GameRule } from "./components/store/enums";
import type { ICoordinate, ISnack, ISnake } from "./components/store/interfaces";
import axios from 'axios';

// Components
import VButton from "./components/Button.vue";
import VHowToPlayPopup from "./components/HowToPlayPopup.vue";
import VGrid from "./components/Grid.vue";
import VPlayground from "./components/Playground.vue";
import VSocialLinks from "./components/SocialLinks.vue";
import Playground from "./components/Playground.vue";

const GRID_SIZE = 35;
const DIRECTION_TICKS_WITHOUT_BORDERS = {
  UP: (x: number, y: number) => ({ x, y: y <= 0 ? GRID_SIZE - 1 : y - 1 }),
  DOWN: (x: number, y: number) => ({ x, y: y >= GRID_SIZE - 1 ? 0 : y + 1 }),
  RIGHT: (x: number, y: number) => ({ x: x >= GRID_SIZE - 1 ? 0 : x + 1, y }),
  LEFT: (x: number, y: number) => ({ x: x <= 0 ? GRID_SIZE - 1 : x - 1, y }),
};
const DIRECTION_TICKS_WITH_BORDERS = {
  UP: (x: number, y: number) => ({ x, y: y - 1 }),
  DOWN: (x: number, y: number) => ({ x, y: y + 1 }),
  RIGHT: (x: number, y: number) => ({ x: x + 1, y }),
  LEFT: (x: number, y: number) => ({ x: x - 1, y }),
};
const KEY_CODES_MAPPER = {
  38: Direction.UP, // ARROW_UP Key
  87: Direction.UP, // W Key

  39: Direction.RIGHT, // ARROW_RIGHT Key
  68: Direction.RIGHT, // D Key

  37: Direction.LEFT, // ARROW_LEFT Key
  65: Direction.LEFT, // A Key

  40: Direction.DOWN, // ARROW_DOWN Key
  83: Direction.DOWN, // S Key
};

// snake end

export default {
  name:"App",
  components:{
    MyTestGameView,
    Chatting,
    Ranking,
    VButton,
    VHowToPlayPopup,
    VGrid,
    VPlayground,
    VSocialLinks,
    Playground
},
  methods:{
    sendsudoku(timer){
      let nickname = this.state.account.nickname
      let url = 'http://localhost:3001/inputsudokuscore'
      // axios({
      //   url:url,
      //   method:"PUT",
      //   data:{
      //     nickname:nickname,
      //     timer:timer
      //   }
      // })
      axios
    .put(url, {
          nickname:nickname,
          timer:timer
        })
      .then( (res) => {
        console.log(res)
        if(res == null){
          alert('Sorry. 서버에 에러가 있습니다')
          return
        }else if(res.data === 'err'){
          alert('에러. 입력이 불가능합니다')
          return
        }
      })
    },startSudokuGame() {
      
      this.sudokustart = true;
      this.snakestarted = false;
       this.rank = false;
       this.chat = false;
       console.log(this.rank);
       console.log(this.snakestarted);
       console.log(this.sudokustart);
     },
     startSnakeGame() {
       
       this.snakestarted = true;
      this.sudokustart = false;
      this.rank = false;
       this.chat = false;
       console.log(this.rank);
       console.log(this.snakestarted);
       console.log(this.sudokustart);
     },
     viewRank() {
       this.rank = true;
      this.sudokustart = false;
      this.snakestarted = false;
      this.chat = false;       
       console.log(this.rank);
       console.log(this.snakestarted);
       console.log(this.sudokustart);
     }, 
     viewChat() {
       this.chat = true;
      this.sudokustart = false;
      this.snakestarted = false;
      this.rank = false;       
       console.log(this.rank);
       console.log(this.snakestarted);
       console.log(this.sudokustart);
     }, 
  },
  data(){
    return {
      sudokustart:false,
      snakestarted:false,
      rank:false,
      chat:false,
    }
  },
  setup() {
    // snake
    let nicknamesnake =''; 
    const store = useStore();

    // snake end
    // const axios = inject('$axios');
    // const state = reactive({ account: { nickname: '' } }); 
    const state = reactive({
      account: {
        id: "",
        nickname: "",
      },
      form: {
        nickname: "",
      },
    });
// snake
const gameRuleWithoutBorders: ComputedRef<GameRule> = computed(
      () => GameRule.WITHOUT_BORDERS
    );
    const gameRuleWithBorders: ComputedRef<GameRule> = computed(
      () => GameRule.WITH_BORDERS
    );
    const version: ComputedRef<string> = computed(
      () => store.getters.appVersion
    );
    const snakestart: ComputedRef<boolean> = computed(
      () => store.state.snakestart
    );
    const currentDirection: ComputedRef<string> = computed(
      () => store.state.playground.direction
    );
    const snack: ComputedRef<ISnack> = computed(() => store.state.snack);
    const snake: ComputedRef<ISnake> = computed(() => store.state.snake);
    const snakeHead: ComputedRef<ICoordinate> = computed(
      () => store.state.snake.coordinates[0]
    );
    const snakeTail: ComputedRef<ICoordinate[]> = computed(() =>
      store.state.snake.coordinates.slice(1)
    );
    const score: ComputedRef<number> = computed(
      () => store.state.snake?.coordinates?.length - 1
    );
    const tickRate: ComputedRef<number> = computed(() => store.state.tickRate);
    const isShowingHowToPlayPopup = ref<boolean>(false);


    // Interval variable (It will only run once)
    let interval = setInterval(() => {
      clearInterval(interval);
    }, 1);

    // Generate an empty grid to be displayed at the startup
    generateGrid();

    function getRandomNumber(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getRandomCoordinate() {
      return {
        y: getRandomNumber(1, GRID_SIZE - 1),
        x: getRandomNumber(1, GRID_SIZE - 1),
      };
    }

    function getRandomSnackCoordinate() {
      let newCoordinate = getRandomCoordinate();

      if (
        snake.value.coordinates.find((snakeCellCoordinate) =>
          areSameCoordinates(snakeCellCoordinate, newCoordinate)
        )
      )
        newCoordinate = getRandomSnackCoordinate();

      return newCoordinate;
    }

    function getSnakeTail() {
      return snake.value.coordinates.slice(
        0,
        snake.value.coordinates.length - 1
      );
    }

    function generateGrid() {
      const grid: number[] = [];

      for (let i: number = 0; i < GRID_SIZE; i++) {
        grid.push(i);
      }

      store.commit("SET_GRID", grid);
    }

    function generateSnake() {
      const snake = {
        coordinates: [
          { x: Math.ceil(GRID_SIZE / 2), y: Math.ceil(GRID_SIZE / 2) },
        ],
      };

      store.commit("SET_SNAKE", snake);
    }

    function generateSnack() {
      const snack = {
        coordinate: getRandomSnackCoordinate(),
      };

      store.commit("SET_SNACK", snack);
    }

    function generateInitials() {
      resetGame();
      generateGrid();
      generateSnake();
      generateSnack();
    }

    function resetGame() {
      store.commit("RESET_GAME");
    }

    function snakeHeadTouchesTail() {
      return isSnake(snakeTail.value, snakeHead.value.x, snakeHead.value.y);
    }

    function isSnakeEating() {
      return areSameCoordinates(snakeHead.value, snack.value.coordinate);
    }

    function isSnakeOutside() {
      return (
        snakeHead.value.x >= GRID_SIZE ||
        snakeHead.value.y >= GRID_SIZE ||
        snakeHead.value.x < 0 ||
        snakeHead.value.y < 0
      );
    }

    function onChangeDirection(e: any) {
      const newDirection = KEY_CODES_MAPPER[e.keyCode];

      // Prevent scrolling if the user pushed an arrow key for navigating the snake
      if (newDirection) e.preventDefault();
      if (!newDirection || newDirection === currentDirection.value) {
        return;
      }

      store.commit("SNAKE_CHANGE_DIRECTION", newDirection);
    }

    function onTick(gameRule: GameRule) {
      if (
        snakeHeadTouchesTail() ||
        (gameRule === GameRule.WITH_BORDERS && isSnakeOutside())
      ) {
        store.commit("GAME_OVER");
        onStopGame();
      } else {
        store.commit("SNAKE_MOVE", {
          isSnakeEating: isSnakeEating(),
          directionTicks:
            gameRule === GameRule.WITHOUT_BORDERS
              ? DIRECTION_TICKS_WITHOUT_BORDERS
              : DIRECTION_TICKS_WITH_BORDERS,
          snakeHead: snakeHead.value,
          snakeTail: getSnakeTail(),
          snackRandomCoordinate: getRandomSnackCoordinate(),
        });
      }
    }

    function openPopup() {
      if (!isShowingHowToPlayPopup.value) isShowingHowToPlayPopup.value = true;
    }

    function closePopup() {
      if (isShowingHowToPlayPopup.value) isShowingHowToPlayPopup.value = false;
    }

    function onStartGame(gameRule: GameRule) {
      onStopGame();
      generateInitials();
      store.commit("IS_PLAYING", true);

      interval = setInterval(() => {
        onTick(gameRule);
      }, tickRate.value);
    }

    function onStopGame() {
      clearInterval(interval);
      store.commit("IS_PLAYING", false);    
     
            const endScore = score["_value"]; //마지막 점수

      console.log(endScore);  
      var url = window.location.href; //현주소 추출
      // nicknamesnake = decodeURI(url.replace(/.*\=/, "")); //닉네임
      nicknamesnake=state.form.nickname//닉네임
      console.log(nicknamesnake);

      let data = {
      "nickname": nicknamesnake,
      "score": endScore,
    };
    const data2 = JSON.parse(JSON.stringify(data))
console.log(data);
console.log(data2);



  // const config = {
  // headers: {
  //   'Content-Type': 'application/json',
  //   'dataType'    :   "json",
  //     'type': "POST",
  // }};
  axios.post("http://localhost:3001/sendScore", data2)
      .then((response) => {
        console.log(response.data);
      })
  .catch((error) => {
    console.error(error)
  });


  // const url = 'http://localhost:3001/inputSnakeScore';

  //   axios.post("http://localhost:3000/api/inputSnakeScore", data)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  // .catch((error) => {
  //   console.error(error);
  // });



// axios.post(url, data, config)
//   .then((res) => {
//     console.log(res);
//     if (res.data === 'err') {
//       alert('에러. 입력이 불가능합니다');
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//     alert('Sorry. 서버에 에러가 있습니다');
//   });

    }

    onMounted(() => {
      window.addEventListener("keydown", onChangeDirection);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", onChangeDirection);
      clearInterval(interval);
    });
    // snake end



    const submit = () => {
      const args = {
        nickname: state.form.nickname,
      };
      axios
        .post("http://localhost:3001/api/account", args)
        .then((res) => {
          alert("로그인에 성공했습니다.");
          state.account.nickname = res.data;
          
        })
        .catch(() => {
          console.log(args);
          alert("로그인에 실패했습니다. 계정 정보를 확인해주세요.");
        });
    };

    const logout = () => {
      axios.delete("http://localhost:3001/api/account").then(() => {
        alert("로그아웃하였습니다.");
        state.account.nickname = "";
        state.form.nickname = '';
        location.reload();
      });
    };

    return { state, 
      submit, logout,
    // snake
    version,
      gameRuleWithoutBorders,
      gameRuleWithBorders,
      snakestart,
      score,
      isShowingHowToPlayPopup,
      openPopup,
      closePopup,
      onStartGame,
      onStopGame,
      nicknamesnake,
      // snake end
    };
  },
};
</script>

<style>
@import url(http://weloveiconfonts.com/api/?family=entypo);
@import url(https://fonts.googleapis.com/css?family=Roboto);
@import url("https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap");
/* zocial */
[class*="entypo-"]:before {
  font-family: 'entypo', sans-serif;
}
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box; 
}

p {
  color:rgba(255,255,255,.8);
  font-weight: bold;
  margin-left:12px;
  font-size: 1.2em;
}

h2 {
  color:rgba(255,255,255,.8);
  margin-left:12px;
}

body {
  background: #29b571;
  font-family: 'Roboto', sans-serif;
  
}

#iyyoo_login {
  position:relative;
  margin: 50px auto;
  width: 380px;
  height: auto;
}

#iyyoo_login input {
  padding: 16px;
  border-radius:7px;
  border:0px;
  background: rgba(255,255,255,.2);
  display: block;
  margin: 15px;
  width: 300px;  
  color:white;
  font-size:18px;
  height: 54px;
}

#iyyoo_login input:focus {
  outline-color: rgba(0,0,0,0);
  background: rgba(255,255,255,.95);
  color: #000000;
}

#iyyoo_login button {
  float:right;
  height: 54px;
  width: 50px;
  border: 0px;
  background: #e74c3c;
  border-radius:7px;
  padding: 10px;
  color:white;
  font-size:22px;
}

#iyyoo_login .inputUserIcon {
  position:absolute;
  top:68px;
  right: 80px;
  color:rgb(0, 0, 0);
}

#iyyoo_login .inputPassIcon {
  position:absolute;
  top:136px;
  right: 80px;
  color:white;
}

#iyyoo_login input::-webkit-input-placeholder {
  color: white;
}

#iyyoo_login input:focus::-webkit-input-placeholder {
  color: #000000;
}

/* #iyyoo_logined button{
  color: #e74c3c;
} */

#iyyoo_logined button {
    margin: 20px;
}

.w-btn {
    position: relative;
    border: none;
    display: inline-block;
    padding: 15px 30px;
    border-radius: 15px;
    font-family: "paybooc-Light", sans-serif;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
}

.w-btn-indigo {
    background-color: aliceblue;
    color: #1e6b7b;
}

#menu_bar {
  text-align: center;
}
.my_chat{
  width: 50%;
  height: 200px;
}
</style>
<!-- snake  lang="postcss" scoped 추가 -->
<!-- <style >
@import url(http://weloveiconfonts.com/api/?family=entypo);
@import url(https://fonts.googleapis.com/css?family=Roboto);
@import url("https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap");
/* zocial */
[class*="entypo-"]:before {
  font-family: 'entypo', sans-serif;
}
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box; 
}

p {
  color:rgba(255,255,255,.8);
  font-weight: bold;
  margin-left:12px;
  font-size: 1.2em;
}

h2 {
  color:rgba(255,255,255,.8);
  margin-left:12px;
}

body {
  background: #29b571;
  font-family: 'Roboto', sans-serif;
  
}

#iyyoo_login {
  position:relative;
  margin: 50px auto;
  width: 380px;
  height: auto;
}

#iyyoo_login input {
  padding: 16px;
  border-radius:7px;
  border:0px;
  background: rgba(255,255,255,.2);
  display: block;
  margin: 15px;
  width: 300px;  
  color:white;
  font-size:18px;
  height: 54px;
}

#iyyoo_login input:focus {
  outline-color: rgba(0,0,0,0);
  background: rgba(255,255,255,.95);
  color: #000000;
}

#iyyoo_login button {
  float:right;
  height: 54px;
  width: 50px;
  border: 0px;
  background: #e74c3c;
  border-radius:7px;
  padding: 10px;
  color:white;
  font-size:22px;
}

#iyyoo_login .inputUserIcon {
  position:absolute;
  top:68px;
  right: 80px;
  color:rgb(0, 0, 0);
}

#iyyoo_login .inputPassIcon {
  position:absolute;
  top:136px;
  right: 80px;
  color:white;
}

#iyyoo_login input::-webkit-input-placeholder {
  color: white;
}

#iyyoo_login input:focus::-webkit-input-placeholder {
  color: #000000;
}

/* #iyyoo_logined button{
  color: #e74c3c;
} */

#iyyoo_logined button {
    margin: 20px;
}

.w-btn {
    position: relative;
    border: none;
    display: inline-block;
    padding: 15px 30px;
    border-radius: 15px;
    font-family: "paybooc-Light", sans-serif;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
}

.w-btn-indigo {
    background-color: aliceblue;
    color: #1e6b7b;
}

#menu_bar {
  text-align: center;
}
.my_chat{
  position: absolute;
  width: 50%;
  height: 200px;
  right: 0px;
  bottom: 0px;
}

.page {
  width: 100%;
  text-align: center;
}

.button {
  margin: 0 10px;
  margin-bottom: 20px;
}

.button-play {
  width: 190px;
}

.title {
  color: rgb(0, 199, 0);
  margin-left: 30px;
  letter-spacing: 30px;
  text-shadow: 1px 1px 1px darkgreen, -1px 1px 1px darkgreen,
    1px -1px 1px darkgreen, -1px -1px 1px darkgreen, 0 0 64px lightgreen,
    0 0 64px lightgreen;
  font-size: 64px;
  font-family: "Courier", monospace;
  font-weight: bold;
}

.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  color: gray;
  font-family: sans-serif;
}

.disclaimer {
  flex: 1;
  text-align: end;
}

.social-links {
  margin-bottom: 10px;
}

.source-code--link {
  background-color: gray;
  color: black !important;
  font-size: 14px;
  font-weight: 800;
  border: solid gray;
  border-top-width: 2.6px;
  border-bottom-width: 2.6px;
  border-left-width: 16.6px;
  border-right-width: 16.6px;
  border-radius: 5px;
  text-decoration: none;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif;
}

.footer {
  margin-top: 20px;
}

</style> -->