import { petRandomOrderInterface, randomUser } from './/PetInterface'
import { faker } from '@faker-js/faker'

export class PetData {
  public generateRandomOrder(): petRandomOrderInterface {
    const fakerDate = faker.date.between({ from: '2025-01-01T00:00:00.000Z', to: '2025-05-01T00:00:00.000Z' })
    const formattedDate = fakerDate.toISOString().slice(0, 20) + '000+0000'
    return {
      id: faker.number.int({ min: 1, max: 10 }),
      petId: faker.number.int({ min: 1, max: 100 }),
      quantity: faker.number.int({ min: 1, max: 100 }),
      shipDate: formattedDate,
      status: 'placed', // [ placed, approved, delivered ],
      complete: true,
    }
  }
  public generateRandomUser(): randomUser {
    return {
      id: faker.number.int({ min: 1, max: 10 }),
      username: faker.person.middleName(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      userStatus: faker.number.int({ min: 1, max: 3 }),
    }
  }
}
