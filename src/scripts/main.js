import "../styles/style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const TOTAL_CARDS = 16;

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

  const createField = () => {
    const field = createElem("div", "field");
    const moves = createElem("div", "moves");
    const found = createElem("div", "found");
    const cards = createElem("div", "cards");
    const scoreboard = createElem("div", "scoreboard");

    let cardIndex = 0;

    for (let i = 0; i < TOTAL_CARDS; i++) {
      if (cardIndex === 8) {
        cardIndex = 0;
      }

      const card = createElem("div", "card");
      card.id = `${cardInfo[cardIndex].name}`;
      const cardImg = createElem("img", "card__img");
      cardImg.src = `./svg/${cardInfo[cardIndex].svg}.svg`;

      appendTo(card, cardImg);
      appendTo(cards, card);

      cardIndex++;
    }

    moves.textContent = "Moves: 0";
    found.textContent = "Found: 0";

    appendTo(scoreboard, moves);
    appendTo(scoreboard, found);
    appendTo(field, scoreboard);
    appendTo(field, cards);

    return field;
  };

  const renderLayout = () => {
    const container = createElem("div", "container");
    const header = createElem("header", "header");

    const newGameBtn = createElem("button", "btn header__btn");
    newGameBtn.type = "button";
    newGameBtn.dataset.newGameBtn = "new-game-btn";
    newGameBtn.textContent = "New Game";

    const resultBtn = createElem("button", "btn header__btn");
    resultBtn.type = "button";
    resultBtn.dataset.resultBtn = "result-btn";
    resultBtn.textContent = "Results";

    const field = createField();

    appendTo(header, newGameBtn);
    appendTo(header, resultBtn);
    appendTo(container, header);
    appendTo(container, field);
    appendTo(body, container);
  };

  const init = () => {
    renderLayout();
  };

  init();
});
