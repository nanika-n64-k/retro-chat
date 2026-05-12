const messages =
  document.getElementById("messages");

const sendButton =
  document.getElementById("send");

const messageInput =
  document.getElementById("message");

const nameInput =
  document.getElementById("name");

const seedInput =
  document.getElementById("seed");

function makeHash(seed) {
  return btoa(seed)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 7);
}

function addMessage(name, hash, body) {

  const div =
    document.createElement("div");

  div.classList.add("message");

  if (body.startsWith("/")) {
    div.classList.add("command");
  }

  div.innerHTML = `
    <span class="name">
      ${name}
    </span>

    <span class="hash">
      @${hash}
    </span>

    :
    ${body}
  `;

  messages.appendChild(div);

  messages.scrollTop =
    messages.scrollHeight;

  handleCommand(body);
}

function addSystemMessage(text) {

  const div =
    document.createElement("div");

  div.classList.add("system");

  div.textContent =
    "*** " + text;

  messages.appendChild(div);

  messages.scrollTop =
    messages.scrollHeight;
}

function handleCommand(body) {

  if (!body.startsWith("/")) {
    return;
  }

  const parts =
    body.slice(1).split(" ");

  const cmd = parts[0];

  if (cmd === "clear") {

    addSystemMessage(
      "room cleared"
    );
  }

  if (cmd === "help") {

    addSystemMessage(
      "/help /clear"
    );
  }
}

sendButton.onclick = () => {

  const name =
    nameInput.value || "anon";

  const seed =
    seedInput.value || "default";

  const body =
    messageInput.value;

  const hash =
    makeHash(seed);

  addMessage(
    name,
    hash,
    body
  );

  messageInput.value = "";
};
