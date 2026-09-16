const display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}


// Put lyrics that you have permission to use here
const lyrics = [
    "Was they a lifetime ",
    "Waiting for us",
    "In the world",
    "Where i was yours"
];

let lyricIndex = 0;

function calculate() {

    if (display.value === "") {
        return;
    }

    try {

        let expression = display.value.replace(
            /(\d+(\.\d+)?)%/g,
            "($1/100)"
        );

        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            display.value = "Error";
            return;
        }

        // Show the answer first
        display.value = result;

        // Play the song
        const song = document.getElementById("lifetimeSong");

        if (song) {
            song.currentTime = 0;
            song.play();
        }

        // Start showing lyrics
        lyricIndex = 0;
        showNextLyric();

    } catch (error) {
        display.value = "Error";
    }
}


// Show a new lyric every 2 seconds
function showNextLyric() {

    if (lyricIndex >= lyrics.length) {
        return;
    }

    display.value = lyrics[lyricIndex];

    lyricIndex++;

    setTimeout(showNextLyric, 2000);
}