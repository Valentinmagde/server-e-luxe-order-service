import UserType from "../app/modules/user/user.type"

export { }

declare global {
  declare namespace Express {
    interface Request {
      user? : UserType
      file? : File
    }
  }
}
