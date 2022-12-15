async function onClick() {
  // Get token
  const token = prompt("Insert your Gitlab Token with Read API scope:");

  // Get project and repository on the url
  const actualUrl = window.location.toString();
  const actualUrlParts = actualUrl.split("/");
  const project = actualUrlParts[3];
  const repository = actualUrlParts[4];
  const encodedProjectPath = `${project}%2F${repository}`;

  // Get last tag date
  const baseUrl = "https://gitlab.com/api/v4";
  const defaultRequest = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const lastTagUrl = `${baseUrl}/projects/${encodedProjectPath}/repository/tags`;
  const tagResponse = await fetch(lastTagUrl, defaultRequest);
  const tagBody = await tagResponse.json();
  const tagDate = tagBody[0].commit.created_at;

  // Get commits since last tag date
  const commitsUrl = `${baseUrl}/projects/${encodedProjectPath}/repository/commits?since=${tagDate}`;
  const commitsResponse = await fetch(commitsUrl, defaultRequest);
  const commitsBody = await commitsResponse.json();
  const commits = commitsBody.map((c) => {
    return {
      title: c.title,
      url: c.web_url,
    };
  });

  // Parse commits into info strings
  const commitInfos = commits.map((c) => {
    return `[${c.title}](${c.url})`;
  });

  // Separate info strings by conventional commits
  const added = [];
  const fixed = [];
  const refactored = [];
  const performance = [];
  const build = [];
  const reverted = [];
  const other = [];

  commitInfos.forEach((i) => {
    if (i.includes("feat:")) {
      added.push(i);
    } else if (i.includes("fix:")) {
      fixed.push(i);
    } else if (i.includes("refactor:")) {
      refactored.push(i);
    } else if (i.includes("perf:")) {
      performance.push(i);
    } else if (i.includes("build:")) {
      build.push(i);
    } else if (i.includes("revert:")) {
      reverted.push(i);
    } else {
      other.push(i);
    }
  });

  // Generate markdown text
  let title = "# Release Title\n\n";
  let body = "";

  if (added.length) {
    body += "## Added";
    body += "\n";
    added.forEach((a) => {
      body += `- ${a}\n`;
    });
    body += "\n";
  }

  if (fixed.length) {
    body += "## Fixed";
    body += "\n";
    fixed.forEach((a) => {
      body += `- ${a}\n`;
    });
    body += "\n";
  }

  if (fixed.length) {
    body += "## Refactor";
    body += "\n";
    fixed.forEach((a) => {
      body += `- ${a}\n`;
    });
    body += "\n";
  }

  if (performance.length) {
    body += "## Performance";
    body += "\n";
    performance.forEach((a) => {
      body += `- ${a}\n`;
    });
    body += "\n";
  }

  if (build.length) {
    body += "## Build";
    body += "\n";
    build.forEach((a) => {
      body += `- ${a}\n`;
    });
    body += "\n";
  }

  if (reverted.length) {
    body += "## Reverted";
    body += "\n";
    reverted.forEach((a) => {
      body += `- ${a}\n`;
    });
    body += "\n";
  }

  if (other.length) {
    body += "## Other";
    body += "\n";
    other.forEach((a) => {
      body += `- ${a}\n`;
    });
  }

  const text = title + body;

  // Put markdown text inside form
  alert(text);
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
