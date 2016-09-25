/***********************
* MyTunes
* an aggregate of bands/tracks that I've beeen a part of
************************/

app = angular.module("MyTunes", [])

app.controller("TrackController", ["SpotifyService", "$scope", function(SpotifyService, $scope){
  $scope.albums = SpotifyService.getAlbums()

}])

app.factory("SpotifyService", ["$http", function($http){
  albums = []

  return {

    getAlbums() {
      return albums
    }
  }
}])
