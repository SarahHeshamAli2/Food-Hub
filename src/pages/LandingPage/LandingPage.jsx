import { Navbar } from "react-bootstrap";
import Hero from "../../components/LandingPage/Hero";
import RecipeList from "../../components/LandingPage/RecipeList";
import Banner from "../../components/LandingPage/Banner";
import MealType from "../../components/LandingPage/MealType";
import NewsletterSection from "../../components/LandingPage/NewsletterSection";
import PopularCategories from "../../components/LandingPage/PopularCategories";
export default function LandingPage() {
    return (
       
        <div className="overflow-x-hidden bg-White2 dark:bg-gray-900">
            <div className="relative overflow-hidden">
                <Navbar />
                <Hero />
            </div>

            <div className="bg-gray-50 min-h-screen  dark:bg-gray-900">
                <RecipeList />
            </div>

            <Banner />

            <div className="bg-gray-50 min-h-screen  dark:bg-gray-900">
                <MealType />
            </div>
            <NewsletterSection />
            <PopularCategories/>

        </div>
         
    )
}
