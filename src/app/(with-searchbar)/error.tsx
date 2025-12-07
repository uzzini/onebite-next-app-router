"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error, reset
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.log(error.message);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      <button onClick={() => {
        // startTransition() : 함수 하나를 인수로 받아서 해당 함수 내부의 코드를 동기적으로 실행
        startTransition(() => {
          router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트를 다시 불러옴
          reset(); // 에러 상태를 초기화, 컴포넌트를 다시 렌더링
        })
      }}>다시 시도</button>
    </div>
  );
}