import data from '../data/db.json'
import Button from './components/button/Button'
import HomePage from './components/home/Home'

export default function Home() {
  


  return (
   <>
   <HomePage categories={data.categories} />
   </>
  )
}
