import styles from './pendingRequest.module.css'
import chef1 from '../../assets/images/professional-chefs-cooking-culinary-chefs-hand-drawn-sketch-vector-illustration.png'
import { Link } from 'react-router-dom'
export default function PendingRequest() {
return <>
<div className={styles.container}>
    <img src={chef1} alt="chef vector" className='w-50 mx-auto' />
      <h1 className={styles.title}>Your Recipe Has Been Submitted!</h1>
      <p className={styles.message}>
        Thank you for sharing your recipe with us!  
        It’s now on its way to our admin team for review and approval.  
        Once approved, your recipe will be available for everyone to enjoy.
      </p>
      <p className={styles.note}>
        Please be patient — we’ll notify you as soon as it’s live!
      </p>
      <Link to="/" className={styles.backButton}>
        ← Back to Recipes
      </Link>
    </div>
</>
}
