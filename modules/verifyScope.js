module.exports = function (token, scope) {
  return new Promise((resolve, reject) => {
    if (token.scope === scope) {
      resolve(true)
    } else {
      resolve(false)
    }
    // const userHasAccess = true  // return true if this user / client combo has access to this resource
    // return new Promise(resolve => resolve(userHasAccess))
  })
}
