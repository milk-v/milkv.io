import React, { useState } from 'react';
import css from './head.module.css'
import { Modal } from 'antd';


export default function (props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { ele = null, cd = null, type } = props

    console.log(type);
    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const toApp = () => {
        if (type === 'duo') {
            window.open('https://app6hodqg6k9861.h5.xiaoeknow.com')

        } else if (type === 'mars') {
            window.open('https://app6hodqg6k9861.h5.xiaoeknow.com')

        } else if (type === 'pioneer') {
            window.open('https://app6hodqg6k9861.h5.xiaoeknow.com')
        } else {
            window.open('https://app6hodqg6k9861.h5.xiaoeknow.com')
        }
    }
    return (
        <>
            <div style={{ display: `${cd ? 'none' : 'block'}` }}>
                {
                    ele === 'home' ? <div className={css.login} onClick={showModal}><div className={css.Login_img}></div><p className={css.Login_p}>Online  shop</p></div> : <div className={css.buy} onClick={showModal}><div className={css.buyText}>Buy Now</div></div>
                }
            </div>
            {
                cd === 'on3' ? <div onClick={showModal} style={{ textDecoration: 'none', color: '#fff', width: '100%', height: '100%', cursor: 'pointer' }}>Buy</div> : null
            }
            <Modal
                footer={null}
                closeIcon={<div className={css.close}></div>}
                width={'55.6rem'}
                bodyStyle={{ height: '35rem', position: 'relative' }}
                open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className={css.Logo}></div>
                <div className={css.chian} onClick={() => toApp()}>
                    <div className={css.img}></div>
                    <div className={css.text}>China's mainland</div>
                    <div className={css.right_text}></div>
                </div>
                <div className={css.other}>
                    <div className={css.img}></div>
                    <div className={css.text}>Other countries and regions</div>
                    <div className={css.right_text}></div>
                    <div className={css.coming}></div>
                </div>
            </Modal>
        </>
    );
}