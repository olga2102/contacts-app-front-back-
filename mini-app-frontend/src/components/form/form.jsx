import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import cnb from 'classnames/bind';

import { getNameValue, getTelValue, addItemInArr } from '../../store/valueSlice';

import styles from  './form.module.css';

const cx = cnb.bind(styles);

let Form = ({classNames}) => {
    const [isFocus, setIsFocus] = useState(false);
    const nameValue = useSelector(state=>state.valuesForForm.name);
    const telValue = useSelector(state=>state.valuesForForm.tel);
    const [errorTextName, setErrorTextName] = useState(false);
    const [errorTextTel, setErrorTextTel] = useState(false);
    
    const dispatch = useDispatch();

    let changeNameValue = (e) => {
        dispatch(getNameValue(e.target.value))
    }

    let changeTelValue = (e) => {
        dispatch(getTelValue(e.target.value))
    }

    let addNewValue = (e) => {
        e.preventDefault();
        

        if(nameValue.length === 0) {
            setErrorTextName(true)
        }
        if(telValue.length === 0) {
            setErrorTextTel(true)
        }

        if(nameValue.length && telValue.length) {
            dispatch(addItemInArr({name: nameValue, tel: telValue}));
        }
        
    }

    useEffect(()=>{
        if (telValue.length) {
            setErrorTextTel(false)
        }

        if (nameValue.length) {
            setErrorTextName(false)
        }
    }, [telValue, nameValue]);

    const sendData = () => {
        fetch('http://localhost:3003/api/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({name: nameValue, tel: telValue, marked: false})
          })
    }

    return (
        <form className={cx('form', classNames, {'form--focus': isFocus, 'form--hover': isFocus})} onSubmit={addNewValue} onMouseEnter={() => setIsFocus(true)} onMouseLeave={() => setIsFocus(false)}>
            <div className={cx('inner')}>
                <label className={cx('label')}>Имя
                    <input className={cx('input')} type='text' value={nameValue} onChange={changeNameValue} />  
                </label>
                {errorTextName ? 
                    <p className={cx('error')}>Заполните имя контакта</p>
                    : ''}
            </div>
            <div className={cx('inner')}>
                <label className={cx('label')}> Телефон
                    <input className={cx('input')} type='tel' value={telValue} onChange={changeTelValue} onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }} />              
                </label>
                {errorTextTel ? 
                    <p className={cx('error')}>Заполните телефон контакта</p>
                    : ''}
            </div>
            <button className={cx('button')} onClick={sendData}>Создать</button>
        </form>
    )
}

export default Form;