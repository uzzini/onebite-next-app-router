"use client";

import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import style from "./modal.module.css";

export default function Modal({children}: {children: ReactNode}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if(!dialogRef.current?.open) {
      // 모달 컴포넌트가 화면에 마운트 되었을 때 모달이 꺼져 있는 상태라면
      dialogRef.current?.showModal(); // 모달 화면에 표시
      dialogRef.current?.scrollTo({ // 스크롤 위치 최상단 고정
        top: 0
      });
    }
  }, []);

  return createPortal(
    <dialog className={style.modal}
      ref={dialogRef}
      onClick={(e) => {
        // 모달의 배경이 클릭되었을 때 뒤로가기
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
      onClose={() => router.back()}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}