import './footer.css'
function FooterSection(props)
{
   return(
    <div className="footer-section">
       <div className='explore-section'>
            <h1>Explore</h1>
            <ul>
                <li><a href='/'>Home</a></li>
                <li><a href='/artists'>Artists</a></li>
                <li><a href='/artefacts'>Articles</a></li>
                <li><a href=''>Facts</a></li>
            </ul>
       </div>

       <div className='explore-section extn1'>
            <h1>Support</h1>
            <ul>
                <li><a href=''>FAQs</a></li>
                <li><a href=''>Help</a></li>
                <li><a href=''>Contact Us</a></li>
            </ul>
       </div>

       <div className='explore-section extn2'>
            <h1>Stay connected</h1>
            <a href=''>
                <img href src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/480px-Facebook_logo_%28square%29.png'/>
            </a>
            <a href=''>
                <img src='https://seeklogo.com/images/T/twitter-new-logo-8A0C4E0C58-seeklogo.com.png?v=638258088440000000'/>
            </a>
            <a href=''>
            <img src='https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-instagram-new-square2-512.png'/>
            </a>
       </div>

    </div>
    )
}
export default FooterSection
