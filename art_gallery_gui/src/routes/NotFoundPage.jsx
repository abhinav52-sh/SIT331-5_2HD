import {Link} from 'react-router-dom'


function NotFoundPage() {
    return (
        <div style={{textAlign: 'center', padding:'40px'}}>
            <Link to='/'>Return To HomePage</Link>
            <h1>Oops! Page Not Found</h1>
        </div>
    )
}

export default NotFoundPage