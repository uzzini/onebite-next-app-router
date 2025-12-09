import { Suspense } from "react";
import style from "./page.module.css";
import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Metadata } from "next";

// 라우트 세그먼트 옵션
// dynamic : 특정 페이지의 유형을 강제로 Static 또는 Dynamic 페이지로 설정
// 1. auto : 아무것도 강제하지 않음, 생략 가능 ( default )
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 Static 페이지로 설정
// 4. error : 페이지를 강제로 Static 페이지로 설정 ( Static 페이지로 설정하면 안 되는 이유가 존재한다면 빌드 오류 발생 )
// export const dynamic = "auto";

async function AllBooks() {
  await delay(1500); // 1.5초 딜레이
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" } // 풀 라우트 캐시를 위한 데이터 캐시 설정
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  await delay(3000); // 3초 딜레이
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } } // 데이터 캐시 옵션
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// Dynamic 페이지로 설정 ( 스트리밍 동작 과정 확인하기 위함 )
export const dynamic = "force-dynamic";

// 메타 데이터 설정
export const metadata: Metadata = {
  title: "한입북스",
  description: "한입북스에 등록된 도서들을 만나보세요.",
  openGraph: {
    title: "한입북스",
    description: "한입북스에 등록된 도서들을 만나보세요.",
    images: ["/thumbnail.png"]
  }
};

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={10} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
