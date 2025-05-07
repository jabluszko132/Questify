class Avatars {
  user_id: number
  hat_id: number
  glasses_id: number
  background_id: number
  frame_id: number
  constructor(user_id: number, hat_id: number, glasses_id: number, background_id: number, frame_id: number) {
    this.user_id = user_id
    this.hat_id = hat_id
    this.glasses_id = glasses_id
    this.background_id = background_id
    this.frame_id = frame_id
  }
}
export default Avatars
