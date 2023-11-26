"use client"
import React, { useState } from 'react'
import Button from '../button/Button'

const Word = ({ wordList }: { wordList: any }) => {
    const [hidden, setHidden] = useState<boolean>(false);
    const [nextIndex, setNextIndex] = useState<number>(0);


    const handleNext = () => {
        setHidden(false);
        if (nextIndex < wordList.length - 1)
            setNextIndex(prev => prev + 1);
        else {
            alert("The End");
        }
    }
    let item = wordList[nextIndex];

    return (
        <div className='container-fluid mt-2'>
            <div className="row">

                <div className="bg-dark-subtle">
                    <div className="px-6 py-4">
                        <div className="fs-6">{item?.ENG}</div>
                        <div className={``}>{hidden && item?.TR}.</div>
                    </div>
                    <p className="text-center	 ">
                        Total Word Count: {wordList.length}
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <Button className="btn btn-success">I Learned</Button>
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