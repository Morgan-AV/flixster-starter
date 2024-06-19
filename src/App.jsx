import './App.css'
import MovieCard from './Components/MovieCard/MovieCard'
import MovieList from './Components/MovieList/MovieList'
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";





const App = () => {



  return(
    <div className="App">
        
      <div>
        <Header />
      </div>

      <MovieList />
      {/* <button className="load-more">Load More</button> */}
      
      <div>
        <Footer />
      </div>

    </div>
  )
}




export default App
