import React, {useState} from 'react';
import useProductContent from '@site/src/hooks/useProductContent';
import styles from './index.module.css';

export default function Subscribe({product, theme}) {
  const [email, setEmail] = useState('');
  const productContent = useProductContent(product);
  const subscribe = productContent?.product.legacy?.subscribe;
  if (!subscribe) {
    return null;
  }

  return (
    <div className={styles.subscribe_box}>
      <img src={subscribe.picture} alt="View" />
      <div className={styles.subscribe_form}>
        <p style={{color: theme || '#fff'}}>Sign Up for Early Access to Exclusive Updates !</p>
        <form
          action={subscribe.action}
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_blank"
          className={styles.subForm}
        >
          <input
            style={{borderColor: theme || '#fff'}}
            type="email"
            id="mce-EMAIL"
            name="EMAIL"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email Address"
            required
          />
          <div hidden><input type="hidden" name="tags" value={subscribe.tag} /></div>
          <div aria-hidden="true" style={{position: 'absolute', left: '-5000px'}}>
            <input type="text" name="b_44d3c4015a2452785a54f16e5_efeca1c0c1" tabIndex="-1" />
          </div>
          <button type="submit" id="mc-embedded-subscribe" name="subscribe">KEEP ME UPDATED</button>
        </form>
      </div>
    </div>
  );
}
