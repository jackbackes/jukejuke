'use strict';

juke.factory('PlayerFactory', function($rootScope){
  // non-UI logic in here
  var player = document.createElement('audio');
  var progress = 0;
  player.addEventListener('timeupdate', function () {
    progress = player.currentTime / player.duration;
    $rootScope.$evalAsync()
  });
  var currentSong = null;
  var isPlaying = false;
  var currentSongList = [];
  var PlayerFactory = {
    player: player,
    isPlaying: function(){
      return isPlaying;
    },
    start: function( song, songList ){
      // if ( song.id === PlayerFactory.getCurrentSong().id ){
      //   this.resume();
      // } else {
        if( !!songList && !song.albumIndex ) addIndex( songList );
        PlayerFactory.pause();
        if(songList) currentSongList = songList;
        player.src = song.audioUrl;
        currentSong = song;
        player.load();
        isPlaying = true;
        // resume current song
        player.play();
      // }
    },
    pause: function(){
      player.pause();
      isPlaying = false;
    },
    resume: function(){
      player.play();
      isPlaying = true;
    },
    getCurrentSong: function(){
      return currentSong;
    },
    next: function(){
      skip(1);
    },
    setCurrentAlbum: function( album ){
      currentSongList = album.songs;
    },
    previous: function(){
      skip(-1);
    },
    getProgress: function() {
      return progress;
    }
  };

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; };

  function addIndex( songList ) {
    songList.forEach( function(song, i){
      song.albumIndex = i;
    })
  }

  // jump `interval` spots in album (negative to go back, default +1)
  function skip (interval) {
    if (!currentSong) return;
    var index = currentSong.albumIndex || 0;
    index = mod( (index + (interval || 1)), currentSongList.length );
    currentSong = currentSongList[index];
    if (isPlaying) PlayerFactory.start( currentSong );
  };

  player.addEventListener('ended', function () {
    PlayerFactory.next();
    $rootScope.$evalAsync();
  });

  return PlayerFactory;

});
