import { render } from '../render';
import FilmDetailsView from '../view/film-details-view';
import FilmCardView from '../view/film-card-view';
import FilmsView from '../view/films-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import { getRandomInteger} from '../utils';

export default class FilmsPresenter {

  init = (filmsContainer,cardModel) => {
    this.cardModel = cardModel;
    this.cards = [...this.cardModel.getCards()];

    render(new FilmsView(),filmsContainer);
    const filmsComponent = document.querySelector('.films-list__container');

    for (let i = 0 ; i < this.cards.length ; i++) {
      render(new FilmCardView(this.cards[i]),filmsComponent);
    }
    const placeForShowMoreButton = document.querySelector('.films-list');
    render(new ShowMoreButtonView(),placeForShowMoreButton);

    //временное чтобы показать и заполнить попап
    const body = document.querySelector('.body');
    body.classList.add('hide-overflow');
    render(new FilmDetailsView(this.cards[getRandomInteger(0,9)]),body);
    console.log(this.cards[getRandomInteger(0,9)]);
  };
}

