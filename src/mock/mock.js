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
      'poster': 'images/posters/made-for-each-other.png',
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
        'Drama'
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
      'poster': 'images/posters/popeye-meets-sinbad.png',
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
        'Drama'
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
      'poster': 'images/posters/santa-claus-conquers-the-martians.jpg',
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
        'Drama'
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

export const generateFilms = () => filmItems;

