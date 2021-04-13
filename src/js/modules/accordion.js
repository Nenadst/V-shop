import $ from "jquery";

export default class Accordion {
  constructor(app, el) {
    this.el = el;

    this.handleClick = this.handleClick.bind(this);
    this.el.addEventListener("click", this.handleClick);
  }

  handleClick(e) {
    const target = e.target;

    switch (true) {
      case target.classList.contains("accordion__button") ||
        target.closest(".accordion__button") != null:
        toggleAccordion(target.closest(".accordion__list-item"));
        break;

      default:
        break;
    }
  }
}

function toggleAccordion(el) {
  function closeAllDrawers() {
    $(".accordion__list-item--active").removeClass(
      "accordion__list-item--active"
    );
    $(".accordion__text").slideUp();
    $(".accordion__arrow--active").removeClass("accordion__arrow--active");
  }

  function openSingleDrawer(el) {
    $(el).addClass("accordion__list-item--active");
    $(el).find(".accordion__text").slideDown();
    $(el).find(".accordion__arrow").addClass("accordion__arrow--active");
  }

  if ($(el).hasClass("accordion__list-item--active")) {
    closeAllDrawers();
    return;
  }

  closeAllDrawers();
  openSingleDrawer(el);
}
