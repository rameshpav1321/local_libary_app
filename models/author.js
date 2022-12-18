const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");
const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, requried: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name},${this.first_name}`;
    return fullname;
  }
  return fullname;
});
AuthorSchema.virtual("span").get(function () {
  let span = "";
  if (this.date_of_birth && this.date_of_death) {
    span =
      DateTime.fromJSDate(this.date_of_birth).toLocaleString(
        DateTime.DATE_MED
      ) +
      "-" +
      DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  } else if (this.date_of_birth) {
    span =
      DateTime.fromJSDate(this.date_of_birth).toLocaleString(
        DateTime.DATE_MED
      ) +
      "-" +
      "Present";
  } else {
    span = "-";
  }
  return span;
});
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});
module.exports = mongoose.model("Author", AuthorSchema);
