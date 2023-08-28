import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default () => {
    // const [email, setEmail] = useState('');
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const [rep, setRep] = useState(false);
    // const currentLanguage = useBaseUrl('/');

    // const changeEmail = (e) => {
    //     setEmail(e.target.value)
    //     if (emailRegex.test(e.target.value)) {
    //         setRep(true)
    //     } else {
    //         setRep(false)
    //     }
    // }
    return (
        <>
            <div className={styles.footer_module}>
                <div className={styles.footer_content}>
                    <img src="/components/milkv-footer.svg" alt='Milk-V' className={styles.footer_logo} />

                    <div className={styles.footer_info}>
                        <></>
                    </div>
                </div>
            </div>
        </>
    )
}

/*

                            <form
                                action="https://milkv.us21.list-manage.com/subscribe/post?u=44d3c4015a2452785a54f16e5&amp;id=efeca1c0c1&amp;f_id=00375ee1f0"
                                method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className={styles.validate}
                                target="_blank" noValidate>
                                <div id="mc_embed_signup_scroll" className={styles.subscribeText}>
                                    <input type="email" value={email} onChange={changeEmail} name="EMAIL" className={styles.subscribeEmail} id="mce-EMAIL" required placeholder={currentLanguage === '/' ? 'Enter your email' : '请输入你的电子邮箱'} />
                                    <button type="submit" name="subscribe" id="mc-embedded-subscribe" className={styles.subscribeBtn} disabled={!rep} style={{ display: `${rep ? 'block' : 'none'}` }}></button>
                                </div>
                            </form>

*/