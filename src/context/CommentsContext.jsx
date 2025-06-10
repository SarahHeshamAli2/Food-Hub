import { createContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

export const CommentContext = createContext();

const CommentContextProvider = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [comment, setComment] = useState({
    rating: 0,
    hoveredRating: 0,
    comment: "",
    reviews: [],
  }) 
   const [reviews, setReviews] = useState([]);


useEffect(() => {
  if (isLoaded) {
    if (isSignedIn) {
      setIsReady(true);
      setComment('');
      setRating(0);
      setHoveredRating(0);
    } else {
      setIsReady(false);
    }
  }
}, [isLoaded, isSignedIn]);



  return (
    <CommentContext.Provider
      value={{
        rating,
        setRating,
        hoveredRating,
        setHoveredRating,
        comment,
        setComment,
        reviews,
        setReviews,
        user,
        isReady 
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;
