import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SideNavigation from './sideNavigation.js';
import TopNavigation from './topNavigation.js';
import './flipCard.css';
import { faUser, faChevronLeft, faChevronRight, faHome, faBriefcase, faVideo, faFilePdf, faMap, faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PostForm({ addPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/discussions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assume token is stored in localStorage
      },
      body: JSON.stringify(newPost)
    });

    if (response.ok) {
      const data = await response.json();
      addPost(data);
      setTitle('');
      setContent('');
      setTags('');
    }
  };


  return (
    <div className="max-w-4xl mx-auto mt-6">
      {/* Form Card */}
      <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <input
            type="text"
            placeholder="Enter topic title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Tag your topic (e.g. 'facebook', 'binary-search'...)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="h-40 mb-6"
            />
          </div>
          <div className='flex justify-center items-end pt-4'>
            <button className="bg-button text-white px-3 py-1 rounded hover:bg-button-hover mr-2">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


function Post({ post, updateVotes }) {
  const [votes, setVotes] = useState(post.votes);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/discussions/${post.id}/comments/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assume token is stored
        }
      });
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    };

    fetchComments();
  }, [post.id]);

  const handleVote = async (increment) => {
    const newVotes = votes + increment;
    setVotes(newVotes);

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/discussions/${post.id}/vote/`, {
            method: 'POST',  // Change to POST
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assume token is stored
            },
            body: JSON.stringify({ votes: newVotes })
        });

        if (response.ok) {
            const data = await response.json();
            updateVotes(post.id, data.votes);
        } else {
            console.error('Failed to update votes:', await response.text());
        }
    } catch (error) {
        console.error('Error during fetch:', error);
    }
};



  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newCommentData = {
      content: newComment,
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/discussions/${post.id}/comments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assume token is stored
      },
      body: JSON.stringify(newCommentData)
    });

    if (response.ok) {
      const data = await response.json();
      setComments([...comments, data]);
      setNewComment('');
    }
  };

  
return (
  
      <div className="max-w-4xl mx-auto mt-6 ">
    <div className="bg-button/15 p-6 rounded-lg shadow-lg my-4 hover:shadow-xl transition-shadow duration-300 px-8">
    
      
      {/* Post Content */}
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-1 ">{post.title}</h2>
          <p className="text-sm text-gray-500 mb-4">Posted by: {post.created_by.first_name}</p>
          <div className="text-gray-800 mb-6" dangerouslySetInnerHTML={{ __html: post.content }}></div>
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-purple-50 text-dark-purple px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* Voting Buttons */}
        <div className="flex flex-col items-center justify-center ">
          <button onClick={() => handleVote(1)} className="text-4xl text-purple-400 hover:text-purple-500  rounded">
            ▲
          </button>
          <span className="text-lg font-semibold text-gray-800">{votes}</span>
          <button onClick={() => handleVote(-1)} className="text-4xl text-purple-400 hover:text-purple-500  rounded">
            ▼
          </button>
        </div>
      </div>
      {/* Comments Section */}
      <div className="mt-4 ">
  <h3 className="text-lg font-bold text-gray-700 mb-4">Comments</h3>
  <div className="space-y-4 ">
    {comments.map(comment => (
      <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <div className="h-5 w-5 bg-gray-300 rounded-full flex items-center justify-center mr-2">
            <FontAwesomeIcon icon={faUser} className="text-white" />
          </div>
          {comment.user.first_name}
        </div>
        <p className="text-gray-800 pl-6">{comment.content}</p>
      </div>
    ))}
  </div>
</div>
        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="flex w-full mt-8 gap-2">
  <input
    type="text"
    placeholder="Add a comment..."
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
    className="flex-1 rounded py-2 px-4 border"
  />
  <button type="submit" className='text-white font-bold py-2 px-4 rounded bg-button hover:bg-button-hover'>
    Comment
  </button>
</form>
      </div>
    </div>
  
);
}

function DiscussionPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/discussions/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assume token is stored
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const updateVotes = (postId, newVotes) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, votes: newVotes };
      }
      return post;
    });
    setPosts(updatedPosts);
  };
  const tags = [
    { name: "google", count: 2010 },
    { name: "amazon", count: 1875 },
    { name: "facebook", count: 1019 },
    { name: "online assessment", count: 1006 },
    {name:"Binary Search",count: 230},
    {name: "DSA",count:450}
    // Add more tags as needed
  ];

  return (
    <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 text-black h-[90vh]">
      <TopNavigation />
      <div className="flex h-screen bg-gray-100">
        <SideNavigation/> {/* Adjusted width for slimmer sidebar */}
        <div className="flex-1 p-4 w-full h-full overflow-auto scrollbar-hide"> {/* Adjusted flex to fill remaining space */}
          <h1 className="text-3xl text-color-green font-bold text-center mb-2">Discussion Forum</h1>
          <PostForm addPost={addPost} />
          {posts.map(post => (
            <Post key={post.id} post={post} updateVotes={updateVotes} />
          ))}
        </div>
        <div className="w-1/6 p-4 bg-white rounded-lg shadow-md flex flex-col items-center pt-6"> {/* Adjusted width for slimmer sidebar */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search topics..."
              className="w-full max-w-xs p-2 border border-gray-300 rounded shadow-sm"
            />
            <button className="bg-button hover:bg-button-hover text-white font-bold py-2 px-4 rounded">
              Search
            </button>
          </div>
          <div className="flex flex-wrap justify-start items-center mt-2">
            {tags.map(tag => (
              <div key={tag.name} className="m-2 bg-gray-200 rounded-full flex items-center text-sm font-semibold text-gray-700 py-1 px-3">
                <span className="pr-2">{tag.name}</span>
                <div className="bg-gray-500 h-4" style={{ width: '1px' }}></div>
                <span className="pl-2">{tag.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default DiscussionPage;