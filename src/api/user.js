const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res
        .status(201)
        .json({
            code: 8080,
            msg: '정상적으로 호출 응답을 받았습니다.',
            res: {
                name: 'ubin',
                age: 17,
            }
        })
});

module.exports = router;