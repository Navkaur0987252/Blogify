import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import { Button } from "flowbite-react";

import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <section className="w-full bg-gradient-to-br from-blue-200 via-purple-100  to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-black p-16  shadow-lg flex flex-col md:flex-row items-center justify-between  transition-colors duration-500">
        <div className="flex-1 flex flex-col items-center md:items-start px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow">
            Start Sharing Your Knowledge
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
            Join a vibrant community of developers and creators. Write tutorials, share
            your experiences, and help others grow. Your next big idea could inspire
            someone today!
          </p>
          <Link to={'/create-post'}>
            <Button
              gradientDuoTone="purpleToPink"
              className="rounded-full px-10 py-3 text-lg font-semibold shadow-lg"
            >
              Start Blogging
            </Button>
          </Link>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            explore the world of knowledge and creat
          </span>
        </div>
        <div className="flex-1 flex justify-center items-center p-8">
          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
            alt="Blogging illustration"
            className="rounded-3xl shadow-2xl w-full max-w-lg h-80 object-cover border-4 border-indigo-200 dark:border-gray-700"
          />
        </div>
      </section>
      {/* <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div> */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

