import { render } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmsView from '../view/films-view';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class FilmsPresenter {

  init = (filmsContainer,cardModel) => {
    this.cardModel = cardModel;
    this.cards = [...this.cardModel.getCards()];

    render(new FilmsView(),filmsContainer);
    const filmsComponent = document.querySelector('.films-list__container');

    for (let i = 0 ; i < this.cards.length ; i++) {
      render(new FilmCardView(this.cards[i]),filmsComponent);
      console.log(this.cards[i]);
    }
    const placeForShowMoreButton = document.querySelector('.films-list');
    render(new ShowMoreButtonView(),placeForShowMoreButton);

  };
}

