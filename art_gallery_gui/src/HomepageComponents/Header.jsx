import Search from './SearchBar'
import { useState } from 'react'
import './search.css'
import './header.css'

function Header ({loggedIn}) {
    const [searchQuery, setSearchQuery] = useState("");

    return(
    <div>
        <Search loggedIn={loggedIn} placeholder='Search' value={searchQuery} onChange={(value) => setSearchQuery(value)}/>
    </div>
    )
}

export default Header