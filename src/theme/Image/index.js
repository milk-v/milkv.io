import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css'
import clsx from 'clsx';


const Image = (props) => {
    const { src, minWidth, maxWidth, align } = props
    let alignment
    if (!src) {
        throw new Error('src是必填属性，请填写图片路径');
    }
    switch (align) {
        case 'center':
            alignment = styles.doc_img_center
            break;
        case 'right':
            alignment = styles.doc_img_right
            break;
        default:
            break;
    }

    return <div className={clsx(alignment, styles.docs_img_d)}>
        <img src={src} style={{ minWidth: minWidth, maxWidth: maxWidth, }} />
    </div>
}

Image.prototype = {
    src: PropTypes.string.isRequired,
    minWidth: PropTypes.string,
    maxWidth: PropTypes.string,
    align: PropTypes.oneOf(['center', 'left', 'right']),
}
Image.defaultProps = {
    maxWidth: '100%',
    minWidth: '20%',
    align: 'left',
}


export default Image