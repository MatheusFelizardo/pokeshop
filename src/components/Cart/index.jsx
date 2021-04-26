import React, { useContext, useEffect } from 'react'
import styles from './styles.module.scss'
import {useState} from 'react'
import { CartContext } from '../../context/CartContext'
import Count from '../Count'
import Swal from 'sweetalert2'
const Cart = () => {

    const {pokemonsIntoCart, totalValue, setTotalValue, loading, setLoading, pokemonWithUpdatedQuantity, cartReference, closeCart} = useContext(CartContext)
    const [localStoragePokemon, setLocalStoragePokemon] = useState(null)
    
    useEffect(()=> {
        let pokemons = JSON.parse(localStorage.getItem("pokemon"));
        setLocalStoragePokemon(pokemons)
    }, [pokemonsIntoCart])

    useEffect(()=> {
        function calcTotalPrice() {
            const localstoragePokemon = JSON.parse(localStorage.getItem("pokemon"));
    
            if(localstoragePokemon){
            const values = localstoragePokemon.map((item)=> {
                return {
                    name: item.name,
                    total: item.price * item.quantity
                }
            })
    
            let total = 0
            for (let index = 0; index < values.length; index++) {
                const element = +values[index].total;
                total += element
            }
            setTotalValue(total)
            }
        }
        calcTotalPrice()
        
    }, [pokemonWithUpdatedQuantity,pokemonsIntoCart, setTotalValue])

    function confirmPurchase() {

        if(totalValue > 0) {
            Swal.fire({
                title: 'Finalizando pedido...',
                text: `Seu pedido ficou no valor total de R$${totalValue}.`,
                confirmButtonText: 'Finalizar compra',
                confirmButtonColor: 'var(--red)',
                showCancelButton: true,
                cancelButtonText: 'Voltar'
            })
            Swal.getConfirmButton().addEventListener("click", ()=> {
                Swal.fire({
                    icon: 'success',
                    text: 'Agradecemos pela sua compra!! Você ganhou um cupom de desconto de 10% para sua próxima compra: #MATHEUSÉ10',
                    allowOutsideClick: false,

                    focusConfirm: false,
                    focusCancel:false,
                    focusDeny: false

                })
                Swal.getConfirmButton().addEventListener("click", ()=> {
                    resetApp()
                })
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Adicione itens ao carrinho para concluir sua compra.',
                confirmButtonText: 'Voltar',
                confirmButtonColor: 'var(--red)'
            })
        }
    }

    function resetApp() {
        localStorage.removeItem('pokemon')
        window.location.reload()
    }

    return (
        <div ref={cartReference} className={`${styles.cart} hide`}> 

            <div className={styles.inititalInfo}>
                <div className={styles.header}>
                    <span>Carrinho de compras</span>
                    <img src="/assets/close.svg" alt="Fechar" onClick={closeCart}/>
                </div>          
               
                <div className={styles.cartItemWrapper}>
                    <div className={styles.submenu}>
                        <span>Produto</span>
                        <span>Qtd.</span>
                        <span>Preço</span>
                    </div>

                    <div className={styles.cartItems}>
                        {
                            loading &&
                            <div className={styles.loading}>
                                <img src="/assets/spinner-solid.svg" alt="Loading"/>
                                <p>Calculando...</p>
                            </div>
                        }

                        {localStoragePokemon ?
                        localStoragePokemon.map((pokemon, index)=> {
                            return (
                                <div id = {index} className={styles.cartItem} key={(pokemon.price + Math.random())}>
                                    <div className={styles.product}>
                                        <div className={styles.pokemonImg}>
                                            <img src={pokemon.image} alt={pokemon.name}/>
                                        </div>
                                        <span>{pokemon.name}</span>
                                    </div>

                                    <Count pokemon={pokemon} />

                                </div>
                            )
                        })
                        : 
                        <span className={styles.cartMessage}>Nenhum item adicionado ao carrinho.</span> 
                        }

                    </div>
                </div>

            </div>

            <div className={styles.finish}>
                <div className={styles.totalWrapper}>
                    <span>Total</span>
                    <span className={styles.totalPrice}>R$ {totalValue}</span>
                </div>
                <div className={styles.finishBtn}>
                    <button onClick={confirmPurchase}>Concluir Pedido</button> 
                </div>              
            </div>

           


        </div>
    )
}

export default Cart
