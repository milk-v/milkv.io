import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Link from '@docusaurus/Link';



export default () => {
    const [email, setEmail] = useState('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [rep, setRep] = useState(false);

    const changeEmail = (e) => {
        setEmail(e.target.value)
        if (emailRegex.test(e.target.value)) {
            setRep(true)
        } else {
            setRep(false)
        }
    }

    return (
        <>
            <div className={styles.footerBox}>
                <div className={styles.centent}>
                    <div className={styles.footerInfo}>
                        <div className={styles.footer_left}>
                            <img src="/img/ICON.svg" className={styles.footer_logo} />
                            <div className={styles.footer_navbar}>
                                <Link to='/'>Home</Link>
                                <Link to='/duo'>Duo</Link>
                                <Link to='/pioneer'>Pioneer</Link>
                                <Link to='/mars'>Mars</Link>
                                <Link to='https://community.milkv.io/'>Community</Link>
                                <Link to='/docs/home'>Docs</Link>
                            </div>
                        </div>
                        <div className={styles.footer_right}>
                            <h1>Subscribe</h1>
                            <form
                                action="https://milkv.us21.list-manage.com/subscribe/post?u=44d3c4015a2452785a54f16e5&amp;id=efeca1c0c1&amp;f_id=00375ee1f0"
                                method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className={styles.validate}
                                target="_blank" noValidate>
                                <div id="mc_embed_signup_scroll" className={styles.subscribeText}>
                                    <input type="email" value={email} onChange={changeEmail} name="EMAIL" className={styles.subscribeEmail} id="mce-EMAIL" required placeholder="Enter your email" />
                                    <button type="submit" name="subscribe" id="mc-embedded-subscribe" className={styles.subscribeBtn} disabled={rep} style={{ display: `${rep ? 'block' : 'none'}` }}></button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={styles.address}>
                        <h1>Address :</h1>
                        <p>L8-01, Block B, Bao Cube Jewelry City, 198 Xin'an 4th Road, Liutang Community, Xixiang Street, Bao'an District, Shenzhen, China</p>
                    </div>
                </div>
            </div>
        </>
    )
}