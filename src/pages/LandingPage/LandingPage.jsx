import { Navbar } from "react-bootstrap";
import Hero from "../../components/LandingPage/Hero";
import RecipeList from "../../components/LandingPage/RecipeList";
import Banner from "../../components/LandingPage/Banner";
import MealType from "../../components/LandingPage/MealType";
import NewsletterSection from "../../components/LandingPage/NewsletterSection";
import PopularCategories from "../../components/LandingPage/PopularCategories";
export default function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-White2">
      <div className="relative overflow-hidden">
         <Navbar/>
     <Hero/>
      </div>

      <div className="bg-gray-50 min-h-screen">
      <RecipeList />
    </div>
    
    <Banner/>

    <div className="bg-gray-50 min-h-screen">
       <MealType/>
    </div>
    <NewsletterSection/>
    <PopularCategories/>
  

    
    </div>
  )
}
