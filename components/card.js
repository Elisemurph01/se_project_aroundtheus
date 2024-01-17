export default class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _setEventListeners() {

        this._likeButton.addEventListener( "click", () => {
            this._handleLikeIcon();     
        });

        this._trashButton.addEventListener( "click",() => {
            this._handleDeleteCard();
        });

        this._cardImageEl.addEventListener("click", () => {
            this._handleImageClick(this._name, this._link);
        });
    
    }

    _handleLikeIcon() {
        this._likeButton.classList.toggle("cards__like-button_active");
    }

    _handleDeleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
            }


    getView() {
        this._cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        
        return this._cardElement;
    }
    
    generateCard() {
        this._likeButton = this._cardElement.querySelector(".cards__like-button");
        this._trashButton = this._cardElement.querySelector(".cards__trash-button");
        this._cardImageEl = this._cardElement.querySelector(".cards__image");
        this._cardTitleEl = this._cardElement.querySelector(".card__description");
        this._cardTemplate = this._cardElement.querySelector("#.card-template");
    
        this._CardTitleEl.querySelector(".cards__title").textContent = this.name;
        this._CardImageEl.setAttribute("src", this._link);
        this._cardImageEl.setAttribute("alt", this._name);

        return this._cardElement
    }
}