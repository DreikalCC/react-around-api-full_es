import correctImg from '../images/correct.png';
import errorImg from '../images/error.png';

export function InfoTooltip(props) {
  return (
    <div
      id='tooltip'
      className={props.isTooltipOpen ? 'popup popup_active' : 'popup'}
    >
      <div
        id='popup__overlay'
        onClick={props.onClose}
        className='popup__overlay'
      ></div>
      <div className='popup__group popup__group_itt'>
        <img
          className='popup__image popup__image_itt'
          src={props.isSuccess ? correctImg : errorImg}
          alt='icon'
        />
        <h3 className='popup__name popup__name_itt'>
          {props.isSuccess
            ? 'Success! You have now been registered.'
            : 'Oops, something went wrong! Please try again.'}
        </h3>
        <button
          id='tooltip'
          onClick={props.onClose}
          className='popup popup__close'
        ></button>
      </div>
    </div>
  );
}
