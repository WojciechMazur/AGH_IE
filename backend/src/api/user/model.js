import config from "../../config";
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    surname: {type: String, required: true, trim: true},
    password: {type: String, required: true, default: ''},
    birthday: {type: Date, max: Date.now()},
    city: {type: String, trim:true},
    address: {type: String, trim: true, match: /[A-Za-z0-9'.\-\s,]/},
    zip_code: {type: String, match: /\d{2}-\d{3}/},
    email:  {type: String, required: true, unique: true, match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    phone: {type: String, unique: true, index: {unique: true}, match: /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{3}( ?-?[0-9]{3})?/},
    admin: {type: Boolean, default: false},
    active: {type: Boolean, default: true}
}, {
    versionKey: '_version',
    timestamps: true
});

//Adding hashing before password save
UserSchema.pre('save', function(next){
    const user = this;
    //Don't hash if not modified
    console.log(this);
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    })
});

UserSchema.methods = {
    comparePasswords(candidatePassword, next) {
        console.log(`${candidatePassword}==${this.password}: ${bcrypt.compareSync(candidatePassword, this.password)}`);
        return bcrypt.compareSync(candidatePassword, this.password);
    }
    ,
    view(type = 'minimal') {
        const base = {
            id: this.id,
            name: this.name,
            surname: this.surname,
            email: this.email
        };
        const accountInfo = {
            admin: this.admin,
            active: this.active
        };
        const contact = {
            city: this.city,
            address: this.address,
            zip_code: this.zip_code,
            phone: this.phone,
            birthday: this.birthday
        };
        const timestamps = {
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };

        switch (type) {
            case 'minimal':
                return base;
            case 'filtered':
                return Object.assign({}, base, contact);
            case 'full':
                return Object.assign({}, base, contact, accountInfo, timestamps)

        }
    }
};

mongoose.connect(`${config.mongoURL}/${config.dbName}`).catch(
    err => console.log(`Error while connecting to DB: ${err}`)
);

export const User = mongoose.model('User', UserSchema, 'Users');


