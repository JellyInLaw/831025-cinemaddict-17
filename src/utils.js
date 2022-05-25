import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeDate = (date) => dayjs(date).format('D MMMM');

// const SortType = {
//   DEFAULT: 'default',
//   DATE: 'date',
//   RATING:'rating'
// };

// const sortByDate = (cards) => {
//   const sortedCards = cards.sort((a,b) => (a.film_info.release.date < b.film_info.release.date));
//   return sortedCards;
// };

// const sortByRating = (cards) => {
//   const sortedCards = cards.sort((a,b) => (a.film_info.total_rating < b.film_info.total_rating));
//   return sortedCards;
// };

// export {getRandomInteger, humanizeDate, SortType, sortByDate, sortByRating};

export {getRandomInteger, humanizeDate};
