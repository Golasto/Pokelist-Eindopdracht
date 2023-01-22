import { useState, useEffect, useContext } from 'react';
import Nav from '../components/navbar';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from "../context/authProvider";

const API_URL = "https://pokeapi.co/api/v2/"

const Search = () => {
    const [pokemonNames, setPokemonNames] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [types, setTypes] = useState([]);
    const navigate = useNavigate()
    const value = useContext(AuthContext)

    function getNames() {
        const input = document.getElementById("searchbar").value
        const tempArr = [];
        for (let i = 0; i < pokemonList.length; i++) {
            document.getElementById(i).style.display = "none";
            let pokemonName = pokemonList[i].name
            if (pokemonName.includes(input)) {
                tempArr.push(i)
            }
        }
        for (let i = 0; i < tempArr.length; i++) {
            document.getElementById(tempArr[i]).style.display = "block";
        }
    }

    async function setPokemonTypes(){
        const typeValue = document.getElementById("types").value;
        let arr = []
        if (typeValue === "") {
        setPokemonList(pokemonNames)
        } else {
            const response = await fetch(API_URL + 'type/' + typeValue);
            const data = await response.json()
            const pokemonType = data.pokemon;
            for (let i = 0; i < pokemonType.length; i++) {
                arr.push(pokemonType[i].pokemon)
            }
            setPokemonList(arr)
        }
    }

    useEffect(() => {
        fetch(API_URL + "pokemon?limit=1000")
            .then(res => res.json())
            .then(
                (result) => {
                    setPokemonNames(result.results)
                    setPokemonList(result.results)
                }
            )
        fetch(API_URL + "type?limit=18")
            .then(res => res.json())
            .then(
                (result) => {
                    setTypes(result.results)
                }
            )
    }, [])


    useEffect(() => {
        if (!value.isAuth.isAuth) {
            navigate("../")
        }
        if (pokemonNames.length !== 0) {
            setIsLoaded(true);
        }
    }, [pokemonNames])

    if (!isLoaded) {
        return <div>Loading...</div>
    } if (isLoaded) {
        console.log(types)
        return (
            <>
                <div className='favorite-list'>
                    <div className='searchContainer'>
                    <input id="searchbar" type="text" placeholder='  Type hier je Pokemon...' onInput={() => getNames()}></input>
                        <select id='types' onInput={() => setPokemonTypes()}>
                            <option value=''>Select Type</option>
                            {types.map((t, index) =>
                            <option key={index} value={t.name}>{t.name}</option>
                            )}
                        </select>
                    </div>
                    {pokemonList.map((p, index) =>
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