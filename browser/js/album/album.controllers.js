'use strict';

juke.controller('AlbumCtrl', function ($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

  $scope.PlayerFactory = PlayerFactory
  // load our initial data
  AlbumFactory.fetchAll()
  .then(function (albums) {
    return AlbumFactory.fetchById(albums[0].id); // temp: get one
  })
  .then(function (album) {
      $scope.album = AlbumFactory.renderAlbum(album)
      PlayerFactory.setCurrentAlbum ( album )
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause()
    } else PlayerFactory.start(song);
  };

  // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // functionality
  // function pause () {
  //   $scope.playing = false;
  // }
  // function play (event, song) {
  //   $scope.playing = true;
  //   $scope.currentSong = song;
  // };
  //
  // // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m; };
  //
  // // jump `interval` spots in album (negative to go back, default +1)
  // function skip (interval) {
  //   if (!$scope.currentSong) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  // };
  // function next () { skip(1); };
  // function prev () { skip(-1); };

});

juke.controller('albums', function ($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory) {
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
