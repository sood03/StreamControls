function sleepFor(sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}
document.addEventListener('DOMContentLoaded', function() {
var streamsquidTab;
  chrome.tabs.getAllInWindow(null, function (tabs){
    for(var i=0;i<tabs.length;i++){
      if(tabs[i].url.indexOf("streamsquid") > -1){
        streamsquidTab = tabs[i];
        console.log("got the tab: " + streamsquidTab.url + " in content.js");
      }
    }
    console.log("sending message to content.js for DOMinfo")
    chrome.tabs.sendMessage(streamsquidTab.id,{"message": "getDOMinfo", "from": "popup"}, setDOMInfo);
  });

  var play = document.getElementById('play');
  play.addEventListener('click', function() {
    console.log("play clicked and sending message to background.");
    if (play.src.match("play")) {
      play.src = "controls/pause.png";
      chrome.tabs.sendMessage(streamsquidTab.id,{"message": "pause", "from": "popup"});
    } else {
      play.src = "controls/play.png";
      chrome.tabs.sendMessage(streamsquidTab.id,{"message": "play", "from": "popup"});
    }
    
  });

  var previous = document.getElementById('previous');
  previous.addEventListener('click', function() {
    console.log("previous clicked and sending message to background.");
    chrome.tabs.sendMessage(streamsquidTab.id,{"message": "previous", "from": "popup"});
    sleepFor(3000);
    chrome.tabs.sendMessage(streamsquidTab.id,{"message": "getTrackDetails", "from": "popup"}, setTrackDetails);
  });

  var next = document.getElementById('next');
  next.addEventListener('click', function() {
    console.log("next clicked and sending message to background.");
    chrome.tabs.sendMessage(streamsquidTab.id,{"message": "next", "from": "popup"});
    sleepFor(3000);
    chrome.tabs.sendMessage(streamsquidTab.id,{"message": "getTrackDetails", "from": "popup"}, setTrackDetails);
  });

  var shuffle = document.getElementById('shuffle');
  shuffle.addEventListener('click', function() {
    console.log("shuffle clicked and sending message to background.");
    if (shuffle.src.match("shuffle-on")) {
      shuffle.src = "controls/shuffle.png";
    }
    else{
      shuffle.src = "controls/shuffle-on.png";
    }
    chrome.tabs.sendMessage(streamsquidTab.id,{"message": "shuffle", "from": "popup"});
  });

  var repeat = document.getElementById('repeat');
  repeat.addEventListener('click', function() {
    console.log("repeat clicked and sending message to background.");
    if (repeat.src.match("repeat-on")) {
      repeat.src = "controls/repeat.png";
    }
    else{
      repeat.src = "controls/repeat-on.png";
    }
    chrome.tabs.sendMessage(streamsquidTab.id,{"message": "repeat", "from": "popup"});
  });

});

function setTrackDetails(details){
  console.log("setting track details");
  document.getElementById('playerTrackName').innerText = details.mtrackName;
  document.getElementById('playerTrackArtist').innerText = details.mtrackArtist;
}

function setDOMInfo(info){
  console.log("in setDOMInfo");
  var playButton = document.getElementById('play');
  var shuffleButton = document.getElementById('shuffle');
  var repeatButton = document.getElementById('repeat');

  //set track name
  document.getElementById('playerTrackName').innerText = info.mtrackName;
  document.getElementById('playerTrackArtist').innerText = info.mtrackArtist;
  //for play button
  if(info.mplayActive == "active"){
    playButton.src = "controls/play.png";
    console.log("changed source to play");
  }
  if(info.mplayActive == "block"){
    playButton.src = "controls/pause.png";
    console.log("changed source to pause");
  }

  //for shuffle button
  if(info.mshuffleActive == "false"){
    shuffleButton.src = "controls/shuffle.png";
    console.log("changed source to shuffle");
  }
  if(info.mshuffleActive == "true"){
    shuffleButton.src = "controls/shuffle-on.png";
    console.log("changed source to shuffle-on");
  }

  //for repeat button
  if(info.mrepeatActive == "false"){
    repeatButton.src = "controls/repeat.png";
    console.log("changed source to repeat");
  }
  if(info.mrepeatActive == "true"){
    repeatButton.src = "controls/repeat-on.png";
    console.log("changed source to repeat-on");
  }
}