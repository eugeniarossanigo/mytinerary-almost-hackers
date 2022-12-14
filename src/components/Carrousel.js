import '../styles/Carrousel.css'
import Arrow from './Arrow';
import {useState, useEffect} from 'react'
import {Link as LinkRouter} from 'react-router-dom'
import { useGetAllCitiesQuery } from '../features/citiesAPI'

function Carrousel(props) {
    const {data: cities} = useGetAllCitiesQuery()
    let citiesArray = cities?.response
    const range = props.range
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(start + range)
    const [idInterval, setIdInterval] = useState()
    const slides = props.slides * range
    const interval = props.interval * 1000

    useEffect(() => {
        let idNew = setInterval(function () {
            nextSlide()
        }, interval)
        setIdInterval(idNew)
        return () => clearInterval(idNew)
    }, [start])

    let previousSlide = () => {
        if (start >= range) {
            setStart(start-range)
            setEnd(end-range)
        } else {
            setStart(slides-range)
            setEnd(slides)
        }
        clearInterval(idInterval)
    }

    let nextSlide = () => {
        if (end < slides) {
            setStart(start+range)
            setEnd(end+range)
        } else {
            setStart(0)
            setEnd(range)
        }
        clearInterval(idInterval)
    }

    const citiesView = (city) => (
        <LinkRouter key={city._id} className="card" to={"cities/"+city._id}>
            <div className="Carrousel-pic">
                <img src={city.photo} alt="city"/>
                <h3>{city.city}</h3>
            </div>
        </LinkRouter>
    )

  return (
    <>
        <div className="Carrousel-main">
        <h2>Popular MyTineraries</h2>
        <div className="Carrousel-container">
            <Arrow icon={"./images/arrow-left.png"} click={previousSlide} />
            <div className="Carrousel-img-container">
                {citiesArray?.slice(start, end).map(citiesView)}
            </div>
            <Arrow icon={"./images/arrow-right.png"} click={nextSlide}/>
        </div>
        </div>
    </>
  );
}

export default Carrousel;
