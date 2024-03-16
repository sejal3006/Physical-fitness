import React, {useState, useEffect} from 'react'
import { Image } from '../Components/Image'
import './Screen.css'

const Home = () => {

   const [exerciseList, setExerciseList] = useState([]);
   const [filteredEx, setFilteredEx] = useState([]);
   

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://exercisedb.p.rapidapi.com/exercises?limit=100', {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '754a265ba9mshfd05fff82906f21p187a20jsn1735a8cee9f4',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
          },
        });
        if (response.ok) {
          const data = await response.json();
          setExerciseList(data); 

          console.log(data);
        } else {
          console.error('Failed to fetch exercise data');
        }
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };

    fetchData();
  }, []); 
const filterData = (name) => {
  const filteredData = exerciseList.filter((item) => {
    return (
      item.name.toLowerCase().includes(name.toLowerCase()) ||
      item.bodyPart.toLowerCase().includes(name.toLowerCase()) ||
      item.target.toLowerCase().includes(name.toLowerCase())
    );
  });
  setFilteredEx(filteredData);
};


  return (
    <>
    <h1>Where Fitness Meets Fun and Results Are Achieved</h1>
    <main className='container'>
        <div className='item'>
        <Image className="item" link="https://www.pixelstalk.net/wp-content/uploads/images6/Fitness-Desktop-Wallpaper.jpg" />
        </div>
        <div className='item'>
        <Image className="item" link="https://wallpapercave.com/wp/wp6331008.jpg"/>
        </div>
        <div className='item'>
        <Image className="item" link="https://wallpaperaccess.com/full/1087621.jpg"/>
        </div>
        <div className='item'>
        <Image className="item" link="https://i.ytimg.com/vi/gey73xiS8F4/maxresdefault.jpg"/>
        </div>
        <div className='item'>
        <Image className="item" link="https://wallpapercave.com/wp/wp6331008.jpg"/>
        </div>
        <div className='item'>
        <Image className="item" link="https://img.freepik.com/premium-photo/woman-training-gym_946657-755.jpg"/>
        </div>
    
    </main>

    <div className='ex-container'>
        <h1>Exersice List</h1>
        <input id="input" type='text' placeholder='search by target, bodypart, or exercise' onChange={(e)=>{
          filterData(e.target.value);
        }}/>
    </div>

    <div className='exercise-wrapper'>
        {(filteredEx.length > 0 ? filteredEx : exerciseList).map((ex, index) => (
          <div key={index} className='ex-card'>
            <img src={ex.gifUrl} alt={ex.name} />
            <p id="ex-name">{ex.name}</p>
            <p>{ex.bodyPart}</p>
            <p>{ex.target}</p>
          </div>
        ))}
      </div>
    
    </>
  )
}

export default Home