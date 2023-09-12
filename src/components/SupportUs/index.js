import React, { useState } from 'react';
import styles from './index.module.css';
import axios from 'axios';

import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useEffect } from 'react';

export default () => {
    const currentLanguage = useBaseUrl('/');

    const [index, setIndex] = useState('sales')
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [url, setUrl] = useState('https://submit-form.com/ft1cVox2')

    const [formbtn, setFormBtn] = useState(false)
    const [mask, setMask] = useState(false)
    const [loading, setLoading] = useState(true)

    const [flag, setFlag] = useState(null)

    const emailData = [
        {
            email: <Translate id='homepage.corporations.salesdepartment' />,
            value: 'sales',
            url: 'https://submit-form.com/ft1cVox2',
        },
        {
            email: <Translate id='homepage.corporations.devdepartment' />,
            value: 'dev',
            url: 'https://submit-form.com/mvqV3NLt',
        },
        {
            email: <Translate id='homepage.corporations.customerdepartment' />,
            value: 'support',
            url: 'https://submit-form.com/zyL1ZT1C',
        },
    ]
    const ele = emailData.map((item, key) => {
        return (
            <label key={key}>
                <input type='radio' name='email' value={item.value} checked={index === item.value} onChange={(e) => {
                    setIndex(e.target.value)
                    if (e.target.checked) {
                        setUrl(item.url)
                    }
                }} />
                <span>{item.email}</span>
            </label>
        )
    })

    const formSend = (event) => {
        event.preventDefault();
        setFormBtn(true)
        setMask(true)
        setLoading(true)

        axios.get(`${url}?name=${userName}&email=${userEmail}&subject=${subject}&message=${message}`)
            .then((response) => {
                setLoading(false)
                setFormBtn(false)
                setFlag(true)
            })
            .catch((error) => {
                setLoading(false)
                setFormBtn(false)
                setFlag(false)
            });
    }


    return (
        <>
            <div className={styles.supportForm}>
                <div className={styles.form_contexts}>
                    <h2>
                    <Translate id='homepage.corporations.emailtitle_1' /><br></br>
                    <Translate id='homepage.corporations.emailtitle_2' />
                    </h2>
                    <div className={styles.contact_info}>
                        <div className={styles.info_left}>
                            <div>
                                <p><Translate id='homepage.corporations.salesdepartment' /></p>
                                <a href='mailto:sales@milkv.io'>sales@milkv.io</a>
                            </div>
                            <div>
                                <p><Translate id='homepage.corporations.devdepartment' /></p>
                                <a href='mailto:dev@milkv.io'>dev@milkv.io</a>
                            </div>
                            <div>
                                <p><Translate id='homepage.corporations.customerdepartment' /></p>
                                <a href='mailto:support@milkv.io'>support@milkv.io</a>
                            </div>
                        </div>
                        <form className={styles.form_right} onSubmit={formSend}>
                            <h2>
                            <Translate id='homepage.corporations.emailto' />
                            </h2>
                            <div className={styles.emailRadio}>
                                {ele}
                            </div>
                            <div className={styles.suppport_input}>
                                <input type='text' placeholder='Name' required value={userName} onChange={(e) => {
                                    setUserName(e.target.value)
                                }}
                                />
                                <input type='email' placeholder='Email' required value={userEmail} onChange={(e) => {
                                    setUserEmail(e.target.value)
                                }} />
                                <input type='text' placeholder='Subject' required value={subject} onChange={(e) => {
                                    setSubject(e.target.value)
                                }} />
                            </div>
                            <div className={styles.message}>
                                <h2>
                                <Translate id='homepage.corporations.emailmessage' />
                                </h2>
                                <textarea value={message} required onChange={(e) => { setMessage(e.target.value) }}></textarea>
                            </div>
                            <button className={styles.support_form_btn} disabled={formbtn}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className={styles.mask} style={{ display: `${mask ? 'flex' : "none"}` }}>
                <div className={styles.loading} style={{ display: `${loading ? 'block' : "none"}` }} >

                </div>
                <div style={{ display: `${loading ? 'none' : "block"}` }}>
                    <div className={styles.pop} style={{ display: `${flag ? "flex" : 'none'}` }}>
                        <div className={styles.popBox}>
                            <h1>😄<Translate id='contact.send.res' /></h1>
                            <p><Translate id='contact.send.res.info' /></p>
                            <div className={styles.ok} onClick={() => { setMask(false) }}><Translate id='contact.send.close' /></div>
                        </div>
                    </div>
                    <div className={styles.pop} style={{ display: `${!flag ? "flex" : 'none'}` }}>
                        <div className={styles.popBox}>
                            <h1>😭<Translate id='contact.send.err' /></h1>
                            <p style={{ color: 'red' }}><Translate id='contact.send.err.info' /></p>
                            <div className={styles.ok} onClick={() => { setMask(false) }}><Translate id='contact.send.close' /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}