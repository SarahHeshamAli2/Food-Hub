import { createContext, useState } from "react";

export const CommentContext= createContext()

const CommentContextProvider=({children})=>{
      const [rating, setRating] = useState(0);
      const [hoveredRating, setHoveredRating] = useState(0);
      const [comment, setComment] = useState("");
      const [reviews, setReviews] = useState([]);


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
          setReviews
        }}
      >
        {children}
      </CommentContext.Provider>

    )

};
export default CommentContextProvider