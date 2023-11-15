import {getRandomArrayElement, getRandomInteger} from '../util.js';

export const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet',
  'Fusce tristique felis at fermentum pharetra',
  'Aliquam id orci ut lectus varius viverra',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui',
  'Sed sed nisi sed augue convallis suscipit in sed felis'
];

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg'
];

const filmItems = [
  {
    'id': '0',
    'comments': [
      '1', '2', '3'
    ],
    'filmInfo': {
      'title': 'A Little Pony Without The Carpet',
      'alternativeTitle': 'Laziness Who Sold Themselves',
      'totalRating': getRandomInteger(0, 10),
      'poster': `images/posters/${getRandomArrayElement(POSTERS)}`,
      'ageRating': 0,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano',
        'Anne Wigton'
      ],
      'actors': [
        'Morgan Freeman',
        'Erich von Stroheim'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'releaseCountry': 'Finland'
      },
      'duration': 77,
      'genre': [
        'Comedy',
        'Drama',
        'Mystery'
      ],
      'description': getRandomArrayElement(DESCRIPTIONS)
    },
    'userDetails': {
      'watchlist': false,
      'alreadyWatched': true,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },
  {
    'id': '1',
    'comments': [
      '2', '3'
    ],
    'filmInfo': {
      'title': 'A Little Pony Without The Carpet',
      'alternativeTitle': 'Laziness Who Sold Themselves',
      'totalRating': getRandomInteger(0, 10),
      'poster': `images/posters/${getRandomArrayElement(POSTERS)}`,
      'ageRating': 0,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano',
        'Anne Wigton'
      ],
      'actors': [
        'Morgan Freeman',
        'Erich von Stroheim'
      ],
      'release': {
        'date': '2018-05-11T00:00:00.000Z',
        'releaseCountry': 'Finland'
      },
      'duration': 77,
      'genre': [
        'Comedy',
        'Drama',
        'Mystery'
      ],
      'description': getRandomArrayElement(DESCRIPTIONS)
    },
    'userDetails': {
      'watchlist': false,
      'alreadyWatched': true,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },
  {
    'id': '0',
    'comments': [
      '3'
    ],
    'filmInfo': {
      'title': 'A Little Pony Without The Carpet',
      'alternativeTitle': 'Laziness Who Sold Themselves',
      'totalRating': getRandomInteger(0, 10),
      'poster': `images/posters/${getRandomArrayElement(POSTERS)}`,
      'ageRating': 0,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano'
      ],
      'actors': [
        'Morgan Freeman',
        'Erich von Stroheim'
      ],
      'release': {
        'date': '2017-05-11T00:00:00.000Z',
        'releaseCountry': 'Finland'
      },
      'duration': 77,
      'genre': [
        'Comedy',
        'Drama',
        'Mystery'
      ],
      'description': getRandomArrayElement(DESCRIPTIONS)
    },
    'userDetails': {
      'watchlist': false,
      'alreadyWatched': true,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  }
];

let id = 0;

export const generateFilms = () => ({...getRandomArrayElement(filmItems),id: id++});

