const pathURL = "https://api.themoviedb.org/3/movie/550?api_key=26662e6a4467a4908059a801f228fb42"

const movieTitle = document.querySelectorAll(".display__title")
const movieYear = document.querySelectorAll(".display__year")
const movieScore = document.querySelectorAll(".display__score")
const movieGenre = document.querySelectorAll(".display__genres")
const movieImg = document.querySelectorAll(".display__img")
const movieDesc = document.querySelectorAll(".display__description")

let movieData;

let base_url = `https://image.tmdb.org/t/p/`;
let file_size = `w500`;


const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

function getGenreById(id) {
  const genre = genres.find((genre) => {
    return genre.id === id
  })
  return genre.name
}




function displayMovies(movies) {
  movies.forEach((movie, index) => {
    movieTitle[index].innerHTML = movie.title
    movieYear[index].innerHTML = movie.release
    movieScore[index].innerHTML = movie.voteAverage + " / 10"
    movieDesc[index].innerHTML = movie.overview
    let imgURL = base_url + file_size + movie.halfSrc
    movieImg[index].src = imgURL
    const genres = movie.genres.map((id) => {
      return getGenreById(id)
    })

    movieGenre[index].innerHTML = genres.join(', ')
      console.log(movie, genres)
  })
}


const spookyButton = document.querySelector(".buttons__spooky-pushable")
const energyButton = document.querySelector(".buttons__energy-pushable")
const chillButton = document.querySelector(".buttons__chill-pushable")



spookyButton.addEventListener("click", () => {
  const randomMovies = []
  const prevIndexes = []
  for (let i = 0; randomMovies.length < 3; i++) {
    const index = Math.floor(Math.random() * 20)
    if (!prevIndexes.includes(index)) {
       randomMovies.push(scaryMovies[index])
       prevIndexes.push(index)
    }
   
  }
  displayMovies(randomMovies)
})

energyButton.addEventListener("click", () => {
  const randomMovies = []
  const prevIndexes = []
  for (let i = 0; randomMovies.length < 3; i++) {
    const index = Math.floor(Math.random() * 20)
    if (!prevIndexes.includes(index)) {
       randomMovies.push(energyMovies[index])
       prevIndexes.push(index)
    }
   
  }
  displayMovies(randomMovies)
})

chillButton.addEventListener("click", () => {
  const randomMovies = []
  const prevIndexes = []
  for (let i = 0; randomMovies.length < 3; i++) {
    const index = Math.floor(Math.random() * 20)
    if (!prevIndexes.includes(index)) {
       randomMovies.push(chillMovies[index])
       prevIndexes.push(index)
    }
   
  }
  displayMovies(randomMovies)
})



class MovieButton {
    constructor(genre1, genre2){
        this.genre1 = genre1;
        this.genre2 = genre2;
        this.page = Math.floor(Math.random() * 10 +1)
    }
    getFullURL() {
        let randomPage = `&page=${this.page}`
        let addition = `&language=en-US&include_video=false${randomPage}&with_genres=${this.genre1}%2C${this.genre2}`;
        let pathURL = `https://api.themoviedb.org/3/discover/movie?api_key=26662e6a4467a4908059a801f228fb42`;
        let full = pathURL + addition;
        return full;
    }
}
const scareMe = new MovieButton(27, 53)


const energizeMe = new MovieButton(28, 12)
const netNChill = new MovieButton(18, 10749)
let scaryMovies = [];
axios.get(`${scareMe.getFullURL()}`)
.then((res) => {
    for ( let i = 0; i < 20; i++){
        scaryMovies.push({
            title: res.data.results[i].title,
            overview: res.data.results[i].overview,
            voteAverage: res.data.results[i].vote_average,
            release: res.data.results[i].release_date,
            genres: res.data.results[i].genre_ids,
            halfSrc: res.data.results[i].poster_path,
    });
    }
})
.catch(err => console.log(err))


let energyMovies = [];
axios.get(`${energizeMe.getFullURL()}`)
.then((res) => {
    for ( let i = 0; i < 20; i++){
        energyMovies.push({
            title: res.data.results[i].title,
            overview: res.data.results[i].overview,
            voteAverage: res.data.results[i].vote_average,
            release: res.data.results[i].release_date,
            genres: res.data.results[i].genre_ids,
            halfSrc: res.data.results[i].poster_path,
    });
    }
})
.catch(err => console.log(err))

let chillMovies = [];
axios.get(`${netNChill.getFullURL()}`)
.then((res) => {
    for ( let i = 0; i < 20; i++){
        chillMovies.push({
            title: res.data.results[i].title,
            overview: res.data.results[i].overview,
            voteAverage: res.data.results[i].vote_average,
            release: res.data.results[i].release_date,
            genres: res.data.results[i].genre_ids,
            halfSrc: res.data.results[i].poster_path,
    });
    }
})
.catch(err => console.log(err))

plays = 0
document.addEventListener('click', e => {
    let play = document.querySelector('.audio-player');
    if (plays === 0){
    play.autoplay = true;
    play.load();
    plays = 1;
    } else {
        play.volume = 0.05;
    }
})
