import styled from 'styled-components';
import Key from "./Key/Key";
import {Fragment} from "react";
import {FormattedMessage} from "react-intl";
import {FiDelete} from "react-icons/all";

export type KeypadProps = {
    numberKeyOnClick: (num: number) => void,
    deleteKeyOnClick: () => void,
    cancelKeyOnClick?: () => void,
    unlockKeyOnClick?: () => void
}

const StyledKeypad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(4rem, 5rem));
  grid-template-rows: repeat(4, minmax(4rem, 5rem));
  grid-row-gap: 10px;
  grid-column-gap: 30px;
`

const Keypad = ({numberKeyOnClick, deleteKeyOnClick, cancelKeyOnClick, unlockKeyOnClick}: KeypadProps) => {

    const generateKeys = () => {
        const alphabets = ['ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQRS', 'TUV', 'WXYZ']
        const keys = []
        let key = null;
        for (let i = 1; i <= 12; i++) {
            if (i === 1) {
                key = <Key number={i} alphabet={''} onClick={() => numberKeyOnClick(i)}/>
            } else if (i <= 9) {
                key = <Key number={i} alphabet={alphabets.shift() || ''} onClick={() => numberKeyOnClick(i)}/>
            } else if (i == 11) {
                key = <Key number={0} alphabet='+' onClick={() => numberKeyOnClick(0)}/>
            } else if (i == 12) {
                key = <Key text={<FiDelete size={24}/>} onClick={deleteKeyOnClick}/>
            }
            keys.push(key)
            key = null
        }
        return keys
    }

    return (
        <StyledKeypad>
            {generateKeys().map((key, idx) => (
                <Fragment key={idx}>
                    {key ? key : (
                        <div/>
                    )}
                </Fragment>
            ))}
        </StyledKeypad>
    )
}

export default Keypad