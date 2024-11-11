import React, { useState } from 'react';
import styles from './index.module.css';

export default ({ product, theme }) => {
    const [email, setEmail] = useState("")

    const actions = {
        megrez: "https://milkv.us21.list-manage.com/subscribe/post?u=44d3c4015a2452785a54f16e5&amp;id=efeca1c0c1&amp;f_id=004dcee6f0",
        "jupiter-nx": "https://milkv.us21.list-manage.com/subscribe/post?u=44d3c4015a2452785a54f16e5&amp;id=efeca1c0c1&amp;f_id=004ccee6f0",
        "megrez-nx": "https://milkv.us21.list-manage.com/subscribe/post?u=44d3c4015a2452785a54f16e5&amp;id=efeca1c0c1&amp;f_id=0073cee6f0",
        "cluster-08": "https://milkv.us21.list-manage.com/subscribe/post?u=44d3c4015a2452785a54f16e5&amp;id=efeca1c0c1&amp;f_id=0072cee6f0",
        ruyibook: "https://milkv.us21.list-manage.com/subscribe/post?u=44d3c4015a2452785a54f16e5&amp;id=efeca1c0c1&amp;f_id=0071cee6f0"
    }
    const tags = {
        megrez: "3017845",
        "jupiter-nx": "3017847",
        "megrez-nx": "3017848",
        "cluster-08": "3017849",
        ruyibook: "3017850"
    }

    return <div className={styles.subscribe_box}>
        <img src={`/home/${product}.webp`} alt="View" />
        <div className={styles.subscribe_form}>
            <p style={{ color: theme || '#fff' }}>Sign Up for Early Access to Exclusive Updates !</p>
            <form action={actions[product]}
                method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"
                target="_blank" className={styles.subForm}>
                <input
                    style={{ borderColor: theme || '#fff' }}
                    type="email" id="mce-EMAIL" name="EMAIL" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email Address" required />

                <div hidden=""><input type="hidden" name="tags" value={tags[product]} /></div>
                <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                    <input type="text" name="b_44d3c4015a2452785a54f16e5_efeca1c0c1" tabIndex="-1" />
                </div>
                <button type="submit" id="mc-embedded-subscribe" name="subscribe" >KEEP ME UPDATED</button>
            </form>
        </div>
    </div>
} 