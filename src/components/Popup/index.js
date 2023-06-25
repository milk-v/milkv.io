import React, { useEffect, useState } from "react";
import styles from "./index.module.css"

export default () => {
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [rep, setRep] = useState(true);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    useEffect(() => {
        const hasShownPopup = localStorage.getItem('hasShownPopup');
        const expirationTime = localStorage.getItem('expirationTime');
        const currentTime = new Date().getTime();

        if (!hasShownPopup || (expirationTime && currentTime > expirationTime)) {
            const timer = setTimeout(() => {
                setShowPopup(true);
                localStorage.setItem('hasShownPopup', true);
                localStorage.setItem('expirationTime', currentTime + 180000); // 2 minutes in milliseconds
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, []);

    const changeEmail = (e) => {
        setEmail(e.target.value)
        if (emailRegex.test(e.target.value)) {
            setRep(false)
        } else {
            setRep(true)
        }
    }
    const btnStyle = {
        backgroundColor: '#2d88c9',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    }

    return (
        <div className={styles.popBox} style={{ display: `${showPopup ? 'flex' : 'none'}` }}>
            <div className={styles.popUp}>
                <div>
                    <p>Embrace the new era with milkV,</p>
                    <p className={styles.lineText}>Let's make RISC-V better together</p>
                </div>
                <form
                    action="https://milkv.us21.list-manage.com/subscribe/post?u=44d3c4015a2452785a54f16e5&amp;id=efeca1c0c1&amp;f_id=00375ee1f0"
                    method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className={styles.validate}
                    target="_blank" noValidate>
                    <div id="mc_embed_signup_scroll" className={styles.subscribeText}>
                        <h1>Subscribe Us</h1>
                        <input type="email" value={email} onChange={changeEmail} name="EMAIL" className={styles.subscribeEmail} id="mce-EMAIL" required placeholder="Enter your email" />
                        <button type="submit" name="subscribe" id="mc-embedded-subscribe" className={styles.subscribeBtn} disabled={rep} style={!rep ? btnStyle : null}>Subscribe</button>
                    </div>
                </form>
                <img src="/form/clear.svg" className={styles.clearBtn} onClick={() => { setShowPopup(false) }} />
            </div>
        </div>
    );
}