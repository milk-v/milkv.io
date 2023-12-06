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
    const [hiddenmsg, setHiddenmsg] = useState('')


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
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth() + 1;
        var day = currentDate.getDate();
        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var seconds = currentDate.getSeconds();
        // 构建中文日期和时间字符串
        var chineseDate = year + "-" + month + "-" + day;
        var chineseTime = hours + ":" + minutes + ":" + seconds;

        let msg = `${subject}: ${chineseDate} ${chineseTime}`

        let productsUrls = {
            'duo': 'https://submit-form.com/mxM7Oj62',
            'pioneer': 'https://submit-form.com/LajdNi4B',
            'mars': 'https://submit-form.com/8WXCfzfP',
            'meles': 'https://submit-form.com/pWzoLWYI',
            'vega': 'https://submit-form.com/CAMdDUGu',
        };

        const url = productsUrls[product] || null;
        event.preventDefault();
        setFormBtn(true)
        axios.get(`${url}?product=${product}&name=${userName}&email=${userEmail}&subject=${subject}&message=${message}&_email.subject=${msg}&_email.from=${userName}`)
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
                <h2 className={styles.maxtitle}><Translate id='contact.title' /></h2>
                <div className={styles.flexBox}>
                    <div className={styles.textLeft}>
                        <h2><Translate id='contact.title.info' /></h2>
                        <h3><Translate id='contact.title.Sales' /></h3>
                        <a className={styles.fromA} href="mailto:sales@milkv.io">sales@milkv.io</a>
                        <h3><Translate id='contact.title.Development' /></h3>
                        <a className={styles.fromA} href="mailto:dev@milkv.io">dev@milkv.io</a>
                        <h3><Translate id='contact.title.support' /></h3>
                        <a className={styles.fromA} href={`mailto:${product}@milkv.io`} >{`${product}@milkv.io`}</a>
                    </div>
                    <div className={styles.touchBox}>
                        <h2><Translate id='contact.title.sendMessage' /></h2>
                        <form className={styles.touchForm} onSubmit={handleSubmit}>
                            <input type="hidden" name="_email.subject" value={hiddenmsg} />
                            <input type="hidden" name="_email.from" value={userName} />
                            <div>
                                <label>
                                    <p><Translate id='contact.title.name' /></p>
                                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required placeholder={currentLanguage === '/' ? 'Your Name' : '你的名字'} />
                                </label>
                                <label>
                                    <p><Translate id='contact.title.email' /></p>
                                    <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required placeholder={currentLanguage === '/' ? 'Your Email' : '你的邮箱'} />
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
            <div className={styles.mark_pop} style={{ display: `${formBtn ? 'flex' : 'none'}` }}>
                <div className={styles.loader}></div>
            </div>
            <div className={styles.pop} style={{ display: `${flag ? "flex" : 'none'}` }}>
                <div className={styles.popBox}>
                    <h2>😄<Translate id='contact.send.res' /></h2>
                    <p><Translate id='contact.send.res.info' /></p>
                    <div className={styles.ok} onClick={() => { setFlag(false) }}><Translate id='contact.send.close' /></div>
                </div>
            </div>
            <div className={styles.pop} style={{ display: `${flag2 ? "flex" : 'none'}` }}>
                <div className={styles.popBox}>
                    <h2>😭<Translate id='contact.send.err' /></h2>
                    <p style={{ color: 'red' }}><Translate id='contact.send.err.info' /></p>
                    <div className={styles.ok} onClick={() => { setFlag2(false) }}><Translate id='contact.send.close' /></div>
                </div>
            </div>
        </>
    )
}