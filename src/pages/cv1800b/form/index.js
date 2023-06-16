import React, { useEffect, useState } from "react";
import styles from './index.module.css'
import Layout from '@theme/Layout';

import axios from "axios";

import Agreement from '../../../components/Agreement'


// 国际电话正则
const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{11}$/
const phoneChinaRegex = /^1[3-9]\d{9}$/;
// 国际电子邮箱正则
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const style = {
    backgroundColor: '#2D88C9',
}


// 个人
function Individual(props) {
    const { type, setAgreeFlag, agree, setPopflag, setlang, setFlagp } = props
    const [individualName, setIndividualName] = useState('')
    const [individualPhone, setIndividualPhone] = useState('')
    const [individualEmail, setIndividualEmail] = useState('')
    const [individualPurpose, setIndividuaPurpose] = useState('')
    const [upload, setUpload] = useState('Upload File')
    const [individualFile, setIndividualFile] = useState(null)
    const [flag, setFlag] = useState(false)
    const [btn, setBtn] = useState(false)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if ((file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'application/pdf') && file.size <= 1000000) {
            setIndividualFile(file)
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

    useEffect(() => {
        if (individualName && individualPhone && individualEmail && individualPurpose && agree && flag) {
            setBtn(true)
        } else {
            setBtn(false)
        }
    }, [individualName, individualPhone, individualEmail, individualPurpose, agree, flag])


    const handleSubmit = (event) => {
        event.preventDefault();
        let forms = new FormData()
        forms.append('file', individualFile)
        axios.post('http://192.168.2.218:8000/api/v1/file/upload/', forms).then((fileRes) => {
            axios.post('http://192.168.2.218:8000/api/v1/pdf/submit/cv1800b', {
                'request_type': type,
                'name': individualName,
                'phone': individualPhone,
                'email': individualEmail,
                "purpose": individualPurpose,
                'identity_proof': fileRes.data.file_id,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                setFlagp(true)
                setIndividualName('')
                setIndividualPhone('')
                setIndividualEmail('')
                setIndividuaPurpose('')
                setUpload('Upload File')
                setIndividualFile(null)
                setFlag(false)
                btn(false)
            }).catch(err => {

            })
        }).catch(flieErr => {

        })
    }
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.infoForm}>
                <label>
                    <span>Your Name:</span>
                    <input type="text" required value={individualName} onChange={(e) => setIndividualName(e.target.value)}
                        placeholder="Your Name"
                    />
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span>Phone Number:</span>
                        <input type="phone" required value={individualPhone} onBlur={pBlur} onChange={(e) => setIndividualPhone(e.target.value)}
                            placeholder="Your Contact Phone Number"
                        />
                    </div>
                    <p className={styles.redP} style={{ display: `${dis ? 'block' : 'none'}` }}>*Please fill in the correct format of the phone number</p>
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span>Email Address:</span>
                        <input type="email" required value={individualEmail} onBlur={eBlur} onChange={(e) => setIndividualEmail(e.target.value)}
                            placeholder="Your Email Address"
                        />
                    </div>
                    <p className={styles.redP} style={{ display: `${dis2 ? 'block' : 'none'}` }}>*Please fill in the correct format of e-mail</p>
                </label>
                <label>
                    <span>Purpose:</span>
                    <textarea className={styles.bgText} required value={individualPurpose} onChange={(e) => setIndividuaPurpose(e.target.value)}
                        placeholder="A Brief Summary Of Why You Need The Complete CV1800B Manual"
                    ></textarea>
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
                <button type='submit' style={btn ? style : { cursor: 'not-allowed' }} disabled={btn ? false : true}>Submit</button>
            </form>
        </>
    )
}

// 学校/机构
function Schools(props) {
    const { type, setAgreeFlag, agree, setPopflag, setlang, setFlagp } = props

    const [individualName, setIndividualName] = useState('')
    const [individualPhone, setIndividualPhone] = useState('')
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
    const [btn, setBtn] = useState(false)

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

    useEffect(() => {
        if (individualName && organization && individualPhone && individualEmail && individualAddress && individualpname && individualPurpose && agree && flag && flag2) {
            setBtn(true)
        } else {
            setBtn(false)
        }

    }, [individualName, organization, individualPhone, individualEmail, individualAddress, individualpname, individualPurpose, agree, flag])

    const handleSubmit = (event) => {
        event.preventDefault();
        let forms = new FormData()
        forms.append('file', individualFile)
        axios.post('http://192.168.2.218:8000/api/v1/file/upload/',
            forms).then((fileRes) => {
                axios.post('http://192.168.2.218:8000/api/v1/file/upload/',
                    forms).then(res => {
                        console.log('file1成功', res);
                        let forms = new FormData()
                        forms.append('file', individualFile2)
                        axios.post('http://192.168.2.218:8000/api/v1/pdf/submit/cv1800b', {
                            'request_type': type,
                            'name': individualName,
                            'phone': individualPhone,
                            'email': individualEmail,
                            'address': individualAddress,
                            "organization_name": organization,
                            'project_details': individualPurpose,
                            "project_name": individualpname,
                            'identity_proof': fileRes.data.file_id,
                            "organization_proof": res.data.file_id,
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then(res => {
                            setFlagp(true)
                            setIndividualName('')
                            setIndividualPhone('')
                            setIndividualEmail('')
                            setIndividuaPurpose('')
                            setIndividualAddress('')
                            setOrganization('')
                            setUpload('Upload File')
                            setUpload2('Upload File')
                            setIndividuapname('')
                            setIndividualFile(null)
                            setIndividualFile2(null)
                            setFlag(false)
                            setFlag2(false)
                            btn(false)
                        }).catch(err => {

                        })

                    }).catch(err => {

                    })
            }).catch(flieErr => {

            })
    }
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.infoForm}>
                <label>
                    <span>Applicant Name:</span>
                    <input type="text" required value={individualName} onChange={(e) => setIndividualName(e.target.value)}
                        placeholder="Your Applicant's Name"
                    />
                </label>
                <label>
                    <span>Your Organization Name:</span>
                    <input type="text" required value={organization} onChange={(e) => setOrganization(e.target.value)}
                        placeholder="Your Organization Name" />
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span>Phone Number:</span>
                        <input type="phone" onBlur={pBlur} required value={individualPhone} onChange={(e) => setIndividualPhone(e.target.value)}
                            placeholder="Your Contact Phone Number"
                        />
                    </ div>
                    <p className={styles.redP} style={{ display: `${dis ? 'block' : 'none'}` }}>*Please fill in the correct format of the phone number</p>
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span>Email:</span>
                        <input type="email" required value={individualEmail} onBlur={eBlur} onChange={(e) => setIndividualEmail(e.target.value)}
                            placeholder="Your Email Address"
                        />
                    </ div>
                    <p className={styles.redP} style={{ display: `${dis2 ? 'block' : 'none'}` }}>*Please fill in the correct format of e-mail</p>
                </label>
                <label>
                    <span>Address:</span>
                    <input type="text" required value={individualAddress} onChange={(e) => setIndividualAddress(e.target.value)}
                        placeholder="Your Organization Address"
                    />
                </label>
                <label>
                    <span>Project Name:</span>
                    <input type="text" required value={individualpname} onChange={(e) => setIndividuapname(e.target.value)}
                        placeholder="What Projects Will You Be Using Milk-V Duo On?"
                    />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea className={styles.bgText} required value={individualPurpose} onChange={(e) => setIndividuaPurpose(e.target.value)}
                        placeholder="Describe The Details Of The Project"
                    ></textarea>
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
                <button type='submit' style={btn ? style : { cursor: 'not-allowed' }} disabled={btn ? false : true} >Submit</button>
            </form>
        </>
    )
}

// 企业
function Corporations(props) {
    const { type, setAgreeFlag, agree, setPopflag, setlang, setFlagp } = props
    const [applicantName, setApplicantName] = useState('')
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
    const [btn, setBtn] = useState(false)

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

    useEffect(() => {

        if (applicantName && individualName && organization && individualPhone && individualEmail && individualAddress && individualpname && individualPurpose && agree && flag) {
            setBtn(true)
        } else {
            setBtn(false)
        }

    }, [applicantName, individualName, organization, individualPhone, individualEmail, individualAddress, individualpname, individualPurpose, agree, flag])

    const handleSubmit = (event) => {
        event.preventDefault();

        let forms = new FormData()
        forms.append('file', individualFile)
        axios.post('http://192.168.2.218:8000/api/v1/file/upload/', forms).then((fileRes) => {
            console.log(fileRes.data.file_id);
            axios.post('http://192.168.2.218:8000/api/v1/pdf/submit/cv1800b', {
                'request_type': type,
                'name': applicantName,
                "organization_name": individualName,
                'phone': individualPhone,
                'email': individualEmail,
                'address': individualAddress,
                "project_name": individualpname,
                "project_details": individualPurpose,
                "business_registration_number": organization,
                'identity_proof': fileRes.data.file_id,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                setFlagp(true)
                setIndividualName('')
                setIndividualPhone('')
                setIndividualEmail('')
                setIndividuaPurpose('')
                setIndividualAddress('')
                setOrganization('')
                setUpload('Upload File')
                setIndividuapname('')
                setIndividualFile(null)
                setFlag(false)
                btn(false)
            }).catch(err => {

            })

        }).catch(flieErr => {

        })


    }
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.infoForm}>
                <label>
                    <span>Applicant Name:</span>
                    <input type="text" required value={applicantName} onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Your Applicant's Name"
                    />
                </label>
                <label>
                    <span>Name of organization or company:</span>
                    <input type="text" required value={individualName} onChange={(e) => setIndividualName(e.target.value)}
                        placeholder="The Name Of Your Organization Or Company"
                    />
                </label>
                <label>
                    <span>Business Registration Number:</span>
                    <input type="text" required value={organization} onChange={(e) => setOrganization(e.target.value)}
                        placeholder="Your Business Registration Number"
                    />
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span>Phone Number:</span>
                        <input type="phone" required value={individualPhone} onBlur={pBlur} onChange={(e) => setIndividualPhone(e.target.value)}
                            placeholder="Your Contact Phone Number"
                        />
                    </div>
                    <p className={styles.redP} style={{ display: `${dis ? 'block' : 'none'}` }}>*Please fill in the correct format of the phone number</p>
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span>Business email:</span>
                        <input type="email" required value={individualEmail} onBlur={eBlur} onChange={(e) => setIndividualEmail(e.target.value)}
                            placeholder="Your Business Email Address"
                        />
                    </div>
                    <p className={styles.redP} style={{ display: `${dis2 ? 'block' : 'none'}` }}>*Please fill in the correct format of e-mail</p>
                </label>
                <label>
                    <span>Business Address:</span>
                    <input type="text" required value={individualAddress} onChange={(e) => setIndividualAddress(e.target.value)}
                        placeholder="Your Business Address"
                    />
                </label>
                <label>
                    <span>Project Name:</span>
                    <input type="text" required value={individualpname} onChange={(e) => setIndividuapname(e.target.value)}
                        placeholder="What Projects Will You Be Using Milk-V Duo / CV1800B On?"
                    />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea className={styles.bgText} required value={individualPurpose} onChange={(e) => setIndividuaPurpose(e.target.value)}
                        placeholder="Describe The Details Of The Project"
                    ></textarea>
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
                <button type='submit' style={btn ? style : { cursor: 'not-allowed' }} disabled={btn ? false : true}>Submit</button>
            </form>
        </>
    )
}

export default () => {
    const [radioValue, setRadioValue] = useState('Corporations');
    const [popflag, setPopflag] = useState(false)
    const [lang, setLang] = useState('en')
    const [agreeFlag, setAgreeFlag] = useState(false)
    const [flag, setFlag] = useState(false)


    const handleOptionChange = (event) => {
        setRadioValue(event.target.value);
    }

    return (
        <>
            <Layout>
                <div className={styles.cv1800b}>
                    <h1>Get the complete CV1800B chip manual</h1>
                    <div className={styles.radioForm}>
                        <div className={styles.contentBox}>
                            <h1>You need to fill in the following relevant information.</h1>
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
                            radioValue === 'Individual' ? <Individual setFlagp={setFlag} agree={agreeFlag} setlang={setLang} type='individual' setAgreeFlag={setAgreeFlag} setPopflag={setPopflag} /> : radioValue === 'Schools' ? <Schools setlang={setLang} setFlagp={setFlag} type='school_or_research_institution' agree={agreeFlag} setAgreeFlag={setAgreeFlag} setPopflag={setPopflag} /> : radioValue === 'Corporations' ? <Corporations setFlagp={setFlag} setlang={setLang} agree={agreeFlag} type='profit_organization_or_corporations' setAgreeFlag={setAgreeFlag} setPopflag={setPopflag} /> : null
                        }
                    </div>
                </div>
                <div className={styles.pop} style={{ display: `${flag ? "flex" : 'none'}` }}>
                    <div className={styles.popBox}>
                        <h1>Application sent successfully</h1>
                        <p>We will send the review result by email in the first time, please do not repeat the application</p>
                        <div className={styles.ok} onClick={() => { setFlag(false) }}>Yes</div>
                    </div>
                </div>
                <Agreement dis={popflag} type={lang} agree={agreeFlag} setAgreeFlag={setAgreeFlag} setPopflag={setPopflag} />
            </Layout>
        </>
    )
}                 