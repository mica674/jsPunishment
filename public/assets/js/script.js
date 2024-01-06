// Déclaration des variables
var interval1 = null;
// Déclaration et récupération des données du local storage s'il y en a pour 'FIRSTNAMES'
let firstnames = ['Justine', 'Julien', 'Guy', 'Micka', 'Léo', 'Guillaume', 'Elodie', 'Gaël'];
let firstnamesParse = localStorage.getItem("firstnames");
if ((firstnamesParse != []) && (firstnamesParse != null) && (firstnamesParse != '')) { //Si firstnames est pas vide
    firstnames = JSON.parse(firstnamesParse);
} else {
    localStorageSetter(firstnames, 'firstnames');
}


// Ciblage des éléments HTML
const section = document.querySelector('section');
const membersSelect = document.querySelector('.membersSelect');
const btnSection = document.querySelectorAll('button');
const scrollFirstname = document.querySelector('.scrollFirstname');
const formAdd = document.querySelector('form');
const inputAdd = document.querySelector('#firstname');
const submitButton = document.querySelector('.submitButton');

// Sélection de tous les labels
const labels = document.querySelectorAll('label');
const btnAside = document.getElementById('checkTouch');
// Ciblage de l'ul contenant toutes les checkbox
const checkboxList = document.querySelector('.checkboxList')

// LOCAL STORAGE
members = localStorageGetter("members");
if ((members != []) && (members != null) && (members != '')) { //Si members est pas vide
    section.classList.remove('d-none');

    //Affichage des participants sélectionnés dans la liste
    displayMembersSelected(members);
}
else { section.classList.add('d-none'); }


// Fonctions
// Fonction pour afficher un prénom aléatoire jusqu'au stop
function scrollMembers() {
    if ((members != []) && (members != null) && (members != '')) {
        scrollFirstname.innerHTML = randomFirstname(members);
    }
    else {
        scrollFirstname.innerHTML = "Aucun participant sélectionné";
        clearInterval(interval1);
        console.log("Aucun participant n'est sélectionné, arrêt du tirage au sort");
    }
}

// Fonction qui retourne un prénom aléatoire du tableau members
function randomFirstname(members) {
    let randomNumber = Math.floor(Math.random() * members.length);
    let firstname = members[randomNumber];
    console.log(`Participant tiré au sort : ${firstname}`);
    return firstname;
}

// Fonction répition du scrollRandom à interval régulier
function startInterval() {
    interval1 = setInterval(scrollMembers, 300);
    console.log("Attente..");
}

// Fonction pour récupérer le prénom en fonction de l'input en paramètre
function nextLabel(inputCurrent) {
    let liParent = inputCurrent.closest('li');
    return liParent.querySelector('label').innerHTML;
}

// Fonction pour affecter les participants sélectionnés dans la liste des participants 
function displayMembersSelected(members) {
    console.log(`Affichage de la liste des participants ${membersSelect.innerHTML}`);
    membersSelect.innerHTML = "";
    members.forEach((member, index, array) => {
        membersSelect.innerHTML += (array.length > index + 1) ? (member + ", ") : member;
    });
    console.log(membersSelect.innerHTML);
}

// Fonction pour sélectionner/désélectionner toutes les checkbox, dépend du paramètre State
function checkedUncheckedCheckbox(State) {
    let checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(cbElement => {
        cbElement.checked = State;
    })
    if (!State) {
        members = "";
        localStorageSetter(members, 'members');
        console.log("Toutes les checkbox ont été désélectionnées");
    }
    else {
        members = firstnames;
        localStorageSetter(members, 'members');
        displayMembersSelected(members);
        console.log("Toutes les checkbox ont été sélectionnées");
    }
}

//LOCAL STORAGE
//GET
function localStorageGetter(key) {
    let firstnamesPARSE = localStorage.getItem(key);
    return JSON.parse(firstnamesPARSE);
}
//SET
function localStorageSetter(firstnamesList, key) {
    let firstnamesListSTR = JSON.stringify(firstnamesList);
    localStorage.setItem(key, firstnamesListSTR);
    console.log(`Mise à jour du local storage \n   Clé : ${key}\n   Liste : ${firstnamesList}`);
}

function memberInsertHTML(firstname, i, checked) {
    checkboxList.innerHTML += `
        <li class="mx-3 w-sm-25 w-50 rounded" id="listItem${i}">
            <div class="row">
                <div class="col-10 my-auto">
                    <input class="ms-3 checkbox ${firstname}" type="checkbox" id="firstname${i}" name="firstname${i}" ${checked}>
                    <label class="ms-3" contenteditable="true" for="firstname${i}">${firstname}</label>
                </div>
                <div class="col-1">
                    <button class="deleteImageButton ${firstname}" id="deleteImage${i}">
                        <img src="./public/assets/img/deleteImage.jpg" class="deleteImage" alt="Suppression">
                    </button>
                </div>
            </div>
        </li>
    `;
    console.log(`Insertion d'un nouveau participant dans la liste : ${firstname}`);

}

// Fonction mise à jour des éléments à cibler
// function updateQuerySelectorAll() {
//     checkboxTable = document.querySelectorAll('.checkbox');
//     deleteTable = document.querySelectorAll('.deleteImageButton');
//     console.log(checkboxTable);
// }

// Fonction pour supprimer l'élément ciblé de la liste, précisée en paramètre
function deleteHim(firstname, array) {
    let indexOf = array.indexOf(firstname);
    if (indexOf !== -1) {
        array.splice(indexOf, 1);
    }
}

// Fonction pour supprimer le prénom des listes, et l'élément HTML qui l'affichait
function deleteSomeone(firstname, listItemID) {
    deleteHim(firstname, members);
    deleteHim(firstname, firstnames);
    const element = document.getElementById(listItemID);
    element.remove(); 
}

// Fonction pour ajouter les écouteurs d'événements
function addEventListenerToNewItem(number) {
    console.log(`Ajout des écouteurs d'événements sur le nouvel élément. \nfirstname n°${i}`);
    let elementCb = document.querySelector(`#firstname${number}`);
    let elementDeleteButton = document.querySelector(`#deleteImage${number}`);
    console.log(elementCb.id + '\n' + elementDeleteButton.id);
    // Checkbox
    elementCb.addEventListener('change', () => {
        let checkedUnchecked = elementCb.checked ? "coché" : "décoché";
        console.log(`Participant ${elementCb.classList[2]} ${checkedUnchecked}`);
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
        membersSelect.innerHTML = "";
        displayMembersSelected(members);

        // Le tableau members ne doit pas être vide 
        // pour que la partie aléatoire apparaisse
        if ((members != []) && (members != null) && (members != '')) { //Si members est pas vide
            section.classList.remove('d-none');
        } else { section.classList.add('d-none'); }

        // Mise en local storage du tableau members contenant les membres cochés
        localStorageSetter(members, 'members');
    })
    // DeleteButton
    elementDeleteButton.addEventListener('click', () => {
        console.log(elementDeleteButton.classList[1]);
        deleteSomeone(elementDeleteButton.classList[1], elementDeleteButton.closest('li').id);
        localStorageSetter(members, 'members');
        localStorageSetter(firstnames, 'firstnames');
        console.log(`Suppression du participant ${elementDeleteButton.classList[1]} effectuée`);
    });
    console.log("Ajout des écouteurs d'événements");

}


// Instructions
// Créations des checkbox avec les prénoms du tableau de prénoms
let firstnamesIndex = 1;
firstnames.forEach((firstname) => {
    let checked = '';
    if (members != [] && members != null) { //Si members est pas vide
        if (members.includes(firstname)) { //Test si le prénom en cours est présent dans le local storage (members)
            checked = 'checked';
        }
    }
    memberInsertHTML(firstname, firstnamesIndex, checked);
    firstnamesIndex++;
});
// Ciblage des checkbox et boutons de suppression qui viennent d'être créées
var checkboxTable = document.querySelectorAll('.checkbox');
var deleteTable = document.querySelectorAll('.deleteImageButton');
console.log(deleteTable);


//EVENTS

// Ecouteur d'événement quand on clique sur un bouton suppression d'un participant
// deleteTable.forEach(e)

// Ecouteur d'événement à chaque changement d'état d'une checkbox
checkboxTable.forEach(e => {
    e.addEventListener('change', () => {
        let checkedUnchecked = e.checked ? "coché" : "décoché";
        console.log(`Participant ${e.classList[2]} ${checkedUnchecked}`);
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
        membersSelect.innerHTML = "";
        displayMembersSelected(members);

        // Le tableau members ne doit pas être vide 
        // pour que la partie aléatoire apparaisse
        if ((members != []) && (members != null) && (members != '')) { //Si members est pas vide
            section.classList.remove('d-none');
        } else { section.classList.add('d-none'); }

        // Mise en local storage du tableau members contenant les membres cochés
        localStorageSetter(members, 'members');
    })
});

// Ecouteur d'événement sur le bouton submit pour l'ajout du prénom
formAdd.addEventListener('submit', (e) => {
    console.log(`Ajout d'un nouveau participant '${inputAdd.value}'`);
    e.preventDefault();
    if (inputAdd.value != '') {
        let firstnameAdd = inputAdd.value;

        let ulTargeted = document.querySelector('.checkboxList');
        let ulChidren = ulTargeted.childNodes;
        console.log(ulChidren);
        let lastChildNumber = [ulChidren[ulChidren.length-2]][0].id;
        console.log(lastChildNumber);
        console.log(lastChildNumber.substring(8));
        lastChildNumber = lastChildNumber.substring(8);
        

        memberInsertHTML(firstnameAdd, lastChildNumber, "checked");
        firstnames.push(firstnameAdd);
        if (typeof (members) === 'undefined') {
            var members = localStorageGetter('members');
        }
        console.log(members);
        if ((members != []) && (members != null) && (members != '')) { //Si members est pas vide
            members.push(firstnameAdd);
        } else {
            var members = [firstnameAdd];
        };
    }

    // Ecrasement des données stockées en local storage
    localStorageSetter(members, 'members');
    localStorageSetter(firstnames, 'firstnames');
    addEventListenerToNewItem(lastChildNumber);
})

// Lancement bouton 'GO'
btnGo.addEventListener('click', () => { //Ecouteur d'événement au clic
    console.log(`Clique sur le bouton '${btnGo.innerHTML}'`);
    clearInterval(interval1);
    startInterval(); //Appel de la fonction startInterval();
    setTimeout(() => { //
        console.log('Fin de la sélection');
        clearInterval(interval1);
        btnGo.classList.remove('disabled');
    }, 3000)
    btnGo.classList.add('disabled');
})

//Sélection de toutes les checkbox
btnSelectAll.addEventListener('click', () => {
    console.log(`Clique sur le bouton '${btnSelectAll.innerHTML}'`);
    checkedUncheckedCheckbox(true);
})

//Désélection de toutes les checkbox
btnUnselectAll.addEventListener('click', () => {
    console.log(`Clique sur le bouton '${btnUnselectAll.innerHTML}'`);
    checkedUncheckedCheckbox(false);
})

deleteTable.forEach(deleteButton => {
    deleteButton.addEventListener('click', () => {
        console.log(deleteButton.classList[1]);
        deleteSomeone(deleteButton.classList[1], deleteButton.closest('li').id);
        localStorageSetter(members, 'members');
        localStorageSetter(firstnames, 'firstnames');
        console.log(`Suppression du participant ${deleteButton.classList[1]} effectuée`);
    });
})

console.log("Test");
let testCiblage = document.querySelector('.checkboxList');
let testChild = testCiblage.childNodes;
let test = testChild.length;
console.log(testChild);
let test2 = [testChild[testChild.length-2]][0].id.substring(8);
// let test2 = testChild.filter((element)=> element.id.substring(0,3) == "list")
console.log(test);
console.log(test2);

//SHORTCUT
// SHIFT + ALT + F : AutoIndentation du code 