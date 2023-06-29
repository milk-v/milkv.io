import React, { useEffect, useState } from "react";
import styles from './index.module.css'
import Layout from '@theme/Layout';

import axios from "axios";

import Agreement from '../../../components/Agreement'
import Footer from "../../../components/Footer"

import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';


{/* <Translate id='Donation.title' /> */ }
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
    const { type, setAgreeFlag, agree, setPopflag, setlang, setFlagp, radioLang, setFlagp2 } = props

    const currentLanguage = useBaseUrl('/');

    const [individualName, setIndividualName] = useState('')
    const [individualPhone, setIndividualPhone] = useState('')
    const [individualEmail, setIndividualEmail] = useState('')
    const [individualPurpose, setIndividuaPurpose] = useState('')
    const [upload, setUpload] = useState(currentLanguage === '/' ? 'Upload File' : '上传文件')
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
            setUpload(currentLanguage === '/' ? 'Format error' : '不符合规范');
            setFlag(false)
        }
    }

    const [dis, setDis] = useState(false)
    const [dis2, setDis2] = useState(false)
    const pBlur = (e) => {
        if (phoneRegex.test(e.target.value) || phoneChinaRegex.test(e.target.value)) {
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
    }, [individualName, individualPhone, individualEmail, individualPurpose, agree, flag, radioLang])


    const handleSubmit = (event) => {
        event.preventDefault();
        let forms = new FormData()
        forms.append('file', individualFile)
        setBtn(false)
        axios.post('https://cv180.submit.rv64.org/api/v1/file/upload/', forms).then((fileRes) => {
            axios.post('https://cv180.submit.rv64.org/api/v1/pdf/submit/cv1800b', {
                'request_type': type,
                'name': individualName,
                'phone': individualPhone,
                'email': individualEmail,
                "purpose": individualPurpose,
                'identity_proof': fileRes.data.file_id,
                'doc_lang': radioLang,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                setFlagp(true)
                setBtn(true)
            }).catch(err => {
                setFlagp2(true)
                setBtn(true)
            })
        }).catch(flieErr => {
            setFlagp2(true)
            setBtn(true)
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.infoForm}>
                <label>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='contact.title.name' />:</span>
                    <input type="text" required value={individualName} onChange={(e) => setIndividualName(e.target.value)}
                        placeholder={currentLanguage === '/' ? 'Your Name' : '你的名字'}
                    />
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span><span style={{ color: 'red' }}>*</span><Translate id='Donation.title.Shipping.Phone' />:</span>
                        <input type="phone" required value={individualPhone} onBlur={pBlur} onChange={(e) => setIndividualPhone(e.target.value)}
                            placeholder={currentLanguage === '/' ? 'Your Contact Phone Number' : '您的联系电话'}
                        />
                    </div>
                    <p className={styles.redP} style={{ display: `${dis ? 'block' : 'none'}` }}>*<Translate id='cv1800b.phone.correct' /></p>
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span><span style={{ color: 'red' }}>*</span><Translate id='contact.title.email' />:</span>
                        <input type="email" required value={individualEmail} onBlur={eBlur} onChange={(e) => setIndividualEmail(e.target.value)}
                            placeholder={currentLanguage === '/' ? 'Enter your email' : '请输入你的电子邮箱'}
                        />
                    </div>
                    <p className={styles.redP} style={{ display: `${dis2 ? 'block' : 'none'}` }}>*<Translate id='cv1800b.email.correct' /></p>
                </label>
                <label>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='cv1800b.Individual.Purpose' />:</span>
                    <textarea className={styles.bgText} required value={individualPurpose} onChange={(e) => setIndividuaPurpose(e.target.value)}
                        placeholder={currentLanguage === '/' ? 'A Brief Summary Of Why You Need The Complete CV1800B Manual' : '简要说明为什么你需要完整的CV1800B手册'}
                    ></textarea>
                </label>
                <div className={styles.flexBox}>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='cv1800b.Individual.Proof' />:
                        <br></br><Translate id='cv1800b.Individual.Proof.info' /></span>
                    <label htmlFor='upload'>{upload}</label>
                    <img src="/form/response.svg" style={{ display: `${flag ? 'block' : 'none'}` }} />
                    <p style={{ display: `${!flag ? 'block' : 'none'}`, color: 'red' }} >*<Translate id='cv1800b.Individual.file.info' /></p>
                </div>
                <input type="file" id="upload" required onChange={handleFileChange} className={styles.upload} />
                <p style={{ display: `${radioLang === 'CN' ? 'block' : radioLang === 'EN' ? 'none' : null}` }} onClick={() => {
                    setPopflag(true);
                    setlang('zh')
                }}>《CV1800B手册保密条款》</p>
                <p style={{ display: `${radioLang === 'EN' ? 'block' : radioLang === 'CN' ? 'none' : null}` }} onClick={() => {
                    setPopflag(true);
                    setlang('en')
                }}>“CV1800B Manual Confidentiality Clause”</p>
                <label className={styles.terms}>
                    <input type="radio" className={styles.square} required checked={agree} onChange={() => { }} onClick={() => { setAgreeFlag(s => !s) }} />
                    <span>{radioLang === 'CN' ? "我同意并遵守以上条款" : "I agree to and will abide by the terms above"}</span>
                </label>
                <button type='submit' style={btn ? style : { cursor: 'not-allowed' }} disabled={btn ? false : true}><Translate id='Submit' /></button>
            </form>
        </>
    )
}

// 学校/机构
function Schools(props) {
    const { type, setAgreeFlag, agree, setPopflag, setlang, setFlagp, setFlagp2, radioLang } = props

    const currentLanguage = useBaseUrl('/');

    const [individualName, setIndividualName] = useState('')
    const [individualPhone, setIndividualPhone] = useState('')
    const [individualEmail, setIndividualEmail] = useState('')
    const [individualAddress, setIndividualAddress] = useState('')
    const [individualPurpose, setIndividuaPurpose] = useState('')
    const [individualpname, setIndividuapname] = useState('')
    const [upload, setUpload] = useState(currentLanguage === '/' ? 'Upload File' : '上传文件')
    const [upload2, setUpload2] = useState(currentLanguage === '/' ? 'Upload File' : '上传文件')
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
            setUpload(currentLanguage === '/' ? 'Format error' : '不符合规范');
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
            setUpload2(currentLanguage === '/' ? 'Format error' : '不符合规范');
            setFlag2(false)
        }
    }

    const [dis, setDis] = useState(false)
    const [dis2, setDis2] = useState(false)
    const pBlur = (e) => {
        if (phoneRegex.test(e.target.value) || phoneChinaRegex.test(e.target.value)) {
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

    }, [individualName, organization, individualPhone, individualEmail, individualAddress, individualpname, individualPurpose, agree, flag, flag2, radioLang])

    const handleSubmit = (event) => {
        event.preventDefault();
        let forms = new FormData()
        setBtn(false)
        forms.append('file', individualFile)
        axios.post('https://cv180.submit.rv64.org/api/v1/file/upload/',
            forms).then((fileRes) => {
                axios.post('https://cv180.submit.rv64.org/api/v1/file/upload/',
                    forms).then(res => {
                        let forms = new FormData()
                        forms.append('file', individualFile2)
                        axios.post('https://cv180.submit.rv64.org/api/v1/pdf/submit/cv1800b', {
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
                            'doc_lang': radioLang,
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then(res => {
                            setFlagp(true)
                            setBtn(true)
                        }).catch(err => {
                            setFlagp2(true)
                            setBtn(true)
                        })

                    }).catch(err => {
                        setFlagp2(true)
                        setBtn(true)
                    })
            }).catch(flieErr => {
                setFlagp2(true)
                setBtn(true)
            })
    }
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.infoForm}>
                <label>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='cv1800b.Schools.name' />:</span>
                    <input type="text" required value={individualName} onChange={(e) => setIndividualName(e.target.value)}
                        placeholder={currentLanguage === '/' ? "Your Applicant's Name" : '您的申请人姓名'}
                    />
                </label>
                <label>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='cv1800b.Schools.Organization.name' />:</span>
                    <input type="text" required value={organization} onChange={(e) => setOrganization(e.target.value)}
                        placeholder={currentLanguage === '/' ? "Your Organization Name" : '您的组织名称'} />
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span><span style={{ color: 'red' }}>*</span><Translate id='Donation.title.Shipping.Phone' />:</span>
                        <input type="phone" onBlur={pBlur} required value={individualPhone} onChange={(e) => setIndividualPhone(e.target.value)}
                            placeholder={currentLanguage === '/' ? "Your Contact Phone Number" : '您的联系电话'}
                        />
                    </ div>
                    <p className={styles.redP} style={{ display: `${dis ? 'block' : 'none'}` }}>*<Translate id='cv1800b.phone.correct' /></p>
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span><span style={{ color: 'red' }}>*</span><Translate id='contact.title.email' />:</span>
                        <input type="email" required value={individualEmail} onBlur={eBlur} onChange={(e) => setIndividualEmail(e.target.value)}
                            placeholder={currentLanguage === '/' ? "Your Email Address" : '您的电子邮件地址'}
                        />
                    </ div>
                    <p className={styles.redP} style={{ display: `${dis2 ? 'block' : 'none'}` }}>*<Translate id='cv1800b.email.correct' /></p>
                </label>
                <label>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='footer.text.address' />:</span>
                    <input type="text" required value={individualAddress} onChange={(e) => setIndividualAddress(e.target.value)}
                        placeholder={currentLanguage === '/' ? "Your Organization Address" : '您的组织地址'}
                    />
                </label>
                <label>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='Donation.title.Project.name' />:</span>
                    <input type="text" required value={individualpname} onChange={(e) => setIndividuapname(e.target.value)}
                        placeholder={currentLanguage === '/' ? "What Projects Will You Be Using Milk-V Duo On?" : '您将在哪些项目中使用Milk-V Duo？'}
                    />
                </label>
                <label>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='cv1800b.Schools.Project.Details' />:</span>
                    <textarea className={styles.bgText} required value={individualPurpose} onChange={(e) => setIndividuaPurpose(e.target.value)}
                        placeholder={currentLanguage === '/' ? "Describe The Details Of The Project" : '描述项目的细节'}
                    ></textarea>
                </label>
                <div className={styles.flexBox}>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='cv1800b.Individual.Proof' />:
                        <br></br><Translate id='cv1800b.Individual.Proof.info' /></span>
                    <label htmlFor='upload'>{upload}</label>
                    <img src="/form/response.svg" style={{ display: `${flag ? 'block' : 'none'}` }} />
                    <p style={{ display: `${!flag ? 'block' : 'none'}`, color: 'red' }} >*<Translate id='cv1800b.Individual.file.info' /></p>
                </div>
                <div className={styles.flexBox}>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='cv1800b.Schools.Certification' />:<br></br><Translate id='cv1800b.Schools.Certification.info' /></span>
                    <label htmlFor='upload2'>{upload2}</label>
                    <img src="/form/response.svg" style={{ display: `${flag2 ? 'block' : 'none'}` }} />
                    <p style={{ display: `${!flag2 ? 'block' : 'none'}`, color: 'red' }} >*<Translate id='cv1800b.Individual.file.info' /></p>
                </div>
                <input type="file" id="upload" required onChange={handleFileChange} className={styles.upload} />
                <input type="file" id="upload2" required onChange={handleFileChange2} className={styles.upload} />
                <p style={{ display: `${radioLang === 'CN' ? 'block' : radioLang === 'EN' ? 'none' : null}` }} onClick={() => {
                    setPopflag(true);
                    setlang('zh')
                }}>《CV1800B手册保密条款》</p>
                <p style={{ display: `${radioLang === 'EN' ? 'block' : radioLang === 'CN' ? 'none' : null}` }} onClick={() => {
                    setPopflag(true);
                    setlang('en')
                }}>“CV1800B Manual Confidentiality Clause”</p>
                <label className={styles.terms}>
                    <input type="radio" className={styles.square} required checked={agree} onChange={() => { }} onClick={() => { setAgreeFlag(s => !s) }} />
                    <span>{radioLang === 'CN' ? "我同意并遵守以上条款" : "I agree to and will abide by the terms above"}</span>
                </label>
                <button type='submit' style={btn ? style : { cursor: 'not-allowed' }} disabled={btn ? false : true} ><Translate id='Submit' /></button>
            </form>
        </>
    )
}

// 企业
function Corporations(props) {
    const { type, setAgreeFlag, agree, setPopflag, setlang, setFlagp, setFlagp2, radioLang } = props

    const currentLanguage = useBaseUrl('/');

    const [applicantName, setApplicantName] = useState('')
    const [individualName, setIndividualName] = useState('')
    const [individualPhone, setIndividualPhone] = useState('')
    const [individualEmail, setIndividualEmail] = useState('')
    const [individualAddress, setIndividualAddress] = useState('')
    const [individualPurpose, setIndividuaPurpose] = useState('')
    const [individualpname, setIndividuapname] = useState('')
    const [organization, setOrganization] = useState('')
    const [upload, setUpload] = useState(currentLanguage === '/' ? 'Upload File' : '上传文件')
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
            setUpload(currentLanguage === '/' ? 'Format error' : '不符合规范');
            setFlag(false)
        }
    }
    const [dis, setDis] = useState(false)
    const [dis2, setDis2] = useState(false)
    const pBlur = (e) => {
        if (phoneRegex.test(e.target.value) || phoneChinaRegex.test(e.target.value)) {
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

    }, [applicantName, individualName, organization, individualPhone, individualEmail, individualAddress, individualpname, individualPurpose, agree, flag, radioLang])

    const handleSubmit = (event) => {
        event.preventDefault();
        setBtn(false)
        let forms = new FormData()
        forms.append('file', individualFile)
        axios.post('https://cv180.submit.rv64.org/api/v1/file/upload/', forms).then((fileRes) => {
            axios.post('https://cv180.submit.rv64.org/api/v1/pdf/submit/cv1800b', {
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
                'doc_lang': radioLang,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                setFlagp(true)
                setBtn(true)
            }).catch(err => {
                setFlagp2(true)
                setBtn(true)
            })

        }).catch(flieErr => {
            setFlagp2(true)
            setBtn(true)
        })


    }
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.infoForm}>
                <label>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='cv1800b.Schools.name' />:</span>
                    <input type="text" required value={applicantName} onChange={(e) => setApplicantName(e.target.value)}
                        placeholder={currentLanguage === '/' ? "Your Applicant's Name" : '您的申请人姓名'}
                    />
                </label>
                <label>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='cv1800b.corporations.name' />:</span>
                    <input type="text" required value={individualName} onChange={(e) => setIndividualName(e.target.value)}
                        placeholder={currentLanguage === '/' ? "The Name Of Your Organization Or Company" : '你的组织或公司的名称'}
                    />
                </label>
                <label>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='cv1800b.corporations.Registration' />:</span>
                    <input type="text" required value={organization} onChange={(e) => setOrganization(e.target.value)}
                        placeholder={currentLanguage === '/' ? "Your Business Registration Number" : '您的企业注册号'}
                    />
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span><span style={{ color: 'red' }}>*</span><Translate id='Donation.title.Shipping.Phone' />:</span>
                        <input type="phone" required value={individualPhone} onBlur={pBlur} onChange={(e) => setIndividualPhone(e.target.value)}
                            placeholder={currentLanguage === '/' ? "Your Contact Phone Number" : '您的联系电话'}
                        />
                    </div>
                    <p className={styles.redP} style={{ display: `${dis ? 'block' : 'none'}` }}>*<Translate id='cv1800b.phone.correct' /></p>
                </label>
                <label className={styles.valuered}>
                    <div className={styles.inputBox}>
                        <span><span style={{ color: 'red' }}>*</span><Translate id='cv1800b.corporations.Businessemail' />:</span>
                        <input type="email" required value={individualEmail} onBlur={eBlur} onChange={(e) => setIndividualEmail(e.target.value)}
                            placeholder={currentLanguage === '/' ? "Your Business Email Address" : '您的商业电子邮件地址'}
                        />
                    </div>
                    <p className={styles.redP} style={{ display: `${dis2 ? 'block' : 'none'}` }}>*<Translate id='cv1800b.email.correct' /></p>
                </label>
                <label>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='cv1800b.corporations.BusinessAddress' />:</span>
                    <input type="text" required value={individualAddress} onChange={(e) => setIndividualAddress(e.target.value)}
                        placeholder={currentLanguage === '/' ? "Your Business Address" : '您的商业地址'}
                    />
                </label>
                <label>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='Donation.title.Project.name' />:</span>
                    <input type="text" required value={individualpname} onChange={(e) => setIndividuapname(e.target.value)}
                        placeholder={currentLanguage === '/' ? "What Projects Will You Be Using Milk-V Duo On?" : '您将在哪些项目中使用Milk-V Duo？'}
                    />
                </label>
                <label>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='cv1800b.Schools.Project.Details' />:</span>
                    <textarea className={styles.bgText} required value={individualPurpose} onChange={(e) => setIndividuaPurpose(e.target.value)}
                        placeholder={currentLanguage === '/' ? "Describe The Details Of The Project" : '描述项目的细节'}
                    ></textarea>
                </label>
                <div className={styles.flexBox}>
                    <span><span style={{ color: 'red' }}>*</span><Translate id='cv1800b.Individual.Proof' />:<br></br><Translate id='cv1800b.corporations.id' /></span>
                    <label htmlFor='upload'>{upload}</label>
                    <img src="/form/response.svg" style={{ display: `${flag ? 'block' : 'none'}` }} />
                    <p style={{ display: `${!flag ? 'block' : 'none'}`, color: 'red' }} >*<Translate id='cv1800b.Individual.file.info' /></p>
                </div>
                <input type="file" id="upload" required onChange={handleFileChange} className={styles.upload} />
                <p style={{ display: `${radioLang === 'CN' ? 'block' : radioLang === 'EN' ? 'none' : null}` }} onClick={() => {
                    setPopflag(true);
                    setlang('zh')
                }}>《CV1800B手册保密条款》</p>
                <p style={{ display: `${radioLang === 'EN' ? 'block' : radioLang === 'CN' ? 'none' : null}` }} onClick={() => {
                    setPopflag(true);
                    setlang('en')
                }}>“CV1800B Manual Confidentiality Clause”</p>
                <label className={styles.terms}>
                    <input type="radio" className={styles.square} required checked={agree} onChange={() => { }} onClick={() => { setAgreeFlag(s => !s) }} />
                    <span>{radioLang === 'CN' ? "我同意并遵守以上条款" : "I agree to and will abide by the terms above"}</span>
                </label>
                <button type='submit' style={btn ? style : { cursor: 'not-allowed' }} disabled={btn ? false : true}><Translate id='Submit' /></button>
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
    const [flag2, setFlag2] = useState(false)
    const currentLanguage = useBaseUrl('/');
    const [radioLang, setRadioLang] = useState(currentLanguage === '/' ? 'EN' : 'CN')


    const handleOptionChange = (event) => {
        setRadioValue(event.target.value);
    }
    const radioLangChange = (e) => {
        setRadioLang(e.target.value)
    }
    useEffect(() => {
        if (flag || flag2) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [flag, flag2])


    return (
        <>
            <Layout>
                <div className={styles.cv1800b}>
                    <h1><Translate id='cv1800b.title' /></h1>
                    <div className={styles.radioForm}>
                        <div className={styles.contentBox}>
                            <h1><Translate id='cv1800b.title.Applicant' /></h1>
                            <div className={styles.labelBox}>
                                <label>
                                    <input type="radio" name="organization" value='Individual' checked={radioValue === 'Individual'}
                                        onChange={handleOptionChange} />
                                    <span><Translate id='cv1800b.title.Applicant.Individual' /></span>
                                </label>
                                <label>
                                    <input type="radio" name="organization" value='Schools' checked={radioValue === 'Schools'}
                                        onChange={handleOptionChange} />
                                    <span><Translate id='cv1800b.title.Applicant.Schools' /></span>
                                </label>
                                <label>
                                    <input type="radio" name="organization" value='Corporations' checked={radioValue === 'Corporations'}
                                        onChange={handleOptionChange} />
                                    <span><Translate id='cv1800b.title.Applicant.corporations' /></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.radioForm}>
                        <div className={styles.contentBox}>
                            <h1><Translate id='cv1800b.title.lang' /></h1>
                            <div className={styles.labelBox}>
                                <label>
                                    <input type="radio" name="lang" value='CN' checked={radioLang === 'CN'} onChange={radioLangChange} />
                                    <span>中文</span>
                                </label>
                                <label>
                                    <input type="radio" name="lang" value='EN' checked={radioLang === 'EN'} onChange={radioLangChange} />
                                    <span>English</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.infoBox}>
                        <h1><Translate id='cv1800b.title.file' /></h1>
                        {
                            radioValue === 'Individual' ? <Individual setFlagp={setFlag} setFlagp2={setFlag2} agree={agreeFlag} setlang={setLang} type='individual' setAgreeFlag={setAgreeFlag} setPopflag={setPopflag} radioLang={radioLang} setRadioLang={setRadioLang} /> : radioValue === 'Schools' ? <Schools setlang={setLang} setFlagp={setFlag} setFlagp2={setFlag2} type='school_or_research_institution' agree={agreeFlag} setAgreeFlag={setAgreeFlag} setPopflag={setPopflag} radioLang={radioLang} setRadioLang={setRadioLang} /> : radioValue === 'Corporations' ? <Corporations setFlagp={setFlag} setFlagp2={setFlag2} setlang={setLang} agree={agreeFlag} type='profit_organization_or_corporations' setAgreeFlag={setAgreeFlag} setPopflag={setPopflag} radioLang={radioLang} setRadioLang={setRadioLang} /> : null
                        }
                    </div>
                </div>
                <div className={styles.pop} style={{ display: `${flag ? "flex" : 'none'}` }}>
                    <div className={styles.popBox}>
                        <h1>Application sent successfully</h1>
                        <p>We will send the review result by email in the first time, please do not repeat the application</p>
                        <div className={styles.ok} onClick={() => { setFlag(false) }}>Close</div>
                    </div>
                </div>
                <div className={styles.pop2} style={{ display: `${flag2 ? "flex" : 'none'}` }}>
                    <div className={styles.popBox}>
                        <h1>Sending failure</h1>
                        <p>Server is under maintenance, please try again later</p>
                        <div className={styles.ok} onClick={() => { setFlag2(false) }}>Close</div>
                    </div>
                </div>
                <Agreement dis={popflag} type={lang} agree={agreeFlag} setAgreeFlag={setAgreeFlag} setPopflag={setPopflag} />
                <Footer></Footer>
            </Layout>
        </>
    )
}                 