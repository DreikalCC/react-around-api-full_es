export function ImagePopup(props) {

  return (
    <div id="image" className={props.isPopupOpen ? 'popup popup_active' : 'popup'}>
      <div id="popup__overlay" onClick={props.onClose} className="popup__overlay"></div>
      <div className="popup__group">
        <img className="popup__image" src={props.image.link} alt={props.image.name} />
        <h3 className="popup__name">{props.image.name}</h3>
        <button id="image" onClick={props.onClose} className="popup popup__close"></button>
      </div>
    </div>
  )
}