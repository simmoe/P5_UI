/*

I denne skitse ser du en masse eksempler på hvordan man kan oprette og manipulere HTML sidens DOM med p5.js

En DOM (document object model) for en HTML side, er alle de elementer der er på siden. Hvis du åbner index.html kan du imidlertid se, at der er en tom body. 

Og det skyldes at vi i denne skitse bruger javascript - nærmere bestemt biblioteket p5.js - til at oprette og manipulere sidens HTML elementer. 

Denne skitse bygger udelukkende på metoder fra p5 add'on biblioteket p5 DOM. 

Brug referencen her: https://p5js.org/reference/#/libraries/p5.dom

Eller følg denne tutorial, hvis du er sat helt af: https://github.com/processing/p5.js/wiki/Beyond-the-canvas
*/

//Det er en god vane at oprette variable til sine elementer, så man kan manipulere dem senere
// I dette eksempel har jeg valgt følgende elementer - se selv om du kan oprette flere

let h, p, div, input, button, select, link, slider, canvas;

function setup() {
    //Se referencen for alle create metoderne og deres parametre. CreateElement er generisk, og kan bruges i stedet for alle de andre hvis man har lyst til det
    h = createElement('h1', 'UI med p5.js DOM');

    p = createP('Her er en paragraf');
    div = createDiv();
    p.parent(div);
    //hvis du åbner html siden, kan du se at paragraffen, p "bor" inde i div'en div. Det er et meget grundlæggende eksempel på hvordan en html DOM er bygget op

    input = createInput();
    //med .attribute() kan man tilføje attributter til DOM elementer, fx
    input.attribute('placeholder', 'Skriv noget');
    //og med style() kan man tilføje styles...
    input.style('font-size', '2em');
    //Det er imidlertid sundere at sætte styling op som klasser og id'er
    input.addClass('stor-text')
    //og så lave en klasse i sit style-sheet, der hedder stor-text

    //knapper oprettes med createButton()
    button = createButton('Tryk her');
    //Og denne knap styles ved hjælp af en klasse i stylesheetet - åbn style.css
    button.addClass('blue');
    //Typisk er knapper til for at blive trykket på, for eksempel kan vi putte teksten i inputfeltet ind i paragraffen fra før
    button.mousePressed(function () {
        p.html(input.value());
    });

    //hvis vi vil have et hurtigt html element til layout uden variabel, kan vi altid oprette dem on the fly:
    createSpan('<br/><br/><hr/><br/>');

    //En select oprettes sådan her:
    select = createSelect();
    select.option('vælg');
    select.option('pærer');
    select.option('bananer');
    select.option('æbler');
    //.changed() er et event, som fyres når man vælger i select'en
    select.changed(function () {
        p.html('Du valgte ' + select.value());
    });

    //links laver vi med createA
    createA('http://p5js.org/', 'her er et link til p5');

    //hvis vi vil have et hurtigt html element til layout uden variabel, kan vi altid oprette dem on the fly:
    createSpan('<br/><br/><hr/><br/>');

    //Indtil videre har vi ikke haft et canvas 
    canvas = createCanvas(400, 200);
    background('#1EAEDB');
    //Som du ser dukker det automatisk op, der hvor vi er "nået til" i DOM strukturen
    //normalt laver vi derfor et canvas først for at sikre os at sidens koordinatsystem svarer til det  

    //Men hvad nu hvis vi ville lægge et DOM element ind over vores canvas midt i det hele?
    //Vi kunne lave en slider
    slider = createSlider(0,300);
    //men denne linje vil lægge slideres position i forhold til siden
    slider.position(20, 20);

    //derfor er vi nødt til at bruge lidt mere avanceret html DOM manipulation
    //først skal vi have fat i det egentlige html element, som canvas er i index.html
    //p5 har en funktion til det - elt
    //derefter kan vi bruge standard javascript metoder på elementet - for eksempel denne
    let canvasRect = canvas.elt.getBoundingClientRect();
    createP("Her er canvas øverte venstre hjørne nu: " + canvasRect.left + ", " + canvasRect.top);

    //og så kan vi sætte vores slider rigtigt
    slider.position(20 + canvasRect.left, 20 + canvasRect.top);

    //Slideren reagerer forresten også med en event - input er konstant, mens changed er når man slipper noget igen eller trykekr enter 
    slider.input(function(){
        p.html(slider.value());
    });
    //hvis vi vil have et hurtigt html element til layout uden variabel, kan vi altid oprette dem on the fly:
    createSpan('<br/><br/><hr/><h5>Mus og tastaturinput</h5><br/>');

    //Lad os til sidst se på mus og tastatur input - eftersom dette er værdier der hele tiden ændrer sig, er det sjovest at arbejde med dem i draw
}


function draw() {
    background('#1EAEDB');

    //Aflæs mus og skriv direkte på skærmen med p5 funktionen text() 
    text("x: " + mouseX + ", y: " + mouseY, 20, 60);


}

//keyPressed er en metode vi "arver" fra p5. Dvs vi kan overtage den ved at implementere den med samme navn, som nedenfor:
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      slider.value(0);
      p.html("Du trykkede på pil venstre, sætter slider value min");
    } else if (keyCode === RIGHT_ARROW) {
        slider.value(300);
        p.html("Du trykkede på pil højre, sætter slider value max");
    }else{
        p.html("Du trykkede på " + keyCode);
    }
  }