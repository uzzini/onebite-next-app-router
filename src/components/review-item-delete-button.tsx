"use client";

import { useActionState, useEffect, useRef } from "react";
import { deleteReviewAction } from "@/actions/delete-review.action";

export default function ReviewItemDeleteButton({
  reviewId, bookId
}: {
  reviewId: number;
  bookId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(deleteReviewAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      {/* formData에 reviewId와 bookId를 포함시켜 전달하기 위함 */}
      <input name="reviewId" value={reviewId} hidden readOnly /> 
      <input name="bookId" value={bookId} hidden readOnly />
      {isPending ? (
        <div>...</div>
      ) : (
        // 삭제하기 div를 클릭했을 때 폼 태그가 강제로 제출되도록 설정
        <div onClick={() => formRef.current?.requestSubmit()}>
          삭제하기
        </div>
      )}
    </form>
  );
}