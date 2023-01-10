import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getCookie from "../scripts/cookies"

const API_URL = "https://pokeapi.co/api/v2/"

export default function PokemonDetails() {
    const [details, setDetails] = useState([]);
    const [species, setSpecies] = useState([]);
    const [evoChain, setEvoChain] = useState([]);
    const [pokemonNames, setPokemonNames] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const navigate = useNavigate();
    const pokemonName = useParams().name

    function getId() {
        for(let i = 0; i < pokemonNames.length; i++) {
            if(pokemonNames[i].name === pokemonName) {
                return i;
            }
        }
    }

    function setFav(cname, cvalue) {
        console.log(cvalue)
        const d = new Date();
        let same = false;
        let msplit = false;
        let mindex;
        cvalue = parseInt(cvalue);
        if (getCookie("FavPokemon") !== "") {
            if (getCookie("FavPokemon").indexOf(",") < 0) {
                let tempArr = [];
                let currentCookie = getCookie("FavPokemon");
                currentCookie = currentCookie.replace(/\[/g, "");
                currentCookie = currentCookie.replace(/\]/g, "");
                currentCookie = parseInt(currentCookie);
                if (currentCookie === cvalue) {
                    same = true;
                }
                tempArr.push(currentCookie);
                tempArr.push(parseInt(cvalue));
                cvalue = JSON.stringify(tempArr);
            } else {
                let currentCookie = getCookie("FavPokemon");
                let tempArr = [];
                const split = currentCookie.split(",");
                for (let i = 0; i < split.length; i++) {
                    split[i] = split[i].replace(/\[/g, "")
                    split[i] = split[i].replace(/\]/g, "")
                    // eslint-disable-next-line
                    split[i] = split[i].replace(/\"/g, "")
                    split[i] = parseInt(split[i]);
                    if (split[i] === cvalue) {
                        mindex = i;
                        msplit = true;
                    }
                    tempArr.push(parseInt(split[i]))
                }
                split.push(parseInt(cvalue))
                if (msplit) {
                    split.splice(mindex, 1);
                    split.pop();
                }
                cvalue = JSON.stringify(split);
            }
        }
        if (same) {
            if (cvalue.length > 3) {
                cvalue = "";
            } else {

            }
        }
        d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getData() {
        fetch(API_URL + "pokemon/" + pokemonName)
            .then(res => res.json())
            .then(
                (result) => {
                    setDetails(result)
                    fetch(result.species.url)
                        .then(res => res.json())
                        .then(
                            (result) => {
                                setSpecies(result)
                                fetch(result.evolution_chain.url)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            setEvoChain(result)
                                        }
                                    )
                            }
                        )
                }
            )
        fetch(API_URL + "pokemon?limit=1000")
            .then(res => res.json())
            .then(
                (result) => {
                    setPokemonNames(result.results)
                }
            )
    }

    function getEvolutions(evo) {
        const arr = [];
        let pIndex;
        if (evoChain.chain.species.name !== undefined) {
            arr.push(evoChain.chain.species.name)
            if (evoChain.chain.evolves_to[0].species.name !== undefined) {
                arr.push(evoChain.chain.evolves_to[0].species.name)
                if (evoChain.chain.evolves_to[0].evolves_to[0].species.name !== undefined) {
                    arr.push(evoChain.chain.evolves_to[0].evolves_to[0].species.name)
                }
            }
        }
        for (let i = 0; i < arr.length; i++) {
            if (pokemonName === arr[i]) {
                pIndex = i;
            }
        }
        if (evo) {
            if (pIndex !== 0) {
                getData();
                navigate(`../pokemondetails/${arr[pIndex - 1]}`)
                navigate(0)
            }
        } else if (!evo) {
            if (pIndex !== arr.length - 1) {
                getData();
                navigate(`../pokemondetails/${arr[pIndex + 1]}`)
                navigate(0)
            }
        }
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (details.length !== 0 && evoChain.length !== 0) {
            setIsLoaded(true);
        }
    }, [details, evoChain])

    if (!isLoaded) {
        return <div>Loading...</div>
    } if (isLoaded) {
        return (
            <>
                <div id="details">
                    <h1>{details.forms[0].name}</h1>
                    <img
                        src={details.sprites.other['official-artwork'].front_default} alt="" />
                </div>
                <div>
                    <button onClick={() => getEvolutions(true)} id="nEvo">Previous Evolution</button>
                    <button onClick={() => getEvolutions(false)} id="pEvo">Next Evolution</button>
                    <button onClick={() => setFav("FavPokemon", getId())}>Favourite</button>
                </div>
            </>
        )
    }
}