const mongoose = require('mongoose');
const { Schema } = mongoose;

const bigSchema = new Schema({
    // Basic Field Types
    stringField: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    numberField: {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
    },
    dateField: {
        type: Date,
        required: true,
    },
    booleanField: {
        type: Boolean,
        default: true,
    },

    // Array Field
    arrayField: [{
        type: String,
        minlength: 2,
        maxlength: 20,
        trim: true,
    }],

    // Embedded Document
    embeddedDoc: {
        subStringField: {
            type: String,
            required: true,
        },
        subNumberField: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        }
    },

    // Reference to another document
    refField: {
        type: Schema.Types.ObjectId,
        ref: 'AnotherModel',
    },

    // Enum Field
    enumField: {
        type: String,
        enum: ['option1', 'option2', 'option3'],
    },

    // Virtual Field
    virtualField: {
        type: String,
        get: function() {
            return this.stringField + ' - Virtual';
        },
        set: function(value) {
            const parts = value.split(' - Virtual');
            this.stringField = parts[0];
        }
    },

    // Custom Validator
    customField: {
        type: String,
        validate: {
            validator: function(value) {
                return value.length >= 5 && value.length <= 10;
            },
            message: props => `${props.value} must be between 5 and 10 characters!`
        }
    },

    // Index Field
    indexedField: {
        type: String,
        index: true,
    },
}, { timestamps: true });

const BigModel = mongoose.model('BigModel', bigSchema);

module.exports = BigModel;
