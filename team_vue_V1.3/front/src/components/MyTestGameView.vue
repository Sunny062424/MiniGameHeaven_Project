<template>
    <div id="sudoku_div">
        <Sudoku
            v-if="start"
            :diff="diff"
            :showDetails="showDetails"
            @sendtimer="sendtimerz"
            @reset="getout"
        />
        <div v-else class='setup'>
            <h1>SUDOKU</h1>
            <div>
                난이도 선택
            </div>
            <input 
                type="range"
                min="1"
                max="10"
                v-model.number="diff"
            />
            <div>난이도 : {{ diff }}</div>
            <button @click="start=true" class="start">
                게임 시작하기
            </button>
        </div>
    </div>
</template>

<script>
    import Sudoku from "./Sudoku.vue";

    export default {
        name:"MyTestGameView",
        data() {
            return {
                diff : 5,
                start:false,
                showDetails:true,
                
            };
        },
        components:{
            Sudoku,
        },
        methods:{
            getout(){
                this.start = false
                this.$emit('endsudokus')
            },
            sendtimerz(timer){
                
                //console.log('time:'+timer)
                this.$emit('inputdata', timer)
            }
        },
    };
</script>
<style>
body,html{
    margin: 0;
}
#sudoku_div,
.setup {
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "SpecialElite";
}

#sudoku_div {
	height: 100vh;
	background: #f8f9fa;
	color: #23272b;
	transition: background 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.setup{
    flex-direction: column;
}
.start{
    font-size: 1.25em;
	color: #f8f9fa;
	background-color: green;
	border-color: #007bff;
	cursor: pointer;
	border: 1px solid;
	border-color: transparent;
	border-radius: 5px;
	padding: 0.5em;
	margin: 0.5em;
}
.ending{
    font-size: 1.25em;
	color: #f8f9fa;
	background-color: violet;
	border-color: #007bff;
	cursor: pointer;
	border: 1px solid;
	border-color: transparent;
	border-radius: 5px;
	padding: 0.5em;
	margin: 0.5em;
}
button:hover {
	color: #f8f9fa;
	background-color: #0069d9;
	border-color: #0062cc;
}

</style>