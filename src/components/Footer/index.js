import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default () => {
    const [email, setEmail] = useState('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [rep, setRep] = useState(false);
    const currentLanguage = useBaseUrl('/');

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
            <div className={styles.footer_module}>
                <div className={styles.footer_content}>
                    <img src="/components/milkv-footer.svg" alt='Milk-V' className={styles.footer_logo} />
                    <div className={styles.footer_info}>
                        <div className={styles.footer_left}>
                            <h2>Get the latest special offers,<br></br> new products information and more<br></br>from us.</h2>
                            <form
                                action="https://milkv.us21.list-manage.com/subscribe/post?u=44d3c4015a2452785a54f16e5&amp;id=efeca1c0c1&amp;f_id=00375ee1f0"
                                method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className={styles.validate}
                                target="_blank" noValidate>
                                <div id="mc_embed_signup_scroll" className={styles.subscribeText}>
                                    <input type="email" value={email} onChange={changeEmail} name="EMAIL" className={styles.subscribeEmail} id="mce-EMAIL" required placeholder={currentLanguage === '/' ? 'Your Email' : '你的电子邮箱'} />
                                    <button type="submit" name="subscribe" id="mc-embedded-subscribe" className={styles.subscribeBtn} disabled={!rep} style={{ opacity: `${rep ? '1' : '.8'}` }}>Subscribe</button>
                                </div>
                            </form>
                        </div>
                        <div className={styles.footer_right}>
                            <ul className={styles.footer_ul}>
                                <li>
                                    <p className={styles.line_name}>Pages</p>
                                    <Link to='/'>Home</Link>
                                    <Link to='/about'>About</Link>
                                    <Link to='/warranty'>Warranty</Link>
                                </li>
                                <li>
                                    <p className={styles.line_name}>Products</p>
                                    <Link to='/duo'>Milk-V Duo</Link>
                                    <Link to='/pioneer'>Milk-V Pioneer</Link>
                                    <Link to='/mars'>Milk-V Mars</Link>
                                    <Link to='/mars-cm'>Milk-V Mars CM</Link>
                                    <Link to='/meles'>Milk-V Meles</Link>
                                    <Link to='/vega'>Milk-V Vega</Link>
                                </li>
                                <li>
                                    <p className={styles.line_name}>Docs</p>
                                    <Link to='/docs'>Home</Link>
                                    <Link to='/docs/duo/overview'>Duo Docs</Link>
                                    <Link to='/docs/pioneer/overview'>Pioneer Docs </Link>
                                    <Link to='/docs/mars/overview'>Mars Docs </Link>
                                    <Link to='/docs/meles/overview'>Meles Docs </Link>
                                </li>
                                <li>
                                    <p className={styles.line_name}>Community</p>
                                    <Link href='https://community.milkv.io/c/announcement'>Announcement</Link>
                                    <Link href='https://community.milkv.io/c/general'>General Categories </Link>
                                    <Link href='https://community.milkv.io/c/duo'>Duo Categories </Link>
                                    <Link href='https://community.milkv.io/c/pioneer'>Pioneer Categories </Link>
                                    <Link href='https://community.milkv.io/c/mars'>Mars Categories </Link>
                                    <Link href='https://community.milkv.io/c/meles'>Meles Categories </Link>
                                    <Link href='https://community.milkv.io/c/vega'>Vega Categories </Link>
                                </li>
                                <li>
                                    <p className={styles.line_name}>Follow Us</p>
                                    <Link href="https://twitter.com/MilkV_Official" className={styles.twitter}>
                                        <img src="/components/twitter.svg" />
                                        <p>Twitter</p>
                                    </Link>
                                    <Link to='' className={styles.we}>
                                        <img src="/components/wechatmin.svg" className={styles.wechat_min} />
                                        <p>Wechat Public</p>
                                        <img src='/components/WeChat.webp' className={styles.wechat} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.footer_bottom_text}>
                        <p><Translate id='homepage.corporations.companyname' /></p>
                        <p>
                            <Translate id='homepage.corporations.companyaddress_1' />
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
