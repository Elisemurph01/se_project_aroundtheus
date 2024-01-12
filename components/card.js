export default class Card {
    constructor({ name, link }, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleImageClick = this._handleImageClick;
    }

    _setEventListeners() {
        this._cards__like-button.addEventListener( "click", () => {
            this._handleLikeIcon();     
        });

        this._cards__trash-button.addEventListener( "click",() => {
            this._handleDeleteCard();
        });
    
    }

    _handleLikeIcon() {
        this._cardElement.querySelector(".cards__like-button").classList.toggle("cards__like-button_active");
    }

    _handleDeleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
            }


    getView() {
        this._cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card-template")
            .cloneNode(true);
    
        this._likeButton = this._cardElement.querySelector(".cards__like-button");
        this._trashButton = this._cardElement.querySelector(".cards__trash-button");
        this._cardImageEl = this._cardElement.querySelector(".cards__image");
        this._cardTitleEl = this._cardElement.querySelector(".card__description");
        

        this._CardTitleEl.textContent = this.name;
        this._CardImageEl.src = this.link;
        
        
        this._setEventListeners();
        
        return this._cardElement;
}

}