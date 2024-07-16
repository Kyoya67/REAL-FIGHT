// pages/index.js
"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import styles from "../styles/home.module.css";

export default function Home() {
  const [page, setPage] = useState(3);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const commentListRef = useRef(null);

  const titles = ["事故", "胎動", "鏖殺", "蠢動", "内訌", "出征"];

  const nextPage = () => setPage((prev) => Math.min(titles.length, prev + 1));
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
    onSwipedLeft: () => nextPage(),
    onSwipedRight: () => prevPage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className={`${styles.container} ${isFullscreen ? styles.fullscreen : ""}`}
    >
      <div
        className={`${styles.mangaViewer} ${
          isFullscreen ? styles.fullscreenViewer : ""
        }`}
      >
        <div onClick={prevPage} className={styles.navButton}>
          {"<"}
        </div>
        <div className={styles.mangaPage}>
          <Image
            src={`/${page}.jpg`}
            alt={`Page ${page}`}
            layout="fill"
            objectFit="contain"
            className={styles.mangaImage}
          />
        </div>
        <div onClick={nextPage} className={styles.navButton}>
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
          <Image src={`/frame.svg`} alt={`Frame Icon`} width={20} height={20} />
          <span>全画面</span>
        </div>
      </div>
      <div className={styles.metadata}>
        <h1>{`【第${page}話】${titles[page - 1]}`}</h1>
        <p>2024年02月12日</p>
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
    </div>
  );
}
