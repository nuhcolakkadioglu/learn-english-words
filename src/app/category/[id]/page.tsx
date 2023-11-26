
import Button from '@/app/components/button/Button';
import data from '../../../data/db.json'
import Link from 'next/link';
import Word from '@/app/components/word/Word';
const page = ({ params }: { params: { id: number } }) => {
   
    let wordList = data.words.filter(item=>item.categoryId==params.id)
  
    return (
       <Word wordList={wordList} />

    )
}

export default page