const register=require('./register')
const login=require('./login')
const logout=require('./logout')
const current=require('./current')
const updateSubscriptionUser=require('./updateSubscriptionUser')
const updateAvatar=require('./updateAvatar')

module.exports={
    register,
    login,
    logout,
    current,
    updateSubscriptionUser,
    updateAvatar
}