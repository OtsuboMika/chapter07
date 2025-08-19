import React from 'react';
import { useEffect, useState } from 'react';
import classes from "../css/Main.module.css";
import { Link } from 'react-router-dom';
import { Post } from '../data/posts';

export const Main = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // ローディング状態
  const [error, setError] = useState<string | null>(null); // エラー状態

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts");
        const data = await res.json();
        setPosts(data.posts);
      } catch(error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetcher()
  }, []);

  if (loading) {
    return <p>読み込み中です</p>;
  }

  if (error) {
    return <p>エラーが発生しました</p>;
  }

  if (posts.length === 0) {
    return <p>記事がみつかりませんでした</p>
  }

  return(
    <div className={classes.container}>
      <ul>
      {posts.map(post => (
        <li key={post.id} className={classes.postWrapper}>
          <Link to={`/posts/${post.id}`} className={classes.postLink}>
            <div className={classes.postInfo}>
              <div className={classes.postDate}>{new Date(post.createdAt).toLocaleDateString()}</div>
                <div className={classes.postCategorywrap}>
                  {post.categories.map((category, index) => (
                    <div key={index} className={classes.postCategory}>{category}</div>
                     ))}
                </div>
            </div>
            <p className={classes.postTitle}>{post.title}</p>
            <div className={classes.postBody} dangerouslySetInnerHTML={{ __html: post.content }} />
          </Link>
        </li>
      ))}
      </ul>
    </div>
  );
};
