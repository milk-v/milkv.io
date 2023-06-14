import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import axios from 'axios';

export default (props) => {
    const { product } = props;

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const [flag, setFlag] = useState(false)
    const [flag2, setFlag2] = useState(false)


    useEffect(() => {
        if (flag) {
            document.documentElement.style.overflow = 'hidden'
        } else {
            document.documentElement.style.overflow = 'auto'
        }
    }, [flag, flag2])


    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get(`https://submit-form.com/FKfGJJEG?product=${product}&name=${userName}&email=${userEmail}&subject=${subject}&message=${message}`)
            .then((response) => {
                setFlag(true)
            })
            .catch((error) => {
                setFlag2(true)
            });
    };

    return (
        <>
            <div className={styles.cUs}>
                <h1 className={styles.maxtitle}>GET IN TOUCH</h1>
                <div className={styles.flexBox}>
                    <div className={styles.textLeft}>
                        <h1>Having questions? Get in touch with us to resolve!</h1>
                        <h3>Sales Department</h3>
                        <a className={styles.fromA} href="mailto:sales@milkv.io">sales@milkv.io</a>
                        <h3>Development Department</h3>
                        <a className={styles.fromA} href="mailto:dev@milkv.io">dev@milkv.io</a>
                        <h3>Customer Support Department</h3>
                        <a className={styles.fromA} href="mailto:support@milkv.io">support@milkv.io</a>
                    </div>
                    <div className={styles.touchBox}>
                        <h1>Send a message</h1>
                        <form className={styles.touchForm} onSubmit={handleSubmit}>
                            <div>
                                <label>
                                    <p>Name</p>
                                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required placeholder='Your Name' />
                                </label>
                                <label>
                                    <p>Email</p>
                                    <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required placeholder='Your Email Address' />
                                </label>
                            </div>
                            <label>
                                <p>Subject</p>
                                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                            </label>
                            <label>
                                <p>Message</p>
                                <textarea type="text" value={message} onChange={(e) => setMessage(e.target.value)} required />
                            </label>
                            <button type="submit" className={styles.touchBtn}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className={styles.pop} style={{ display: `${flag ? "flex" : 'none'}` }}>
                <div className={styles.popBox}>
                    <h1>😄Send successfully</h1>
                    <p>Please do not send duplicate</p>
                    <div className={styles.ok} onClick={() => { setFlag(false) }}>Yes</div>
                </div>
            </div>
            <div className={styles.pop} style={{ display: `${flag2 ? "flex" : 'none'}` }}>
                <div className={styles.popBox}>
                    <h1>😭Sending failure</h1>
                    <p>There is a problem with the server, it is being fixed, please do not send repeatedly</p>
                    <div className={styles.ok} onClick={() => { setFlag2(false) }}>Yes</div>
                </div>
            </div>
        </>
    )
}