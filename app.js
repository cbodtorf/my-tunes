/***********************
* MyTunes
* an aggregate of bands/tracks that I've beeen a part of
************************/

var app = angular.module("MyTunes", [])

app.controller("TrackController", ["SpotifyService", "$scope", function(SpotifyService, $scope){
  $scope.albums = SpotifyService.getAlbums()

}])

app.factory("SpotifyService", ["$http", function($http){
  /***********************
  * Spotify API ENDPOINTS
  * Old You : "https://api.spotify.com/v1/albums/0uxYCpg9exHWSOmkXAMATU/tracks"
  * Little Stranger : "https://api.spotify.com/v1/albums/4X7r3ED9NDWYSfs7qEI094/tracks"
  * Jordan Igoe : "https://api.spotify.com/v1/albums/5T3OKyxLyY5KcvBe7B5ngB/tracks"
  * Julie Slonecki: "https://api.spotify.com/v1/albums/7EDOQJftQyLr0LmZTRKCFS/tracks"
  ************************/
  var albumId = ["0uxYCpg9exHWSOmkXAMATU", "4X7r3ED9NDWYSfs7qEI094", "5T3OKyxLyY5KcvBe7B5ngB", "7EDOQJftQyLr0LmZTRKCFS"]
  var albums = []
  var tracks = []

  albumId.forEach(function(id){
    
    $http({
      url: `https://api.spotify.com/v1/albums/${id}/tracks`,
      method: "GET",
    }).then(function(response){
      var album = response.data
      albums.push(angular.copy(album))

      var track = album.items;
      tracks.push(angular.copy(track))
    })
  })


  return {

    getAlbums: function() {

      return albums
    },

    getTracks: function() {

      return tracks
    }
  }
}])
