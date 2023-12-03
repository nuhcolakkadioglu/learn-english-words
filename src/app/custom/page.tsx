"use client"
import Word from '../components/word/Word'
import data from '../../data/custom.json'
import { useEffect, useState } from 'react';
import Button from '../components/button/Button';
import ReactAudioPlayer from 'react-audio-player';
import next from 'next';

const page = () => {
    let wordList: any = data.words;
    const [hidden, setHidden] = useState<boolean>(false);
    const [nextIndex, setNextIndex] = useState<number>(0);
    const [words, setWords] = useState<any[]>([]);
    const [ilearnedTotal, setIlearnedTotal] = useState(0);
    const [rndIndex, setRndIndex] = useState<number>(0);
    const [ses, setSes] = useState<any>("");

    useEffect(() => {
        const userLocalStorageWordList = JSON.parse(localStorage.getItem("word-user") || '[]');
        setIlearnedTotal(userLocalStorageWordList.length);
        if (userLocalStorageWordList !== null) {
            let newvalue = wordList.filter((m: any) => !userLocalStorageWordList.some((x: any) => x.id === m.id));
            setWords(newvalue);
        } else {
            setWords(wordList);
        }
       // loadSound(words[nextIndex]?.ENG);
    }, [nextIndex])

    const handleNext = () => {
        setHidden(false);
        setRndIndex((Math.round(Math.random() * (words.length - ilearnedTotal))));

        // if (nextIndex < words.length - ilearnedTotal) {
        //     setNextIndex(rndIndex);
        // }
       if (nextIndex < words.length-1) {
            setNextIndex(prev => prev + 1);
       }

        else {
            // setNextIndex(0);
            alert("The End");
        }
        console.log(ilearnedTotal);
    }

    const handleLearned = (value: any) => {
        if (value === undefined)
            return;

        if (localStorage.getItem('word-user')) {
            const userWordList = JSON.parse(localStorage.getItem("word-user") || '[]');
            localStorage.removeItem('word-user')
            let exist = userWordList.find((item: any) => item.id == value.id)
            exist || userWordList.push({ id: value.id, ENG: value.ENG, TR: value.TR, categoryId: value.categoryId });
            localStorage.setItem('word-user', JSON.stringify(userWordList))
        } else {
            localStorage.setItem('word-user', JSON.stringify([{ id: value.id, ENG: value.ENG, TR: value.TR, categoryId: value.categoryId }]))
        }
        setHidden(false);
        setNextIndex(prev => prev + 1);

    }

    const loadSound = (word: string) => {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(request => request.json())
            .then(data => {
                if (data[0]?.phonetics[0]?.audio !== "")
                    setSes(data[0]?.phonetics[0]?.audio)
                else if (data[0]?.phonetics[1]?.audio !== "")
                    setSes(data[0]?.phonetics[1]?.audio)
                else if (data[0]?.phonetics[2]?.audio !== "")
                    setSes(data[0]?.phonetics[2]?.audio)
                else
                setSes(data[0]?.phonetics[3]?.audio)
                // setSes(data[0]?.phonetics[0]?.audio === "" ? data[0]?.phonetics[1]?.audio : data[0]?.phonetics[0]?.audio )
            });


    }

    return (
        <div className='container-fluid mt-2'>
            <div className="row">

                <div className="bg-dark-subtle">
                    <div className="px-6 py-4">
                        <div className="fs-1 text-center">{words[nextIndex]?.ENG}</div>
                        <div className="fs-1 text-center">{hidden && words[nextIndex]?.TR}.</div>
                        {
                            <div className='text-center'>
                                <ReactAudioPlayer
                                    src={ses}
                                    controls
                                />
                            </div>
                        }
                    </div>
                    <p className="text-center">
                        Total Word: {words.length}
                    </p>
                    <p className="text-center">
                        I Learned Total: {ilearnedTotal}
                    </p>
                    <p className="text-center">
                        I Learned Total: {nextIndex}
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        {/* <Button onClick={() => handleLearned(words[nextIndex])} className="btn btn-success">Learned</Button> */}
                        <Button
                            onClick={() => setHidden(!hidden)}
                            className="btn btn-warning">Show</Button>

                        <Button
                            onClick={handleNext}
                            className="btn btn-primary">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page