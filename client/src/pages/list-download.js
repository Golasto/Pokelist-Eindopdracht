import getCookie from "../scripts/cookies";
import {useState} from "react";

export function ListDownload() {

    const [file, setFile] = useState()
    const fileReader = new FileReader()
    const [fileData, setFileData] = useState([])

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
                setFileData(csvOutput)
                console.log('test')
            };
            fileReader.readAsText(file);
        }
    };
    function downloadFile() {
        let tempArr = [];
        const favPokemons = getCookie("FavPokemon");
        const split = favPokemons.split(",");
        for (let i = 0; i < split.length; i++) {
            split[i] = split[i].replace(/\[/g, "")
        split[i] = split[i].replace(/\]/g, "")
            // eslint-disable-next-line
            split[i] = split[i].replace(/\"/g, "")
            split[i] = parseInt(split[i]);
            tempArr.push(parseInt(split[i]))
        }
        let csv = "FavPokemon\n"
        csv += tempArr.join(',');

        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank'

        hiddenElement.download = 'Fav Pokemon.csv';
        hiddenElement.click();
    }
    return(
        <>
            <div className='options'>
        <div className='downloadCard'>
            <p className='download-tekst'>
                <span>Klaar met je lijst?</span> <span>Download hem Hier!</span></p>
            <button onClick={() => downloadFile()} className='download-button'>Download</button>
        </div>
            <div className="uploadCard">
                <p className='upload-tekst'><span>Of upload hier</span> <span>een nieuwe lijst!</span></p>
                <form className='uploadCard-buttons'>
                    <input className='upload-button'
                        type={"file"}
                        id={"csvFileInput"}
                        accept={".csv"}
                        onChange={handleOnChange}
                    />
                    <button className='submit-button'
                        onClick={(e) => { handleOnSubmit(e); }}>Submit
                    </button>
                </form>

            </div>
            </div>
        </>
    )
}
