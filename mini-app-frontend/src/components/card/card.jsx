import cnb from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { deleteItemInArr, markItemInArr } from '../../store/valueSlice';

import styles from  './card.module.css';

const cx = cnb.bind(styles);

const Card = ({card}) => {

    const dispatch = useDispatch();

    const deleteCard = () => {
        fetch('http://localhost:3003/api/', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id:card.id})
        });

        dispatch(deleteItemInArr(card.id))
    }

    const markCard = () => {
        fetch('http://localhost:3003/api/', {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: card.id, marked: true })
        });

        dispatch(markItemInArr(card.id))
    }

    return(
        <li className={cx('item', {'active' : card.marked})}>
            <p className={cx('name')}>{card.name}</p>
            <p className={cx('number')}>{card.tel}</p>
            <button className={cx('mark', 'button' ) } onClick={markCard}>Отметить</button>
            <button className={cx('delete', 'button')} onClick={deleteCard}>Удалить</button>
        </li>
    )
}

export default Card;