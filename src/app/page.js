// pages/index.js
"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import styles from "../styles/home.module.css";

export default function Home() {
  const [page, setPage] = useState(2);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const commentListRef = useRef(null);

  const pageList = [
    { title: "事故", day: "2024年02月12日" },
    { title: "胎動", day: "2024年02月11日" },
    { title: "鏖殺", day: "2024年02月12日" },
    { title: "蠢動", day: "2024年03月17日" },
    { title: "内訌", day: "2024年04月15日" },
    { title: "出征", day: "2024年05月1日" },
  ];

  const nextPage = () => setPage((prev) => Math.min(pageList.length, prev + 1));
  const prevPage = () => setPage((prev) => Math.max(1, prev - 1));

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const submitComment = () => {
    if (comment.trim() !== "") {
      const newComment = { text: comment, timestamp: new Date().toISOString() };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  useEffect(() => {
    // スクロールする処理
    if (commentListRef.current) {
      commentListRef.current.scrollTop = commentListRef.current.scrollHeight;
    }
  }, [comments]);

  const handlers = useSwipeable({
    onSwipedLeft: () => prevPage(),
    onSwipedRight: () => nextPage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <>
      <div
        {...handlers}
        className={`${styles.container} ${
          isFullscreen ? styles.fullscreen : ""
        }`}
      >
        <div
          className={`${styles.mangaViewer} ${
            isFullscreen ? styles.fullscreenViewer : ""
          }`}
        >
          <div onClick={nextPage} className={styles.navButton}>
            {"<"}
          </div>
          <div className={styles.mangaPage}>
            <Image
              src={`/${page}.jpg`}
              alt={`Page ${page}`}
              layout="fill"
              objectFit="contain"
              className={styles.mangaImage}
              priority
            />
          </div>
          <div onClick={prevPage} className={styles.navButton}>
            {">"}
          </div>
          {isFullscreen && (
            <button onClick={closeFullscreen} className={styles.closeButton}>
              ✖
            </button>
          )}
        </div>
        <div className={styles.controls}>
          <div className={styles.fullscreenButton} onClick={toggleFullscreen}>
            <Image
              src={`/frame.svg`}
              alt={`Frame Icon`}
              width={20}
              height={20}
            />
            <span>全画面</span>
          </div>
        </div>
        <div className={styles.metadata}>
          <h1>{`【第${page}話】${pageList[page - 1].title}`}</h1>
          <p>{`${pageList[page - 1].day}`}</p>
        </div>
      </div>
      <div className={styles.comments}>
        <h2>コメント</h2>
        <div ref={commentListRef} className={styles.commentList}>
          {comments.map((comment, index) => (
            <div key={index} className={styles.comment}>
              <p>{comment.text}</p>
              <small>{new Date(comment.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>
        <textarea
          className={styles.commentInput}
          value={comment}
          onChange={handleCommentChange}
          placeholder="コメントを入力してください"
        />
        <button className={styles.commentButton} onClick={submitComment}>
          送信
        </button>
      </div>
    </>
  );
}
