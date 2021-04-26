import React, {createContext, useEffect, useState } from 'react'
import { api } from '../services/api'

export const DataContext = createContext()


function DataProvider({children}) {
    
    const [data, setData] = useState([])
    const [page, setPage] = useState (0)
    const [limit, setLimit] = useState(20)
    const [showButton, setShowButton] = useState(true)
    const [pokemonArray, setPokemonArray] = useState([])
    const [loading, setLoading] = useState(false)
    

    useEffect(()=> {
    async function consumeApi(){
        setLoading(true)
        const response = await api.get(`pokemon?offset=${page}}&limit=${limit}`)
        setData(response.data.results)
    }
    consumeApi()
    },[page, limit])

    useEffect(()=> {
        //Get pokemon datas
        data.forEach(async (item)=> {
            const {data} = await api.get(`/pokemon/${item.name}`)
            setPokemonArray((pokemonArray)=> [...pokemonArray,data])
            setLoading(false)
        })        
    }, [data])

    return (
        <DataContext.Provider 
        value={{
            data, 
            page,
            setData,
            setLimit,
            limit,
            setPage,
            pokemonArray,
            setPokemonArray,
            showButton,
            setShowButton,
            loading,
            setLoading
        }}>
            {children}
        </DataContext.Provider>
    )

}

export default DataProvider