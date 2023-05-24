import React, { useState, useRef } from 'react';
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
    const [details, setDetails] = useState('')

    const [selectedOption, setSelectedOption] = useState('Yes');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:');
        axios.post('https://formspree.io/f/mdovjknl', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                messageApi.success('Send successfully')
            })
            .catch((error) => {
                messageApi.error('Sending failure')
            });
    };


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
                                <div>Your Name:</div>
                                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required placeholder='Your Name' />
                            </label>
                            <label>
                                <div>Email Address:</div>
                                <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required placeholder='Your Email Address:' />
                            </label>
                        </div>
                        <label>
                            <div>Country of Residence:</div>
                            <input type="text" value={county} onChange={(e) => setCounty(e.target.value)} placeholder='Your Email Address:' />
                        </label>
                        <label>
                            <div>Organization/Affiliation (if applicable):</div>
                            <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder='Your Email Address:' />
                        </label>
                        <label>
                            <div>Website (if applicable):</div>
                            <input type="text" value={web} onChange={(e) => setWeb(e.target.value)} placeholder='Your Email Address:' />
                        </label>
                    </div>
                    <div className={styles.page}>
                        <div className={styles.title}>
                            <img src='/form/icons-02.png' />
                            <h1>Shipping Information</h1>
                        </div>
                        <label>
                            <div>Phone Number:</div>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Your Email Address:' />
                        </label>
                        <p>Your phone number will be used solely for communication related to the donation process. We respect your privacy and will ensure the confidentiality of your contact information.</p>
                        <label>
                            <div>Shipping Address:</div>
                            <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Your Email Address:' />
                        </label>
                        <p>Please note that your shipping address will be used solely for the purpose of delivering the donated hardware. We value your privacy and will handle your information with utmost care.</p>
                    </div>
                    <div className={styles.page}>
                        <div className={styles.title}>
                            <img src='/form/icons-03.png' />
                            <h1>Project Information</h1>
                        </div>
                        <label>
                            <div>Project Name:</div>
                            <input type="text" value={project} onChange={(e) => setProject(e.target.value)} placeholder='Your Email Address:' />
                        </label>
                        <label>
                            <div>Project Description:</div>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Your Email Address:' />
                        </label>
                    </div>
                    <div className={styles.page}>
                        <div className={styles.title}>
                            <img src='/form/icons-04.png' />
                            <h1>Hardware Requirements</h1>
                        </div>
                        <h1>Are you currently using / supporting RISC-V architecture for your project?</h1>
                        <div className={styles.radioBox}>
                            <label htmlFor='Talent'>
                                <div>Yes</div>
                                <input type='radio' id='Talent' name='Talent'
                                    value='Yes' checked={selectedOption === 'Yes'} onChange={handleOptionChange} />
                            </label>

                            <label htmlFor='Licensing'>
                                <div>No</div>
                                <input type='radio' id='Licensing' name='Licensing' value='No' checked={selectedOption === 'No'} onChange={handleOptionChange} />
                            </label>
                        </div>
                        <label>
                            <div>Project Description:</div>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Your Email Address:' />
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </Layout>
    )
}