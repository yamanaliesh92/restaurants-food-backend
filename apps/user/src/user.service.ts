// import { CreateUserDto } from '@app/shared/dto/user/createUser.dto';
import { Injectable, Logger } from '@nestjs/common';
import { UserDoa } from './db/doa/user.doa';
import Stripe from 'stripe';

@Injectable()
export class UserService {
  private stripe;
  constructor(private readonly userdoa: UserDoa) {
    this.stripe = new Stripe(
      'sk_test_51OXgiuAJ4nwhwATXX5L6YRNsZgZrZ5CZDxvm4sylrx82ur9pXlIEqx0Krai4cEYCq8RIkoy5rLx35l6ub5dNzccP00Svu5jbMa',
      { apiVersion: '2023-10-16' },
    );
  }

  async checkOut(amount: number) {
    try {
      Logger.log('amount ins srecive', amount);

      return await this.stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
        payment_method_types: ['card'],
      });
    } catch (err) {
      Logger.log(err, 'error');
      throw err;
    }
  }

  async findOne() {
    return 'Dd';
  }

  async create(dto: any) {
    try {
      return 'dd';
    } catch (err) {
      Logger.log('error occruded during createUser');
    }
  }
}
