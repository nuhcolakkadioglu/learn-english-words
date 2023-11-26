"use client"
import React, { useState, useEffect } from 'react'
import Button from '../button/Button'

const Word = ({ wordList }: { wordList: any }) => {
    const [hidden, setHidden] = useState<boolean>(false);
    const [nextIndex, setNextIndex] = useState<number>(0);
    const [words, setWords] = useState([]);


    useEffect(() => {
        const userLocalStorageWordList = JSON.parse(localStorage.getItem("word-user")|| '[]');

        if (userLocalStorageWordList !== null) {
            let newvalue = wordList.filter((m:any) => !userLocalStorageWordList.some((x :any)=> x.id === m.id));
            setWords(newvalue);


        } else {
            setWords(wordList);
        }

    }, [nextIndex])

    const handleNext = () => {
        setHidden(false);
        if (nextIndex < wordList.length - 1)
            setNextIndex(prev => prev + 1);
        else {
            alert("The End");
        }
    }

    const handleLearned = (value:any) => {
        //let randomUser = `User-${Math.round(Math.random() * 17976931348623)}`;

        if (localStorage.getItem('word-user')) {
            const userWordList =  JSON.parse(localStorage.getItem("word-user")|| '[]');
            localStorage.removeItem('word-user')
            let exist = userWordList.find((item:any) => item.id === value.id)
            exist || userWordList.push({ id: value.id, ENG: value.ENG, TR: value.TR, categoryId: value.categoryId });
            localStorage.setItem('word-user', JSON.stringify(userWordList))
        } else {
            localStorage.setItem('word-user', JSON.stringify([{ id: value.id, ENG: value.ENG, TR: value.TR, categoryId: value.categoryId }]))
        }
    }

    let item:any = words[nextIndex];

    return (
        <div className='container-fluid mt-2'>
            <div className="row">

                <div className="bg-dark-subtle">
                    <div className="px-6 py-4">
                        <div className="fs-1 text-center">{item?.ENG}</div>
                        <div className="fs-1 text-center">{hidden && item?.TR}.</div>
                    </div>
                    <p className="text-center">
                        Total Word Count: {words.length}
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <Button onClick={() => handleLearned(item)} className="btn btn-success">I Learned</Button>
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

export default Word