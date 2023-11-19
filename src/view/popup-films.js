import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import AbstractStatefulView from '../framework/view/abstract-view.js';
import {getTimeFromMin, humanizeFilmsDueDate} from '../util.js';

const EMOJIES = ['smile', 'sleeping', 'puke', 'angry'];

dayjs.extend(relativeTime);

const createAddEmojieComments = (currentEmoji) => (`
    <div class="film-details__add-emoji-label">
      ${currentEmoji ? `<img src="./images/emoji/${currentEmoji}.png" width="30" height="30" alt="emoji-${currentEmoji}">` : ''}
    </div>
    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here"
        name="comment"></textarea>
    </label>
    <div class="film-details__emoji-list">
      ${EMOJIES.map((emotion) => `
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}"
          value="${emotion}" ${emotion === currentEmoji ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-${emotion}">
          <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
        </label>
      `).join('')}
    </div>
`);

function createPopupTemplate (state, filmComments, currentEmoji) {
  const {filmInfo, userDetails} = state;
  const { date } = state.filmInfo.release;
  const { duration } = state.filmInfo;
  const createEmojiAndNewComments = createAddEmojieComments(currentEmoji);
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
              <td class="film-details__cell">${humanizeFilmsDueDate(date)}</td>
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
            ${filmComments.map((element) => `
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${element.emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
                        <div>
              <p class="film-details__comment-text">${element.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${element.author}</span>
                <span class="film-details__comment-day">${dayjs(element.date).fromNow()}</span>
                <button class="film-details__comment-delete" data-id=${element.id}>Delete</button>
              </p>
            </div></li>`
  ).join('')}
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
  #filmComments = null;
  #handleCloseClick = null;
  #handleControlButtonClick = null;
  #handleDeleteCommentClick = null;

  constructor({film, filmComments, onCloseClick, onControlBtnClick, onDeleteComment}) {
    super();
    this._state = film;
    this.#filmComments = filmComments;

    this.#handleCloseClick = onCloseClick;
    this.#handleControlButtonClick = onControlBtnClick;
    this.#handleDeleteCommentClick = onDeleteComment;
    this._restoreHandlers();

  }

  get template() {
    return createPopupTemplate(this._state, this.#filmComments);
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
      currentEmoji: evt.target.value,
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
    if(evt.target.dataset.id){
      this.#handleDeleteCommentClick(Number(evt.target.dataset.id));
    }
  };

}
