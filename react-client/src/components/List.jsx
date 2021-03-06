import React from 'react';

const List = (props) => (
  <div>
    {
      props.artists.map(artist => {
        let removeChange = props.removeChange.bind(this, artist);
        return <h4 key={artist}><a href="" onClick={props.updateChange}>{artist}</a><input type="button" value="remove" onClick={removeChange}></input></h4>
      })
    }
    <ul>
      {
        props.albums.map(album => {
          return <li key={album.url}><img src={album.image} /><a href={album.url} target="_blank">{album.song}</a></li>
        })
      }
    </ul>
  </div>
)

export default List;