import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeEventDueDate } from '../utils/utils.js';

const initEvent = {
  'basePrice': 0,
  'dateFrom': new Date('2022-01-26'),
  'dateTo': new Date('2022-01-27'),
  'destination': {
    'id': 1,
    'description': 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    'name': 'Geneva',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
        'description': 'Geneva is a gorgeous city, one thats filled with mountains of chocolate.'
      }
    ]
  },
  'id': '1',
  'offers':  [{'id': 1, 'title': 'bus - offer 1', 'price': 50 }, {'id': 2, 'title': 'bus - offer 2', 'price': 35 }],
  'type' : 'Bus',
};

function createOffersTemplate(offers, isDisabled) {
  if (offers.length !== 0) {
    return `
    <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      <!-- Offers -->
    ${offers.map((offer) => (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="${offer.title}" ${isDisabled ? 'disabled' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
  )).join('')}
    </div>
    </section>`;
  }
  return '';
}

function createAddItemTemplate(data) {
  const {
    basePrice,
    dateFrom,
    dateTo,
    offers,
    destination,
    type,
    isDisabled,
    isSaving,
    isDeleting
  } = data;

  // console.log(data);
  const formattedDateFrom = humanizeEventDueDate(dateFrom);
  const formattedDateTo = humanizeEventDueDate(dateTo);
  const destinationDescription = destination.description;

  return (
    `<li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group" ${isDisabled ? 'disabled' : ''}>
                  <legend class="visually-hidden">Event type</legend>

                  <div class="event__type-item">
                    <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === 'taxi' ? 'checked' : ''}>
                    <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type === 'bus' ? 'checked' : ''}>
                    <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type === 'train' ? 'checked' : ''}>
                    <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type === 'ship' ? 'checked' : ''}>
                    <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type === 'drive' ? 'checked' : ''}>
                    <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type === 'flight' ? 'checked' : ''}>
                    <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type === 'check-in' ? 'checked' : ''}>
                    <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type === 'sightseeing' ? 'checked' : ''}>
                    <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type === 'restaurant' ? 'checked' : ''}>
                    <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                  </div>
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1"
               type="text" name="event-destination" value="${destination.name}"
                list="destination-list-1" required ${isDisabled ? 'disabled' : ''}>
              <datalist id="destination-list-1">
                <option value="Amsterdam"></option>
                <option value="Geneva"></option>
                <option value="Chamonix"></option>
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formattedDateFrom}" ${isDisabled ? 'disabled' : ''}>
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedDateTo}" ${isDisabled ? 'disabled' : ''}>
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${he.encode(String(basePrice))}" ${isDisabled ? 'disabled' : ''}>
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'saving...' : 'save'}</button>
            <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Canceling...' : 'Cancel'}</button>
          </header>
          <section class="event__details">
              ${createOffersTemplate(offers)}
            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${destinationDescription}</p>

              <div class="event__photos-container">
                <div class="event__photos-tape">
                  <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
                  <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
                  <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
                  <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
                  <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
                </div>
              </div>
            </section>
          </section>
        </form>
      </li>`
  );
}

export default class AddEventView extends AbstractStatefulView{
  #handleClickClose = null;
  #handleFormSubmit = null;

  constructor({event = initEvent, onCloseClick, onFormSubmit}) {
    super();
    this._setState(AddEventView.parseEventToState(event));

    this.#handleClickClose = onCloseClick;
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createAddItemTemplate(this._state);
  }

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClickClose();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    // console.log(AddEventView.parseStateToEvent(this._state));
    this.#handleFormSubmit(AddEventView.parseStateToEvent(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: evt.target.value
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: evt.target.value
    });
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    // console.log((evt.target).checked);
  };

  _restoreHandlers() {
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#closeClickHandler);
    this.element.addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#offersChangeHandler);
  }

  static parseEventToState(event) {
    return {...event,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};

    // delete event.isDisabled;
    // delete event.isSaving;
    // delete event.isDeleting;

    return event;
  }

}
