import {getRandomArrayElement} from '../util.js';

const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

const mockComments = [
  {
    id: 1,
    author: 'Pavel O\'Reilly',
    comment: 'a film .',
    date: '2018-05-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS)
  },
  {
    id: 2,
    author: 'Maks',
    comment: 'a film that changed my life.',
    date: '1999-04-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS)
  },
  {
    id: 3,
    author: 'Igor O\'Reilly',
    comment: 'a film that changed my life, a true masterpiece',
    date: '2019-02-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS)
  },
  {
    id: 4,
    author: 'Alex O\'Reilly',
    comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    date: '1997-05-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS)
  },
  {
    id: 5,
    author: 'Ilya O',
    comment: 'a true masterpiece.',
    date: '2000-12-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS)
  }
];

export { mockComments };
