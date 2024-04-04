function potvrzeniFormulare() {
    var krestniJmeno = document.getElementById("krestniJmeno").value;
    var prijmeni = document.getElementById("prijmeni").value;
    var telefonniCislo = document.getElementById("telefonniCislo").value;
    var email = document.getElementById("email").value;
    var rokNarozeni = document.getElementById("rokNarozeni").value;
    var poznamka = document.getElementById("poznamka").value;

    var dataFormulare = {
        krestniJmeno: krestniJmeno,
        prijmeni: prijmeni,
        telefonniCislo: telefonniCislo,
        email: email,
        rokNarozeni: rokNarozeni,
        poznamka: poznamka
    };

    emailjs.send("service_y1yq96d","template_wp4677h", dataFormulare)
    .then(function(odpoved) {
        console.log("Email byl úspěšně odeslán!", odpoved.status, odpoved.text);
        alert("Registrace byla úspěšně odeslána!");
    }, function(error) {
        console.log("Chyba při odesílání e-mailu!", error);
        alert("Při odesílání registrace došlo k chybě. Zkuste to prosím znovu.");
    });
}