console.log("reached content.js");
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		var trackDetails;
		if(( request.message == "pause" ) && (request.from == "popup")) {
			document.getElementById("player-play").click();
		}
		else if((request.message == "play") && (request.from == "popup")){
			document.getElementById("player-pause").click();
		}
		else if((request.message == "previous") && (request.from == "popup")){
			document.getElementById("player-back").click();
		}
		else if((request.message == "next") && (request.from == "popup")){
			document.getElementById("player-next").click();
		}
		else if((request.message == "shuffle") && (request.from == "popup")){
			document.getElementById("player-shuffle").click();
		}
		else if((request.message == "repeat") && (request.from == "popup")){
			document.getElementById("player-repeat").click();
		}
		else if((request.message == "getDOMinfo") && (request.from == "popup")){
			console.log("asking for DOMinfo");
			var DOMinfo;
			var playActive,shuffleActive,repeatActive;
			var play = document.getElementById('player-play');
			console.log("display is: "+play.style.display);
			var trackName = document.getElementById('player-track-name');
			var trackArtist = document.getElementById('player-track-artist');
			if(play.style.display.match("block")){
				playActive = "active";
			}
			else{
				playActive = "block";
			}
			var shuffle = document.getElementById("player-shuffle");
			if((shuffle.style.color == "rgb(255, 255, 255)") || (shuffle.style.color == '')){
				console.log("color for shuffle found as rgb(255, 255, 255) or it is not present.");
				shuffleActive = "false";
			}
			else{
				shuffleActive = "true";	
				console.log("color for shuffle: " + shuffle.style.color);
			}
			var repeat = document.getElementById("player-repeat");
			if((repeat.style.color == "rgb(255, 255, 255)") || (repeat.style.color == '')){
				console.log("color for repeat found as rgb(255, 255, 255) or it is not present.");
				repeatActive = "false";
			}
			else{
				repeatActive = "true";	
				console.log("color for repeat: " + repeat.style.color);
			}
			DOMinfo = {
				mplayActive : playActive,
				mshuffleActive : shuffleActive,
				mrepeatActive : repeatActive,
				mtrackName : trackName.textContent,
				mtrackArtist : trackArtist.textContent
			};
			sendResponse(DOMinfo);
		}
		else if((request.message == "getTrackDetails") && (request.from == "popup")){
			var trackName = document.getElementById('player-track-name');
			var trackArtist = document.getElementById('player-track-artist');
			console.log("track name: " + trackName.textContent);
			console.log("track artist: " + trackArtist.textContent);
			trackDetails = {
				mtrackName : trackName.textContent,
				mtrackArtist : trackArtist.textContent
			};
			sendResponse(trackDetails);
		}
	});