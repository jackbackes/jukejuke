juke.factory('AlbumFactory', function($http, StatsFactory){
  var albumObj = {};
  albumObj.fetchAll = function(){
    return $http.get('/api/albums').then( function(albumsResponse){
      var albums = albumsResponse.data;
      return albums;
    } )
  }
  albumObj.fetchById = function(id){
    return $http.get('/api/albums/'+id).then( function(albumResponse){
      return albumResponse.data;
    })
  };
  albumObj.renderAlbum = function(album) {
      album.imageUrl = '/api/albums/' + album.id + '/image';
      album.songs.forEach(function (song, i) {
        song.audioUrl = '/api/songs/' + song.id + '/audio';
        song.albumIndex = i;
      });
      StatsFactory.totalTime( album ).then( function( duration ){
        album.duration = duration;
      })
      return album
  }

  return albumObj;
})
