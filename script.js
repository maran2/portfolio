/* =========================
   RUMMY CARD STYLE NAVIGATION
========================= */

const cards = [
    document.querySelector("#home"),
    document.querySelector("#about"),
    document.querySelector("#skills"),
    document.querySelector("#projects"),
    document.querySelector("#education"),
    document.querySelector("#contact")
];

const navLinks = document.querySelectorAll("nav a");

let currentCard = 0;
let isAnimating = false;


/* =========================
   INITIAL SETUP
========================= */

cards.forEach((card, index) => {

    card.classList.remove("active", "prev", "next");

    if (index === 0) {
        card.classList.add("active");
    } else {
        card.classList.add("next");
    }

});

setActiveNav(0);
updatePageNumber(0);


/* =========================
   GO TO CARD
========================= */

function goToCard(newIndex) {

    if (isAnimating) {
        return;
    }

    if (newIndex < 0 || newIndex >= cards.length) {
        return;
    }

    if (newIndex === currentCard) {
        return;
    }

    isAnimating = true;

    const oldIndex = currentCard;

    currentCard = newIndex;


    /* Remove old classes */

    cards.forEach(card => {

        card.classList.remove(
            "active",
            "prev",
            "next"
        );

    });


    /* Old card moves out */

    if (newIndex > oldIndex) {

        cards[oldIndex].classList.add("prev");

    } else {

        cards[oldIndex].classList.add("next");

    }


    /* New card becomes active */

    cards[newIndex].classList.add("active");


    /* Position remaining cards */

    cards.forEach((card, index) => {

        if (
            index !== oldIndex &&
            index !== newIndex
        ) {

            if (index > newIndex) {

                card.classList.add("next");

            } else {

                card.classList.add("prev");

            }

        }

    });


    setActiveNav(newIndex);

    updatePageNumber(newIndex);


    /*
       IMPORTANT

       Lock scrolling for 1 second.
       Even if user scrolls very fast,
       only one page will move.
    */

    setTimeout(() => {

        isAnimating = false;

    }, 1000);

}


/* =========================
   NAVBAR CLICK
========================= */

navLinks.forEach((link, index) => {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        goToCard(index);

    });

});


/* =========================
   ACTIVE NAVBAR
========================= */

function setActiveNav(index) {

    navLinks.forEach(link => {

        link.classList.remove("active");

    });

    if (navLinks[index]) {

        navLinks[index].classList.add("active");

    }

}


/* =========================
   PAGE NUMBER
========================= */

function updatePageNumber(index) {

    const number =
        String(index + 1).padStart(2, "0");

    document.body.style.setProperty(
        "--page-number",
        `"${number} / 06"`
    );

}


/* =========================
   RIGHT / LEFT SCREEN CLICK
========================= */

document.addEventListener("click", function (event) {

    if (window.innerWidth <= 800) {
        return;
    }


    /* Don't trigger on navbar */

    if (event.target.closest(".navbar")) {
        return;
    }


    /* Don't trigger on links/buttons */

    if (
        event.target.closest("a") ||
        event.target.closest("button")
    ) {
        return;
    }


    const screenWidth = window.innerWidth;

    const clickX = event.clientX;


    /* Click RIGHT side */

    if (clickX > screenWidth / 2) {

        goToCard(currentCard + 1);

    }


    /* Click LEFT side */

    else {

        goToCard(currentCard - 1);

    }

});


/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", function (event) {

    if (window.innerWidth <= 800) {
        return;
    }


    /* RIGHT ARROW */

    if (event.key === "ArrowRight") {

        goToCard(currentCard + 1);

    }


    /* LEFT ARROW */

    if (event.key === "ArrowLeft") {

        goToCard(currentCard - 1);

    }

});


/* =========================
   MOUSE WHEEL
========================= */

document.addEventListener(
    "wheel",
    function (event) {

        if (window.innerWidth <= 800) {
            return;
        }


        /*
           Stop normal browser scrolling
        */

        event.preventDefault();


        /*
           If animation is running,
           ignore additional scrolls.
        */

        if (isAnimating) {
            return;
        }


        /*
           Scroll DOWN → NEXT PAGE
        */

        if (event.deltaY > 0) {

            goToCard(currentCard + 1);

        }


        /*
           Scroll UP → PREVIOUS PAGE
        */

        else {

            goToCard(currentCard - 1);

        }

    },
    {
        passive: false
    }
);