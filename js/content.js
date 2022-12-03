async function onClick() {
  // Get token
  const token = prompt("Insert your Gitlab Token with read scope:");

  // Get project and repository on the url
  const url = window.location.toString();
  const urlParts = url.split('/');
  const project = urlParts[3];
  const repository = urlParts[4];

  // Get last tag date

  // Get commits since last tag date

  // Parse commits into info strings

  // Separate info strings by conventional commits

  // Generate markdown text

  // Put markdown text inside form
}

function getButton() {
  const button = document.createElement("button");
  button.textContent = "Generate Changelog";
  button.classList.add("btn");
  button.classList.add("extension-button-generate-changelog");
  button.onclick = onClick;

  return button;
}

const section = document.getElementById("__BVID__70");
const releaseNotesSection = section.children[1];

const button = getButton();

const releaseNotesLabel = releaseNotesSection.getElementsByTagName("label")[0];
releaseNotesLabel.classList.add("extension-label");

releaseNotesSection.insertBefore(button, releaseNotesSection.children[1]);
