import "../styles/style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const TOTAL_PARTS = 8;

  const body = document.body;
  const cardInfo = [
    {
      name: "Arsenal",
      svg: "arsenal",
    },
    {
      name: "Aston Villa",
      svg: "aston-villa",
    },
    {
      name: "Everton",
      svg: "everton",
    },
    {
      name: "Chelsea",
      svg: "chelsea",
    },
    {
      name: "Liverpool",
      svg: "liverpool",
    },
    {
      name: "Manchester City",
      svg: "manchester-city",
    },
    {
      name: "Manchester United",
      svg: "manchester-united",
    },
    {
      name: "Newcastle",
      svg: "newcastle",
    },
  ];

  const shuffleCards = (array) => {
    let currentIndex = array.length;
    let temporary;
    let randomIndex;

    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex--);
      temporary = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporary;
    }

    return array;
  };

  const appendTo = (place, element) => {
    place.append(element);
  };

  const prependTo = (place, element) => {
    place.prepend(element);
  };

  const insertBefore = (place, element) => {
    place.before(element);
  };

  const insertAfter = (place, element) => {
    place.after(element);
  };

  const createElem = (tag, className) => {
    if (!tag) return "";

    const element = document.createElement(tag);

    if (className) element.className = className;

    return element;
  };

  let modalElement = null;
  let modalContentElement = null;

  const closeModal = () => {
    body.classList.remove("no-scroll");
    modalElement?.classList.remove("modal--open");
    modalContentElement?.replaceChildren();
  };

  const createCards = () => {
    const shuffledCardsArr = shuffleCards([...cardInfo, ...cardInfo]);

    const cards = createElem("div", "cards");

    let cardIndex = 0;

    for (let i = 0; i < shuffledCardsArr.length; i++) {
      const cardName = shuffledCardsArr[cardIndex].name;
      const cardSvg = shuffledCardsArr[cardIndex].svg;

      const card = createElem("div", "cards__card");
      card.id = `${cardName}`;

      const cardInner = createElem("div", "cards__card-inner");

      appendTo(card, cardInner);

      const cardBack = createElem("div", "cards__card-back");
      const cardBackImg = createElem("img", "cards__card-img");
      cardBackImg.src = `./svg/${cardSvg}.svg`;
      cardBackImg.alt = cardName;

      appendTo(cardBack, cardBackImg);
      appendTo(cardInner, cardBack);

      const cardFront = createElem("div", "cards__card-front");
      const cardFrontImg = createElem("img", "cards__card-img");
      cardFrontImg.src = "./svg/pl.svg";
      cardFrontImg.alt = "Premier League";

      appendTo(cardFront, cardFrontImg);
      appendTo(cardInner, cardFront);

      appendTo(cards, card);

      cardIndex++;
    }

    return cards;
  };

  const createModal = () => {
    const modal = createElem("div", "modal modal--open");
    const modalInnerWrapper = createElem("div", "modal__inner-wrapper");
    const modalContent = createElem("div", "modal__content");
    const modalBtns = createElem("div", "modal__btns");
    const closeBtn = createElem("button", "btn modal__close");
    closeBtn.type = "button";
    closeBtn.textContent = "Close";

    modal.addEventListener("click", (event) => {
      const target = event.target;
      const btnClose = target.closest(".modal__close");
      const overlay = target.classList.contains("modal--open");

      if (btnClose || overlay) {
        closeModal();
      }
    });

    const newGameBtn = createElem("button", "btn modal__new-game");
    newGameBtn.type = "button";
    newGameBtn.textContent = "New Game";

    appendTo(modalInnerWrapper, modalContent);
    appendTo(modalBtns, closeBtn);
    appendTo(modalBtns, newGameBtn);
    appendTo(modalInnerWrapper, modalBtns);
    appendTo(modal, modalInnerWrapper);

    return modal;
  };

  let firstClick = true;
  let firstCard = null;
  let secondCard = null;
  let cardsElement = null;
  let movesElement = null;
  let foundElement = null;
  let movesTotal = 0;
  let foundTotal = 0;

  const movesUp = () => {
    movesTotal += 1;
    movesElement.textContent = movesTotal;
    movesElement.dataset.foundSum = movesTotal;
  };

  const clickCard = (card) => {
    const currentCard = card;

    if (firstClick) {
      firstCard = card;
      firstClick = false;
    } else {
      secondCard = card;
      firstClick = true;
      cardsElement.classList.add("cards--disabled");
    }

    currentCard.classList.add("cards__card--show");

    if (firstCard?.id !== secondCard?.id && secondCard !== null) {
      setTimeout(() => {
        firstCard.classList.remove("cards__card--show");
        secondCard.classList.remove("cards__card--show");
        cardsElement.classList.remove("cards--disabled");
        firstCard = null;
        secondCard = null;
      }, 1500);

      movesUp();
    }

    if (firstCard?.id === secondCard?.id) {
      cardsElement.classList.remove("cards--disabled");
      firstCard = null;
      secondCard = null;
      foundTotal += 1;
      foundElement.textContent = foundTotal;
      foundElement.dataset.foundSum = foundTotal;

      movesUp();

      if (foundTotal === TOTAL_PARTS) {
        const winContainer = createElem("div", "modal__win");

        const winText = createElem("span", "modal__win-text");
        winText.textContent = "You Won!";

        const winMoves = createElem("span", "modal__win-moves");
        winMoves.textContent = `Moves: ${movesTotal}`;

        appendTo(modalContentElement, winContainer);

        modalElement?.classList.add("modal--open");
      }
    }
  };

  const handleClick = (event) => {
    const target = event.target;
    const card = target.closest(".cards__card");

    if (card) {
      clickCard(card);
    }
  };

  const renderLayout = () => {
    const container = createElem("div", "container");
    const header = createElem("header", "header");

    container.addEventListener("click", handleClick);

    const newGameBtn = createElem("button", "btn header__btn");
    newGameBtn.type = "button";
    newGameBtn.dataset.newGameBtn = "new-game-btn";
    newGameBtn.textContent = "New Game";

    const resultBtn = createElem("button", "btn header__btn");
    resultBtn.type = "button";
    resultBtn.dataset.resultBtn = "result-btn";
    resultBtn.textContent = "Results";

    const field = createElem("div", "field");
    const moves = createElem("div", "moves");
    const found = createElem("div", "found");
    const scoreboard = createElem("div", "scoreboard");

    moves.textContent = "Moves: ";
    found.textContent = "Found: ";

    const movesSum = createElem("span", "");
    movesSum.dataset.movesSum = 0;
    movesSum.textContent = movesTotal;
    appendTo(moves, movesSum);

    const foundSum = createElem("span", "");
    foundSum.dataset.foundSum = foundTotal;
    foundSum.textContent = 0;

    appendTo(found, foundSum);
    appendTo(scoreboard, moves);
    appendTo(scoreboard, found);
    appendTo(field, scoreboard);

    const cards = createCards();
    appendTo(field, cards);

    const modal = createModal();

    appendTo(header, newGameBtn);
    appendTo(header, resultBtn);
    appendTo(container, header);
    appendTo(container, field);
    appendTo(body, container);
    appendTo(body, modal);
  };

  const init = () => {
    renderLayout();

    cardsElement = document.querySelector(".cards");
    modalElement = document.querySelector(".modal");
    modalContentElement = document.querySelector(".modal__content");
    movesElement = document.querySelector("[data-moves-sum]");
    foundElement = document.querySelector("[data-found-sum]");

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  };

  init();
});
