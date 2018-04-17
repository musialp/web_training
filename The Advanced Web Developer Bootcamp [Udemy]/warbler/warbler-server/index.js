require('dotenv').config();

const   express     = require('express')
        cors        = require('cors')
        bodyParser  = require('body-parser')

const errorHandler = require('./handlers/error');
        authRoutes = require('./routes/auth');
    messagesRoutes = require('./routes/messages');
                db = require('./models');

const { loginRequired, ensureCorrectUser } = require('./middleware/auth');

const PORT = 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', loginRequired, ensureCorrectUser, messagesRoutes);

app.get('/api/messages', loginRequired, async function(req, res, next){
    try {
        let messages = await db.Message.find().sort({ createdAt: 'desc' }).populate('user', {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(messages);
    } catch(err) {
        return next(err);
    }
})

//all routs here

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
    console.log(`Server is starting on port ${PORT}`);
});
