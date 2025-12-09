"use server"; // 서버 액션 설정

import { revalidateTag } from "next/cache";

// 리뷰 추가 기능
export async function createReviewAction(
  _: any,
  formData: FormData
) {
  // FormDataEntryValue : string or File
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요."
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author})
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`review-${bookId}`, {}); // 리뷰 재검증

    return {
      status: true,
      error: ""
    }
  } catch(err) {
    return {
      status: false,
      error: `리뷰 작성에 실패했습니다: ${err}`
    };
  }
}