import './button.css'

function Buttons(props) {
    return (
        <div class='ButtonCSS'>
            <a href={props.link}>
                <button>{props.text}</button>
            </a>
        </div>
    )
}

export default Buttons;