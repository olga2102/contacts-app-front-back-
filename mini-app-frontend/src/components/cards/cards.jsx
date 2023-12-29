import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import cnb from 'classnames/bind';

import Card from "../card/card";
import {updateArr} from "../../store/valueSlice"

import styles from  './cards.module.css';


const cx = cnb.bind(styles);

const Cards = () => {
    const [loading, setLoading] = useState(false);
    const arrCards = useSelector(state=>state.valuesForForm.arr);
    const dispatch = useDispatch();

    const getContacts = ()=> {
        setLoading(true);
        fetch('http://localhost:3003/api/', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
        })
        .then((response) => response.json())
        .then((response) => {
            if (response) {
                dispatch(updateArr(response))
            }
        }).finally(() => {
            console.log('finally')
            setLoading(false);
        })
    }

    useEffect(() => {
        getContacts();
    }, []);
    
    return (
        <ul className={cx('list')}>
            {loading ? 'Loading...' : (
                <>
                    {arrCards.length ? arrCards.map(card => {
                        return <Card card ={card} key={card.id} />
                    }) : 'No cards'}
                </>
            )}
        </ul>
    )
}

export default Cards;