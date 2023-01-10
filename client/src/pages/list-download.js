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
            <p>Klaar met je lijst? Download hem Hier!</p>
            <button onClick={() => downloadFile()}>Download</button>
        </div>
            <div className="uploadCard">
                <p>Of upload hier een nieuwe lijst!</p>
                <form>
                    <input
                        type={"file"}
                        id={"csvFileInput"}
                        accept={".csv"}
                        onChange={handleOnChange}
                    />
                    <button
                        onClick={(e) => {
                            handleOnSubmit(e);
                        }}
                    ></button>
                </form>

            </div>
            </div>
        </>
    )
}
