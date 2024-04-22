import "./signup.css";

function Search (props) {
    return(
    <div class="subscription-form">
        <form>
            {/* Heading for the subscription form  */}
            <label for='email'>{props.labeltext}</label>
            
            {/* Input field for entering email */}
            <input type="text" id='email' placeholder="Enter your Email"/>
            
            {/* Subscribe button to submit the form */}
            <button type="submit">{props.buttontext}</button>
        </form>
    </div>
    )
};

export default Search;