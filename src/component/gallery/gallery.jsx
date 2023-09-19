import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import './gallery.css'
import Header from '../header/header';
import Header2 from '../header/header2';

const finalSpaceCharacters = [
  {
    id: 'one',
    thumb: 'https://source.unsplash.com/1300x1200/?algeria',
    name: 'algeria',
  },
  {
    id: 'two',
    thumb: 'https://source.unsplash.com/1300x1200/?lebanon',
    name: 'lebanon'
  },
  {
    id: 'three',
    thumb: 'https://source.unsplash.com/1300x1200/?qatar',
    name: 'qatar'
  },
  {
    id: 'four',
    thumb: 'https://source.unsplash.com/1300x1200/?uae',
    name: 'uae'
  },
  {
    id: 'five',
    thumb: 'https://source.unsplash.com/1300x1200/?kuwait',
    name: 'kuwait'
  },
  {
    id: 'six',
    thumb: 'https://source.unsplash.com/1300x1200/?oman',
    name: 'oman'
  },
  {
    id: 'seven',
    thumb: 'https://source.unsplash.com/1300x1200/?turkey',
    name: 'turkey'
  },
  {
    id: 'eight',
    thumb: 'https://source.unsplash.com/1300x1200/?iran',
    name: 'iran'
  },
  {
    id: 'nine',
    thumb: 'https://source.unsplash.com/1300x1200/?jordan',
    name: 'jordan'
  },
  {
    id: 'ten',
    thumb: 'https://source.unsplash.com/1300x1200/?Kuwait',
    name: 'kuwait'
  },
  {
    id: 'eleven',
    thumb: 'https://source.unsplash.com/1300x1200/?usa',
    name: 'usa'
  },
  {
    id: 'twelve',
    thumb: 'https://source.unsplash.com/1300x1200/?japan',
    name: 'japan'
  },
  {
    id: 'thirteen',
    thumb: 'https://source.unsplash.com/1300x1200/?canada',
    name: 'canada'
  },
  {
    id: 'fourteen',
    thumb: 'https://source.unsplash.com/1300x1200/?nigeria',
    name: 'nigeria'
  },
  {
    id: 'fifteen',
    thumb: 'https://source.unsplash.com/1300x1200/?singapore',
    name: 'singapore'
  }
]

function Gallery() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);
  const [search, setSearch] = useState('');
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }
  const handleSearch = (e) => {
    setSearch(e.target.value);
  }
  useEffect(() => {
    const filteredData = finalSpaceCharacters.filter((item) => {
      const itemName = item.name.toLowerCase();
      const query = search.toLowerCase();
      return itemName.includes(query);
    });
    updateCharacters(filteredData);
  }, [search])
  
  const url = 'https://instagram-api-t4i9.onrender.com/instagram-clone';
  const [isSignedIn, setisSignedIn] = useState(false);
  const logout = () => {
    localStorage.clear('token');
    setisSignedIn(false);
    alert('logged out')
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null) {
      setisSignedIn(false)
    }
    axios.get(url, {
      headers: {
        Authorization: token,
      }
    }).then(res => {
      setisSignedIn(true)
    }).catch(error => {
      console.log(error);
      setisSignedIn(false);
    })
  }, [isSignedIn]);
  if (isSignedIn) {
    return (
      <>
        <Header2 message='Hurray,You are signed In' status='Log Out' onClick={logout} />
        <div className="block"><input type="text" className="input-res" placeholder='search for image' onChange={handleSearch} value={search} /></div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <div className="container" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({ id, name, thumb }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <img src={thumb} alt={`${name} Thumb`} />
                          <div className='image_name'>{name}</div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  }
  else {
    return (
      <>
        <Header message='Welcome user, sign in to use drag and drop feature' status='Sign In' location='/signin' />
        <div className="block"><input type="text" className="input-res" placeholder='search for image' onChange={handleSearch} value={search} /></div>
        <div className='container'>
          {characters.map((item) => {
            return <li key={item.id}>
              <img src={item.thumb} alt={`${item.name} Thumb`} />
            </li>
          })}
        </div>
      </>
    )
  }
}

export default Gallery;