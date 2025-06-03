import { useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL, Review } from "../../services/api";
import { formatDistanceToNow } from "date-fns";
import { CommentContext } from "../../context/CommentsContext";
import Swal from "sweetalert2";

export default function Reviews({id}) {
  const { user } = useUser();
 const{openSignIn}= useClerk()
  const{setReviews,comment,rating,setComment,setRating,reviews,hoveredRating,setHoveredRating}= useContext(CommentContext)

  const [visibleCount, setVisibleCount] = useState(2);
  const filteredReviews = reviews.filter(rev => rev.recipeId === id);
  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const[error,setError]= useState()
  useEffect(() => {


    axios
      .get(BASE_URL + Review.GET_ALL) 
      .then((res) => setReviews(res.data))
      .catch((err) => console.log("Error fetching reviews", err));
  }, []);

  const addReview = () => {
    if(comment == ''){
      setError('please enter review !')
      return
    }
  
      
    const newReview = {
      comment,
      userId: user?.id,
      rateCount: rating,
      userName: user?.fullName,
      createdAt: new Date().toISOString(),
      recipeId : id,
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
            <div className="text-gray-400 hover:text-gray-600 cursor-pointer text-xl">
              •••
            </div>
          </div>

          <div className="flex gap-1 text-yellow-400 text-xl">
            {[...Array(rev.rateCount)].map((_, idx) => (
              <span key={idx}>★</span>
            ))}
          </div>

          <div className="bg-gray-50 p-4 rounded-xl text-gray-700">
            {rev.comment}
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
          className={`cursor-pointer text-2xl ${
            (hoveredRating || rating) >= value
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
