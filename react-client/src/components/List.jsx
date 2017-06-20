import React from 'react';

const List = (props) => (
  <div>
    <h4>{props.artist}</h4>
    <ul>
      {
        props.albums.map(album => {
          return <li><a href='{album.url}'>{album.song}></a></li>
        })
      }
    </ul>
  </div>
)

export default List;