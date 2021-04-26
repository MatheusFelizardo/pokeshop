import React, {createContext, useEffect, useRef, useState } from 'react'

export const CartContext = createContext()

function CartProvider({children}) {    
    const [totalValue, setTotalValue] = useState(0)
    const [pokemonsToCart, setPokemonsToCart] = useState([])
    const [pokemonsIntoCart, setPokemonsIntoCart] = useState(0)
    const [pokemonWithUpdatedQuantity, setPokemonWithUpdatedQuantity] = useState(1)
    const [loading, setLoading] = useState(false)
    const [updateCart, setUpdateCart] = useState(false)
    const cartReference = useRef()
   

    function showCart() {
        const cart = cartReference.current
        cart.classList.add("show")
        cart.classList.remove("hide")
    }

    function closeCart() {
        const cart = cartReference.current
        cart.classList.remove("show")
        cart.classList.add("hide")
    }
    
    function storageItem(pokemon) {
        const pokemonAtCart = JSON.parse(localStorage.getItem("pokemon"));
        if(pokemonAtCart) {
        const pokemonArray = [pokemon]
        const arrayWithAllPokemons = [...pokemonAtCart, ...pokemonArray]
        localStorage.setItem('pokemon', JSON.stringify(arrayWithAllPokemons))
        setPokemonsToCart(arrayWithAllPokemons)
        setPokemonsIntoCart(arrayWithAllPokemons.length)
        showCart()                
        }
        else {
            storageFirstItem(pokemon)
        }
    }

    function storageFirstItem(pokemon) {
        const pokemonArray = [pokemon]
        setPokemonsIntoCart(pokemonArray.length)
        localStorage.setItem('pokemon', JSON.stringify(pokemonArray))
        showCart()
    }

    useEffect(()=> {
        const pokemons = JSON.parse(localStorage.getItem("pokemon"));
        if(pokemons) {
            setPokemonsIntoCart(pokemons.length)
            if(pokemons.length>0) {
                showCart()
            }
        }
        setPokemonsToCart(pokemons)
    },[])
        
    return (
        <CartContext.Provider 
        value={{
            showCart,
            closeCart,
            cartReference,
            pokemonsToCart,
            setPokemonsToCart,
            pokemonsIntoCart,
            setPokemonsIntoCart,
            storageItem,
            pokemonWithUpdatedQuantity,
            setPokemonWithUpdatedQuantity,
            setLoading,
            loading,
            setUpdateCart,
            updateCart,
            storageFirstItem,
            totalValue,
            setTotalValue
        }}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvider