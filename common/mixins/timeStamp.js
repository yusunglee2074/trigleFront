module.exports = (Model, options) => {
  Model.defineProperty('created', {type: Date, default: '$now'})
  Model.defineProperty('modified', {type: Date, default: '$now'})

  Model.observe('before save', function updateTimestamp(ctx, next) {
    if (ctx.instance) {
      ctx.instance.updated = new Date()
    } else {
      ctx.data.updated = new Date()
    }
    next()
  })
}
