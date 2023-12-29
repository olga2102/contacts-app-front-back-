// Подклчаем библиотеки
const express = require('express');
const cors = require('cors');

let CONTACTS = [];

// Инициализируем сервер
const app = express();

// Подключаем мидлвееры 
app.use(cors()); // express сможет работать с кросс доменные запросами
app.use(express.json()); // express сможет работать с JSON

// Вешаем слушатель GET по адресу localhost:3003/api/
app.get('/api/', (req, res) => {
    console.log('GET:', req.url, req.method);
    res.status(200).json(CONTACTS);
});

// Вешаем слушатель POST по адресу localhost:3003/api/
app.post('/api/', (req, res) => {
    console.log('POST:', req.url, req.method, req.body);
    if (req.body.name && req.body.tel) {
        CONTACTS.push({...req.body, id: Date.now()});
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

// Вешаем слушатель DELETE по адресу localhost:3003/api/
app.delete('/api/', (req, res) => {
    console.log('DELETE:', req.url, req.method, req.body);
    if (req.body.id) {
        CONTACTS = CONTACTS.filter(contact => contact.id !== req.body.id);
        res.status(200).end();
    } else {
        res.status(404).end();
    }
});

// Вешаем слушатель DELETE по адресу localhost:3003/api/
app.patch('/api/', (req, res) => {
    console.log('PATCH', req.url, req.method, req.body);
    if (req.body.id) {
        CONTACTS = CONTACTS.map((contact) => {
            if (contact.id === req.body.id) {
                return {...contact, marked: req.body.marked ?? !contact.marked}
            }
            return contact;
        });
        res.status(200).end();
    } else {
        res.status(404).end();
    }
});


// Запускает сервер на 3003
app.listen(3003, () => {
    console.log('server has been started on port 3003')
})