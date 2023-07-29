import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [nameStudent, setNameStudent] = useState('');
    const [classStudent, setClassStudent] = useState('');
    const [amount, setAmount] = useState('');
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            nameStudent,
            classStudent,
            amount, 
            queryId
        }
        fetch('abayacademy-telega-bot.nuradilzhassula.repl.co/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [nameStudent, classStudent, amount, queryId])

    // const onSendData = useCallback(() => {
    //     const data = {
    //         nameStudent,
    //         classStudent,
    //         amount
    //     }
    //     tg.sendData(JSON.stringify(data));
    //     // eslint-disable-next-line
    // }, [nameStudent, classStudent, amount])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
        // eslint-disable-next-line
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Записать ученика'
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(!nameStudent || !classStudent || !amount) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
        // eslint-disable-next-line
    }, [nameStudent, classStudent, amount])

    const onChangeNameStudent = (e) => {
        setNameStudent(e.target.value)
    }

    const onChangeClassStudent = (e) => {
        setClassStudent(e.target.value)
    }

    const onChangeAmount = (e) => {
        setAmount(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите данные ученика</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Имя ученика'}
                value={nameStudent}
                onChange={onChangeNameStudent}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Класс'}
                value={classStudent}
                onChange={onChangeClassStudent}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Сумма'}
                value={amount}
                onChange={onChangeAmount}
            />
        </div>
    );
};

export default Form;