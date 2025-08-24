import React from 'react';
import classes from "../css/Detail.module.css";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Post } from '../data/posts';

export const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [post, setPost] = useState<Post | null>(null); // 記事データの状態管理
  const [loading, setLoading] = useState<boolean>(true); // ローディング状態
  const [error, setError] = useState<string | null>(null); // エラー状態

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
        const data = await res.json();
        setPost(data.post);
      } catch(error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetcher();
  }, [id]);


  if (loading) {
    return <p>読み込み中です</p>;
  }

  if (error) {
    return <p>エラーが発生しました</p>;
  }

  if (!post) {
    return <p>記事がみつかりませんでした</p>
  }

  return(
    <div className={classes.Detail_postContainer}>
      <div className={classes.Detail_Posts}>
        <div className={classes.Detail_Images}>
          <img src={post.thumbnailUrl} alt={post.title}/>
        </div>
      </div>
        
      <div className={classes.Detail_postWrapper}>
        <div className={classes.Detail_postInfo}>
          <div className={classes.Detail_postDate}>{new Date(post.createdAt).toLocaleDateString()}</div>
          <div className={classes.Detail_postCategorywrap}>{
            post.categories.map((category,index) => {
              return (
                <span key={index} className={classes.Detail_postCategory}>{category}</span>
              );
            })}
          </div>
        </div>
      </div>
        <p className={classes.Detail_postTitle}>{post.title}</p>
        <div className={classes.Detail_postBody} dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};