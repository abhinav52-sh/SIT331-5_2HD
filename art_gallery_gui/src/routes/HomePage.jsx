import Header from '../HomepageComponents/Header'
import HeaderImage from '../HomepageComponents/HeaderImage'
import Heading from '../TopicHeading'
import Button from '../HomepageComponents/Button'
import SignUp from '../HomepageComponents/SignupForm'
import Footer from '../HomepageComponents/Footer'

function HomePage({loggedIn}) {
    return (
        <div>
            <Header loggedIn={loggedIn}/>
            <HeaderImage/>

            <Heading text='Explore the rich history, symbolism, and beauty.'/>

            <Button text='Show all Artists' link='/artists'/>
            <Button text='Show all Artifacts' link='/artefacts'/>

            <SignUp labeltext='SIGN UP FOR OUR WEEKLY INSIDER' buttontext='Subscribe'/>

            <Footer/>
        </div>
    )
}

export default HomePage
