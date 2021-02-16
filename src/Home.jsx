import { useEffect, useState } from 'react'
import axios from 'axios'
import Arrow from './play.svg'

const Card = ({ title, poster, genre, director, stars, date, runTime, language, votes }) => {
  return (
    <div className="container bg-white text-gray-700 px-2 py-2 rounded">
      <div className="grid grid-cols-6 gap-2 place-center h-full">
        <div className="flex flex-col items-center justify-around">
          <img src={Arrow} className="w-5 transform -rotate-90" alt="Upvote" />
          {votes}
          <img src={Arrow} className="w-5 transform rotate-90" alt="Downvote" />
        </div>
        <img src={poster} alt={title} className="w-full self-center justify-self-center" />
        <div className="col-span-4 text-left flex flex-col items-start justify-between overflow-hidden">
          <span className="text-xl font-bold">{title}</span>
          <span><b>Genre</b>:&nbsp;{genre}</span>
          <span><b>Director</b>:&nbsp;{director}</span>
          <span className="truncate w-full"><b>Starring</b>:&nbsp;{stars}</span>
          <span>{`${runTime || 'X'} mins`} | {language} | {date}</span>
        </div>
        <button className="col-span-full bg-blue-400 text-white rounded py-1">Watch Movie</button>
      </div>
    </div>
  )
}

const Dialog = ({ isOpen, onClose }) => {
  return (
    <div className={`${!isOpen && 'hidden'} bg-white w-max px-6 py-4 flex flex-col items-start justify-start rounded mx-auto mt-3`}>
      <span className="leading-8 text-lg font-bold">GeekSynergy Technologies Pvt. Ltd.</span>
      <span className="leading-6">Sanjay Nagar, Bangaluru - 56</span>
      <span className="leading-6"><b>Mob:</b> XXXXXXXX09</span>
      <span className="leading-6"><b>Email:</b>XXXXX@gmail.com</span>
      <button className="mt-2 ml-auto px-3 py-2 bg-blue-500 text-white rounded-md" onClick={onClose}>Close</button>
    </div>
  )
}


const Home = () => {
  const API = 'https://hoblist.com/movieList'

  const [state, setState] = useState([])
  const [error, setError] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const getMovieList = async () => {
    const body = { category: "movies", language: "kannada", genre: "all", sort: "voting" };
    const res = await axios.post(API, body)
    setState(res.data.result)
  }

  useEffect(() => {
    if (!state || !state.length)
      getMovieList().catch(error => {
        setError(error.message)
      })
  })

  return (
    <div className="container text-center">
      <div className={'container bg-white mx-auto w-11/12 py-2 px-6 mt-4 rounded-md flex flex-row justify-between items-center'}>
        <span className="text-lg font-bold leading-5 tracking-wider">Kannada Movie List</span>
        <button className="bg-blue-500 px-2 py-2 rounded text-white" onClick={() => setDialogOpen(true)}>Company Info</button>
      </div>
      <span className={`text-white bg-red-400 text-base w-1/2 rounded mx-auto block text-center px-2 py-1 mt-3 ${!error && 'hidden'}`}>{error}</span>
      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />
      <div className="grid grid-cols-3 w-screen h-full px-6 py-6 place-center gap-4">
        {
          state.length &&
          state.map(movie => {
            return <Card
              key={movie._id}
              title={movie.title}
              poster={movie.poster}
              director={movie.director}
              stars={movie.stars}
              genre={movie.genre}
              language={movie.language}
              runTime={movie.runTime}
              date={new Date(movie.releasedDate).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
              votes={movie.totalVoted}
            />
          })
        }
      </div>
    </div>
  )
}

export default Home
