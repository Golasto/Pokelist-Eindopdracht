import { useEffect, useState, useContext } from 'react';
import getCookie from "../scripts/Cookies"
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const API_URL = "https://pokeapi.co/api/v2/"

function Favorite() {
    const [pokemonNames, setPokemonNames] = useState([]);
    const [favPokemons, setFavPokemons] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate()
    const value = useContext(AuthContext)

    function getFav() {
        let tempArr = [];
        if (getCookie("FavPokemon") !== "") {
            if (getCookie("FavPokemon").indexOf(",") < 0) {
                let currentCookie = getCookie("FavPokemon");
                currentCookie = currentCookie.replace(/\[/g, "");
                currentCookie = currentCookie.replace(/\]/g, "");
                currentCookie = parseInt(currentCookie);
                tempArr.push(currentCookie);
            } else {
                let currentCookie = getCookie("FavPokemon");
                const split = currentCookie.split(",");
                for (let i = 0; i < split.length; i++) {
                    split[i] = split[i].replace(/\[/g, "")
                    split[i] = split[i].replace(/\]/g, "")
                    // eslint-disable-next-line
                    split[i] = split[i].replace(/\"/g, "")
                    split[i] = parseInt(split[i]);
                    tempArr.push(parseInt(split[i]))
                }
            }
        }
        return tempArr
    }

    function setFavPokemon() {
        const arr = [];
        const favList = getFav();
        console.log(favList)
        for(let i = 0; i < favList.length; i++) {
            arr.push(pokemonNames[favList[i]])
        }
        setFavPokemons(arr)
    }

    useEffect(() => {
        fetch(API_URL + "pokemon?limit=1000")
            .then(res => res.json())
            .then(
                (result) => {
                    setPokemonNames(result.results)
                }
            )
    }, [])

    useEffect(() => {
        if (!value.isAuth.isAuth) {
            navigate("../")
        }
        if (pokemonNames.length !== 0) {
            setFavPokemon();
            setIsLoaded(true);
        }
    }, [pokemonNames])

    if (!isLoaded) {
        return <div>Loading...</div>
    } if (isLoaded) {
        return (
            <>
                <h1 className="poketitel">Pokelist:</h1>
                <div>
                    {favPokemons.map((p, index) =>
                        <li id={index} key={index} className="pokemons">
                            <Link to={`../pokemondetails/${p.name}`} className='pokeNames'>{p.name}</Link>
                        </li>
                    )}
                </div>
            </>
        )
    }
}

export default Favorite