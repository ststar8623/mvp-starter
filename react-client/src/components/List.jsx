import React from 'react';

const List = (props) => (
  <div>
    <h2>{props.artist}</h2>
    <ul>
      {
        props.albums.map(album => {
          return <li key={album.url}><img src={album.image} /><a href={album.url}>{album.song}</a></li>
        })
      }
    </ul>
  </div>
)

export default List;