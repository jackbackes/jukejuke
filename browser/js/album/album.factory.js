juke.factory('AlbumFactory', function($http, StatsFactory, $rootScope){
  var albumObj = {};
  albumObj.showAlbums = false;
  albumObj.showTheAlbums = function(){
    console.log('showing albums');
    albumObj.showAlbums = true;
    $rootScope.$evalAsync();
  }
  albumObj.showStatus = function(){
    console.log('the show status is now',albumObj.showAlbums);
    return albumObj.showAlbums;
  }
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


juke.factory('AlbumPicker', function($http, StatsFactory, $rootScope, AlbumFactory, PlayerFactory, $log){
  var showAlbum = false;
  var currentAlbum = null;
  var AlbumPicker = {
    chooseAlbum: function( album ){
      currentAlbum = album;
      console.log('choosing a different album because... you might be tired of this one.', currentAlbum)
      AlbumFactory.fetchById(AlbumPicker.getAlbum().id)
      .then(function ( album ) {
          currentAlbum = AlbumFactory.renderAlbum(album)
          PlayerFactory.setCurrentAlbum ( currentAlbum )
          AlbumFactory.showAlbums = false;
      })
      .catch($log.error); // $log service can be turned on and off; also, pre-bound
    },
    getAlbum: function(){
      return currentAlbum;
    },
    showAlbum: function(){
      showAlbum = !showAlbum
      return showAlbum;
    }
  }
  return AlbumPicker;
})
