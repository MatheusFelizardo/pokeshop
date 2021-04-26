import React, { useContext, useEffect, useRef } from 'react'
import { DataContext } from '../../context/DataContext'
import { ThemeContext, themes } from '../../context/ThemeContext'
import { api } from '../../services/api'
import styles from './styles.module.scss'

const Submenu = () => {

    const {setShowButton, setLoading, setPokemonArray, setData, page, limit} = useContext(DataContext)
    const {setTheme} = useContext(ThemeContext)
    const referencia = useRef();

    
    async function getPokemonByType(type) {
        setShowButton(false)
        setLoading(true)
        const { data } = await api.get(`type/${type}`)
        const pokemonData = data.pokemon

        const pokemon = pokemonData.map((item)=> {
            return item.pokemon
        })
        
        setPokemonArray([])
        setTheme(themes[type])
        setData(pokemon)
        
    }
    
    async function getAllPokemons() {
        setPokemonArray([])
        setTheme(themes['all'])
        setLoading(true)
        const response = await api.get(`pokemon?offset=${page}}&limit=${limit}`)
        setShowButton(true)
        setData(response.data.results)
    }
    
    useEffect(()=> {
        //Startando com o active no primeiro botão
        const element = referencia.current
        element.classList.add("active")
    },[])

   
    function removeButtonsActiveClass() {
        let button = document.querySelectorAll("button")
        button.forEach((btn)=> {
            btn.classList.remove("active")
        })
    }        

    function handdleActive(e) {
        removeButtonsActiveClass() 
        referencia.current = e.target
        referencia.current.classList.add("active")
    }

    return (
        <div className={styles.submenu}> 
            <button ref={referencia} className={styles.item} type="button" 
                onClick={(e)=>{getAllPokemons();handdleActive(e);}}>
                <img src="/assets/all-groups.svg" alt="Todos os Pokémons"/>
                <p>Todos</p> 
            </button>
            
            <button className={styles.item} type="button" onClick={(e)=> {getPokemonByType("grass"); handdleActive(e);}}>
                <img src="/assets/plant.svg" alt="Planta"/>
                <p>Planta</p> 
            </button>

            <button className={styles.item} type="button" onClick={(e)=> {getPokemonByType("fire");handdleActive(e);}}>
                <img src="/assets/fire.svg" alt="Fogo"/>
                <p>Fogo</p> 
            </button>

            <button className={styles.item} type="button" onClick={(e)=> {getPokemonByType("water");handdleActive(e);}}>
                <img src="/assets/water.svg" alt="Água"/>
                <p>Água</p> 
            </button>

            <button className={styles.item} type="button" onClick={(e)=> {getPokemonByType("bug");handdleActive(e);}}>
                <img src="/assets/inseto.svg" alt="Inseto"/>
                <p>Inseto</p> 
            </button>

            <button className={styles.item} type="button" onClick={(e)=> {getPokemonByType("normal");handdleActive(e);}}>
                <img src="/assets/normal.svg" alt="Normal"/>
                <p>Normal</p> 
            </button>

            <button className={styles.item} type="button" onClick={(e)=> {getPokemonByType("poison");handdleActive(e);}}>
                <img src="/assets/poison.svg" alt="Venenoso"/>
                <p>Venenoso</p> 
            </button>

            <button className={styles.item} type="button" onClick={(e)=> {getPokemonByType("electric");handdleActive(e);}}>
                <img src="/assets/eletric.svg" alt="Elétrico"/>
                <p>Elétrico</p> 
            </button>

            <button className={styles.item} type="button" onClick={(e)=> {getPokemonByType("ground");handdleActive(e);}}>
                <img src="/assets/ground.svg" alt="Terra"/>
                <p>Terra</p> 
            </button>

            <button className={styles.item} type="button" onClick={(e)=> {getPokemonByType("fighting");handdleActive(e);}}>
                <img src="/assets/fighter.svg" alt="Lutador"/>
                <p>Lutador</p> 
            </button>

            <button className={styles.item} type="button" onClick={(e)=> {getPokemonByType("psychic");handdleActive(e);}}>
                <img src="/assets/psyshic.svg" alt="Psíquico"/>
                <p>Psíquico</p> 
            </button>

            <button className={styles.item} type="button" onClick={(e)=> {getPokemonByType("rock");handdleActive(e);}}>
                <img src="/assets/stone.svg" alt="Pedra"/>
                <p>Pedra</p> 
            </button>

            <button className={styles.item} type="button" onClick={(e)=> {getPokemonByType("flying");handdleActive(e);}}>
                <img src="/assets/flyer.svg" alt="Voador"/>
                <p>Voador</p> 
            </button>

            <button className={styles.item} type="button" onClick={(e)=> {getPokemonByType("ghost");handdleActive(e);}}>
                <img src="/assets/ghost.svg" alt="Fantasma"/>
                <p>Fantasma</p> 
            </button>
        </div>
    )
}

export default Submenu
