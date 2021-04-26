import React, { useContext, useState } from 'react'
import { DataContext } from '../../context/DataContext'
import { api } from '../../services/api'
import styles from './styles.module.scss'
import Swal from 'sweetalert2'
import { CartContext } from '../../context/CartContext'

const Header = () => {
    const [inputText, setInputText] = useState("")
    const {setLoading, setPokemonArray, setShowButton} = useContext(DataContext)
    const {pokemonsIntoCart, showCart} = useContext(CartContext)
    
    
    async function searchPokemon(e) {
        e.preventDefault()
        setLoading(true)
        try {
        const { data } = await api.get(`pokemon/${inputText}`)
        setShowButton(false)
        setPokemonArray([data]) 
        setLoading(false)
        }
        catch(err) {
            if(err) {
                setLoading(false)
                Swal.fire({
                    title: 'A solicitação falhou!',
                    text: 'Verifique o nome do Pokémon digitado. Lembrando que ele tem que ser em inglês!!',
                    icon: 'error',
                    confirmButtonColor: 'var(--red)',
                })
            }
        }
         
    }
    
    return (
        <header className={styles.menu}>
            <div className={styles.menuFirstItems}>
                <div>
                    <a href="/">
                        <img src="/assets/logo.png" alt="Pokémon Shop Logo"/>
                    </a>
                </div>
                <form className={styles.searchbar} onSubmit={(e)=>searchPokemon(e)}>
                    <img src="/assets/search.svg" alt="Lupa"/>
                    <input 
                    value={inputText} 
                    type="text" 
                    onChange={(e)=>setInputText(e.target.value)}
                    name="searchbar"
                    placeholder="Digite o nome do Pokémon em inglês..."/>
                </form>
            </div>
            <div className={styles.cart} onClick={showCart}>
                <div className={styles.cartQuantity}><span>{pokemonsIntoCart}</span></div>
                <img src="/assets/cart.svg" alt="Carrinho de compras"/>
            </div>
        </header>
    )
}

export default Header
