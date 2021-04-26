import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/DataContext';
import { CartContext } from '../../context/CartContext'
import styles from './styles.module.scss'

const Cards = () => {
    const {showButton, loading, pokemonArray, page, setPage} = useContext(DataContext)
    const {storageItem, storageFirstItem, pokemonsIntoCart, showCart} = useContext(CartContext)
    const [localStoragePokemon, setLocalStoragePokemon] = useState(null)

    useEffect(()=> {
        let pokemons = JSON.parse(localStorage.getItem("pokemon"));
        setLocalStoragePokemon(pokemons)
    }, [pokemonsIntoCart])

    function validateStorage(name, image, price) {
        const quantity = 1
        const pokemonData = {name, image, price, quantity}

        if (pokemonData && localStoragePokemon && localStoragePokemon.length > 0) {
            
            const hasItem = localStoragePokemon.some((item)=> {
                return item.name === pokemonData.name
            })

            if(hasItem) {
                showCart()  
            }

            else {
                storageItem(pokemonData)
            }
        }
        else {
            if(pokemonData) {
                storageFirstItem(pokemonData)
            }
        }
   
    }

    return (
        <div >
            <div className={styles.cards}>
            {pokemonArray && pokemonArray.map((pokemon, index)=> {
                return (
                    <div key={index} className={styles.card} >
                        <div className={styles.cardImageWrapper}>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                            <span>A wild <strong>{pokemon.name}</strong>  appears</span>
                        </div>
                        <div className={styles.priceWrapper}>
                            <p>{pokemon.name}</p>
                            <span>Preço: R$ {pokemon.weight}</span>
                        </div>

                        <div className={styles.buttonWrapper}>
                            <button onClick={()=> {validateStorage(pokemon.name, pokemon.sprites.front_default, pokemon.weight)}}>Adicionar ao carrinho</button>
                        </div>

                        <div className={styles.joystic}>
                            <div className={styles.leftBtn}>
                                <img src="/assets/left-btn.svg" alt="Control"/>
                            </div>
                            <div className={styles.middleBtn}>
                                <div className={styles.select}>
                                    <div className={styles.centerJoysticBtn}></div>
                                    <span>Select</span>
                                </div>
                                <div className={styles.start}>
                                    <div className={styles.centerJoysticBtn}></div>
                                    <span>Start</span>
                                </div>
                            </div>
                            
                            <div className={styles.rightBtn}>
                                <div className={styles.b_Button}>
                                    <div className={styles.rightJoysticBtn}></div>
                                    <span>B</span>
                                </div>
                                <div className={styles.a_Button}>
                                    <div className={styles.rightJoysticBtn}></div>
                                    <span>A</span>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                )
            })}
            </div>
            {showButton && 
            <div className={styles.seeMoreBtn}>
                <button onClick={()=> setPage(page+20)}>Carregar mais</button>
            </div>
            }

            {
                loading &&
                <div className={styles.loading}>
                    <img src="/assets/spinner-solid.svg" alt="Loading"/>
                    <p>Carregando...</p>
                </div>
            }
            
        </div>
    )
}

export default Cards
