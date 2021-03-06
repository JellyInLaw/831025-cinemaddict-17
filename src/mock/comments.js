import { getRandomInteger } from '../utils';

const getComment = (id) => {
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
    'In rutrum ac purus sit amet tempus.'
  ];
  const emotions = ['smile', 'sleeping', 'puke', 'angry'];
  return {
    'id': `${id}`,
    'author': 'Ilya O\'Reilly',
    'comment': blablas[getRandomInteger(0,9)],
    'date': `${getRandomInteger(2005,2022)}-05-12T16:12:32.554Z`,
    'emotion': emotions[getRandomInteger(0,3)]
  };
};

const getComments = (countComments) => {
  const arr = [];
  for (let i = 0; i < countComments; i ++) {
    arr.push(getComment(i));
  }
  return arr;
};

const comments = getComments(100);

export {comments};
