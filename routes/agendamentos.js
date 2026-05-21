const express = require('express');

const router = express.Router();

const db = require('../db');



// ========================================
// CREATE
// ========================================

router.post('/', (req, res) => {

    const {

        nome_cliente,
        telefone_cliente,
        email_cliente,
        data_agendamento,
        hora_agendamento,
        servico_desejado

    } = req.body;

    const sql = `
    
        INSERT INTO agendamento
        (
            nome_cliente,
            telefone_cliente,
            email_cliente,
            data_agendamento,
            hora_agendamento,
            servico_desejado
        )

        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [

        nome_cliente,
        telefone_cliente,
        email_cliente,
        data_agendamento,
        hora_agendamento,
        servico_desejado

    ], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json(err);
        }

        res.status(201).json({

            mensagem: 'Agendamento criado!',

            id: result.insertId
        });
    });
});



// ========================================
// READ
// ========================================

router.get('/', (req, res) => {

    const sql = 'SELECT * FROM agendamento';

    db.query(sql, (err, results) => {

        if (err) {

            console.log(err);

            return res.status(500).json(err);
        }

        res.json(results);
    });
});



// ========================================
// UPDATE
// ========================================

router.put('/:id', (req, res) => {

    const { id } = req.params;

    const {

        nome_cliente,
        telefone_cliente,
        email_cliente,
        data_agendamento,
        hora_agendamento,
        servico_desejado

    } = req.body;

    const sql = `

        UPDATE agendamento

        SET
            nome_cliente = ?,
            telefone_cliente = ?,
            email_cliente = ?,
            data_agendamento = ?,
            hora_agendamento = ?,
            servico_desejado = ?

        WHERE id_cliente = ?
    `;

    db.query(sql, [

        nome_cliente,
        telefone_cliente,
        email_cliente,
        data_agendamento,
        hora_agendamento,
        servico_desejado,
        id

    ], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json(err);
        }

        res.json({

            mensagem: 'Agendamento atualizado!'
        });
    });
});



// ========================================
// DELETE
// ========================================

router.delete('/:id', (req, res) => {

    const { id } = req.params;

    const sql = 'DELETE FROM agendamento WHERE id_cliente = ?';

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json(err);
        }

        res.json({

            mensagem: 'Agendamento removido!'
        });
    });
});


module.exports = router;