import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeDate = (date) => dayjs(date).format('D MMMM');

const PopupMode = {
  OPEN: 'open',
  CLOSE: 'close'
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING:'rating'
};

const UserAction = {
  UPDATE_CARD: 'UPDATE_CARD',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const SortBy = {
  [SortType.DATE]: (cards) => {
    const sortedCards = cards.sort((a,b) => (a.film_info.release.date < b.film_info.release.date));
    return sortedCards;
  },
  [SortType.RATING]: (cards) => {
    const sortedCards = cards.sort((a,b) => (a.film_info.total_rating < b.film_info.total_rating));
    return sortedCards;
  }
};

export {getRandomInteger, humanizeDate, SortType, SortBy, PopupMode, UserAction, UpdateType};
