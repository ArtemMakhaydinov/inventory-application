const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
    name: { type: String, required: true },
    serial_number: { type: Number },
    description: { type: String, required: true },
    type: [{ type: Schema.Types.ObjectId, ref: 'Type' }],
});

PokemonSchema.virtual('url').get(function () {
    return `/pokedex/pokemon/${this.id}`;
});

PokemonSchema.virtual('formatted_serial_number').get(function () {
    if (this.serial_number === null || this.serial_number === undefined) return '#????';
    if (this.serial_number > 999) return `#${this.serial_number}`;
    if (this.serial_number > 99) return `#0${this.serial_number}`;
    if (this.serial_number > 9) return `#00${this.serial_number}`;
    return `#000${this.serial_number}`;
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
