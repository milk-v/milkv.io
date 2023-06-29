import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

import axios from 'axios';
import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default (props) => {
    const { product } = props;

    const currentLanguage = useBaseUrl('/');
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const [flag, setFlag] = useState(false)
    const [flag2, setFlag2] = useState(false)

    const [formBtn, setFormBtn] = useState(false)

    useEffect(() => {
        if (flag) {
            document.documentElement.style.overflow = 'hidden'
        } else {
            document.documentElement.style.overflow = 'auto'
        }
    }, [flag, flag2])


    const handleSubmit = (event) => {
        let url = product === 'duo' ? 'https://submit-form.com/mxM7Oj62' : product === 'pioneer' ? 'https://submit-form.com/LajdNi4B' : product === 'mars' ? 'https://submit-form.com/8WXCfzfP' : null

        event.preventDefault();
        setFormBtn(true)
        axios.get(`${url}?product=${product}&name=${userName}&email=${userEmail}&subject=${subject}&message=${message}`)
            .then((response) => {
                setFlag(true)
                setFormBtn(false)
            })
            .catch((error) => {
                setFlag2(true)
                setFormBtn(false)
            });
    };

    return (
        <>
            <div className={styles.cUs}>
                <h1 className={styles.maxtitle}><Translate id='contact.title' /></h1>
                <div className={styles.flexBox}>
                    <div className={styles.textLeft}>
                        <h1><Translate id='contact.title.info' /></h1>
                        <h3><Translate id='contact.title.Sales' /></h3>
                        <a className={styles.fromA} href="mailto:sales@milkv.io">sales@milkv.io</a>
                        <h3><Translate id='contact.title.Development' /></h3>
                        <a className={styles.fromA} href="mailto:dev@milkv.io">dev@milkv.io</a>
                        <h3><Translate id='contact.title.support' /></h3>
                        {
                            product === 'duo' ? <a className={styles.fromA} href="mailto:duo@milkv.io">duo@milkv.io</a> : product === 'pioneer' ? <a className={styles.fromA} href="mailto:pinoeer@milkv.io">pinoeer@milkv.io</a> : product === 'mars' ? <a className={styles.fromA} href="mailto:mars@milkv.io">mars@milkv.io</a> : null
                        }

                    </div>
                    <div className={styles.touchBox}>
                        <h1><Translate id='contact.title.sendMessage' /></h1>
                        <form className={styles.touchForm} onSubmit={handleSubmit}>
                            <div>
                                <label>
                                    <p><Translate id='contact.title.name' /></p>
                                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required placeholder={currentLanguage === '/' ? 'Your Name' : '你的名字'} />
                                </label>
                                <label>
                                    <p><Translate id='contact.title.email' /></p>
                                    <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required placeholder={currentLanguage === '/' ? 'Enter your email' : '请输入你的电子邮箱'} />
                                </label>
                            </div>
                            <label>
                                <p><Translate id='contact.title.subject' /></p>
                                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                            </label>
                            <label>
                                <p><Translate id='contact.title.message' /></p>
                                <textarea type="text" value={message} onChange={(e) => setMessage(e.target.value)} required />
                            </label>
                            <button type="submit" className={styles.touchBtn} disabled={formBtn} ><Translate id='contact.title.send' /></button>
                        </form>
                    </div>
                </div>
            </div>
            <div className={styles.pop} style={{ display: `${flag ? "flex" : 'none'}` }}>
                <div className={styles.popBox}>
                    <h1>😄<Translate id='contact.send.res' /></h1>
                    <p><Translate id='contact.send.res.info' /></p>
                    <div className={styles.ok} onClick={() => { setFlag(false) }}><Translate id='contact.send.close' /></div>
                </div>
            </div>
            <div className={styles.pop} style={{ display: `${flag2 ? "flex" : 'none'}` }}>
                <div className={styles.popBox}>
                    <h1>😭<Translate id='contact.send.err' /></h1>
                    <p style={{ color: 'red' }}><Translate id='contact.send.err.info' /></p>
                    <div className={styles.ok} onClick={() => { setFlag2(false) }}><Translate id='contact.send.close' /></div>
                </div>
            </div>
        </>
    )
}