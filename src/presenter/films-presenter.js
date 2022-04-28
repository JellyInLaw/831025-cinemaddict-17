import { render } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmsView from '../view/films-view';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class FilmsPresenter {

  init = (filmsContainer) => {

    render(new FilmsView(),filmsContainer);
    const filmsComponent = document.querySelector('.films-list__container');

    for (let i = 0 ; i < 5 ; i++) {
      render(new FilmCardView(),filmsComponent);
    }

    render(new ShowMoreButtonView(),filmsContainer);

  };
}

