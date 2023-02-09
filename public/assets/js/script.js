// Déclaration des variables
var interval1 = null;
let firstnames = ['Thierry', 'Pauline', 'Rémi', 'Cyprien', 'Mickaël', 'Fanny', 'Fatimzahra', 'Florian', 'Stéphanie', 'Maxence', 'Nawelle', 'Salah', 'Perrine'];


// Ciblage des éléments HTML
const section = document.querySelector('section');
const membersSelect = document.querySelector('.membersSelect');
const btnSection = document.querySelectorAll('button');
const scrollFirstname = document.querySelector('.scrollFirstname');
// Sélection de tous les labels
const labels = document.querySelectorAll('label');
const btnAside = document.getElementById('checkTouch');
// Ciblage des checkbox
const checkboxList = document.querySelector('.checkboxList')

// LOCAL STORAGE
let membersPARSE = localStorage.getItem("members");
members = JSON.parse(membersPARSE);
if ((members != []) && (members != null) && (members != '')) { //Si members est pas vide
    section.classList.remove('d-none');
    membersSelect.innerHTML = members;
}
else { section.classList.add('d-none'); }
// Fonctions
// Fonction pour afficher un prénom aléatoire jusqu'au stop
function scrollMembers() {
    scrollFirstname.innerHTML = randomFirstname(members);
    // console.log(scrollFirstname.innerHTML);
}

// Fonction qui retourne un prénom aléatoire du tableau members
function randomFirstname(members) {
    let randomNumber = Math.floor(Math.random() * members.length);
    let firstname = members[randomNumber];
    console.log(members);
    return firstname;
}

// Fonction répition du scrollRandom à interval régulier
function startInterval() {
    interval1 = setInterval(scrollMembers, 50);
}

// Fonction pour récupérer le prénom en fonction de l'input en paramètre
function nextLabel(inputCurrent) {
    let liParent = inputCurrent.closest('li');
    return liParent.querySelector('label').innerHTML;
}


// Instructions
// Créations des checkbox avec les prénoms du tableau de prénoms
let i = 1;
firstnames.forEach((firstname) => {
    let checked = '';
    if (members != [] && members != null) { //Si members est pas vide
        if (members.includes(firstname)) { //Test si le prénom en cours est présent dans le local storage (members)
            checked = 'checked';
        }
    }
    checkboxList.innerHTML += `
        <li class="mx-3">
            <input class="checkbox" type="checkbox" id="firstname${i}" name="firstname${i}" ${checked}>
            <label contenteditable="true" for="firstname${i}">${firstname}</label>
        </li>
    `;
    i++;
});
// Ciblage des checkbox qui viennent d'être créées
const checkboxTable = document.querySelectorAll('.checkbox');

// Ecouteur d'événement à chaque changement d'état d'une checkbox
checkboxTable.forEach(e => {
    e.addEventListener('change', e => {
        // Vidange du contenu du tableau 'members'
        members = [];
        // Controle de chaque input
        checkboxTable.forEach(checkbox => {
            // Si la checkbox est coché
            if (checkbox.checked == true) {
                // Ajouter le prénom au tableau 'members'
                members.push(nextLabel(checkbox));
            }
        });
        // Affectation des valeurs du tableau dans le paragraphe 'membersSelect'
        membersSelect.innerHTML = members;

        // Le tableau members ne doit pas être vide 
        // pour que la partie aléatoire apparaisse
        if ((members != []) && (members != null) && (members != '')) { //Si members est pas vide
            section.classList.remove('d-none');
        } else { section.classList.add('d-none'); }
        
        // Mise en local storage du tableau members contenant les membres cochés
        membersSTR = JSON.stringify(members);
        localStorage.setItem('members', membersSTR);
    })
});

// Lancement bouton 'GO'
btnSection.forEach((button) => { //Boucle sur tous les 'button'
    button.addEventListener('click', () => { //Ecouteur d'événement au clic
        if (button.value == 'go') { //Si le bouton en cours a pour value 'go'
            startInterval(); //Appel de la fonction startInterval();
            setTimeout(() => { //
                clearInterval(interval1);
            }, 3000)
        }
        button.classList.add('disabled')
    })
})