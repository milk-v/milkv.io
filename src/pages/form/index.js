import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import axios from 'axios';
import styles from "./index.module.css"

export default () => {
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

    const contactChange = (event) => {
        setDescription2(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get(`https://submit-form.com/0h0Ruc2s?name=${userName}&email=${userEmail}&Description=${description}&Project=${project}&Hardware =${description2}&Phone=${phone}&Organization=${organization}&Website=${web}&Country=${county}&Shipping=${address}`)
            .then((response) => {
                setFlag(true)
            })
            .catch((error) => {
                setFlag2(true)
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
                <h1>Milk-V Donation Application Form</h1>
                <form className={styles.formBox} onSubmit={handleSubmit}>
                    <div className={styles.page}>
                        <div className={styles.title}>
                            <img src='/form/icons-01.png' />
                            <h1>Personal Information</h1>
                        </div>
                        <div className={styles.inpBox}>
                            <label>
                                <div><span className={styles.red}>*</span> Your Name :</div>
                                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required placeholder='Your Name' />
                            </label>
                            <label>
                                <div> <span className={styles.red}>*</span> Email Address :</div>
                                <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required placeholder='Your Email Address' />
                            </label>
                        </div>
                        <div className={styles.inpBox2}>
                            <label>
                                <div>Organization/Affiliation (if applicable) :</div>
                                <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} />
                            </label>
                            <label>
                                <div>Website (if applicable) :</div>
                                <input type="text" value={web} onChange={(e) => setWeb(e.target.value)} />
                            </label>
                        </div>
                    </div>
                    <div className={styles.page}>
                        <div className={styles.title}>
                            <img src='/form/icons-03.png' />
                            <h1>Project Information</h1>
                        </div>
                        <label>
                            <div><span className={styles.red}>*</span> Project Name :</div>
                            <input type="text" value={project} required onChange={(e) => setProject(e.target.value)} />
                        </label>
                        <label>
                            <div><span className={styles.red}>*</span>Hardware :</div>
                            <select id="contact-method" name="contact-method" value={description2} onChange={contactChange} >
                                <option value=""></option>
                                <option value="DUO">Duo</option>
                                <option value="Pioneer">Pioneer</option>
                                <option value="Mars">Mars</option>
                            </select>
                        </label>
                        <label>
                            <div><span className={styles.red}>*</span>Project Description :</div>
                            <textarea value={description} required onChange={(e) => setDescription(e.target.value)} />
                        </label>
                    </div>
                    <div className={styles.page}>
                        <div className={styles.title}>
                            <img src='/form/icons-02.png' />
                            <h1>Shipping Information</h1>
                        </div>
                        <label>
                            <div>Country of Residence:</div>
                            <input type="text" value={county} onChange={(e) => setCounty(e.target.value)} />
                        </label>
                        <label>
                            <div>Phone Number:</div>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </label>
                        <p>Your phone number will be used solely for communication related to the donation process. We respect your privacy and will ensure the confidentiality of your contact information.</p>
                        <label>
                            <div>Shipping Address:</div>
                            <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
                        </label>
                        <p>Please note that your shipping address will be used solely for the purpose of delivering the donated hardware. We value your privacy and will handle your information with utmost care.</p>
                    </div>
                    <button type="submit" className={styles.formBtn}>Send</button>
                </form>
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
        </Layout>
    )
}