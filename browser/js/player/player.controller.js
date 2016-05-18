'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // var audio = document.createElement('audio');

  // var audio = PlayerFactory.player;
  $scope.PlayerFactory = PlayerFactory;
  // state
  // $scope.currentSong;
  // $scope.playing = false;

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying()) PlayerFactory.pause();
    else PlayerFactory.start(song);
  };

  // incoming events (from Album or toggle)
  // $scope.$on('pause', PlayerFactory.pause);
  // $scope.$on('play', PlayerFactory.start);

  // functionality
  // function pause () {
  //   // audio.pause();
  //   // $scope.playing = false;
  //   return PlayerFactory.pause();
  // }
  // function play (event, song){
  //   // // stop existing audio (e.g. other song) in any case
  //   // pause();
  //   // $scope.playing = true;
  //   // // resume current song
  //   if (song === $scope.currentSong) return audio.play();
  //   // // enable loading new song
  //   // $scope.currentSong = song;
  //   // audio.src = song.audioUrl;
  //   // audio.load();
  //   // audio.play();
  //   return PlayerFactory.start( song );
  // }

  // outgoing events (to Album… or potentially other characters)
});
