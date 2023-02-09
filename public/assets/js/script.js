// Déclaration des variables
var interval1 = null;
let firstnames = ['Thierry', 'Pauline', 'Rémi', 'Cyprien', 'Mickaël', 'Fanny', 'Fatimzahra', 'Florian', 'Stéphanie', 'Maxence', 'Nawelle', 'Salah', 'Perrine'];


// Ciblage des éléments HTML
const section = document.querySelector('section');
const membersSelect = document.querySelector('.membersSelect');
const btnSection = document.querySelectorAll('button');
const scrollFirstname = document.querySelector('.scrollFirstname');
// Sélection de tous les input qui sont dans un fieldset
const caseCheck = document.querySelectorAll('fieldset input');
// Sélection de tous les labels
const labels = document.querySelectorAll('label');
const btnAside = document.getElementById('checkTouch');
// Ciblage des checkbox
const checkboxList = document.querySelector('.checkboxList')

// LOCAL STORAGE
let members = localStorage.getItem("members");
members = JSON.parse(members);

// Fonctions
// Fonction pour afficher un prénom aléatoire jusqu'au stop
function scrollMembers() {
    scrollFirstname.innerHTML = randomFirstname(members);
    console.log( scrollFirstname.innerHTML);
}

// Fonction qui retourne un prénom aléatoire du tableau members
function randomFirstname(members) {
    let randomNumber = Math.floor(Math.random()*members.length);
    let firstname = members[randomNumber];
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
firstnames.forEach(firstname => {
    let checked = 'unchecked';
    if (members.includes(firstname)) {
        checked = 'checked';
    }
    checkboxList.innerHTML += `
        <li class="mx-3">
            <input class="checkbox" type="checkbox" id="firstname${i}" name="firstname${i}" ${checked}>
            <label contenteditable="true" for="firstname${i}">${firstname}</label>
        </li>
    `;
    i++;
});

const checkboxTable = document.querySelectorAll('.checkbox');

// Ecouteur d'événement à chaque changement d'état d'une checkbox
checkboxTable.forEach(e => {
    e.addEventListener('change', e => {
        // Vidange du contenu du tableau 'members'
        members = [];
        // Controle de chaque input
        console.log(caseCheck);
        caseCheck.forEach(caseBox => {
            // Si la checkbox est coché
            if (caseBox.checked == true) {
                // Ajouter le prénom au tableau 'members'
                members.push(nextLabel(caseBox));
        }
    });
    console.table(members);
    // Affectation des valeurs du tableau dans le paragraphe 'membersSelect'
    membersSelect.innerHTML = members;

    // Le tableau members ne doit pas être vide 
    // pour que la partie aléatoire apparaisse
    if (members != '') {
    section.classList.remove('d-none');
    members = JSON.stringify(members);
    localStorage.setItem('members', members);
    }else {section.classList.add('d-none');}

    })
});

// // Ecouteur d'événement au clique sur le bouton sélectionner
// btnAside.addEventListener('click',()=>{
//     // Vidange du contenu du tableau 'members'
//     members = [];
//     // Controle de chaque input
//     caseCheck.forEach(caseBox => {
//         // Si la checkbox est coché
//         if (caseBox.checked == true) {
//             // Ajouter le prénom au tableau 'members'
//             members.push(nextLabel(caseBox));
//         }
//     });
//     console.table(members);
//     // Affectation des valeurs du tableau dans le paragraphe 'membersSelect'
//     membersSelect.innerHTML = members;

//     // Le tableau members ne doit pas être vide 
//     // pour que la partie aléatoire apparaisse
//     if (members != '') {
//     section.classList.remove('d-none');
//     }else {section.classList.add('d-none');}

// });

// Lancement 
btnSection.forEach((button)=>{
    button.addEventListener('click',()=>{
        if (button.value == 'go') {
            startInterval();
            setTimeout(()=>{
                clearInterval(interval1);
            }, 3000)} 
        if (button.value == 'stop') {
            clearInterval(interval1);
        }
        button.classList.add('disabled')
    })
})

caseCheck.forEach((element,index)=>{
    element.addEventListener('click', ()=>{
        element[index].classList.toggle('text-decoration-line-through');
    })
})