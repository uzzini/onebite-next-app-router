// 데이터 불러오는 과정을 강제로 지연시키기 위한 함수 ( 스트리밍 동작 과정 확인하기 위함 )
export async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms)
  });
}