const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)


const OtpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expireAt: {
    type: Date,
    required: true,
    // Cần một giá trị thời gian mặc định cho expireAt, ví dụ:
    default: () => new Date(Date.now() + 3 * 60 * 1000) // Hết hạn sau 3 phút
  }
},{
    timestamps: true,
  }
)

OtpSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Otp = mongoose.model(
  'Otp',
  OtpSchema,
  'otps'
)

module.exports = Otp