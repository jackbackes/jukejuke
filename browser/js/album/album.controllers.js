'use strict';

juke.controller('AlbumCtrl', function ($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory, AlbumPicker, PlayerFactory) {

  $scope.showAlbum = AlbumFactory.showStatus;
  $scope.PlayerFactory = PlayerFactory

  $scope.album = AlbumPicker.getAlbum;

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause()
    } else PlayerFactory.start(song);
  };

});

juke.controller('albums', function ($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory, AlbumPicker) {
  $scope.showAlbums = AlbumFactory.showStatus;
  $scope.getThisAlbum = AlbumPicker.chooseAlbum;
  AlbumFactory.fetchAll()
  .then(function(albums) {
      var albumsNoSongs = albums.map(function(album) {
        return AlbumFactory.fetchById(album.id)
        .then(function (album) {
          return AlbumFactory.renderAlbum(album)
        })
      })
    return Promise.all(albumsNoSongs);
  })
  .then(function(albumsWithSongs) {
    $scope.albums = albumsWithSongs
  })
})
