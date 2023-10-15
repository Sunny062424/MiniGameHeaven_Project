
export async function getData(url) {
    return await new Promise((resolve, reject) => {
        try {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    
                    const newData = data.map((row) => {
                        return {                       
                          displayName: row.nickname, // user 값을 displayName에 할당
                          picture: 'https://avatars.githubusercontent.com/u/8406577?v=4', // 고정된 URL
                          score: row.timescore,
                        };
                      });
                      
                    resolve(newData);
                });
        } catch (error) {
            console.log("Fetch error", error);
            reject();
        }
    });
}



/**
 * Change Scores of every streamer (Random)
 * 
 * @param Array  arr
 * @param Number refreshTime
 */

export async function bubbleSort(arr) {
    let tmp;
    return await new Promise((resolve) => {
        for (let i = arr.length - 1; i >= 0; i--) {
            for (let j = i - 1; j >= 0; j--) {
                if (arr[i].score > arr[j].score) {
                    tmp = arr[j];
                    arr[j] = arr[i];
                    arr[i] = tmp;
                }
            }
        }
        resolve(arr);
    });
}


export async function sortTime(arr) {
  let tmp;
  return await new Promise((resolve) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (compareTime(arr[j].score, arr[j + 1].score) < 0) {
          tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
        }
      }
    }
    resolve(arr);
  });
}

// Compare two time strings in "mm:ss" format
function compareTime(timeA, timeB) {
  const [minutesA, secondsA] = timeA.split(':').map(Number);
  const [minutesB, secondsB] = timeB.split(':').map(Number);

  if (minutesA === minutesB) {
    if (secondsA === secondsB) {
      return 0; // 같을 경우
    } else if (secondsA > secondsB) {
      return -1; // 초가 큰 경우
    } else {
      return 1; // 초가 작은 경우
    }
  } else if (minutesA > minutesB) {
    return -1; // 분이 큰 경우
  } else {
    return 1; // 분이 작은 경우
  }
}
