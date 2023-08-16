
/* 
  Method to spawn a new clients.
*/

const spawn = document.querySelector("#submit-spawn");
const nickname = document.querySelector("#message-spawn");

// Will spawn a new client window
function spawnClient(nickname) {

  // open new window
  const node = window.open(
    "chat-client.html",
    nickname,
    "width=400,height=700,scrollbars=no,status=no"
  );

  // focus new window
  node.focus();

  // clear inputs
  document.querySelector("#message-spawn").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  spawn.addEventListener("click", () => spawnClient(nickname.value));
});
