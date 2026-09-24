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

    card.classList.remove(
        "active",
        "prev",
        "next"
    );

    if (index === 0) {

        card.classList.add("active");

    } else {

        card.classList.add("next");
    }
});

setActiveNav(0);
updatePageNumber(0);


/* =========================
   GO TO CARD - DESKTOP
========================= */

function goToCard(newIndex) {

    if (isAnimating) return;

    if (
        newIndex < 0 ||
        newIndex >= cards.length
    ) {
        return;
    }

    if (newIndex === currentCard) return;

    isAnimating = true;

    const oldIndex = currentCard;

    currentCard = newIndex;


    cards.forEach(card => {

        card.classList.remove(
            "active",
            "prev",
            "next"
        );
    });


    if (newIndex > oldIndex) {

        cards[oldIndex].classList.add("prev");

    } else {

        cards[oldIndex].classList.add("next");
    }


    cards[newIndex].classList.add("active");


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


    setTimeout(() => {

        isAnimating = false;

    }, 1000);
}


/* =========================
   NAVBAR CLICK
========================= */

navLinks.forEach((link, index) => {

    link.addEventListener(
        "click",
        function (event) {

            /*
               MOBILE
               Let normal HTML anchor
               scrolling work.
            */

            if (window.innerWidth <= 800) {

                return;
            }


            /*
               DESKTOP
               Use card animation.
            */

            event.preventDefault();

            goToCard(index);
        }
    );
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

document.addEventListener(
    "click",
    function (event) {

        /*
           Disable this on mobile.
        */

        if (window.innerWidth <= 800) {

            return;
        }


        /*
           Ignore navbar.
        */

        if (
            event.target.closest(".navbar")
        ) {

            return;
        }


        /*
           Ignore links and buttons.
        */

        if (
            event.target.closest("a") ||
            event.target.closest("button")
        ) {

            return;
        }


        const screenWidth =
            window.innerWidth;

        const clickX =
            event.clientX;


        if (
            clickX >
            screenWidth / 2
        ) {

            goToCard(
                currentCard + 1
            );

        } else {

            goToCard(
                currentCard - 1
            );
        }
    }
);


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    function (event) {

        /*
           Disable keyboard navigation
           on mobile.
        */

        if (window.innerWidth <= 800) {

            return;
        }


        if (
            event.key === "ArrowRight"
        ) {

            goToCard(
                currentCard + 1
            );
        }


        if (
            event.key === "ArrowLeft"
        ) {

            goToCard(
                currentCard - 1
            );
        }
    }
);


/* =========================
   MOUSE WHEEL
========================= */

document.addEventListener(
    "wheel",
    function (event) {

        /*
           Disable desktop card wheel
           navigation on mobile.
        */

        if (window.innerWidth <= 800) {

            return;
        }


        event.preventDefault();


        if (isAnimating) {

            return;
        }


        if (event.deltaY > 0) {

            goToCard(
                currentCard + 1
            );

        } else {

            goToCard(
                currentCard - 1
            );
        }
    },
    {
        passive: false
    }
);
