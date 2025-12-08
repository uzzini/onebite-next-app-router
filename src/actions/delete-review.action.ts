"use server"; // 서버 액션 설정

import { revalidateTag } from "next/cache";

// 리뷰 삭제 기능
export async function deleteReviewAction(
  _: any,
  formData: FormData
) {
  // FormDataEntryValue : string or File
  const reviewId = formData.get("reviewId")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: "삭제할 리뷰가 없습니다."
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: "DELETE"
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`review-${bookId}`); // 리뷰 재검증
    
    return {
      status: true,
      error: ""
    };
  } catch(err) {
    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다: ${err}`
    };
  }
}