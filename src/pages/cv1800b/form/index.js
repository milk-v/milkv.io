import React, { useEffect, useState } from "react";
import styles from './index.module.css'

import axios from "axios";

import Agreement from '../../../components/Agreement'


// 国际电话正则
const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{11}$/
const phoneChinaRegex = /^1[3-9]\d{9}$/;
// console.log(phoneRegex.test('8617679163620') || phoneChinaRegex.test('8617679163620'))
// 国际电子邮箱正则
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// console.log(emailRegex.test('xza@radxa.com'));
// 个人
function Individual(props) {
    const { type, setAgreeFlag, agree, setPopflag, setlang } = props
    const [individualName, setIndividualName] = useState('')
    const [individualPhone, setIndividualPhone] = useState('')
    const [individualEmail, setIndividualEmail] = useState('')
    const [individualPurpose, setIndividuaPurpose] = useState('')
    const [upload, setUpload] = useState('Upload File')
    const [individualFile, setIndividualFile] = useState(null)
    const [flag, setFlag] = useState(false)


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if ((file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'application/pdf') && file.size <= 1000000) {
            setIndividualFile(file);
            setUpload(file.name);
            setFlag(true)
        } else {
            setUpload('Error format');
            setFlag(false)
        }
    }

    const [dis, setDis] = useState(false)
    const [dis2, setDis2] = useState(false)
    const pBlur = (e) => {
        if (phoneRegex.test(e.target.value) || phoneChinaRegex.test('8617679163620')) {
            setDis(false)
            return
        } else {
            setDis(true)
        }
    }
    const eBlur = (e) => {
        if (emailRegex.test(e.target.value)) {
            setDis2(false)
            return
        } else {
            setDis2(true)
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();




    }
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.infoForm}>
                <label>
                    <span>Your Name:</span>
                    <input type="text" required value={individualName} onChange={(e) => setIndividualName(e.target.value)} />
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span>Phone Number:</span>
                        <input type="phone" required value={individualPhone} onBlur={pBlur} onChange={(e) => setIndividualPhone(e.target.value)} />
                    </div>
                    <p className={styles.redP} style={{ display: `${dis ? 'block' : 'none'}` }}>*Please fill in the correct format of the phone number</p>
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span>Email Address:</span>
                        <input type="email" required value={individualEmail} onBlur={eBlur} onChange={(e) => setIndividualEmail(e.target.value)} />
                    </div>
                    <p className={styles.redP} style={{ display: `${dis2 ? 'block' : 'none'}` }}>*Please fill in the correct format of e-mail</p>
                </label>
                <label>
                    <span>Purpose:</span>
                    <textarea className={styles.bgText} required value={individualPurpose} onChange={(e) => setIndividuaPurpose(e.target.value)} ></textarea>
                </label>
                <div className={styles.flexBox}>
                    <span>Relevant identification:</span>
                    <label htmlFor='upload'>{upload}</label>
                    <img src="/form/response.svg" style={{ display: `${flag ? 'block' : 'none'}` }} />
                    <p style={{ display: `${!flag ? 'block' : 'none'}` }} >*File size limit is 1mb, format is png / jpg / webp / pdf</p>
                </div>
                <input type="file" id="upload" required onChange={handleFileChange} className={styles.upload} />
                <p onClick={() => {
                    setPopflag(true);
                    setlang('zh')
                }}>《CV1800B手册保密条款》</p>
                <p onClick={() => {
                    setPopflag(true);
                    setlang('en')
                }}>“CV1800B Manual Confidentiality Clause”</p>
                <label className={styles.terms}>
                    <input type="radio" className={styles.square} required checked={agree} onChange={() => { }} onClick={() => { setAgreeFlag(s => !s) }} />
                    <span>我同意并遵守以上条款 <br style={{ display: 'none' }}></br> I agree and abide by the above terms</span>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

// 学校/机构
function Schools(props) {
    const { type, setAgreeFlag, agree, setPopflag, setlang } = props

    const [individualName, setIndividualName] = useState('')
    // const [individualPhone, setIndividualPhone] = useState('')
    const [individualEmail, setIndividualEmail] = useState('')
    const [individualAddress, setIndividualAddress] = useState('')
    const [individualPurpose, setIndividuaPurpose] = useState('')
    const [individualpname, setIndividuapname] = useState('')
    const [upload, setUpload] = useState('Upload File')
    const [upload2, setUpload2] = useState('Upload File')
    const [organization, setOrganization] = useState('')
    const [individualFile, setIndividualFile] = useState(null)
    const [individualFile2, setIndividualFile2] = useState(null)
    const [flag, setFlag] = useState(false)
    const [flag2, setFlag2] = useState(false)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if ((file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'application/pdf') && file.size <= 1000000) {
            setIndividualFile(file);
            setUpload(file.name);
            setFlag(true)
        } else {
            setUpload('Error format');
            setFlag(false)
        }
    }

    const handleFileChange2 = (event) => {
        const file = event.target.files[0];
        if ((file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'application/pdf') && file.size <= 1000000) {
            setIndividualFile2(file);
            setUpload2(file.name);
            setFlag2(true)
        } else {
            setUpload2('Error format');
            setFlag2(false)
        }
    }

    const [dis, setDis] = useState(false)
    const [dis2, setDis2] = useState(false)
    const pBlur = (e) => {
        if (phoneRegex.test(e.target.value) || phoneChinaRegex.test('8617679163620')) {
            setDis(false)
            return
        } else {
            setDis(true)
        }
    }
    const eBlur = (e) => {
        if (emailRegex.test(e.target.value)) {
            setDis2(false)
            return
        } else {
            setDis2(true)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.infoForm}>
                <label>
                    <span>Your Name:</span>
                    <input type="text" required value={individualName} onChange={(e) => setIndividualName(e.target.value)} />
                </label>
                <label>
                    <span>Your Organization Name:</span>
                    <input type="text" required value={organization} onChange={(e) => setOrganization(e.target.value)} />
                </label>
                {/* <label>
                    <span>Phone Number:</span>
                    <input type="phone" required value={individualPhone} onChange={(e) => setIndividualPhone(e.target.value)} />
                </label> */}
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span>Email:</span>
                        <input type="email" required value={individualEmail} onBlur={eBlur} onChange={(e) => setIndividualEmail(e.target.value)} />
                    </ div>
                    <p className={styles.redP} style={{ display: `${dis2 ? 'block' : 'none'}` }}>*Please fill in the correct format of e-mail</p>
                </label>
                <label>
                    <span>Address:</span>
                    <input type="text" required value={individualAddress} onChange={(e) => setIndividualAddress(e.target.value)} />
                </label>
                <label>
                    <span>Project Name:</span>
                    <input type="text" required value={individualpname} onChange={(e) => setIndividuapname(e.target.value)} />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea className={styles.bgText} required value={individualPurpose} onChange={(e) => setIndividuaPurpose(e.target.value)} ></textarea>
                </label>
                <div className={styles.flexBox}>
                    <span>Applicant identification:</span>
                    <label htmlFor='upload'>{upload}</label>
                    <img src="/form/response.svg" style={{ display: `${flag ? 'block' : 'none'}` }} />
                    <p style={{ display: `${!flag ? 'block' : 'none'}` }} >*File size limit is 1mb, format is png / jpg / webp / pdf</p>
                </div>
                <div className={styles.flexBox}>
                    <span>Organizational Certification:</span>
                    <label htmlFor='upload2'>{upload2}</label>
                    <img src="/form/response.svg" style={{ display: `${flag2 ? 'block' : 'none'}` }} />
                    <p style={{ display: `${!flag2 ? 'block' : 'none'}` }} >*File size limit is 1mb, format is png / jpg / webp / pdf</p>
                </div>
                <input type="file" id="upload" required onChange={handleFileChange} className={styles.upload} />
                <input type="file" id="upload2" required onChange={handleFileChange2} className={styles.upload} />
                <p onClick={() => {
                    setPopflag(true);
                    setlang('zh')
                }}>《CV1800B手册保密条款》</p>
                <p onClick={() => {
                    setPopflag(true);
                    setlang('en')
                }}>“CV1800B Manual Confidentiality Clause”</p>
                <label className={styles.terms}>
                    <input type="radio" className={styles.square} required checked={agree} onChange={() => { }} onClick={() => { setAgreeFlag(s => !s) }} />
                    <span>我同意并遵守以上条款 <br style={{ display: 'none' }}></br> I agree and abide by the above terms</span>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

// 企业
function Corporations(props) {
    const { type, setAgreeFlag, agree, setPopflag, setlang } = props
    const [individualName, setIndividualName] = useState('')
    const [individualPhone, setIndividualPhone] = useState('')
    const [individualEmail, setIndividualEmail] = useState('')
    const [individualAddress, setIndividualAddress] = useState('')
    const [individualPurpose, setIndividuaPurpose] = useState('')
    const [individualpname, setIndividuapname] = useState('')
    const [organization, setOrganization] = useState('')
    const [upload, setUpload] = useState('Upload File')
    const [individualFile, setIndividualFile] = useState(null)
    const [flag, setFlag] = useState(false)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if ((file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'application/pdf') && file.size <= 1000000) {
            setIndividualFile(file);
            setUpload(file.name);
            setFlag(true)
        } else {
            setUpload('Error format');
            setFlag(false)
        }
    }
    const [dis, setDis] = useState(false)
    const [dis2, setDis2] = useState(false)
    const pBlur = (e) => {
        if (phoneRegex.test(e.target.value) || phoneChinaRegex.test('8617679163620')) {
            setDis(false)
            return
        } else {
            setDis(true)
        }
    }
    const eBlur = (e) => {
        if (emailRegex.test(e.target.value)) {
            setDis2(false)
            return
        } else {
            setDis2(true)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (dis || dis2 || flag || agree) {
            console.log('err')
        } else {
            console.log('res')

        }

    }
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.infoForm}>
                <label>
                    <span>Name of organization or company:</span>
                    <input type="text" required value={individualName} onChange={(e) => setIndividualName(e.target.value)} />
                </label>
                <label>
                    <span>Business Registration Number:</span>
                    <input type="text" required value={organization} onChange={(e) => setOrganization(e.target.value)} />
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span>Phone Number:</span>
                        <input type="phone" required value={individualPhone} onBlur={pBlur} onChange={(e) => setIndividualPhone(e.target.value)} />
                    </div>
                    <p className={styles.redP} style={{ display: `${dis ? 'block' : 'none'}` }}>*Please fill in the correct format of the phone number</p>
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span>Business email:</span>
                        <input type="email" required value={individualEmail} onBlur={eBlur} onChange={(e) => setIndividualEmail(e.target.value)} />
                    </div>
                    <p className={styles.redP} style={{ display: `${dis2 ? 'block' : 'none'}` }}>*Please fill in the correct format of e-mail</p>
                </label>
                <label>
                    <span>Business Address:</span>
                    <input type="text" required value={individualAddress} onChange={(e) => setIndividualAddress(e.target.value)} />
                </label>
                <label>
                    <span>Project Name:</span>
                    <input type="text" required value={individualpname} onChange={(e) => setIndividuapname(e.target.value)} />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea className={styles.bgText} required value={individualPurpose} onChange={(e) => setIndividuaPurpose(e.target.value)} ></textarea>
                </label>
                <div className={styles.flexBox}>
                    <span>Proof of applicant's identity (work card, business card, etc.):</span>
                    <label htmlFor='upload'>{upload}</label>
                    <img src="/form/response.svg" style={{ display: `${flag ? 'block' : 'none'}` }} />
                    <p style={{ display: `${!flag ? 'block' : 'none'}` }} >*File size limit is 1mb, format is png / jpg / webp / pdf</p>
                </div>
                <input type="file" id="upload" required onChange={handleFileChange} className={styles.upload} />
                <p onClick={() => {
                    setPopflag(true);
                    setlang('zh')
                }}>《CV1800B手册保密条款》</p>
                <p onClick={() => {
                    setPopflag(true);
                    setlang('en')
                }}>“CV1800B Manual Confidentiality Clause”</p>
                <label className={styles.terms}>
                    <input type="radio" className={styles.square} required checked={agree} onChange={() => { }} onClick={() => { setAgreeFlag(s => !s) }} />
                    <span>我同意并遵守以上条款 <br style={{ display: 'none' }}></br> I agree and abide by the above terms</span>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default () => {
    const [radioValue, setRadioValue] = useState('Individual');
    const [popflag, setPopflag] = useState(false)
    const [lang, setLang] = useState('en')
    const [agreeFlag, setAgreeFlag] = useState(false)


    const handleOptionChange = (event) => {
        setRadioValue(event.target.value);
    }

    return (
        <>
            <div className={styles.cv1800b}>
                <h1>Get the complete CV1800B chip manual</h1>
                <div className={styles.radioForm}>
                    <div className={styles.contentBox}>
                        <h1> You need to fill in the following relevant information.</h1>
                        <div className={styles.labelBox}>
                            <label>
                                <input type="radio" name="organization" value='Individual' checked={radioValue === 'Individual'}
                                    onChange={handleOptionChange} />
                                <span>Individual</span>
                            </label>
                            <label>
                                <input type="radio" name="organization" value='Schools' checked={radioValue === 'Schools'}
                                    onChange={handleOptionChange} />
                                <span>Schools or research institutions</span>
                            </label>
                            <label>
                                <input type="radio" name="organization" value='Corporations' checked={radioValue === 'Corporations'}
                                    onChange={handleOptionChange} />
                                <span>For-profit organizations or corporations </span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={styles.infoBox}>
                    {
                        radioValue === 'Individual' ? <Individual agree={agreeFlag} setlang={setLang} type={radioValue} setAgreeFlag={setAgreeFlag} setPopflag={setPopflag} /> : radioValue === 'Schools' ? <Schools setlang={setLang} type={radioValue} agree={agreeFlag} setAgreeFlag={setAgreeFlag} setPopflag={setPopflag} /> : radioValue === 'Corporations' ? <Corporations setlang={setLang} agree={agreeFlag} type={radioValue} setAgreeFlag={setAgreeFlag} setPopflag={setPopflag} /> : null
                    }
                </div>
            </div>
            <Agreement dis={popflag} type={lang} agree={agreeFlag} setAgreeFlag={setAgreeFlag} setPopflag={setPopflag} />
        </>
    )
}                 