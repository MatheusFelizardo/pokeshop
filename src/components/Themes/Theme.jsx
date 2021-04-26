import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'



const Theme = ({children}) => {
    const {theme} = useContext(ThemeContext)
    return (
        <div style={{background:theme.background, color: theme.color}}>
            {children}
        </div>
    )
}

export default Theme
