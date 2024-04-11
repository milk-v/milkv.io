import React from "react";
import PropTypes from 'prop-types';
import styles from './index.module.css'

const TipField = (props) => {
    const { tip } = props
    if (!props.children || typeof (props.children.props.children) === 'string') {
        throw new Error(`请补充code内容，code不能为空，内容格式参考:
        <TipField tip='Your text'>
            \`\`\`

            Your Content

            \`\`\`
        </TipField>
        `);
    }
    return <div className={styles.textBox}>
        <p className={styles.superscript}>{tip}</p>
        <div className={styles.tippre}>
            {props.children}
        </div>
    </div>
}

TipField.prototype = {
    tip: PropTypes.string.isRequired,
}
TipField.defaultProps = {
    tip: 'Code',
}

export default TipField