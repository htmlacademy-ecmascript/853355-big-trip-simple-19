import ListItemView from '../view/list-item-view.js';
import EditEventView from '../view/edit-event-view.js';
import {render, RenderPosition} from '../render.js';
import EventsListView from '../view/events-list-view.js';
import AddEventView from '../view/add-event-view.js';
import { getOffersByType } from '../utils.js';
import EmptyListView from '../view/list-empty-view.js';


export default class EventsPresenter {
  #eventListComponent = new EventsListView();
  #emptyList = new EmptyListView();

  #eventsListContainer = null;
  #eventsModel = null;

  constructor({eventsListContainer, eventsModel}) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.#eventsModel.events];

    render(this.#eventListComponent, this.#eventsListContainer);

    const addNewEventButton = document.querySelector('.trip-main__event-add-btn');
    addNewEventButton.addEventListener('click', () => {
      this.#renderAddEvent(addNewEventButton);
      addNewEventButton.disabled = true;
    } );

    if (this.events.length === 0) {
      return render(this.#emptyList, this.#eventListComponent.element);
    }

    for (const event of this.events) {
      this.#renderListItem((
        {
          ...event,
          offers: event.offers.map((id) => {
            const offer = getOffersByType(event).find(
              (mockOffer) => mockOffer.id === id,
            );
            return offer || {};
          }
          )
        }
      ), this.#eventListComponent.element);
    }

  }

  #renderListItem(point) {
    const listItemComponent = new ListItemView(point);
    const editComponent = new EditEventView(point);

    const replaceEventToEdit = () => {
      this.#eventListComponent.element.replaceChild(editComponent.element, listItemComponent.element);
    };

    const replaceEditToEvent = () => {
      this.#eventListComponent.element.replaceChild(listItemComponent.element, editComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    listItemComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEventToEdit();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    editComponent.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    editComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(listItemComponent, this.#eventListComponent.element);
  }

  #renderAddEvent(addButton) {
    const addEventComponent = new AddEventView();
    const cancelButton = addEventComponent.element.querySelector('.event__reset-btn');

    render(addEventComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
    cancelButton.addEventListener('click', () => {
      addEventComponent.element.remove();
      addButton.disabled = false;
    });
  }
}
