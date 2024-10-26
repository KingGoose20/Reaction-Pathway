const reactions = [
    { originalA: 'Alcohol', mechanism: 'Condensation', catalyst: 'Concentrated H2SO4', conditions: 'Heat', reactant: '', output: 'Ester' },
    { originalA: 'Alcohol', mechanism: 'Oxidation', catalyst: '', conditions: 'Heat Gently and Distill', reactant: 'Cr2O7(2-)/H+', output: 'Aldehyde' },
    { originalA: 'Aldehyde', mechanism: 'Oxidation', catalyst: '', conditions: 'Heat', reactant: 'Cr2O7(2-)/H+', output: 'Carboxylic Acid' },
    { originalA: 'Alkane', mechanism: 'Substitution', catalyst: '', conditions: 'UV Light', reactant: 'Hydrogen Halide', output: 'Haloalkane' },
    { originalA: 'Alkene', mechanism: 'Addition', catalyst: 'Ni or Pt Catalyst', conditions: '', reactant: 'Hydrogen (H2)', output: 'Alkane' },
    { originalA: 'Alkene', mechanism: 'Addition', catalyst: '', conditions: '', reactant: 'Hydrogen Halide (HX)', output: 'Haloalkane' },
    { originalA: 'Alkene', mechanism: 'Addition', catalyst: '', conditions: '', reactant: 'Halogen (X2)', output: 'Dihaloalkane' },
    { originalA: 'Alkene', mechanism: 'Addition', catalyst: 'Dilute H3PO4, H2SO4', conditions: '', reactant: 'Steam', output: 'Alcohol' },
    { originalA: 'Alkyne', mechanism: 'Addition', catalyst: 'Ni or Pt Catalyst', conditions: '', reactant: 'Hydrogen (H2)', output: 'Alkene' },
    { originalA: 'Alkyne', mechanism: 'Addition', catalyst: '', conditions: '', reactant: 'Hydrogen Halide (HX)', output: 'Haloalkane' },
    { originalA: 'Alkyne', mechanism: 'Addition', catalyst: 'Lindlar Catalyst', conditions: '', reactant: 'Hydrogen (H2)', output: 'Alkene' },
    { originalA: 'Carboxylic acid', mechanism: 'Condensation', catalyst: '', conditions: 'Heat', reactant: '', output: 'Amide' },
    { originalA: 'Haloalkane', mechanism: 'Elimination', catalyst: 'NaOH or KOH', conditions: 'Heat', reactant: '', output: 'Alkene' },
    { originalA: 'Haloalkane', mechanism: 'Substitution', catalyst: '', conditions: 'UV Light', reactant: 'Hydrogen Halide', output: 'Dihaloalkane' },
    { originalA: 'Haloalkane', mechanism: 'Substitution', catalyst: '', conditions: '', reactant: 'NaOH, KOH', output: 'Alcohol' },
    { originalA: 'Haloalkane', mechanism: 'Substitution', catalyst: '', conditions: '', reactant: 'Potassium Cyanide (KCN)', output: 'Nitrile' },
    { originalA: 'Haloalkane', mechanism: 'Substitution', catalyst: 'Ethanol', conditions: 'Heat', reactant: 'Concentrated NH3', output: 'Amine' },
    { originalA: 'Nitrile', mechanism: 'Reduction', catalyst: 'Nickel Catalyst', conditions: '', reactant: 'Hydrogen (H2)', output: 'Amine' },
];

let currentCompound = null;
let endCompound = null;
let steps = [];

// Function to get a random question
function generateRandomQuestion() {
    document.getElementById("rm").value = ""
    document.getElementById("c").value = ""
    document.getElementById("rc").value = ""
    document.getElementById("r").value = ""
    document.getElementById('randomQuestionContainerAnswer').style.display = "none"
    const randomIndex = Math.floor(Math.random() * reactions.length);
    const reaction = reactions[randomIndex];
    const question = `How does <b>${reaction.originalA}</b> become <b>${reaction.output}</b>?`;
    const details = `Mechanism: ${reaction.mechanism}, Catalyst: ${reaction.catalyst || 'None'}, Conditions: ${reaction.conditions || 'None'}, Reactant: ${reaction.reactant || 'None'}`;
    document.getElementById('randomQuestionContainer').innerHTML = `<p>${question}</p>`;
    document.getElementById("rma").value = `Mechanism: ${reaction.mechanism}`
    document.getElementById("ca").value = `Catalyst: ${reaction.catalyst || 'None'}`
    document.getElementById("rca").value = `Conditions: ${reaction.conditions || 'None'}`
    document.getElementById("ra").value = `Reactant: ${reaction.reactant || 'None'}`
    document.getElementById('randomQuestionInput').style.display = "block"
}

function showRandomQuestionAnswer() {
    document.getElementById('randomQuestionContainerAnswer').style.display = "block"
}

// Function to get a random compound
function getRandomCompound() {
    const compounds = [...new Set(reactions.map(r => r.originalA))]; // Get unique original compounds
    const randomIndex = Math.floor(Math.random() * compounds.length);
    return compounds[randomIndex];
}

function startTrackForward() {
    currentCompound = getRandomCompound(); // Randomly select a starting compound
    steps = []; // Clear previous steps
    document.getElementById('stepsContainer').innerHTML = '';
    document.getElementById('resultContainer').innerHTML = ''; // Clear previous results
    document.getElementById('stepsContainer').style.display = 'none'; // Hide steps container initially

    // Randomly select an end compound based on available reactions
    const possibleEndCompounds = reactions.map(r => r.output);
    const endCompoundIndex = Math.floor(Math.random() * possibleEndCompounds.length);
    endCompound = possibleEndCompounds[endCompoundIndex];

    // Display the randomly selected starting and end compounds
    document.getElementById('startingCompound').innerText = `Starting Compound: ${currentCompound}`;
    document.getElementById('endCompound').innerText = `End Compound: ${endCompound}`;

    // Start tracking forward
    trackForward(currentCompound);
}

function trackForward(compound) {
    const nextReactions = reactions.filter(r => r.originalA === compound);

    if (nextReactions.length === 0) {
        alert(`No further reactions available from ${compound}`);
        return;
    }

    nextReactions.forEach(reaction => {
        const stepInfo = document.createElement('div');
        stepInfo.innerHTML = `To convert ${compound} to ${reaction.output}: <br>
                              Mechanism: ${reaction.mechanism} <br>
                              Catalyst: ${reaction.catalyst || 'None'} <br>
                              Conditions: ${reaction.conditions || 'None'} <br>
                              Reactant: ${reaction.reactant || 'None'}`;
        steps.push({
            output: reaction.output,
            mechanism: reaction.mechanism,
            catalyst: reaction.catalyst,
            conditions: reaction.conditions,
            reactant: reaction.reactant
        }); // Store the entire reaction step for future reference
        document.getElementById('stepsContainer').appendChild(stepInfo);
    });

    // Check if we can continue to the end compound
    const endReaction = steps.find(step => step.output === endCompound);
    if (endReaction) {
        revealSteps();
    } else {
        alert(`No path found from ${compound} to ${endCompound}`);
    }
}

function revealSteps() {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = ''; // Clear previous results

    if (steps.length === 0) {
        resultContainer.textContent = 'No steps to reveal.';
        return;
    }

    // Show the steps container
    document.getElementById('stepsContainer').style.display = 'block';

    resultContainer.innerHTML = `Steps taken from ${currentCompound} to ${endCompound}: <br>`;

    // Iterate through the stored steps to build the pathway
    steps.forEach((step, index) => {
        resultContainer.innerHTML += `Step ${index + 1}: ${currentCompound} (via ${step.mechanism}) &rarr; ${step.output} <br>`;
        currentCompound = step.output; // Update the current compound for the next step
    });
}



function forwards() {
    const randomIndex = Math.floor(Math.random() * reactions.length);
    const reaction = reactions[randomIndex];
    passed = false
    for (i = 0; i < reactions.length; i++) {
        if (reaction.output == reactions[i].originalA || reaction.output == reactions[i].originalB) {
            passed = true
        }
    }
    if (passed == false) {
        forwards()
    } else {
        runmain(reaction)
    }

}

function runmain(initial) {
    maxlength = Math.floor(Math.random() * 6) + 2
    mainorder = []
    mainorder.push(initial)
    for (y = 0; y < maxlength; y++) {
        options = [];
        for (i = 0; i < reactions.length; i++) {
            length = mainorder.length - 1
            if (mainorder[length].output == reactions[i].originalA || mainorder[length].output == reactions[i].originalB) {
                options.push(reactions[i]);
            }
        }

        /* toRemove = []
        for (i=0; i<options.length; i++) {
            for (x=1; x<mainorder.length; x++) {
                if (mainorder[x].originalA == options[i].originalA || mainorder[x].originalB == options[i].originalB || mainorder[x].originalA == options[i].originalB || mainorder[x].originalB == options[i].originalA) {
                    toRemove.push(options[i])
                    console.log(mainorder[x])
                }
            }
        }

        console.log("TR:")
        console.log(options)
        console.log(toRemove)
        let filteredArray2 = options.filter(item => !toRemove.includes(item));*/
        mainorder.push(options[Math.floor(Math.random() * options.length)]); 
    }
    console.log(mainorder)

}