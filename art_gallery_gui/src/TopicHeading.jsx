import './topicheading.css'

function TopicHeading(props) {
    return (
        <div className='Heading'>
            <p className='HeadingText'>{props.text}</p>
        </div>
    )
}

export default TopicHeading;