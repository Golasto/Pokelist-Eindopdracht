import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getCookie from "../scripts/Cookies"
import { AuthContext } from "../context/AuthContext";

const API_URL = "https://pokeapi.co/api/v2/"

export default function PokemonDetails() {
    const [details, setDetails] = useState([]);
    const [species, setSpecies] = useState([]);
    const [evoChain, setEvoChain] = useState([]);
    const [pokemonNames, setPokemonNames] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const {isAuth} = useContext(AuthContext)

    const navigate = useNavigate();
    const pokemonName = useParams().name

    function getId() {
        for(let i = 0; i < pokemonNames.length; i++) {
            if(pokemonNames[i].name === pokemonName) {
                return i;
            }
        }
    }

    function checkFav(cname, cvalue) {
        let same = false;
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
                        same = true;
                    }
                    tempArr.push(parseInt(split[i]))
                }
            }
            return same;
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
        d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 30));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getData(pname) {
        fetch(API_URL + "pokemon/" + pname)
            .then(res => res.json())
            .then(
                (result) => {
                    setDetails(result)
                    console.log("test")
                    fetch(result.species.url)
                        .then(res => res.json())
                        .then(
                            (result) => {
                                setSpecies(result)
                                try {
                                    fetch(result.evolution_chain.url)
                                        .then(res => res.json())
                                        .then(
                                            (result) => {
                                                setEvoChain(result)
                                            }
                                        )
                                } catch (e) {
                                    setEvoChain(null)
                                }
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

    function getEvolutions(evo, onload) {
        const arr = [];
        let pIndex;
        if (evoChain !== null) {
            if (evoChain.chain.species.name !== undefined) {
                arr.push(evoChain.chain.species.name)
                if (evoChain.chain.evolves_to[0] !== undefined) {
                    if (evoChain.chain.evolves_to[0].species.name !== undefined) {
                        arr.push(evoChain.chain.evolves_to[0].species.name)
                        if (evoChain.chain.evolves_to[0].evolves_to[0] !== undefined) {
                            if (evoChain.chain.evolves_to[0].evolves_to[0].species.name !== undefined) {
                                arr.push(evoChain.chain.evolves_to[0].evolves_to[0].species.name)
                            }
                        }
                    }
                }
            }
        } else{
            return 0
        }
        for (let i = 0; i < arr.length; i++) {
            if (pokemonName === arr[i]) {
                pIndex = i;
            }
        }
        if (evo) {
            if (pIndex !== 0) {
                if (!onload) {
                    navigate(`../pokemondetails/${arr[pIndex - 1]}`)
                    setIsLoaded(false)
                    getData(arr[pIndex - 1]);
                }
                return 1
            }
            } else if (!evo) {
                if (pIndex !== arr.length - 1) {
                    if (!onload) {
                        navigate(`../pokemondetails/${arr[pIndex + 1]}`)
                        setIsLoaded(false)
                        getData(arr[pIndex + 1]);
                    }
                    return 2
                }
            }
        return 0
    }

    useEffect(() => {
        if (!isAuth) {
            navigate("../")
        }
        getData(pokemonName);
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (evoChain !== null) {
            if (details.length !== 0 && evoChain.length !== 0) {
                setIsLoaded(true);
            }
        } else {
            if (details.length !== 0) {
                setIsLoaded(true);
            }
        }
    }, [details, evoChain])

    if (!isLoaded) {
        return <div>Loading...</div>
    } if (isLoaded) {
        return (
            <>
                <div className='details-pagina'>
                <div id="pokemon-Details">
                    {details.sprites.other['official-artwork'].front_default === null ?
                        <img className='pokemonImg'
                             src={process.env.PUBLIC_URL + "/Picture_Not_Yet_Available.png"} alt="PNYA" /> :
                        <img className='pokemonImg'
                             src={details.sprites.other['official-artwork'].front_default} alt="" />
                    }
                    <h1 className='pokemonName'>{details.forms[0].name}</h1>
                </div>
                <div className='button-container'>
                    {   checkFav("FavPokemon", getId()) === true ?
                        <button onClick={() => setFav("FavPokemon", getId())} className='fav-Button-off'>Favourite</button> :
                        <button onClick={() => setFav("FavPokemon", getId())} className='fav-Button'>Favourite</button>
                    }
                    { getEvolutions(false, true) === 2 ?
                        <button onClick={() => getEvolutions(false, false)} id="pEvo" className='nex-Evo'>Next Evolution</button> :
                        <button onClick={() => getEvolutions(false, false)} id="pEvo" className='nex-Evo-off'>Next Evolution</button>
                    }
                    { getEvolutions(true, true) === 1 ?
                        <button onClick={() => getEvolutions(true, false)} id="nEvo" className='pre-Evo'>Previous Evolution</button> :
                        <button onClick={() => getEvolutions(true, false)} id="nEvo" className='pre-Evo-off'>Previous Evolution</button>
                    }
                </div>
                </div>
            </>
        )
    }
}