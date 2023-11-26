"use client"

import { useEffect, useState } from "react";

const page = () => {
    const [words, setWords] = useState([]);

    useEffect(() => {
        const userLocalStorage = JSON.parse(localStorage.getItem("word-user")|| '[]');
        if (userLocalStorage !== null) {
            setWords(userLocalStorage);

        }
    }, []);
    console.log(words);
    return (
        <div className='container text-center mt-5'>
            <h1>Total Word Count {words.length}</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>EN</th>
                        <th>TR</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        words.map(item =>(
                           <tr key={item.id}>
                                <td>{item.ENG}</td>
                                <td>{item.TR}</td>
                           </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default page