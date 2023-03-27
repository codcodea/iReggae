/* 
  This file contains handlers for the visual- and auditory side effects of the app.
*/

const container = document.querySelector(".container");
const messageContainer = document.querySelector(".message-container");

// Audio
const message = new Audio("public/button-124476.mp3");
const audio = new Audio("public/beat.mp3");

function sideEffects() {
	// play sound
	message.play();

	// clear and focus input
	document.querySelector("#message").value = "";
	document.querySelector("#message").focus();

	// hide scroll bar
	messageContainer.style.overflow = "hidden";
	setTimeout(() => {
		messageContainer.style.overflow = "auto";
	}, 1000);

	// scroll to bottom smoothly
	messageContainer.scrollTo({
		top: messageContainer.scrollHeight,
		behavior: "smooth",
	});

	// add animation class
	const lastMessage = messageContainer.lastElementChild;
	lastMessage.classList.add("slide-in");
}

function playReggae(command) {
	switch (command) {
		case "play":
			toggleGroove(), audio.play();
			break;
		case "stop":
			audio.pause();
	}
}

const toggleGroove = () => {
	const groove = () => container.classList.toggle("groove");
	groove();
	setTimeout(() => groove(), 11000);
};

export { sideEffects, playReggae };
