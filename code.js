const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");
const email = document.getElementById("email");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const emailValue = email.value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const bannedWords = ["admin", "moderator", "mafia", "owner"];
  const emailCorrections = {
    "gmial.com": "gmail.com",
    "gmai.com": "gmail.com",
    "hotmial.com": "hotmail.com",
    "yahooo.com": "yahoo.com",
    "outlok.com": "outlook.com",
  };
  errorMessage.textContent = "";
  errorMessage.style.opacity = "0";
  successMessage.textContent = "";
  successMessage.style.opacity = "0";

  if (
    emailValue.trim() === "" ||
    username.trim() === "" ||
    password.trim() === ""
  ) {
    errorMessage.textContent = "Please fill in all fields!";
    errorMessage.style.opacity = "1";
    return;
  }
  const lowerUsername = username.toLowerCase();

  for (let word of bannedWords) {
    if (lowerUsername.includes(word)) {
      errorMessage.textContent = `Username cannot contain: ${word}`;
      errorMessage.style.opacity = "1";
      return;
    }
  }
  if (username.includes("@")) {
    const parts = username.split("@");
    const name = parts[0];
    const domain = parts[1].toLowerCase();

    // check if domain is wrong
    if (emailCorrections[domain]) {
      const correctedEmail = name + "@" + emailCorrections[domain];

      errorMessage.textContent = "Did you mean: " + correctedEmail;

      errorMessage.style.opacity = "1";

      document.getElementById("username").value = correctedEmail;

      return;
    }

    // normal email → extract username
    const extractedName = name;

    errorMessage.textContent =
      "Email detected. Using username: " + extractedName;

    errorMessage.style.opacity = "1";

    document.getElementById("username").value = extractedName;

    return;
  }
  if (password.length < 8) {
    errorMessage.textContent = "Password must contain at least 8 characters.";
    errorMessage.style.opacity = "1";
    return;
  }

  successMessage.textContent = "Login successful! Loading game...";
  successMessage.style.opacity = "1";

  document.body.classList.add("login-success");

  setTimeout(() => {
    window.location.href = "home.html";
  }, 1500);
});
// the input of the username and password are very close to form border in the right side  so give some space
