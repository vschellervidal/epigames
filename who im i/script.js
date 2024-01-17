document.getElementById("submit").addEventListener("click", afficherResultat);

const questions = [
    {
        question: "Quelle est ton language préféré ?",
        reponses: {
            a: "C, classique mais efficace",
            b: "C++, ici, on est professionel",
            c: "Assembleur, j'aime me battre"
        }
    },
    {
        question: "Quelle est ton plat préféré ?",
        reponses: {
            a: "Le tacos (offert par un étudiant bien sur)",
            b: "La raclette, dans la SM1",
            c: "Tête en l'air, un pédago, ca se respecte!"
        }
    },
    {
        question: "Tu n'as rien a faire de ta soirée, que fait tu ?",
        reponses: {
            a: "JE CODE CHEZ MOI EN SAAAAAAAH!",
            b: "Un peu d'escalade",
            c: "Je construit un micro processeur pour recréer windows 11 sur un rasberry py, une soirée chill quoi..."
        }
    },
    {
        question: "Que fait tu avec 1 million d'euro ?",
        reponses: {
            a: "J'achète des caméras 4K full HD pour que les étudiants stream",
            b: "Go en turquie pour les implents!",
            c: "Rien dutout, je dois d'abords finir de recoder le système d'atterissage de la nasa en binaire"
        }
    },
    {
        question: "Un étudiant a une Question sur du code Haskell, que faire ?",
        reponses: {
            a: "Lis le man mon reuf, pas le temps de t'aider",
            b: "Hmmmmmmm, attend, je me renseigne et je reviens demain avec des réponses",
            c: "OOOOOOH putain, enfin quelqu'un qui s'interesse a ce language"
        }
    }
    // Ajoutez plus de questions ici
];

function chargerQuestions() {
    const quizContainer = document.getElementById("quiz");
    questions.forEach((questionCourante, numeroQuestion) => {
        const reponses = Object.keys(questionCourante.reponses).map(
            lettre => `
                <label>
                    <input type="radio" name="question${numeroQuestion}" value="${lettre}">
                    ${questionCourante.reponses[lettre]}
                </label>`
        ).join('');

        quizContainer.innerHTML += `<div class="question">${questionCourante.question}</div>
                                    <div class="reponses">${reponses}</div>`;
    });
}

const personnages = {
    'a': { nom: "Léo Sarochard", image: "imgWHO/1.png" },
    'b': { nom: "Luca Sanchez", image: "imgWHO/3.png" },
    'c': { nom: "Karim Dridi", image: "imgWHO/2.png" }
};

function afficherResultat() {
    const reponses = questions.map((_, i) => {
        const selecteursReponses = document.querySelectorAll(`input[name=question${i}]:checked`);
        return selecteursReponses.length > 0 ? selecteursReponses[0].value : null;
    });

    const compteReponses = reponses.reduce((compte, reponse) => {
        if (!compte[reponse]) {
            compte[reponse] = 0;
        }
        compte[reponse]++;
        return compte;
    }, {});

    let personnageMax = null;
    let maxCount = 0;

    for (const reponse in compteReponses) {
        if (compteReponses[reponse] > maxCount) {
            maxCount = compteReponses[reponse];
            personnageMax = reponse;
        }
    }

    // Sélection du personnage et de l'image correspondante
    const personnageChoisi = personnages[personnageMax];

    // Construction du HTML pour afficher le résultat
    const resultatDiv = document.getElementById("resultat");
    if (personnageChoisi) {
        resultatDiv.innerHTML = `<p>Voici qui vous êtes : ${personnageChoisi.nom}</p>
                                 <img src="${personnageChoisi.image}" alt="${personnageChoisi.nom}">`;
    } else {
        resultatDiv.innerHTML = "Veuillez répondre à toutes les questions.";
    }
}


chargerQuestions();
