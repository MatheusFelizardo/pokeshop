import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import styles from './styles.module.scss'


const Count = ({pokemon}) => {

    const {setPokemonWithUpdatedQuantity,setPokemonsIntoCart, setPokemonsToCart, setTotalValue} = useContext(CartContext)
    
    const [inputValue, setInputValue] = useState(pokemon.quantity)
    const [pokemonPrices, setPokemonPrices] = useState(0)

    useEffect(()=> {
        const localstoragePokemon = JSON.parse(localStorage.getItem("pokemon"));
        
        if(localstoragePokemon) {
            setPokemonPrices(pokemon.price*inputValue)
            pokemon.quantity = inputValue

            for (let i = 0; i < localstoragePokemon.length; i++) {
                if(pokemon.name === localstoragePokemon[i].name){  
                    localstoragePokemon[i].quantity = inputValue;  
                    break;  
                }
            }
            localStorage.setItem("pokemon", JSON.stringify(localstoragePokemon)); 
            setPokemonWithUpdatedQuantity(inputValue)
        }
        
    },[inputValue, pokemon, setPokemonWithUpdatedQuantity])

    function reduceQuantity () {
        if(inputValue>1){
            setInputValue(inputValue-1)
        }
    }

    function addQuantity () {
        if(inputValue<999){
            setInputValue(inputValue+1)
        }
    }
    
    function removeFromCart (pokemon) {
        const localstoragePokemon = JSON.parse(localStorage.getItem("pokemon"));
            
        if(localstoragePokemon){
            const newArray = localstoragePokemon.filter((item)=> {
                return item.name !== pokemon.name
            })
            
            if(newArray.length === 0) {
                localStorage.removeItem("pokemon"); 
                setPokemonsToCart(newArray)
                setPokemonsIntoCart(newArray.length)
                setTotalValue(0)
            }
            else {
                localStorage.setItem("pokemon", JSON.stringify(newArray)); 
                
                setPokemonsToCart(newArray)
                setPokemonsIntoCart(newArray.length)
            }
        }
    }


    return (
        <>
        <div className={styles.quantity}>
            <button onClick={(reduceQuantity)} >
            <img src="/assets/remove.svg" alt="Remover"/>
            </button>

            <input 
            value={inputValue} 
            onChange={({target})=> {setInputValue(target.value)}}
            type="text"/>
            {/* <span>{pokemon.quantity}</span> */}

            <button onClick={addQuantity} >
            <img src="/assets/add.svg" alt="Adicionar"/>
            </button>
        </div>

        <div className={styles.price}>
            <span>R$ {pokemonPrices}</span>
        </div>

        <div className={styles.delete} onClick={()=>{removeFromCart(pokemon)}}>
            <img src="/assets/times-circle-light.svg" alt="Remover"/>
        </div>
        </>
    )
}

export default Count
