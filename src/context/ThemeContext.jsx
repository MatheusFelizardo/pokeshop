import React, {createContext, useState } from 'react'

export const ThemeContext = createContext()

export const themes = {
    "all": {
        background: "linear-gradient(to top, #000000, #434343)",
    },
    "grass": {
        background: "linear-gradient(to top, #11998e, #38ef7d)",
    },
    "fire": {
        background: "linear-gradient(to top, #f12711, #f5af19)",
    },
    "water": {
        background: "linear-gradient(to top, #000046, #1cb5e0)",
    },
    "bug": {
        background: "linear-gradient(to top, #e9d362, #333333)",
    },
    "normal": {
        background: "linear-gradient(to top, #3c3b3f, #605c3c)",
    },
    "poison": {
        background: "linear-gradient(to top, #8e2de2, #4a00e0)",
    },
    "electric": {
        background: "linear-gradient(to top, #f6e652, #fb1)",
    },
    "ground": {
        background: "linear-gradient(to top, #ba8b02, #181818)",
    },
    "fighting": {
        background: "linear-gradient(to top, #3e5151, #decba4)",
    },
    "psychic": {
        background: "linear-gradient(to top, #ff00cc, #333399)",
    },
    "rock": {
        background: "linear-gradient(to top, #e9d362, #333333)",
    },
    "flying": {
        background: "linear-gradient(to top, #2c3e50, #3498db)",
    },
    "ghost": {
        background: "linear-gradient(to top, #6441a5, #2a0845)",
    }
}


function ThemeProvider({children}) {    
    
    const [theme, setTheme] = useState(themes.all)
        
    return (
        <ThemeContext.Provider 
        value={{
            theme,
            setTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )

}

export default ThemeProvider