/***********************
* MyTunes
* an aggregate of bands/tracks that I've beeen a part of
************************/

var app = angular.module("MyTunes", [])

app.controller("TrackController", ["SpotifyService", "$scope", function(SpotifyService, $scope){
  $scope.albums = SpotifyService.getAlbums()
  $scope.tracks = SpotifyService.getTracks()
  $scope.trackAlbumName = SpotifyService.getTrackAlbumName()

  $scope.sortType     = 'name'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.search   = '';     // set the default search/filter term

  /***********************
  * timeConversion
  * converts ms to 0:00 format
  * @param (int) milliseconds
  ************************/
  $scope.timeConversion = function(ms){

    var x = ms / 1000
    var seconds = Math.ceil(x % 60).toString()
    var minutes = (x/60) % 60

    if (seconds.length === 1) {
      seconds =+ "0" + seconds
    }

    return `${Math.floor(minutes)}:${seconds}`
  }

  $scope.albumName = function(trackId) {
    // console.log("album id", $scope.album.id);
    // console.log("trackid", trackId);
    // console.log("alb", $scope.trackAlbumName);
    // $scope.trackAlbumName.forEach(function(album, i){
    //   // console.log("1",$scope.albums[i].href + "/tracks?offset=0&limit=50");
    //   // console.log("2",album.href);
    //   if(album.href === ($scope.albums[i].href + "/tracks?offset=0&limit=50")) {
    //     console.log("what", $scope.albums[i].name);
    //     return $scope.albums[i].name
    //   }
    // })
  }


}])


app.factory("SpotifyService", ["$http", function($http){
  /***********************
  * Spotify API ENDPOINTS
  * --- *
  * Old You : "https://api.spotify.com/v1/albums/0uxYCpg9exHWSOmkXAMATU/tracks"
  * Little Stranger : "https://api.spotify.com/v1/albums/4X7r3ED9NDWYSfs7qEI094/tracks"
  * Jordan Igoe : "https://api.spotify.com/v1/albums/5T3OKyxLyY5KcvBe7B5ngB/tracks"
  * Julie Slonecki: "https://api.spotify.com/v1/albums/7EDOQJftQyLr0LmZTRKCFS/tracks"
  ************************/
  var albumId = ["0uxYCpg9exHWSOmkXAMATU", "4X7r3ED9NDWYSfs7qEI094", "5T3OKyxLyY5KcvBe7B5ngB", "7EDOQJftQyLr0LmZTRKCFS"]
  var albums = []
  var tracks = []
  var albumNames = []

  /***********************
  * Requests an album for each id. album pushed into array.
  * (.then) Extracts tracks from album and pushes each track to different array.
  * --- *
  * @param (str) spotify's unique album id
  ************************/
  albumId.forEach(function(id){

    $http({
      url: `https://api.spotify.com/v1/albums/${id}`,
      method: "GET",
    }).then(function(response){
      var album = response.data
      albums.push(angular.copy(album))
      console.log("album", album);

        $http({
          url: `${album.tracks.href}`,
          method: "GET",
        }).then(function(response){
          data = response.data
          console.log("tracks", data);

          albumNames.push(angular.copy(data))
          data.items.forEach(function(track){
            tracks.push(angular.copy(track))
          })
        })

    })

  })





  return {

    getAlbums: function() {

      return albums
    },

    getTracks: function() {

      return tracks
    },
    getTrackAlbumName: function() {

      return albumNames
    }
  }
}])
