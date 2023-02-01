const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: [{ type: Schema.Types.ObjectId, ref: 'Type' }],
});

PokemonSchema.virtual('url').get(function () {
    return `catelog/pokemon/${this.id}`;
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
