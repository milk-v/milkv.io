import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import axios from 'axios';
import styles from "./index.module.css"

import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default () => {
    const currentLanguage = useBaseUrl('/');

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [county, setCounty] = useState('')
    const [organization, setOrganization] = useState('')
    const [web, setWeb] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [project, setProject] = useState('')
    const [description, setDescription] = useState('')
    const [description2, setDescription2] = useState('')

    const [flag, setFlag] = useState(false)
    const [flag2, setFlag2] = useState(false)

    const [formBtn, setFormBtn] = useState(false)

    const contactChange = (event) => {
        setDescription2(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setFormBtn(true)

        axios.get(`https://submit-form.com/0h0Ruc2s?name=${userName}&email=${userEmail}&Description=${description}&Project=${project}&Hardware =${description2}&Phone=${phone}&Organization=${organization}&Website=${web}&Country=${county}&Shipping=${address}`)
            .then((response) => {
                setFlag(true)
                setFormBtn(false)
            })
            .catch((error) => {
                setFlag2(true)
                setFormBtn(false)
            });
    };
    useEffect(() => {
        if (flag) {
            document.documentElement.style.overflow = 'hidden'
        } else {
            document.documentElement.style.overflow = 'auto'
        }
    }, [flag, flag2])

    return (
        <Layout>
            <div className={styles.box}>
                <h1>Milk-V <Translate id='Donation.title' /></h1>
                <form className={styles.formBox} onSubmit={handleSubmit}>
                    <div className={styles.page}>
                        <div className={styles.title}>
                            <img src='/form/icons-01.png' />
                            <h1><Translate id='Donation.title.Information' /></h1>
                        </div>
                        <div className={styles.inpBox}>
                            <label>
                                <div><span className={styles.red}>*</span><Translate id='contact.title.name' /> :</div>
                                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required placeholder={currentLanguage === '/' ? 'Your Name' : '你的名字'} />
                            </label>
                            <label>
                                <div> <span className={styles.red}>*</span><Translate id='contact.title.email' /> :</div>
                                <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required placeholder={currentLanguage === '/' ? 'Enter your email' : '请输入你的电子邮箱'} />
                            </label>
                        </div>
                        <div className={styles.inpBox2}>
                            <label>
                                <div><Translate id='Donation.title.Information.Organization' /> :</div>
                                <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} />
                            </label>
                            <label>
                                <div><Translate id='Donation.title.Information.web' /> :</div>
                                <input type="text" value={web} onChange={(e) => setWeb(e.target.value)} />
                            </label>
                        </div>
                    </div>
                    <div className={styles.page}>
                        <div className={styles.title}>
                            <img src='/form/icons-03.png' />
                            <h1><Translate id='Donation.title.Project' /></h1>
                        </div>
                        <label>
                            <div><span className={styles.red}>*</span><Translate id='Donation.title.Project.name' /> :</div>
                            <input type="text" value={project} required onChange={(e) => setProject(e.target.value)} />
                        </label>
                        <label>
                            <div><span className={styles.red}>*</span><Translate id='duo.info.text.Hardware' /> :</div>
                            <select id="contact-method" name="contact-method" value={description2} onChange={contactChange} >
                                <option value="DUO">Duo</option>
                                <option value="Pioneer">Pioneer</option>
                                <option value="Mars">Mars</option>
                            </select>
                        </label>
                        <label>
                            <div><span className={styles.red}>*</span><Translate id='Donation.title.Project.Description' /> :</div>
                            <textarea value={description} required onChange={(e) => setDescription(e.target.value)} />
                        </label>
                    </div>
                    <div className={styles.page}>
                        <div className={styles.title}>
                            <img src='/form/icons-02.png' />
                            <h1><Translate id='Donation.title.Shipping' /></h1>
                        </div>
                        <label>
                            <div><Translate id='Donation.title.Shipping.Country' /> :</div>
                            <input type="text" value={county} onChange={(e) => setCounty(e.target.value)} />
                        </label>
                        <label>
                            <div><Translate id='Donation.title.Shipping.Phone' /> :</div>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </label>
                        <p><Translate id='Donation.title.Shipping.Phone.process' /></p>
                        <label>
                            <div><Translate id='Donation.title.Shipping.addess' /> :</div>
                            <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
                        </label>
                        <p><Translate id='Donation.title.Shipping.addess.process' /></p>
                    </div>
                    <button type="submit" className={styles.formBtn} disabled={formBtn} ><Translate id='contact.title.send' /></button>
                </form>
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
        </Layout>
    )
}