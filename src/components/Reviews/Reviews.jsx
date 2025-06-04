import { useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL, Review } from "../../services/api";
import { formatDistanceToNow } from "date-fns";
import { CommentContext } from "../../context/CommentsContext";
import Swal from "sweetalert2";

export default function Reviews({ id }) {
  const { user, isSignedIn } = useUser();
  const { openSignIn } = useClerk()
  const { setReviews,
    comment,
    rating,
    setComment,
    setRating,
    reviews,
    hoveredRating,
    setHoveredRating
  } = useContext(CommentContext) || {}

  const [visibleCount, setVisibleCount] = useState(2);
  const filteredReviews = reviews.filter(rev => rev.recipeId === id);
  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const [error, setError] = useState()
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  //state to track which review is being editted
  const [editingReviewId, setEditingReviewId] = useState(null);
  //state to store the new comment being typed updated when the user types at text area
  const [editedComment, setEditedComment] = useState('');
  const isAdmin = isSignedIn && user?.id === import.meta.env.VITE_ADMIN_ID;


  useEffect(() => {
    axios
      .get(BASE_URL + Review.GET_ALL)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log("Error fetching reviews", err));
  }, [setReviews]);

  const addReview = () => {
    if (comment == '') {
      setError('please enter review !')
      return
    }


    const newReview = {
      comment,
      userId: user?.id,
      rateCount: rating,
      userName: user?.fullName,
      createdAt: new Date().toISOString(),
      recipeId: id,
      userImage: user?.imageUrl
    };

    axios
      .post(BASE_URL + Review.ADD_REVIEW, newReview)
      .then(() => {
        setReviews((prev) => [...prev, newReview]);
        setComment("");
        setRating(0);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thanks for your feedback !",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then ((result) =>{
      if (result.isConfirmed) {
      axios
        .delete(`${BASE_URL + Review.DELETE_REVIEW}/${reviewId}`)
        .then(() => {
          setReviews((prev) => prev.filter((r) => r.id !== reviewId));
          Swal.fire("Deleted!", "Your review has been removed.", "success");
        })
        .catch((err) => {
          console.error("Failed to delete", err);
          Swal.fire("Error", "Could not delete review", "error");
        });
    }
    });
  };

  const handleEdit = (review) => {
    setEditingReviewId(review.id);
    setEditedComment(review.comment);
  };

  //called when user press save button
  const handleUpdate = (id) => {
    axios
    .put(`${BASE_URL}${Review.UPDATE_REVIEW}/${id}`, {
      comment: editedComment
    })
    .then(() => {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, comment: editedComment } : r
        )
      );
      setEditingReviewId(null);
      setEditedComment('');
      Swal.fire("Updated!", "Your review has been updated.", "success");
    })
    .catch((err) => {
      console.log(err);
      Swal.fire("Error", "Failed to update review", "error");
    });
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-2xl shadow-md max-w-2xl mx-auto">

      <div>
        {visibleReviews.map((rev, i) => (
          <div key={i} className="space-y-3 border-b pb-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={rev.userImage}
                  alt="User avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {rev.userName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {rev.createdAt
                      ? formatDistanceToNow(new Date(rev.createdAt), { addSuffix: true })
                      : "just now"}
                  </p>
                </div>
              </div>
              {(user?.id === rev.userId || isAdmin)&& (
                <div className="relative">
                  <div
                    className="text-gray-400 hover:text-gray-600 cursor-pointer text-xl"
                    onClick={() => setOpenMenuIndex(openMenuIndex === i ? null : i)}
                  >
                    •••
                  </div>
                  {openMenuIndex === i && (
                    <div className="absolute right-0 mt-1 w-28 bg-white border rounded-md shadow-lg z-10">
                      <button className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
                      onClick = {() => handleEdit(rev)}
                      >
                        Update
                      </button>
                      <button className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm text-red-500"
                      onClick={() => handleDelete(rev.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-1 text-yellow-400 text-xl">
              {[...Array(rev.rateCount)].map((_, idx) => (
                <span key={idx}>★</span>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl text-gray-700">
              {editingReviewId === rev.id ? (
                <div>
                  <textarea
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                  <div className="mt-2 flex gap-2">
                    <button
                      className="px-4 py-1 bg-green-500 text-white rounded"
                      onClick={() => handleUpdate(rev.id)}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-1 bg-gray-300 rounded"
                      onClick={() => {
                        setEditingReviewId(null);
                        setEditedComment('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                rev.comment
              )}
          </div>

          </div>
        ))}

        {visibleCount < filteredReviews.length && (
          <button
            onClick={() => setVisibleCount(prev => prev + 2)}
            className="mt-4 text-blue-600 hover:underline"
          >
            See more
          </button>
        )}
      </div>

      {user ? (
        <div className="pt-4">
          <p className="text-base font-medium text-gray-800 mb-2">
            Rate this recipe and share your opinion
          </p>

          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={`cursor-pointer text-2xl ${(hoveredRating || rating) >= value
                    ? "text-yellow-400"
                    : "text-gray-300"
                  }`}
                onClick={() => handleRatingClick(value)}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            rows="4"
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setError(false);
            }}
          ></textarea>
          {error && <div className="text-red-500 mt-2">{error}</div>}

          <button
            className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            onClick={addReview}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 text-yellow-700 rounded-lg text-center">
          <p className="font-medium mb-1">Want to leave a review?</p>
          <p className="text-sm">
            Please{" "}
            <span
              onClick={() => openSignIn()}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              sign in
            </span>{" "}
            to rate and comment on this recipe.
          </p>
        </div>
      )}

    </div>
  );
}
