const kollektiv = window.KOLLEKTIV_CONFIG || {
    slug: "default",
    navn: "jer",
    tekst: `Jeg synes, jeres kollektiv virker som et sted, hvor jeg ville passe rigtig godt ind.

Jeg håber, jeg kan blive en del af jeres hverdag — både til fællesspisning, små samtaler i køkkenet, spontane planer og rolige aftener.`
};

const imagePath = (file) => {
    return window.KOLLEKTIV_CONFIG ? `../../images/${file}` : `images/${file}`;
};

function personligKommentar(boxName) {
    if (
        kollektiv.kommentarer &&
        kollektiv.kommentarer[boxName] &&
        kollektiv.kommentarer[boxName].trim() !== ""
    ) {
        return `\n\n${kollektiv.kommentarer[boxName]}`;
    }

    return "";
}

document.getElementById("welcomeTitle").innerText = `Hej ${kollektiv.navn}!`;

const boxes = {
    basal: {
        title: "5 hurtige",
        image: imagePath("Lillesoester.jpg"),
        caption: "Mig og mine to lillesøstre på Roskilde",
        text: `• Jeg hedder Mathias
• Jeg er 27 år
• Jeg er lige flyttet hjem fra London
• Jeg skal til at skrive en Ph.d. om pension
• Jeg er sød og rar${personligKommentar("basal")}`
    },

    faellesskab: {
        title: "Jeg elsker at bo sammen med andre mennesker",
        image: imagePath("julefrokost.jpeg"),
        caption: "Til julefrokost. Jeg ved ikke hvem hun er",
        text: `Jeg elskede mine 5 år på Tietgenkollegiet.

Men for mig var det ikke de store fester, der gjorde Tietgen særlig for mig. Misforstå mig ikke, jeg elsker alle Tietgens fester, hvad end det var TDC, køkkenfester eller festivalen. Men det særlige var at gå ud i køkkenet om morgenen og se mine køkkenmates allerede sidde i sofaen med en kop kaffe og snakke om alting og ingenting. De stunder er særlige for mig.${personligKommentar("faellesskab")}
`
    },

    renlig: {
        title: "Jeg er renlig",
        image: imagePath("TDC.jpeg"),
        caption: "Fra TDC, hvor man skal huske at rydde op dagen efter",
        text: `Efter 5 år på Tietgen lærer man at rydde op efter sig selv hver dag.

Man lærer også:
1. Ugentlig fællesrengøring
2. Månedlig fællesrengøring
3. Årlig fællesrengøring
4. At tørre tallerkener til Rasmus Seebach i Horsens${personligKommentar("renlig")}`
    },

    mad: {
        title: "Jeg elsker at lave mad og bage",
        image: imagePath("lang_polse.jpeg"),
        caption: "Madglæde, entusiasme og elsker pølser",
        text: `Jeg er klar til at stå i køkkenet og kokkerere til jer alle sammen. Så hvis en af jer gerne vil lære at lave surdejsbrød, donuts eller croissanter, så bruger jeg gerne en dag eller to i køkkenet med jer.${personligKommentar("mad")}`
    },

    noerd: {
        title: "Jeg er også lidt af en nørd",
        image: imagePath("USA.jpg"),
        caption: "Jeg er god til at elske ting",
        text: `Hvis I vil spille Magic med mine studievenner, læse den næste bog i min bogklub eller spille skak på Søpavillonen, så er jeg klar.${personligKommentar("noerd")}`
    },

    beboer: {
        title: "Sjældent et nej",
        image: imagePath("frivillig.jpeg"),
        caption: "Mit ansvar til festivalen var pissoiret ...",
        text: `Jeg var kendt for altid at være ude i køkkenet, lavede frivilligt arbejde på hele Tietgen og altid var klar på at arrangere ting, så vi kunne få folk ud ad døren. Derfor nominerede mine roomies mig også til årets beboer.${personligKommentar("beboer")}`
    },

    jer: {
        title: "Jeg glæder mig til at møde jer",
        image: imagePath("puslespil.jpg"),
        caption: "Kan I finde den manglende brik i puslespillet?",
        text: `${kollektiv.tekst}${personligKommentar("jer")}`
    }
};

function startApplication() {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("mindmap").classList.remove("hidden");
    createConnectionLine();
}

function openBox(boxName) {
    const box = boxes[boxName];

    document.getElementById("focusTitle").innerText = box.title;
    document.getElementById("focusImage").src = box.image;
    document.getElementById("focusCaption").innerText = box.caption;
    document.getElementById("focusText").innerText = box.text;

    document.getElementById("overlay").classList.remove("hidden");
}

function closeBox() {
    document.getElementById("overlay").classList.add("hidden");
}

function createConnectionLine() {
    const mindmap = document.getElementById("mindmap");

    if (!document.getElementById("connectionLine")) {
        const line = document.createElement("div");
        line.id = "connectionLine";
        line.className = "connection-line";
        mindmap.appendChild(line);
    }

    const thoughts = document.querySelectorAll(".thought");

    thoughts.forEach((thought) => {
        thought.addEventListener("mouseenter", () => drawConnection(thought));
        thought.addEventListener("mouseleave", hideConnection);
    });
}

function drawConnection(thought) {
    const mindmap = document.getElementById("mindmap");
    const center = document.querySelector(".center-person img");
    const line = document.getElementById("connectionLine");

    const mindmapRect = mindmap.getBoundingClientRect();
    const centerRect = center.getBoundingClientRect();
    const thoughtRect = thought.getBoundingClientRect();

    const x1 = centerRect.left + centerRect.width / 2 - mindmapRect.left;
    const y1 = centerRect.top + centerRect.height / 2 - mindmapRect.top;

    const x2 = thoughtRect.left + thoughtRect.width / 2 - mindmapRect.left;
    const y2 = thoughtRect.top + thoughtRect.height / 2 - mindmapRect.top;

    const distance = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = `${distance}px`;
    line.style.transform = `rotate(${angle}deg)`;

    mindmap.classList.add("show-line");
}

function hideConnection() {
    document.getElementById("mindmap").classList.remove("show-line");
}

window.addEventListener("resize", () => {
    hideConnection();
});

let rejectClicks = 0;

function rejectTrick() {
    const btn = document.getElementById("rejectBtn");
    const popup = document.getElementById("popup");

    rejectClicks++;

    if (rejectClicks === 1) {
        btn.style.transform = "translateX(130px)";
    } else if (rejectClicks === 2) {
        btn.style.transform = "translateX(-130px) scale(0.8)";
    } else if (rejectClicks === 3) {
        popup.style.display = "block";
        setTimeout(() => popup.style.display = "none", 2500);
    } else if (rejectClicks === 4) {
        btn.innerText = "Er I sikre? 😭";
        btn.style.transform = "scale(0.7)";
    } else {
        btn.style.display = "none";
    }
}

function chooseMe() {
    const email = "mathias.held.berg@gmail.com";

    const subject = encodeURIComponent(`Vi vælger dig til ${kollektiv.navn}!`);

    const body = encodeURIComponent(
        `Hej Mathias,

Vi vil rigtig gerne invitere dig forbi og møde os.

Dato: [indsæt dato]

Vi glæder os til at høre fra dig!

De bedste hilsner,
${kollektiv.navn}`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

