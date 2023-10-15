// 읽기와 쓰기를 동시에 수행하는 함수는 값을 변경하고 리턴함
// 해당 함수를 카피-온-라이트 방식으로 바꾸는 방법
// 1. 함수를 읽기와 쓰기로 분리하기
// 2. 값을 두 개 반환하는 함수로 만들기

// 예: shift 메서드
// 1. 읽기와 쓰기로 분리하기
// 읽기: 배열의 첫 번째 항목을 반환
export const firstElement = <T>(array: T[]) => array[0];
// 쓰기: 첫 번째 항목을 제거한 배열을 반환
export const dropFirst = <T>(array: T[]) => [...array].shift();

// 2. 값을 두 개 반환하는 함수로 만들기
export const shift = <T>(array: T[]) => {
  const arrayCopy = [...array];
  const first = arrayCopy.shift();
  return {
    first,
    array: arrayCopy,
  };
};

// 예: pop 메서드
// 1. 읽기와 쓰기로 분리하기
export const lastElement = <T>(array: T[]) => array[array.length - 1];
export const dropLast = <T>(array: T[]) => [...array].pop();
// 2. 값을 두 개 반환하는 함수로 만들기
export const pop = <T>(array: T[]) => {
  const arrayCopy = [...array];
  const last = arrayCopy.pop();
  return {
    last,
    array: arrayCopy,
  };
};

// 예: push 메서드
export const push = <T>(array: T[], elem: T) => [...array, elem];
