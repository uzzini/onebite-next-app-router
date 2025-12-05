import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      {/* 클라이언트 라우터 캐시가 동작하는 걸 확인하기 위한 div */}
      <div>{new Date().toLocaleString()}</div>
      {/* 클라이언트 컴포넌트(Searchbar) 사전 렌더링에서 제외 */}
      <Suspense fallback={<div>Loading ...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
