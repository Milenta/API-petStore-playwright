export interface randomUser {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  userStatus: number
}
export interface petOrderInterface {
  id: number
  petId: number
  quantity: number
  shipDate: string
  status: string
  complete: boolean
  unknownId?: number
}
