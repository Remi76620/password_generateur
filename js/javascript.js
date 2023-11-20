// Initialise un ensemble pour stocker les mots de passe générés
var generatedPasswordsSet = new Set();

function generatePassword() {
    var length = parseInt(document.getElementById("passwordLength").value);
    var quantity = parseInt(document.getElementById("passwordQuantity").value);
    var charset = "";

    if (document.getElementById("numbersCheckbox").checked) {
        charset += "0123456789";
    }
    if (document.getElementById("lowercaseCheckbox").checked) {
        charset += "abcdefghijklmnopqrstuvwxyz";
    }
    if (document.getElementById("uppercaseCheckbox").checked) {
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (document.getElementById("specialCharsCheckbox").checked) {
        charset += "!@#$%^&*()_+[]{}|;:,.<>?";
    }
    if (document.getElementById("excludeSimilarCharsCheckbox").checked) {
        charset = charset.replace(/[0O1Il]/g, '');
    }

    if (charset === "") {
        alert("Veuillez sélectionner au moins un type de caractère.");
        return;
    }

    var passwords = [];

    for (var j = 0; j < quantity; j++) {
        var password = generateUniquePassword(charset, length);
        passwords.push(password);
    }

    var passwordOutput = document.getElementById("passwordOutput");
    passwordOutput.value = passwords.join('\n');

    // Affiche le textarea après la génération du mot de passe
    passwordOutput.style.display = "block";
}

function generateUniquePassword(charset, length) {
    var password = generateRandomPassword(charset, length);

    // Vérifie si le mot de passe a déjà été généré
    while (generatedPasswordsSet.has(password)) {
        password = generateRandomPassword(charset, length); // Régénère le mot de passe si déjà présent
    }

    // Ajoute le mot de passe à l'ensemble des mots de passe générés
    generatedPasswordsSet.add(password);

    return password;
}

function generateRandomPassword(charset, length) {
    var password = "";
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
}

function copyPassword() {
    var passwordOutput = document.getElementById("passwordOutput");
    passwordOutput.select();
    document.execCommand("copy");
    alert("Mot de passe copié !");
}
