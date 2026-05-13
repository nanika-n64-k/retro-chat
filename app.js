const bodyElement =
  document.getElementById(
    "messages-body"
  );

const sendButton =
  document.getElementById("send");

const messageInput =
  document.getElementById("message");

const nameInput =
  document.getElementById("name");

const seedInput =
  document.getElementById("seed");

let msgCount = 0;

function makeHash(seed) {

  return btoa(seed)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 7);
}

function addMessage(name, hash, body) {

  msgCount++;

  const tr =
    document.createElement("tr");

  let contentClass = "";

  if (body.startsWith("/")) {
    contentClass = "command";
  }

  tr.innerHTML = `

    <td>
      ${msgCount}
    </td>

    <td>
      ${name}
      <span class="hash">
        @${hash}
      </span>
    </td>

    <td class="${contentClass}">
      ${body}
    </td>
  `;

  bodyElement.prepend(tr);

  handleCommand(body);
}

function addSystemMessage(text) {

  msgCount++;

  const tr =
    document.createElement("tr");

  tr.innerHTML = `

    <td>
      ${msgCount}
    </td>

    <td>
      SYSTEM
    </td>

    <td class="system">
      *** ${text}
    </td>
  `;

  bodyElement.prepend(tr);
}

function handleCommand(body) {

  if (!body.startsWith("/")) {
    return;
  }

  const parts =
    body.slice(1).split(" ");

  const cmd = parts[0];

  if (cmd === "help") {

    addSystemMessage(
      "/help /clear"
    );
  }

  if (cmd === "clear") {

    addSystemMessage(
      "room cleared"
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

  if (body.trim() === "") {
    return;
  }

  const hash =
    makeHash(seed);

  addMessage(
    name,
    hash,
    body
  );

  messageInput.value = "";
};
