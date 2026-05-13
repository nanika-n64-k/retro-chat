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

const adminHashes = [
  "admin01"
];

const modHashes = [
  "mod0001"
];

function makeHash(seed) {

  return btoa(seed)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 7);
}

function getHashClass(hash) {

  if (
    adminHashes.includes(hash)
  ) {
    return "admin-hash";
  }

  if (
    modHashes.includes(hash)
  ) {
    return "mod-hash";
  }

  return "";
}

function addMessage(
  name,
  seed,
  hash,
  body
) {

  msgCount++;

  const tr =
    document.createElement("tr");

  let messageClass = "";

  if (
    body.startsWith("/")
  ) {
    messageClass = "command";
  }

  const hashClass =
    getHashClass(hash);

  tr.innerHTML = `

    <td class="col-no">
      ${msgCount}
    </td>

    <td class="col-user">

      <div class="user-name">
        ${name}
      </div>

      <div class="seed">
        seed: ${seed}
      </div>

      <div class="hash ${hashClass}">
        @${hash}
      </div>

    </td>

    <td class="
      col-message
      ${messageClass}
    ">
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

    <td class="col-no">
      ${msgCount}
    </td>

    <td class="col-user">
      SYSTEM
    </td>

    <td class="system">
      *** ${text}
    </td>
  `;

  bodyElement.prepend(tr);
}

function handleCommand(body) {

  if (
    !body.startsWith("/")
  ) {
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

  if (
    body.trim() === ""
  ) {
    return;
  }

  const hash =
    makeHash(seed);

  addMessage(
    name,
    seed,
    hash,
    body
  );

  messageInput.value = "";
};
