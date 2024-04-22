import './card.css'
function Card(props)
{
   return(
    <div className="column">
        <a href={props.link}>
            <img className = "imagesp" src= {props.image} alt ='Image' width ={250} height ={200}/>
            <h3>{props.name} </h3>
        </a>
        <p> {props. description}</p>
        <div className='column2'>
            <p>&#9733; {props.star}</p>
            <p id='card-author'> {props.author}</p>
        </div>
    </div>
    )
}

export default Card