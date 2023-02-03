import { useState } from 'react';
import { useEffect } from 'react';
import Nav from '../components/navbar';
import { Link } from 'react-router-dom';

const API_URL = "https://pokeapi.co/api/v2/"

const Search = () => {
    const [pokemonNames, setPokemonNames] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    function getNames() {
        const input = document.getElementById("searchbar").value
        const tempArr = [];
        for (let i = 0; i < pokemonNames.length; i++) {
            document.getElementById(i).style.display = "none";
            let pokemonName = pokemonNames[i].name
            if (pokemonName.includes(input)) {
                tempArr.push(i)
            }
        }
        for (let i = 0; i < tempArr.length; i++) {
            document.getElementById(tempArr[i]).style.display = "block";
        }
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
        if (pokemonNames.length !== 0) {
            setIsLoaded(true);
        }
    }, [pokemonNames])

    if (!isLoaded) {
        return <div>Loading...</div>
    } if (isLoaded) {
        return (
            <>
                <div className='favorite-list'>
                    <div className='searchContainer'>
                    <input id="searchbar" type="text" placeholder='  Type hier je Pokemon...' onInput={() => getNames()}></input>
                    </div>
                    {pokemonNames.map((p, index) =>
                        <li id={index} key={index} className="pokemons">
                            <Link to={`../pokemondetails/${p.name}`} className='pokeNames'>{p.name}</Link>
                        </li>
                    )}
                </div>
            </>
        )
    }
}
export default Search