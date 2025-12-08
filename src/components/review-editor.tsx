"use client";

import { useActionState, useEffect } from "react";
import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";

// 클라이언트 컴포넌트에서의 서버 액션
export default function ReviewEditor({ bookId }: { bookId: string }) {
  // useActionState Hook을 이용해서 폼의 로딩 상태, 중복 제출 방지, 에러 핸들링 처리
  const [state, formAction, isPending] = useActionState(createReviewAction, null);
 
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="bookId" value={bookId} hidden readOnly /> {/* formData에 bookId를 포함시켜 전달하기 위함 */}
        <textarea
          required
          name="content"
          disabled={isPending}
          placeholder="리뷰 내용 작성 ..."
        />
        <div className={style.submit_container}>
          <input required name="author" disabled={isPending} placeholder="작성자" />
          <button type="submit" disabled={isPending}>
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}