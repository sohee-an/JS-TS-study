import { resolve } from "path";

/**
 * 1 순차적으로 데이터 가져오기:
 */
async function api() {
  const data1 = await fetch("/api/data1").then((response) => response.json());
  const data2 = await fetch("/api/data2").then((response) => response.json());

  console.log("data", data1, data2);
}

/**
 * 2. 동시에 가져오기
 *
 */
async function api2() {
  //순차적으로 가져오기임
  //   const data1 = await fetch("/api/data1").then((response) => response.json());
  //   const data2 = await fetch("/api/data2").then((response) => response.json());
  //   const data3 = await fetch("/api/data3").then((response) => response.json());
  const [data1, data2, data3] = await Promise.all([
    fetch("/api/data1").then((response) => response.json()),
    fetch("/api/data2").then((response) => response.json()),
    fetch("/api/data3").then((response) => response.json()),
  ]);
  const dataArr = [...data1, ...data2, ...data3];
  console.log("data", dataArr);
}

/**
 * 3 비동기 함수 구현하기:
 * @returns
 */
function asyncTask() {
  return new Promise((resolve) => {
    const now = new Date();
    console.log("현재시간:", now);
    setTimeout(() => {
      resolve("Task completed");
    }, Math.random() * (5000 - 1000) + 1000);
  });
}

// async/await으로 호출
(async () => {
  const result = await asyncTask();
  console.log(result); // "Task completed"
})();

/**
 * 4.비동기 함수의 오류 처리
 * @returns
 */
function asyncError() {
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.5) {
      reject(new Error("Error occurred"));
    } else {
      resolve("Success");
    }
  });
}

(async () => {
  try {
    const result = await asyncError();
    console.log("No error");
  } catch (error) {
    console.log("Error handled");
  }
})();

function asyncTimeout(timeout) {
  return new Promise((resolve, reject) => {
    // 실제 작업 시뮬레이션 (1-5초)
    const workTime = Math.random() * (5000 - 1000) + 1000;

    // 작업 완료 타이머
    const workTimer = setTimeout(() => {
      resolve("Completed");
    }, workTime);

    // 타임아웃 타이머
    const timeoutTimer = setTimeout(() => {
      clearTimeout(workTimer); // 작업 타이머 취소
      reject("Timeout");
    }, timeout);
  });
}

// 사용
(async () => {
  try {
    const result = await asyncTimeout(3000); // 3초 타임아웃
    console.log(result); // "Completed" 또는 에러 발생
  } catch (error) {
    console.log(error); // "Timeout"
  }
})();
