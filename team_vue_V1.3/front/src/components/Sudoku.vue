<template>
    <div class='sudoku'>
        <div class="top_btns">
            <button class="reset_btn" @click="checkreset()">되돌아가기</button>
        </div>
        <div class='header' v-show='showDetails'>
            <timer
                :startMin='minutes'
                :startSec='seconds'
                ref='Timer'
            />
            <div>난이도 : {{diff}}</div>
            <div class='mistakes'>틀린횟수 : {{mistakes}}</div>
        </div>
        <div class='grids'>
            <div class='rows' v-for='(row, rowIndex) in sudoku' :key='rowIndex' >
                <div
                    class='cell'
                    v-for='(cell, colIndex) in row'
                    :key='colIndex'
                    :class='getClass(cell, rowIndex, colIndex)'
                    @mouseup='handleSelect(rowIndex, colIndex, $event)'
                    @keydown.prevent='typeDigit'
                    tabindex="0"
                >
                    {{cell}}
                </div>
            </div>
        </div>

        <div
            class='digits'
            v-show='showDetails'
        >
            <button
                class="choise_num_btn"
                v-for='n in 9'
                :key='n'
                @click="insertDigit(n)">
                {{n}}
            </button>
            <button 
                class="delete_num_btn"
                @click="deleteDigit()">숫자지우기
            </button>
        </div>
        <div class='solution'>
            <h2>Solution</h2>
            <div class='grid'>
                <div
                    class='row'
                    v-for='(row, rowIndex) in solution'
                    :key='rowIndex'
                >
                    <div
                        class='cell'
                        v-for='(cell, colIndex) in row'
                        :key='colIndex'
                    >
                        {{cell}}
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Timer from "./Timer.vue";
import axios from 'axios';

let newSudoku = [[], [], [], [], [], [], [], [], []];
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const cornerSquares = [
	{
		rowStart: 0,
		colStart: 0,
	},
	{
		rowStart: 0,
		colStart: 6,
	},
	{
		rowStart: 6,
		colStart: 6,
	},
	{
		rowStart: 6,
		colStart: 0,
	},
];

const innerSquares = [
	{
		rowStart: 0,
		colStart: 3,
	},
	{
		rowStart: 3,
		colStart: 0,
	},
	{
		rowStart: 6,
		colStart: 3,
	},
	{
		rowStart: 3,
		colStart: 6,
	},
	{
		rowStart: 3,
		colStart: 3,
	},
];

export default {
	name: "Sudoku",
	data() {
		return {
			sudoku: [],
			solution: [],
			saver: [],
			rowSelected: null,
			colSelected: null,
			seconds: 0,
			minutes: 0,
			mistakes: 0,
			// difficulty: null,
		};
	},

	components: {
		Timer,
	},

	props: {
		diff: Number,
		showDetails: Boolean,
	},

	methods: {
		handleSelect(rowIndex, colIndex) {
			this.rowSelected = rowIndex;
			this.colSelected = colIndex;
		},

		insertDigit(digit) {
            if( this.saver[this.rowSelected][this.colSelected] != ''){
				alert('해당 값을 변경 할 수 없습니다.')
				return
			}
			if (
				digit !== this.solution[this.rowSelected][this.colSelected] &&
				digit !== ""
			) {
				this.mistakes++;
			}
			this.sudoku[this.rowSelected].splice(this.colSelected, 1, digit);
			let checkedEnding = this.checkPointisEnd();
			let sysoutTime = this.$refs.Timer.sysout();
				//this.$refs.Timer.timer_stop();
				//sendtodb(sysoutTime);
				//alert('성공! 축하합니다.\n클리어 기록 : '+sysoutTime)
				//this.$emit('sendtimer', sysoutTime)
				//console.log('sendtime');
				//this.$emit('reset')
				//console.log('reset')
			if(checkedEnding){
				let sysoutTime = this.$refs.Timer.sysout();
				this.$refs.Timer.timer_stop();
				//sendtodb(sysoutTime);
				alert('성공! 축하합니다.\n클리어 기록 : '+sysoutTime)
				this.$emit('sendtimer', sysoutTime)
				//console.log('sendtime');
				this.$emit('reset')
				//console.log('reset')
			}
		},

        deleteDigit(){
			if( this.saver[this.rowSelected][this.colSelected] != ''){
				alert('해당 값을 변경 할 수 없습니다.')
				return
			}
            this.sudoku[this.rowSelected].splice(this.colSelected, 1, "");
        },

		typeDigit(event) {
			const key = event.key,
				digit = parseInt(key);

			if (!isNaN(digit) && digit !== 0) {
				this.insertDigit(digit);
			}

			if (key === "Delete" || key === "Backspace") {
				this.insertDigit("");
			}
		},

		getClass(cell, rowIndex, colIndex) {
			if (this.showDetails === false) {
                //showDetails = true;
				return "";
			}
			if (cell !== this.solution[rowIndex][colIndex] && cell !== "") {
				return "invalid";
			}

			const row = this.sudoku[rowIndex],
				col = this.getCol(colIndex, this.sudoku),
				square = this.getSquare(rowIndex, colIndex, this.sudoku),
				rowFilled = this.checkFilled(row),
				colFilled = this.checkFilled(col),
				squareFilled = this.checkFilled(square);

			if (rowFilled || colFilled || squareFilled) {
				if (this.rowSelected === rowIndex || this.colSelected === colIndex) {
					return "completeHighlight";
				}
				return "complete";
			}

			if (this.rowSelected === rowIndex || this.colSelected === colIndex) {
				if (this.rowSelected === rowIndex && this.colSelected === colIndex) {
					return "";
				}
				return "highlight";
			}
			// if (cell === "") {
			// 	return "";
			// }
		},

		checkFilled(array) {
			const filtered = array.filter((cell) => cell !== "");
			return new Set(filtered).size === 9;
		},

		randomArrayVal(array) {
			const randomIndex = Math.floor(Math.random() * array.length);
			return array[randomIndex];
		},

		getCol(col, sudoku) {
			return sudoku.map((row) => row[col]);
		},

		selectDigit(row, col, squareArray) {
			const rowArray = newSudoku[row],
				colArray = this.getCol(col, newSudoku),
				// squareArray = this.getSquare(row, col),
				arrayMatrix = rowArray.concat(colArray).concat(squareArray),
				potentialDigits = digits.filter(
					(digit) => !arrayMatrix.includes(digit)
				);

			return this.randomArrayVal(potentialDigits);
		},

		getSquare(row, col, sudoku) {
			const rowStart = Math.floor(row / 3) * 3,
				rowEnd = rowStart + 3,
				colStart = Math.floor(col / 3) * 3,
				colEnd = colStart + 3,
				squareRows = sudoku.slice(rowStart, rowEnd),
				squareCols = squareRows.map((sR) => {
					return sR.slice(colStart, colEnd);
				}),
				squareArray = squareCols.flat();

			return squareArray;
		},

		resetCell() {
			return "-";
		},

		fillSquare({ rowStart, colStart }, callback) {
			let squareArray = [];

			for (let row = rowStart; row < rowStart + 3; row++) {
				for (let col = colStart; col < colStart + 3; col++) {
					const digit = callback(row, col, squareArray);
					if (digit === undefined) {
						return true;
					}
					squareArray.push(digit);
					newSudoku[row][col] = digit;
				}
			}
		},

		fillSection(section) {
			section.forEach((square) => this.fillSquare(square, this.resetCell));

			for (const square of section) {
				const breakCheck = this.fillSquare(square, this.selectDigit);
				if (breakCheck === true) {
					this.fillSection(section);
					return;
				}
			}
		},

		makeSudoku() {
			this.fillSection(cornerSquares);
			this.fillSection(innerSquares);

			this.sudoku = newSudoku.map((row) => {
				return row.map((col) => {
					if (Math.round(Math.random() * 10) <= this.diff) {
						col = "";
					}
					return col;
				});
			});

			this.solution = newSudoku;
			
			if( this.saver.length == 0){
				//배열 깊은 복사 (공유 안함)
				this.saver = this.sudoku.map( v => [...v]);
			}
			// this.difficulty = this.diff.toFixed(2);
		},
        checkreset(){
            let checked = confirm('메뉴 화면으로 돌아가시겠습니까?')
            if(checked){
                this.$emit('reset');
            }
        },

		checkPointisEnd() {
			for(let i = 0; i < this.sudoku.length; i++){
				for(let j = 0; j < this.sudoku[i].length; j++){
					if( this.sudoku[i][j] === ''){
						return false;
					}
				}
			}
			return true;
		}

	},

	mounted() {
        this.makeSudoku();
		setInterval(this.tick, 1000);
	},
};

// function sendtodb(timer){
// 	//let nickname = localStorage.getItem('nickname');
// 	let nickname = state.account.nickname
// 	let url = '/testa'
// 	axios({
// 		url:url,
// 		method:"PUT",
// 		data:{
// 			nickname:nickname,
// 			timer:timer
// 		}
// 	}).then( (res) => {
// 		console.log(res)
// 	})
// }
</script>

<style>
.sudoku {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.grids {
	border-top: 2px solid #1d2124;
	border-left: 2px solid #1d2124;
}

.header {
	font-weight: bold;
	display: flex;
	justify-content: space-around;
	width: 100%;
	margin-bottom: 1em;
}

.rows,
.digits {
	display: flex;
}

.digits button {
	font-size: 1.5em;
	margin: 0.2em;
}

.rows {
	border-bottom: 1px solid #1d2124;
	/* width: 100%; */
}

.rows:nth-child(3n) {
	border-bottom: 2px solid #1d2124;
}

.cell {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 3em;
	height: 3em;
	/* padding: 1em; */
	border-right: 1px solid #1d2124;
	color: #1d2124;
	background: #f8f9fa;
}

.cell.complete {
	color: #f8f9fa;
	background: #28a745;
	/* border: 1px solid transparent; */
}

.cell.highlight {
	/* color: #f8f9fa; */
	background: #fae5a2;
}

.cell.completeHighlight {
	background-color: #99eead;
}

.cell.invalid {
	color: white;
	background: #dc3545;
	/* border: 1px solid coral; */
}

.cell:nth-child(3n) {
	border-right: 2px solid #1d2124;
}

.solution {
	page-break-before: always;
	display: none;
}
.top_btns{
    text-align: center;
    margin-bottom: 10px;
}
.reset_btn{
    font-size: larger;
    background-color: yellowgreen;
    border-color: #007bff;
    border: 1px solid;
    border-color: transparent;
    border-radius: 5px;
    padding: 0.2em;
    margin: 0.2em;
    margin-right: 60px;
}
.exit_btn{
    font-size: larger;
    background-color: red;
    border-color: #007bff;
    border: 1px solid;
    border-color: transparent;
    border-radius: 5px;
    padding: 0.2em;
    margin: 0.2em;
}

.choise_num_btn{
    font-size: 1.25em;
	color: #f8f9fa;
	background-color:blueviolet;
	border-color: #007bff;
	cursor: pointer;
	border: 1px solid;
	border-color: transparent;
	border-radius: 5px;
	padding: 0.5em;
	margin: 0.5em;
}
.delete_num_btn{
    font-size: 1.25em;
	color: #f8f9fa;
	background-color:violet;
	border-color: #007bff;
	cursor: pointer;
	border: 1px solid;
	border-color: transparent;
	border-radius: 5px;
	padding: 0.5em;
	margin: 0.5em;
}
</style>