import React from "react";
import styles from "./index.module.css";

export default (props) => {
    const { dis, type, agree, setAgreeFlag, setPopflag } = props;

    const zh = <>
        <div className={styles.cBox}>
            <h1>CV1800B手册保密条款</h1>
            <p>本手册由 深圳市群芯闪耀科技有限公司 制作，并包含关于CV1800B芯片的机密信息。为了保护这些机密信息，以下条款适用于手册的使用者（以下简称"使用者"）。</p>
            <h2>1. 保密义务</h2>
            <p>使用者同意将手册中的机密信息视为严格保密，并承诺采取一切必要的措施，以确保机密信息不会被未经授权的人员访问、复制、传播或使用。使用者同意将仅限于其职责所必需的程度内使用该机密信息，并不得将其用于与CV1800B芯片无关的任何其他目的。</p>
            <h2>2. 保密信息范围</h2>
            <p>机密信息包括但不限于手册中的所有内容。</p>
            <h2>3. 禁止传播和篡改</h2>
            <p>使用者严禁将手册中的机密信息传播给任何未经授权的第三方。使用者不得对手册中的机密信息进行任何形式的篡改、修改或漏洞利用。如发现任何违反此条款的行为，将采取法律手段予以追究并寻求赔偿。</p>
            <h2>4. 法律保护</h2>
            <p>使用者明确了解并同意，未经授权披露、复制、传播或使用手册中的机密信息可能导致严重的法律后果，包括但不限于违约责任和损害赔偿。公司保留追究法律责任的权利。</p>
        </div>
        <h1>请您仔细阅读并遵守上述保密条款。使用本手册即表示您同意受到这些条款的约束。如有任何疑问，请与我们联系。</h1>
        <div className={styles.marginBox}>
            <input type="radio" className={styles.square} required checked={agree} onChange={() => { }} onClick={() => setAgreeFlag(s => !s)} />
            <span>我同意并遵守以上条款</span>
        </div>
    </>

    const en = <>
        <div className={styles.cBox}>
            <h1>Confidentiality Clause for CV1800B Chip Manual</h1>
            <p>This manual is produced by Shenzhen MilkV Technology Co., Ltd. (hereinafter referred to as the "Company") and contains confidential information regarding the CV1800B chip. In order to protect this confidential information, the following terms and conditions apply to the users (hereinafter referred to as the "Users") of the manual.
            </p>
            <h2>1. 1.Confidentiality Obligations</h2>
            <p>Users agree to treat the confidential information in the manual as strictly confidential and undertake to take all necessary measures to prevent unauthorized access, copying, dissemination, or use of the confidential information. Users agree to use the confidential information only to the extent necessary for their responsibilities and not to use it for any other purposes unrelated to the CV1800B chip.</p>
            <h2>2. Scope of Confidential Information</h2>
            <p>Confidential information includes but is not limited to all content in the manual.</p>
            <h2>3. Prohibition of Dissemination and Alteration</h2>
            <p>Users are strictly prohibited from disseminating the confidential information in the manual to any unauthorized third party. Users shall not alter, modify, or exploit the confidential information in the manual in any form. Any violation of this clause will be pursued legally and compensation will be sought.</p>
            <h2>4. Legal Protection</h2>
            <p>Users expressly understand and agree that unauthorized disclosure, copying, dissemination, or use of the confidential information in the manual may result in serious legal consequences, including but not limited to breach of contract liability and damages. The Company reserves the right to pursue legal remedies.
            </p>
        </div>
        <h1>Please carefully read and comply with the above confidentiality clause. By using this manual, you agree to be bound by these terms. If you have any questions, please contact us.</h1>
        <div className={styles.marginBox}>
            <input type="radio" className={styles.square} required checked={agree} onChange={() => { }} onClick={() => setAgreeFlag(s => !s)} />
            <span>I agree and abide by the above terms</span>
        </div>
    </>
    return (
        <>
            {/* */}
            <div className={styles.agreement} style={{ display: `${dis ? "flex" : 'none'}` }} >
                <div className={styles.popBox}>
                    <img src="/form/clear.svg" onClick={() => { setPopflag(false) }} />
                    {
                        type === 'zh' ? zh : type === 'en' ? en : null
                    }
                </div>
            </div>
        </>
    )
}