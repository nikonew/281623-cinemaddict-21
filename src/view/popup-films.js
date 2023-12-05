import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import he from 'he';
import {DATA_FORMAT} from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getTimeFromMin, humanizeFilmsDueDate} from '../util.js';

const EMOJIS = ['smile', 'sleeping', 'puke', 'angry'];

dayjs.extend(relativeTime);

const createAddEmojiComments = (userEmoji) => (`
    <div class="film-details__add-emoji-label">
      ${userEmoji ? `<img src="./images/emoji/${userEmoji}.png" width="30" height="30" alt="emoji-${userEmoji}">` : ''}
    </div>
    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here"
        name="comment"></textarea>
    </label>
    <div class="film-details__emoji-list">
      ${EMOJIS.map((emotion) => `
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}"
          value="${emotion}" ${emotion === userEmoji ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-${emotion}">
          <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
        </label>
      `).join('')}
    </div>
`);

function createPopupTemplate(state) {
  const {comments} = state;
  const {filmInfo, userDetails} = state;
  const { date } = state.filmInfo.release;
  const { duration } = state.filmInfo;
  const createEmojiAndNewComments = createAddEmojiComments(state.userEmoji);
  return `
<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

          <p class="film-details__age">${filmInfo.ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmInfo.title}</h3>
              <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmInfo.totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${filmInfo.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmInfo.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanizeFilmsDueDate(date, DATA_FORMAT.FILMS_POPUP)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Duration</td>
              <td class="film-details__cell">${getTimeFromMin(duration)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${filmInfo.genre[0]}</span>
                <span class="film-details__genre">${filmInfo.genre[1]}</span>
                <span class="film-details__genre">${filmInfo.genre[2]}</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${filmInfo.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist"${userDetails.watchlist ? 'film-card__controls-item--active' : ''} id="watchlist" name="watchlist" data-user-detail="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched"${userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''} id="watched" name="watched" data-user-detail="alreadyWatched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite"${userDetails.favorite ? 'film-card__controls-item--active' : ''} id="favorite" name="favorite" data-user-detail="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

        <ul class="film-details__comments-list">
            ${comments.map((element) => {
    const {comment} = element;
    return (`
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${element.emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
                        <div>
              <p class="film-details__comment-text">${he.encode(comment)}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${element.author}</span>
                <span class="film-details__comment-day">${dayjs(element.date).fromNow()}</span>
                <button class="film-details__comment-delete" data-id=${element.id}>Delete</button>
              </p>
            </div></li>`);
  }).join('')}
        </ul>

        <form class="film-details__new-comment" action="" method="get">
           ${createEmojiAndNewComments}
        </form>
      </section>
    </div>
  </div>
</section>`;
}

export default class PopupFilmsView extends AbstractStatefulView {
  #film = null;
  #handleCloseClick = null;
  #handleControlButtonClick = null;
  #handleDeleteCommentClick = null;

  constructor({film, filmComments, onCloseClick, onControlBtnClick, onDeleteComment}) {
    super();
    this._setState(PopupFilmsView.parseFilmToState(film, filmComments));
    this.#handleCloseClick = onCloseClick;
    this.#handleControlButtonClick = onControlBtnClick;
    this.#handleDeleteCommentClick = onDeleteComment;
    this._restoreHandlers();

  }

  get template() {
    return createPopupTemplate(this._state);
  }

  reset(film) {
    this.updateElement(
      PopupFilmsView.parseFilmToState(film),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('.film-details__controls').addEventListener('click', this.#controlButtonsClickHandler);
    this.element.querySelector('.film-details__controls').addEventListener('click', (evt) => {
      if (evt.target.classList.contains('film-details__control-button')) {
        evt.target.classList.toggle('film-details__control-button--active');
      }
    });
    this.element.querySelector('.film-details__emoji-list').addEventListener('change', this.#emojiChangeHandler);
    this.element.querySelector('.film-details__comment-delete').addEventListener('click', this.#commentDeleteClickHandler);
  }

  #emojiChangeHandler = (evt) => {
    const prevScroll = this.element.scrollTop;
    this.updateElement({
      userEmoji: evt.target.value,
    });
    this.element.scrollTo(0, prevScroll);
  };

  #closeClickHandler = () => {
    this.#handleCloseClick();
  };

  #controlButtonsClickHandler = (evt) => {
    if (evt.target.classList.contains('film-details__control-button')) {
      this.#handleControlButtonClick(evt.target.dataset.userDetail);
    }
  };

  #commentDeleteClickHandler = (evt) => {
    if (evt.target.dataset.id) {
      //this.#deletedId = evt.target.dataset.id;
      this.#handleDeleteCommentClick(evt.target.dataset.id);
    }
  };

  static parseFilmToState (film, comments){
    return {...film,
      userEmoji: '',
      text: '',
      comments: [...comments]};
  }


  static parseStateToFilm(state) {
    const film = { ...state };
    film.comments = film.comments.map((comment) => comment.id);

    delete film.userEmoji;
    delete film.text;

    return film;
  }

}
