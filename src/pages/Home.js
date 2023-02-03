import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function Home() {
    const {isAuth} = useContext(AuthContext)

    return(
        <>
<div className='home-intro'>
    <h1 className='Pokelist'>PokeList</h1>

    {isAuth.isAuth ? <p className="welkomUser">Welkom {isAuth.user.username}!</p>
        : <p style={{display: "none"}}></p>}

            <div className='allTekst'>
            <p className='intro-tekst'>
                <span>Welkom bij Pokelist!</span>
            </p>
            <p className='intro-tekst'>
                <span>De plek waar jij je lievelings</span> <span>Pokemons kan opslaan in je lijst,</span>
                <span>en zo met je vrienden kan delen!</span>
            </p>
            </div>
</div>
        </>
    )
}