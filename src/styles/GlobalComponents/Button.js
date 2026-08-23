import React from 'react'

import { ButtonBack, ButtonFront } from './index'

const Button = (props) => (
  <ButtonBack alt={props.alt} form={props.form} disabled={props.disabled}>{props.children}
    <ButtonFront
      as={props.href ? 'a' : 'button'}
      href={props.href}
      download={props.download}
      alt={props.alt}
      onClick={props.onClick}
      disabled={props.disabled}
    >{props.children}</ButtonFront>
  </ButtonBack>
);

export default Button
