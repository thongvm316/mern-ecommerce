const admin = require('../firebase')
const User = require('../models/user')

exports.authCheck = async (req, res, next) => {
  try {
    const fakeToken =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxZTZjMGM2YjRlMzA5NTI0N2MwNjgwMDAwZTFiNDMxODIzODZkNTAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVybi1lY29tbWVyY2UtYmFhZjQiLCJhdWQiOiJtZXJuLWVjb21tZXJjZS1iYWFmNCIsImF1dGhfdGltZSI6MTY2NDE3NDI2NywidXNlcl9pZCI6InFlZGc5NlZyb1RSM1FPUkJJYU53RU9uTDZxRDIiLCJzdWIiOiJxZWRnOTZWcm9UUjNRT1JCSWFOd0VPbkw2cUQyIiwiaWF0IjoxNjY0MTc0MjY3LCJleHAiOjE2NjQxNzc4NjcsImVtYWlsIjoidGhvbmd2bWRldkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0aG9uZ3ZtZGV2QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.ad8D6Nm2DIg7k0_Cwr9bLaY8oeIvxSz3a5ojaCoXNCKD0LSPfb3SoAomPq4rJFs61v01hykRiDnBxK8hk89h-9lBqetjMevaMf7AVqbsuNs2cznldhN2lCOjHkXQsCdk2c45q81HlfifSzDA5CnX_Z5nozrc2vaZxHIFzT3NSw7wfMu7cmgGA-IPXrpWrvNfcxXMT0ENex5-uwWNtZ6XlEUWvSuqci3Xgr7orKNu0PgnpVG9V6ML_3tQ31NH7jfjH-nMplgwMOo_p7TTOG50Q-isTNtoDuWYtUCQU5zKiD0CBgDDdZlnnkvT8QD7zrKVCocvRkIfkJWIOmq4XAjgUwasd'

    const token = req.headers.authtoken
    // req.headers.authtoken

    const firebaseUser = await admin.auth().verifyIdToken(token)
    req.user = firebaseUser
    next()
  } catch (err) {
    res.status(401).json({
      err: 'Invalid or expired token',
    })
  }
}

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user

  const adminUser = await User.findOne({ email }).exec()

  if (adminUser.role !== 'admin') {
    res.status(403).json({
      err: 'Admin resource. Access denied.',
    })
  } else {
    next()
  }
}
