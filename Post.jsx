import React, { useState } from "react";

const Post = ({ author, time, content, image }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => setLikes(likes + 1);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    setComments([...comments, newComment]);
    setNewComment("");
    setShowCommentBox(false);
  };

  const handleShare = () => {
    alert("Shared ✅ (this is just a demo)");
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start gap-3">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <p className="font-semibold text-sm">{author.name}</p>
          <p className="text-xs text-gray-500">{time}</p>
          <p className="mt-2 text-sm">{content}</p>

          {image && (
            <img
              src={image}
              alt=""
              className="mt-3 rounded-lg max-h-96 w-full object-cover"
            />
          )}

          {/* Buttons */}
          <div className="flex justify-around mt-3 text-sm text-gray-600 border-t pt-2">
            <button
              onClick={handleLike}
              className="hover:text-fb-blue flex items-center gap-1"
            >
              👍 Like {likes > 0 && <span>{likes}</span>}
            </button>

            <button
              onClick={() => setShowCommentBox(!showCommentBox)}
              className="hover:text-fb-blue"
            >
              💬 Comment ({comments.length})
            </button>

            <button onClick={handleShare} className="hover:text-fb-blue">
              ↗ Share
            </button>
          </div>

          {/* Comment box */}
          {showCommentBox && (
            <form
              onSubmit={handleCommentSubmit}
              className="mt-3 flex items-center gap-2"
            >
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-gray-100 px-3 py-1 rounded-full text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="text-fb-blue font-semibold text-sm"
              >
                Post
              </button>
            </form>
          )}

          {/* Comment list */}
          {comments.length > 0 && (
            <div className="mt-3 space-y-1">
              {comments.map((c, i) => (
                <p
                  key={i}
                  className="text-sm bg-gray-100 rounded-lg px-3 py-1"
                >
                  {c}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
