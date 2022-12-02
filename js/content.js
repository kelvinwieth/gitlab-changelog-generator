function getButton() {
  const button = document.createElement("button");
  button.textContent = "Generate Changelog";
  button.classList.add("btn");
  button.classList.add("extension-button-generate-changelog");
  button.onclick = () => alert("Generating changelog...");

  return button;
}

const section = document.getElementById("__BVID__70");
const releaseNotesSection = section.children[1];

const button = getButton();

const releaseNotesLabel = releaseNotesSection.getElementsByTagName("label")[0];
releaseNotesLabel.classList.add("extension-label");

releaseNotesSection.insertBefore(button, releaseNotesSection.children[1]);
