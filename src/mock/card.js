import { getRandomInteger } from '../utils';

const getTitle = () => {
  const titles = [
    'Made for each other',
    'Popeye meets sinbad',
    'Sagebrush trail',
    'Santa claus conquers the martians',
    'The dance of life',
    'The great flamarion',
    'The man with the golden arm'
  ];
  return titles[getRandomInteger(0,6)];
};

const getPoster = () => {
  const posters = [
    'images/posters/made-for-each-other.png',
    'images/posters/popeye-meets-sinbad.png',
    'images/posters/sagebrush-trail.jpg',
    'images/posters/santa-claus-conquers-the-martians.jpg',
    'images/posters/the-dance-of-life.jpg',
    'images/posters/the-great-flamarion.jpg',
    'images/posters/the-man-with-the-golden-arm.jpg'
  ];
  return posters[getRandomInteger(0,6)];
};

const getGenre = () => {
  const arr = [
    'Action',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance'
  ];

  const genres = [];
  for (let i = 0 ; i < 3 ; i ++) {
    genres.push(arr[getRandomInteger(0,6)]);
  }
  return genres;
};

const getDescription = () => {
  const blablas = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget. ',
    'Fusce tristique felis at fermentum pharetra. ',
    'Aliquam id orci ut lectus varius viverra. ',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
    'Sed sed nisi sed augue convallis suscipit in sed felis. ',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. ',
    'In rutrum ac purus sit amet tempus.'];
  return blablas[getRandomInteger(0,9)];
};

const getCommentsIds = () => {
  const arr = [];
  for (let i = 0; i < getRandomInteger(0,100); i ++) {
    arr.push(getRandomInteger(0,9999));
  }
  return arr;

};

const getBoolean = () => {
  const number = getRandomInteger(0,1);
  return number;
};

export const generateMovie = () => ({
  'id': getRandomInteger(0,9999),
  'comments': getCommentsIds(),
  'film_info': {
    'title': getTitle(),
    'alternative_title': getTitle(),
    'total_rating': getRandomInteger(1,10),
    'poster': getPoster(),
    'age_rating': 0,
    'director': 'Tom Ford',
    'writers': [
      'Takeshi Kitano'
    ],
    'actors': [
      'Morgan Freeman'
    ],
    'release': {
      'date': `${getRandomInteger(1919,2020)}-05-11T00:00:00.000Z`,
      'release_country': 'Finland'
    },
    'runtime': getRandomInteger(10,190),
    'genre': getGenre(),
    'description': getDescription(),
  },
  'user_details': {
    'watchlist': getBoolean(),
    'already_watched': getBoolean(),
    'watching_date': `${getRandomInteger(2005,2022)}-${getRandomInteger(1,31)}-12T16:12:32.554Z`,
    'favorite': getBoolean()
  }
});
