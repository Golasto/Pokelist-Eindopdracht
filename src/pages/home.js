import {useContext, useEffect} from "react";
import { AuthContext } from "../context/authProvider";

export function Home() {
    const value = useContext(AuthContext)

    useEffect(() => {
        value.getData();
    }, [])

    return(
        <>
<div className='home-intro'>
    <h1 className='Pokelist'>PokeList</h1>
    {
        value.isAuth.isAuth ? <p>Welkom {value.user.username}</p> :
            <p style={{display: "none"}}></p>
    }
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
