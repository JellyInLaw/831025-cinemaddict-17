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

const getPoster = () =>{
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

export const generateMovie = () => ({
  'id': getRandomInteger(0,9999),
  'comments': ['comment','comment'],
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
      'date': '2019-05-11T00:00:00.000Z',
      'release_country': 'Finland'
    },
    'runtime': getRandomInteger(10,190),
    'genre': [
      'Comedy'
    ],
    'description': 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
  },
  'user_details': {
    'watchlist': false,
    'already_watched': true,
    'watching_date': '2019-04-12T16:12:32.554Z',
    'favorite': false
  }
});
