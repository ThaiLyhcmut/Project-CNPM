const mongoose = require("mongoose")


const HistorySchema = new mongoose.Schema({
  accountId: String,
  cs: Number,
  location: String,
  price: Number,
  pages: Number,
  totle: Number,
  balancePaperNew: Number,
  linkPath: String,
  status: String,
  printerId: String,
  expireAt: {
    type: Date,
    required: true,
    // Cần một giá trị thời gian mặc định cho expireAt, ví dụ:
    default: () => new Date(Date.now() + 3*30*24*60*60*1000) // Hết hạn sau 3 phút
  }
},{
  timestamps: true,
})

HistorySchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });


const History = mongoose.model(
  'History',
  HistorySchema,
  'historys'
)

module.exports = History