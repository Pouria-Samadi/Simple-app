import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import Post from "./Post";

interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  username: string;
}

const Main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const postRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {postsList?.map((post) => (
        <Post />
      ))}
    </div>
  );
};

export default Main;
