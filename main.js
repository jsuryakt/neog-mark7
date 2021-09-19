var button = document.querySelector("#translate-btn");
var output = document.querySelector("#output-area");
var translated = output.value;
var audiobtn = document.querySelector("#audio");

button.addEventListener("click", translateToMinion);

function errorHandler(error) {
  if (
    error ==
    "TypeError: Cannot read properties of undefined (reading 'translated')"
  ) {
    alert("Please wait for an hour and try later!");
  } else {
    alert("Error: " + error);
  }
}

function translateToMinion(event) {
  event.preventDefault();
  var input = document.querySelector("#input-area").value;
  if (input == "") {
    output.innerText = "";
    audiobtn.style.display = "none";
    alert("Enter something to emojify");
  } else {
    var api = "https://api.funtranslations.com/translate/emoji.json";
    var url = api + "?text=" + input;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        translated = json.contents.translated;
        output.innerHTML = translated;
        audiobtn.style.display = "block";
        textToSpeech();
      })
      .catch(errorHandler);
  }
}

var synth = window.speechSynthesis;
var pitchValue = 0.5; //0.1 - 2
var rateValue = 0.5; //0.1 - 10
var voiceIndex = 0; // 0-4
var utterThis;

function textToSpeech() {}
function speak() {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }
  if (translated !== "") {
    utterThis = new SpeechSynthesisUtterance(translated);
    console.log(utterThis);
    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
    };
    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    utterThis.voice = synth.getVoices()[voiceIndex];
    utterThis.pitch = pitchValue;
    utterThis.rate = rateValue;
  }
  console.log(utterThis);
  synth.speak(utterThis);
}

audiobtn.addEventListener("click", listenAudio);

function listenAudio(event) {
  event.preventDefault();
  speak();
  console.log("done");
}
