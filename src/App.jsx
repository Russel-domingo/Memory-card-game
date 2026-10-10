import { use, useEffect, useState } from "react";
import HeroCard from "./components/HeroCard";
import "./App.css"
const API_URL = "https://api.opendota.com/api/heroStats";
const IMAGE_BASE_URL = "https://cdn.cloudflare.steamstatic.com";
function App() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [score, setScore] = useState(0);
  const [clickedHeroes, setClickedHeroes] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  // let currentBestScore = 5;

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error("Failed to fetch heroes");
        }

        const data = await response.json();

        setHeroes(data.slice(0, 12));
      } catch(error) {
        setError(error.message);
      } finally {
        setLoading(false)
      }
    }

    fetchHeroes();
  }, []);

  function handleHeroClick(hero) {
    if(clickedHeroes.includes(hero.id)) {
      setGameOver(true);
      return
    }

    setClickedHeroes((previous) => [...previous, hero.id]);
    setScore((previous) => previous + 1);
  }

  if (loading) {
    return <h1>Heroes are being summons</h1>
  }

  if (error) {
    return <h1>Error: {error}</h1>
  }
  // function handleClick() {
  //   setScore(score + 1);
  // }

  return(

    <main className="game">
      <header className="game-header">
        <p>The battle of the Ancient</p>
        <h1>Hero Memory</h1>
        <p>
          Choose your heroes. Never choose the same hero twice.
        </p>
      </header>

      <div className="scoreboard"></div>

      <section className="hero-grid">
        {heroes.map((hero) => {
          return  <HeroCard 
            key={hero.id}
            hero={hero}
            imageUrl={`${IMAGE_BASE_URL}${hero.img}`  }
            onClick={() => handleHeroClick(hero)}
            >
          </HeroCard>
         
        })}
      </section>
    </main>
    // <div>
    //   <h1>Card Game</h1>
    //   <p>Best Score {score > currentBestScore ? score : currentBestScore} </p>
    //   <p>Current Score: {score}</p>
    //   <button onClick={handleClick}>Add Score</button>
    // </div>
  )
}

export default App;