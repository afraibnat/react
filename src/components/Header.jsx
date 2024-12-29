/* 
This component will hold the links and title 
for our quiz and navigation links
*/
import  {Link} from "react-router-dom";

export default function Header() {
    return (
        <div className="header-container">
            <h1>What Element Are You?</h1>
            <p>(Based on completely random things)</p>
            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/quiz">Quiz</Link>
            </nav>
        </div>
    )
}