import { render } from '../render';
import FilmDetailsView from '../view/film-details-view';
import FilmCardView from '../view/film-card-view';
import FilmsView from '../view/films-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import { getRandomInteger} from '../utils';
import { comments } from '../mock/comments';
import CardModel from '../model/card-model';

export default class FilmsPresenter {

  cardModel = new CardModel;

  init = (filmsContainer,cardModel) => {

    this.cards = [...cardModel.cards];

    render(new FilmsView(),filmsContainer);
    const filmsComponent = document.querySelector('.films-list__container');

    for (let i = 0 ; i < this.cards.length ; i++) {
      render(new FilmCardView(this.cards[i]),filmsComponent);
    }
    const placeForShowMoreButton = document.querySelector('.films-list');
    render(new ShowMoreButtonView(),placeForShowMoreButton);

    // временное чтобы показать и заполнить попап
    // чтобы открыть попап надо раскомментировать все ниже
    // const body = document.querySelector('.body');
    // body.classList.add('hide-overflow');
    // const card = this.cards[getRandomInteger(0,9)];
    // const cardCommentsIds = card.comments;

    // const getCardCommentsArr = () => {
    //   const commentsArr = [];
    //   for (let i = 0 ; i < cardCommentsIds.length ; i ++) {
    //     for (let j = 0 ; j < comments.length ; j ++) {
    //       if (cardCommentsIds[i] === comments[j].id) {
    //         commentsArr.push(comments[j]);
    //       }
    //     }
    //   }
    //   return commentsArr;
    // };

    // const commentsToRender = getCardCommentsArr();
    // render(new FilmDetailsView(card,commentsToRender),body);
  };
}

